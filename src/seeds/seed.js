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
const userSeed = require("./userSeed");
const yearSeed = require("./yearSeed");

async function seed() {
  await userSeed();
  await companySeed();
  await carModelSeed();
  await yearSeed();
  await engineSeed();
  await carSeed();
  await mainCategorySeed();
  await itemSeed(); // item
  await carItemSeed();
  await cartSeed(); // cart
  await promotionSeed();
  await cartItemSeed(); // cart item
  await orderItemSeed();
  await orderStautsSeed();
  await addressSeed();
  await orderSeed();
  await discountTypeSeed();
  await discountSeed();
}

seed();
