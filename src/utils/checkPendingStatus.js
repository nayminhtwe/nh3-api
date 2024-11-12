const checkPendingStatus = (orderStatusId, res) => {
  if (orderStatusId !== 1) {
    return res
      .status(400)
      .json({ msg: "Only orders with pending status can be update or delete" });
  }

  return true;
};

module.exports = checkPendingStatus;
