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
const { rolesRouter } = require("./routers/roles");
const { permissionsRouter } = require("./routers/permissions");
const { roleHasPermissionsRouter } = require("./routers/roleHasPermissions");
const { slidersRouter } = require("./routers/slider");
const { brandsRouter } = require("./routers/brands");

const auth = require("./middlewares/auth");
const rateLimit = require("express-rate-limit");
const { cartItemsRouter } = require("./routers/cartItems");
const { statusesRouter } = require("./routers/statuses");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 60,
  message: "Too many requests. Please try again a minute later.",
});

app.use(limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan("dev"));

app.use(express.static("src/public/images"));

// Apply routers
app.use("/api", rolesRouter);
app.use("/api", permissionsRouter);
app.use("/api", roleHasPermissionsRouter);
app.use("/api", usersRouter);
app.use("/api", companiesRouter);
app.use("/api", seriesRouter);
app.use("/api", carModelsRouter);
app.use("/api", yearsRouter);
app.use("/api", enginesRouter);
app.use("/api", carsRouter);
app.use("/api", mainCategoriesRouter);

app.use("/api/items", auth);
app.use("/api", itemsRouter); // Auth middleware
app.use("/api", statusesRouter); // Auth middleware

app.use("/api", carItemsRouter);
app.use("/api", itemImagesRouter);
app.use("/api", addressesRouter);
app.use("/api", orderStatusesRouter);
app.use("/api", orderItemsRouter);
app.use("/api", cartsRouter);
// app.use("/api", cartItemsRouter);
app.use("/api", promotionsRouter);
app.use("/api", ordersRouter);
app.use("/api", discountTypesRouter);
app.use("/api", discountsRouter);
app.use("/api", slidersRouter);
app.use("/api", brandsRouter);

app.use(errorHandler);

module.exports = app;
