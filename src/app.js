require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");

const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");

// routers
const { usersRouter } = require("./routers/users");
const { companiesRouter } = require("./routers/companies");
const { enginesRouter } = require("./routers/engines");
const { seriesRouter } = require("./routers/series");
const { carModelsRouter } = require("./routers/carModels");
const { yearsRouter } = require("./routers/years");
const { carsRouter } = require("./routers/cars");
const { mainCategoriesRouter } = require("./routers/mainCategories");
const { secondCategoriesRouter } = require("./routers/secondCategories");
const { itemsRouter } = require("./routers/items");
const { carItemsRouter } = require("./routers/carItems");
const { itemImagesRouter } = require("./routers/itemImages");
const { addressesRouter } = require("./routers/addresses");
const { orderStatusesRouter } = require("./routers/orderStatus");
const { orderItemsRouter } = require("./routers/orderItems");
const { cartsRouter } = require("./routers/carts");
const { promotionsRouter } = require("./routers/promotions");
const { ordersRouter } = require("./routers/orders");
const { discountsRouter } = require("./routers/discounts");
const { discountTypesRouter } = require("./routers/discountTypes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan("dev"));

app.use(express.static("src/public"));

app.use("/api", usersRouter);
app.use("/api", companiesRouter);
app.use("/api", seriesRouter);
app.use("/api", carModelsRouter);
app.use("/api", yearsRouter);
app.use("/api", enginesRouter);
app.use("/api", carsRouter);
app.use("/api", mainCategoriesRouter);
app.use("/api", secondCategoriesRouter);
app.use("/api", itemsRouter);
app.use("/api", carItemsRouter);
app.use("/api", itemImagesRouter);
app.use("/api", addressesRouter);
app.use("/api", orderStatusesRouter);
app.use("/api", orderItemsRouter);
app.use("/api", cartsRouter);
app.use("/api", promotionsRouter);
app.use("/api", ordersRouter);
app.use("/api", discountTypesRouter);
app.use("/api", discountsRouter);

app.use(errorHandler);

module.exports = app;
