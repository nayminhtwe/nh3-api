module.exports = (err, req, res, next) => {
  console.error(err.message);

  return res.status(500).json({
    msg: err.message,
  });
};
