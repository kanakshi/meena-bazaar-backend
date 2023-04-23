const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: String,
  item_id: String,
  quantity: Number,
  name: String,
  image_url: String,
  price: Number
});

module.exports = mongoose.model("cart", Cart, "cart");
