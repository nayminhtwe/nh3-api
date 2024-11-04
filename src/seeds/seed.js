const addressSeed = require("./addressSeed");
const carItemSeed = require("./carItemSeed");
const carModelSeed = require("./carModelSeed");
const carSeed = require("./carSeed");
const cartItemSeed = require("./cartItemSeed");
const cartSeed = require("./cartSeed");
const companySeed = require("./companySeed");
const discountSeed = require("./discountSeed");
const discountTypeSeed = require("./discountTypeSeed");
const engineSeed = require("./engineSeed");
const itemSeed = require("./itemSeed");
const mainCategorySeed = require("./mainCategorySeed");
const orderItemSeed = require("./orderItemSeed");
const orderSeed = require("./orderSeed");
const orderStautsSeed = require("./orderStatusSeed");
const promotionSeed = require("./promotionSeed");
const statusSeed = require("./statusSeed");
const userSeed = require("./userSeed");
const yearSeed = require("./yearSeed");

async function seed() {
  await companySeed();
  await engineSeed();
  await carModelSeed();
  await carSeed();
  await statusSeed();
  await mainCategorySeed();
  await itemSeed();
}

seed();
