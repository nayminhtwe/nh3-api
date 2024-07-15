module.exports = (body, allowFields) => {
  return Object.keys(body).reduce((acc, key) => {
    if (allowFields.includes(key) && body[key] !== undefined) {
      acc[key] = body[key];
    }
    return acc;
  }, {});
};
