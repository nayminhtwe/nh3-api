require("dotenv").config();

async function sendSMS(phone_number, otp_code, brandName) {
  const api = process.env.SMS_API;
  const authKey = process.env.AUTH_KEY;

  console.log("api: ", api);
  console.log("authKey: ", authKey);

  const sendData = {
    to: phone_number,
    message: `Your verification code is ${otp_code} - Luckkabar `,
    sender: "Luckkabar",
  };

  try {
    const res = await fetch(`${api}`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authKey}`,
      },
    });

    const data = await res.json();
    console.log("data from sms: ", data);
    return;
  } catch (e) {
    console.log("error in send sms: ", e);
    return false;
  }
}

module.exports = {
  sendSMS,
};
