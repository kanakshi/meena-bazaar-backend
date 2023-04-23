const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  image_url: String,
  price: Number,
  quantity: Number,
  type: String,
});

module.exports = mongoose.model("product", Product, "product");
