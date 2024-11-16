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
            user.percentage === 0
              ? "price"
              : `ROUND(price / ${user.percentage}, 2)`
          ),
          "price",
        ],
      ],
    });

    return { count, items };
  }
}

module.exports = ItemService;
