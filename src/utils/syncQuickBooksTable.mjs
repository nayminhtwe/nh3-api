/**
 * Creates `quickbooks_tokens` if missing (safe for production — does not drop other tables).
 * Run once after deploy: npm run sync:quickbooks
 */
import dotenv from "dotenv";
dotenv.config();

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sequelize = require("../config/db");
const QuickBooksToken = require("../models/QuickBooksToken");

async function main() {
  try {
    await QuickBooksToken.sync();
    console.log("Table quickbooks_tokens is ready.");
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
