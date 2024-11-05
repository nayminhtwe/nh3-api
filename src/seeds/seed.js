// const addressSeed = require("./addressSeed");
// const carItemSeed = require("./carItemSeed");
// const cartItemSeed = require("./cartItemSeed");
// const cartSeed = require("./cartSeed");
// const discountSeed = require("./discountSeed");
// const discountTypeSeed = require("./discountTypeSeed");
// const orderItemSeed = require("./orderItemSeed");
// const orderSeed = require("./orderSeed");
// const orderStautsSeed = require("./orderStatusSeed");
// const promotionSeed = require("./promotionSeed");
// const userSeed = require("./userSeed");
// const yearSeed = require("./yearSeed");

const userSeed = require("./userSeed");
const companySeed = require("./companySeed");
const carModelSeed = require("./carModelSeed");
const engineSeed = require("./engineSeed");
const carSeed = require("./carSeed");
const statusSeed = require("./statusSeed");
const mainCategorySeed = require("./mainCategorySeed");
const itemSeed = require("./itemSeed");
const carItemSeed = require("./carItemSeed");
const orderStautsSeed = require("./orderStatusSeed");
const addressSeed = require("./addressSeed");
const orderSeed = require("./orderSeed");
const discountTypeSeed = require("./discountTypeSeed");
const discountSeed = require("./discountSeed");
const orderItemSeed = require("./orderItemSeed");
const promotionSeed = require("./promotionSeed");
const cartSeed = require("./cartSeed");
const cartItemSeed = require("./cartItemSeed");

async function seed() {
  await userSeed();
  await companySeed();
  await engineSeed();
  await carModelSeed();
  await carSeed();
  await statusSeed();
  await mainCategorySeed();
  await itemSeed();
  await carItemSeed();
  await addressSeed();
  await promotionSeed();
  await orderStautsSeed();
  await orderSeed();
  await orderItemSeed();
  await discountTypeSeed();
  await discountSeed();
  await cartSeed();
  await cartItemSeed();
}

seed();
