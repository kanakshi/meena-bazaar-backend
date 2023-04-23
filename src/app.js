const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb+srv://kanakshinde110:Mili%40123@cluster0.xtitxmx.mongodb.net/meena-bazaar?retryWrites=true&w=majority")
  .then(() => console.log("Connected to meenabazaar database"));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/meenabazaar")
//   .then(() => console.log("Connected to meenabazaar database local"));

app.use("/auth", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

module.exports = app;
