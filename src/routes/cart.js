const express = require("express");
const router = express.Router();
const Cart = require("../modal/cart");
const Order = require("../modal/order");
const mongoose = require("mongoose");

router.get("/:id", async (req, res, next) => {
  const user_id = req.params.id;
  try {
    let data = await Cart.find({ user_id: user_id }).lean();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const body = req.body;
    let item = new Cart({
      _id: mongoose.Types.ObjectId(),
      image_url: body.image_url.trim(),
      quantity: body.quantity,
      user_id: body.user_id.trim(),
      item_id: body.item_id.trim(),
      name: body.name.trim(),
      price: body.price,
    });
    let result = await item.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const body = req.body;
    let data = await Cart.findByIdAndUpdate(
      { _id: body.id },
      { $set: { quantity: body.quantity } },
      {
        new: true,
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Cart.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Item deleted successfully !" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/checkout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    let data = await Cart.find({ user_id: id }).lean();
    let order = new Order({
      _id: mongoose.Types.ObjectId(),
      user_id: id,
      address: body.address,
      items: data,
    });
    await order.save();
    await Cart.deleteMany({ user_id: id });
    return res.status(200).json({ msg: "Order placed successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
