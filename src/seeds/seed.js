const addressSeed = require("./addressSeed");
const carItemSeed = require("./carItemSeed");
const carModelSeed = require("./carModelSeed");
const carSeed = require("./carSeed");
const cartSeed = require("./cartSeed");
const companySeed = require("./companySeed");
const discountSeed = require("./discountSeed");
const discountTypeSeed = require("./discountTypeSeed");
const engineSeed = require("./engineSeed");
const itemSeed = require("./itemSeed");
const mainCategorySeed = require("./mainCategorySeed");
const orderItemSeed = require("./orderItemSeed");
const orderSeed = require("./orderSeed");
const orderStatusSeed = require("./orderStatusSeed");
const promotionSeed = require("./promotionSeed");
const roleSeed = require("./roleSeed");
const secondCategorySeed = require("./secondCategorySeed");
const serieSeed = require("./serieSeed");
const userSeed = require("./userSeed");
const yearSeed = require("./yearSeed");

async function seed() {
  await roleSeed();

  await userSeed();

  await serieSeed();

  await yearSeed();

  await companySeed();

  await carModelSeed();

  await engineSeed();

  await carSeed();

  await mainCategorySeed();

  await secondCategorySeed();

  await itemSeed();

  await carItemSeed();

  await cartSeed();

  await addressSeed();

  await promotionSeed();

  await orderStatusSeed();

  await orderItemSeed();

  await orderSeed();

  await discountTypeSeed();

  await discountSeed();
}

seed();
