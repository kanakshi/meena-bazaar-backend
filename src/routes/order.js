const express = require("express");
const router = express.Router();
const Order = require("../modal/order");

router.get("/:id", async (req, res, next) => {
  const user_id = req.params.id;
  try {
    let data = await Order.find({ user_id: user_id }).lean();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Order.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Order deleted successfully !" });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
