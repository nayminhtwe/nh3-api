const { Sequelize } = require("sequelize");
const Item = require("../models/Item");
class ItemService {
  static async getItems({ where = {}, include, limit, offset, user }) {
    const { count, rows: items } = await Item.findAndCountAll({
      where,
      include,
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "brandName",
        "description",
        "main_category_id",
        "is_feature",
        "is_universal",
        "OE_NO",
        [
          Sequelize.literal(
            user.is_approve === 1
              ? (user.percentage === 0 ? "price" : `ROUND(price - (price * (${user.percentage} / 100)), 2)`)
              : -1

            // user.percentage === 0
            //   ? "price"
            //   : `ROUND(price - (price * (${user.percentage} / 100)), 2)`
          ),
          "price",
        ],
      ],
      distinct: true,
    });

    return { count, items };
  }

  static async getItem(id, user, include) {
    const item = await Item.findByPk(id, {
      include,
      attributes: [
        "id",
        "name",
        "brandName",
        "description",
        "main_category_id",
        "is_feature",
        "is_universal",
        "OE_NO",
        [
          Sequelize.literal(
            user.percentage === 0
              ? "price"
              : `ROUND(price / ${user.percentage}, 2)`
          ),
          "price",
        ],
      ],
    });

    return item;
  }

  static calculateDiscountItems(items) {
    if (Array.isArray(items)) {
      const discountedItems = items.map(this.processDiscountItem);
      return discountedItems;
    } else {
      return this.processDiscountItem(items);
    }
  }

  static processDiscountItem(item) {
    if (item.discounts.length === 0) {
      return {
        ...item.toJSON(),
        discounts: [],
      };
    }

    let itemPrice = parseFloat(item.price);
    const discounts = [];

    item.discounts.forEach((discount) => {
      let discountAmount = 0;
      let discountPrice = itemPrice;

      if (discount.discount_type === "percentage") {
        discountAmount =
          itemPrice * (parseFloat(discount.discount_value) / 100);
      } else if (discount.discount_type === "fixed") {
        discountAmount = parseFloat(discount.discount_value);
      }

      discountAmount = Math.min(discountAmount, itemPrice);
      discountPrice = itemPrice - discountAmount;

      discountAmount = Math.round(discountAmount * 100) / 100;
      discountPrice = Math.round(discountPrice * 100) / 100;

      discounts.push({
        id: discount.id,
        discount_type: discount.discount_type,
        discountValue: discount.discount_value,
        discountAmount: discountAmount,
        discountPrice: discountPrice,
      });
    });

    return {
      ...item.toJSON(),
      discounts: discounts,
    };
  }
}

module.exports = ItemService;
