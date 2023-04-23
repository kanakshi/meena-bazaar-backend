const express = require("express");
const router = express.Router();
const Product = require("../modal/product");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    let data = await Product.find().lean();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get-by-id/:id", async (req, res, next) => {
  console.log(req.params);
  const {id} = req.params;
  try {
    let data = await Product.findById({_id: id}).lean();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const body = req.body;
    let product = new Product({
      _id: mongoose.Types.ObjectId(),
      title: body.title.trim(),
      description: body.description.trim(),
      image_url: body.image_url.trim(),
      price: body.price,
      quantity: body.quantity,
      type: body.type
    });
    console.log(product);
    let result = await product.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const body = req.body;
    let update = {
      title: body.title.trim(),
      description: body.description.trim(),
      image_url: body.image_url.trim(),
      price: body.price,
      quantity: body.quantity,
      type: body.type
    };
    let data = await Product.findByIdAndUpdate({ _id: body.id }, update, {
      new: true,
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
