require("dotenv").config();

async function sendOrder(item_count, total_amount, name) {
  const api = process.env.SMS_API;
  const authKey = process.env.AUTH_KEY;

  console.log("api: ", api);
  console.log("authKey: ", authKey);

  const sendData = {
    to: 959768908006,
    message: `${item_count} items - Total ${total_amount} Ks have ordered by ${name} in L.K.B.NH3`,
    sender: "SMSPoh",
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
  sendOrder,
};
