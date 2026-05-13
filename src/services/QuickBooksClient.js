const axios = require("axios");
const QuickBooksToken = require("../models/QuickBooksToken");

const AUTH_BASE_URL = "https://appcenter.intuit.com/connect/oauth2";
const TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

/** Sandbox OAuth tokens must call sandbox-quickbooks.api.intuit.com, not production. */
function getCompanyApiBase() {
  const useSandbox =
    process.env.QUICKBOOKS_ENVIRONMENT === "sandbox" ||
    process.env.QUICKBOOKS_USE_SANDBOX === "true" ||
    process.env.QUICKBOOKS_USE_SANDBOX === "1";
  return useSandbox
    ? "https://sandbox-quickbooks.api.intuit.com/v3/company"
    : "https://quickbooks.api.intuit.com/v3/company";
}

/** Escape single quotes for QuickBooks query string literals (SQL-style '' not backslash). */
function escapeQboStringLiteral(value) {
  return String(value).replace(/'/g, "''");
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required for QuickBooks integration`);
  }
  return value;
}

function buildAuthorizationUrl(state) {
  const clientId = getRequiredEnv("QUICKBOOKS_CLIENT_ID");
  const redirectUri = getRequiredEnv("QUICKBOOKS_REDIRECT_URI");
  const scope =
    process.env.QUICKBOOKS_SCOPE || "com.intuit.quickbooks.accounting";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    state,
  });

  return `${AUTH_BASE_URL}?${params.toString()}`;
}

async function exchangeCodeForTokens(code, realmId) {
  const clientId = getRequiredEnv("QUICKBOOKS_CLIENT_ID");
  const clientSecret = getRequiredEnv("QUICKBOOKS_CLIENT_SECRET");
  const redirectUri = getRequiredEnv("QUICKBOOKS_REDIRECT_URI");

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  }).toString();

  const response = await axios.post(TOKEN_URL, body, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = response.data;
  const now = Date.now();

  const accessTokenExpiresAt = new Date(now + data.expires_in * 1000);
  const refreshTokenExpiresAt = data.x_refresh_token_expires_in
    ? new Date(now + data.x_refresh_token_expires_in * 1000)
    : null;

  let tokenRecord = await QuickBooksToken.findOne({
    where: { realm_id: realmId },
  });

  if (!tokenRecord) {
    tokenRecord = await QuickBooksToken.create({
      realm_id: realmId,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      access_token_expires_at: accessTokenExpiresAt,
      refresh_token_expires_at: refreshTokenExpiresAt,
    });
  } else {
    await tokenRecord.update({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      access_token_expires_at: accessTokenExpiresAt,
      refresh_token_expires_at: refreshTokenExpiresAt,
    });
  }

  return tokenRecord;
}

async function refreshAccessToken(tokenRecord) {
  const clientId = getRequiredEnv("QUICKBOOKS_CLIENT_ID");
  const clientSecret = getRequiredEnv("QUICKBOOKS_CLIENT_SECRET");

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: tokenRecord.refresh_token,
  }).toString();

  const response = await axios.post(TOKEN_URL, body, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = response.data;
  const now = Date.now();

  const accessTokenExpiresAt = new Date(now + data.expires_in * 1000);
  const refreshTokenExpiresAt = data.x_refresh_token_expires_in
    ? new Date(now + data.x_refresh_token_expires_in * 1000)
    : tokenRecord.refresh_token_expires_at;

  await tokenRecord.update({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    access_token_expires_at: accessTokenExpiresAt,
    refresh_token_expires_at: refreshTokenExpiresAt,
  });

  return {
    accessToken: data.access_token,
    realmId: tokenRecord.realm_id,
  };
}

async function getValidAccessToken() {
  const tokenRecord = await QuickBooksToken.findOne();

  if (!tokenRecord) {
    throw new Error("QuickBooks is not connected");
  }

  const expiresAt = tokenRecord.access_token_expires_at;

  if (expiresAt && expiresAt.getTime() - 60_000 < Date.now()) {
    return refreshAccessToken(tokenRecord);
  }

  return {
    accessToken: tokenRecord.access_token,
    realmId: tokenRecord.realm_id,
  };
}

async function disconnect() {
  await QuickBooksToken.destroy({ where: {} });
}

function formatQuickBooksFault(data) {
  if (!data || !data.Fault || !data.Fault.Error) {
    return JSON.stringify(data);
  }
  return data.Fault.Error.map((e) => e.Detail || e.Message || String(e)).join(
    "; "
  );
}

async function queryQuickBooks(query) {
  const { accessToken, realmId } = await getValidAccessToken();

  const base = getCompanyApiBase();
  const url = `${base}/${realmId}/query`;

  try {
    const response = await axios.get(url, {
      params: {
        query,
        minorversion: 65,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (e) {
    const body = e.response?.data;
    const detail = body ? formatQuickBooksFault(body) : e.message;
    const err = new Error(
      `QuickBooks query failed (${e.response?.status || "?"}): ${detail}`
    );
    err.statusCode = e.response?.status;
    err.intuitBody = body;
    throw err;
  }
}

async function getItemBySku(sku) {
  const safe = escapeQboStringLiteral(sku);
  const query = `select * from Item where Sku = '${safe}'`;
  const data = await queryQuickBooks(query);

  const raw = data.QueryResponse && data.QueryResponse.Item;

  if (!raw) {
    return null;
  }

  const items = Array.isArray(raw) ? raw : [raw];
  if (items.length === 0) {
    return null;
  }

  return items[0];
}

async function getItemQuantityBySku(sku) {
  const item = await getItemBySku(sku);

  if (!item) {
    return null;
  }

  return typeof item.QtyOnHand === "number" ? item.QtyOnHand : null;
}

async function createSalesReceipt(orderNumber, customerName, lines) {
  const { accessToken, realmId } = await getValidAccessToken();

  const base = getCompanyApiBase();
  const url = `${base}/${realmId}/salesreceipt`;

  const today = new Date().toISOString().slice(0, 10);

  const body = {
    TxnDate: today,
    PrivateNote: `Order ${orderNumber}`,
    CustomerRef: {
      value: process.env.QUICKBOOKS_CUSTOMER_ID || undefined,
    },
    Line: lines.map((line) => ({
      DetailType: "SalesItemLineDetail",
      Amount: line.amount,
      SalesItemLineDetail: {
        ItemRef: {
          value: line.itemId,
          name: line.name,
        },
        Qty: line.quantity,
        UnitPrice: line.unitPrice,
      },
    })),
  };

  await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

module.exports = {
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  getItemBySku,
  getItemQuantityBySku,
  createSalesReceipt,
  disconnect,
};

