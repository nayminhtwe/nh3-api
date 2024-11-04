const app = require("./app");

require("dotenv").config();
require("./models/associations");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
