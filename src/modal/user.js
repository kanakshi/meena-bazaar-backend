const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  isAdmin: Boolean,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("user", User, "user");
