const { Op } = require("sequelize");

const paginate = (req, count, limit) => {
  const totalPages = Math.ceil(count / limit);
  const page = parseInt(req.query.page) || 1;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const url = `${req.protocol}://${req.get("host")}${
    req.originalUrl.split("?")[0]
  }`;

  return {
    meta: {
      page,
      totalItems: count,
      totalPages,
    },
    links: {
      next: nextPage ? `${url}?page=${nextPage}` : null,
      previous: prevPage ? `${url}?page=${prevPage}` : null,
    },
  };
};

const filteredQuery = (query) => {
  const arrayEntries = Object.entries(query);

  const where = {};

  arrayEntries.forEach(([key, value]) => {
    switch (key) {
      case "feature":
        value === "true" && (where.is_feature = true);
        break;
      case "universal":
        value === "true" && (where.is_universal = true);
        break;
      case "category":
        where.main_category_id = value;
        break;
      case "OE_NO":
        where.OE_NO = value;
        break;
      case "name":
        where.name = { [Op.like]: `%${value}%` };
        break;
      case "description":
        where.description = { [Op.like]: `%${value}%` };
      default:
        break;
    }
  });

  return where;
};

const filtered = async (items, user) => {
  if (Array.isArray(items)) {
    return items.map((item) => filteredProcess(item, user));
  }

  if (typeof items === "object") {
    return filteredProcess(items, user);
  }
};

const filteredProcess = (item, user) => {
  if (item.is_universal) {
    item.car = null;
  }

  // if (!user.is_approve) {
  //   item.price = "*****";
  // }

  return item;
};

module.exports = {
  paginate,
  filtered,
  filteredQuery,
};
