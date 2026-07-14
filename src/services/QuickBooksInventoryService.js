const QuickBooksClient = require("./QuickBooksClient");
const Item = require("../models/Item");
const { Op } = require("sequelize");

/**
 * STOCK_SOURCE=.env
 * - local      → use DB quantity only (no QuickBooks stock calls)
 * - quickbooks → read/write stock via QuickBooks and update local DB
 */
function isQuickBooksStockEnabled() {
  const source = (process.env.STOCK_SOURCE || "local").toLowerCase().trim();
  return source === "quickbooks" || source === "qb";
}

async function persistLocalQuantity(item, qty) {
  if (typeof qty !== "number" || !item?.id) {
    return false;
  }

  const current =
    typeof item.quantity === "number"
      ? item.quantity
      : parseFloat(item.quantity);

  if (current === qty) {
    item.quantity = qty;
    return false;
  }

  item.quantity = qty;

  if (typeof item.save === "function") {
    await item.save({ fields: ["quantity"] });
  } else {
    await Item.update({ quantity: qty }, { where: { id: item.id } });
  }

  return true;
}

async function enrichItemsWithQuickBooksQuantity(items) {
  if (!isQuickBooksStockEnabled()) {
    return items;
  }

  const list = Array.isArray(items) ? items : [items];

  const enriched = await Promise.all(
    list.map(async (item) => {
      const oeNo = item.OE_NO;

      if (!oeNo) {
        return item;
      }

      try {
        const qty = await QuickBooksClient.getItemQuantityBySku(oeNo);

        if (typeof qty === "number") {
          await persistLocalQuantity(item, qty);
        }
      } catch (e) {
        console.error(
          "Failed to sync QuickBooks quantity for item",
          oeNo,
          e.message
        );
      }

      return item;
    })
  );

  return Array.isArray(items) ? enriched : enriched[0];
}

async function ensureSufficientQuickBooksStock(item, requestedQuantity) {
  if (!isQuickBooksStockEnabled()) {
    return;
  }

  const oeNo = item.OE_NO;

  if (!oeNo) {
    return;
  }

  const qty = await QuickBooksClient.getItemQuantityBySku(oeNo);

  if (qty === null) {
    return;
  }

  await persistLocalQuantity(item, qty);

  if (qty < requestedQuantity) {
    const error = new Error(`No enough QuickBooks stock for ${item.name}`);
    error.statusCode = 400;
    throw error;
  }
}

/**
 * Sync all local items that have OE_NO from QuickBooks QtyOnHand into items.quantity.
 */
async function syncAllLocalStockFromQuickBooks() {
  if (!isQuickBooksStockEnabled()) {
    return {
      skipped: true,
      msg: 'STOCK_SOURCE is not "quickbooks". Set STOCK_SOURCE=quickbooks in .env to enable.',
      total: 0,
      updated: 0,
      unchanged: 0,
      notFoundInQuickBooks: 0,
      failed: 0,
      details: [],
    };
  }

  const localItems = await Item.findAll({
    where: {
      [Op.and]: [
        { OE_NO: { [Op.ne]: null } },
        { OE_NO: { [Op.ne]: "" } },
      ],
    },
    attributes: ["id", "name", "OE_NO", "quantity"],
  });

  const result = {
    skipped: false,
    total: localItems.length,
    updated: 0,
    unchanged: 0,
    notFoundInQuickBooks: 0,
    failed: 0,
    details: [],
  };

  for (const item of localItems) {
    const oeNo = item.OE_NO;

    try {
      const qty = await QuickBooksClient.getItemQuantityBySku(oeNo);

      if (qty === null) {
        result.notFoundInQuickBooks += 1;
        result.details.push({
          id: item.id,
          OE_NO: oeNo,
          status: "not_found_in_quickbooks",
        });
        continue;
      }

      const changed = await persistLocalQuantity(item, qty);

      if (changed) {
        result.updated += 1;
        result.details.push({
          id: item.id,
          OE_NO: oeNo,
          status: "updated",
          quantity: qty,
        });
      } else {
        result.unchanged += 1;
        result.details.push({
          id: item.id,
          OE_NO: oeNo,
          status: "unchanged",
          quantity: qty,
        });
      }
    } catch (e) {
      result.failed += 1;
      result.details.push({
        id: item.id,
        OE_NO: oeNo,
        status: "failed",
        error: e.message,
      });
      console.error("Failed stock sync for", oeNo, e.message);
    }
  }

  return result;
}

async function createQuickBooksSalesReceipt(orderNumber, lines) {
  if (!isQuickBooksStockEnabled()) {
    return;
  }

  const salesLines = [];

  for (const line of lines) {
    const item = await QuickBooksClient.getItemBySku(line.oeNo);

    if (!item) {
      continue;
    }

    salesLines.push({
      itemId: item.Id,
      name: item.Name,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      amount: line.unitPrice * line.quantity,
    });
  }

  if (salesLines.length === 0) {
    return;
  }

  await QuickBooksClient.createSalesReceipt(orderNumber, undefined, salesLines);
}

module.exports = {
  isQuickBooksStockEnabled,
  enrichItemsWithQuickBooksQuantity,
  ensureSufficientQuickBooksStock,
  syncAllLocalStockFromQuickBooks,
  createQuickBooksSalesReceipt,
};
