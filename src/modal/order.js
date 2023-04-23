const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: String,
  address: String,
  items : [],
});

module.exports = mongoose.model("order", Order, "order");
