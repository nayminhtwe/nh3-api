const QuickBooksClient = require("./QuickBooksClient");

async function enrichItemsWithQuickBooksQuantity(items) {
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
          item.quantity = qty;
        }
      } catch (e) {
        console.error("Failed to sync QuickBooks quantity for item", oeNo, e.message);
      }

      return item;
    })
  );

  return Array.isArray(items) ? enriched : enriched[0];
}

async function ensureSufficientQuickBooksStock(item, requestedQuantity) {
  const oeNo = item.OE_NO;

  if (!oeNo) {
    return;
  }

  const qty = await QuickBooksClient.getItemQuantityBySku(oeNo);

  if (qty === null) {
    return;
  }

  if (qty < requestedQuantity) {
    const error = new Error(`No enough QuickBooks stock for ${item.name}`);
    error.statusCode = 400;
    throw error;
  }
}

async function createQuickBooksSalesReceipt(orderNumber, lines) {
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
  enrichItemsWithQuickBooksQuantity,
  ensureSufficientQuickBooksStock,
  createQuickBooksSalesReceipt,
};

