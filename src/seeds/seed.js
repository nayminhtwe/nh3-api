const carItemSeed = require("./carItemSeed");
const carModelSeed = require("./carModelSeed");
const carSeed = require("./carSeed");
const cartSeed = require("./cartSeed");
const companySeed = require("./companySeed");
const engineSeed = require("./engineSeed");
const itemSeed = require("./itemSeed");
const mainCategorySeed = require("./mainCategorySeed");
const secondCategorySeed = require("./secondCategorySeed");
const serieSeed = require("./serieSeed");
const userSeed = require("./userSeed");
const yearSeed = require("./yearSeed");

async function seed() {
  userSeed();

  companySeed();

  serieSeed();

  carModelSeed();

  yearSeed();

  engineSeed();

  carSeed();

  mainCategorySeed();

  secondCategorySeed();

  itemSeed();

  carItemSeed();

  cartSeed();
}

seed();
