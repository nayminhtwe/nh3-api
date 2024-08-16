const asyncHandler = require("express-async-handler");
const Otp = require("../models/Otp");

module.exports = asyncHandler(async (req, res) => {
  const { transcation_id, otp_code, phone_number } = req.body;

  if (!transcation_id || !otp_code || !phone_number) {
    return res.status(400).json({
      msg: "transcation_id, otp_code and phone_number all required",
    });
  }
});
