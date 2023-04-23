const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../modal/user");
const mongoose = require("mongoose");
const jws = require("jsonwebtoken");

const key = "password";
const algo = "aes256";
const jwtKey = "jwtKeyeeeeee";

router.post("/register-user", async (req, res, next) => {
  try {
    let cipher = crypto.createCipher(algo, key);
    let encrypted =
      cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex");
    let _user = await User.findOne({ email: req.body.email });
    if (_user) {
      return res.status(401).send("User already exist");
    }
    let user = new User({
      _id: mongoose.Types.ObjectId(),
      email: req.body.email,
      password: encrypted,
      isAdmin: req.body.isAdmin || false,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    let result = await user.save();

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/login-user", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({msg: "Invalid Login!"});
    }
    let decipher = crypto.createDecipher(algo, key);
    let decrypted =
      decipher.update(user.password, "hex", "utf8") + decipher.final("utf8");
    if (decrypted === req.body.password) {
      jws.sign({ user }, jwtKey, { expiresIn: "60000000s" }, (err, token) => {
        if (!err) {
          return res.status(200).send({
            token,
            user: {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.isAdmin ? "admin" : "user",
              _id: user._id,
            },
          });
        } else {
          throw err;
        }
      });
    } else {
      return res.status(401).send("Invailid Login");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
