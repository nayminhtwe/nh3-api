const sequelize = require("../config/db");

// Models
const User = require("../models/User");
const Role = require("../models/Role");
const Company = require("../models/Company");
const Series = require("../models/Series");
const CarModel = require("../models/CarModel");
const Year = require("../models/Year");
const Engine = require("../models/Engine");
const Car = require("../models/Car");
const Item = require("../models/Item");
const MainCategory = require("../models/MainCategory");
const CarItem = require("../models/CarItem");
const ItemImage = require("../models/ItemImage");
const Address = require("../models/Address");
const OrderStatus = require("../models/OrderStatus");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const Promotion = require("../models/Promotion");
const Order = require("../models/Order");
const DiscountType = require("../models/DiscountType");
const Discount = require("../models/Discount");
const Slider = require("../models/Slider");
const Brand = require("../models/Brand");
const Otp = require("../models/Otp");

async function sync() {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables are created");
  } catch (e) {
    console.error("Error in sync: ", e);
    process.exit(1);
  }
}

sync();
