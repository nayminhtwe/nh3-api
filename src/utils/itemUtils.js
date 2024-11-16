const paginate = (req, count, limit) => {
  const totalPages = Math.ceil(count / limit);
  const page = parseInt(req.query.page) || 1;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const url = `${req.protocol}://${req.get("host")}${
    req.originalUrl.split("?")[0]
  }`;

  console.log("url: ", url);

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

const filtered = (items, user) => {
  const filteredItems = items.map((item) => {
    if (item.is_universal) {
      item.car = null;
    }

    if (!user.is_approve) {
      item.price = "*****";
    }

    return item;
  });

  return filteredItems;
};

module.exports = {
  paginate,
  filtered,
};
