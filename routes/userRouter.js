const express = require("express");
// const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils.js");
const db = require("../db/db");
const User = db.users;
const Op = db.Sequelize.Op;

const userRouter = express.Router();
console.log(User);

userRouter.post("/register", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    try {
      const createdUser = await User.create(userData);
      console.log("user registered successfully");
      res.status(200).send({ message: "Registered  successfully" });
      return;
    } catch (err) {
      console.log(err);
    }
    return;
  }
  console.log("user already exists");
  res.status(401).send({ message: "user already exists." });

  // const user = await User.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  // });
  // if (!user) {
  //   const userData = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: bcrypt.hashSync(req.body.password, 8),
  //   });
  //   const createdUser = await User.create(userData);
  //   console.log("user registered successfully");
  //   res.status(200).send({ message: "Registered  successfully" });

  //   return;
  // }
  // console.log("user already exists");
  // res.status(401).send({ message: "user already exists." });
});

userRouter.post("/login", async (req, res) => {
  console.log(`Inside login router`);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //  console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          id: user.id,
          name: user.name,
          email: user.email,

          token: generateToken(user),
        });
        console.log(`user logged in`);
        return;
      }
      console.log("Invalid password");
      res.status(401).send({ message: "Invalid  password" });
      return;
    }
    res.status(401).send({ message: "Invalid email " });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = userRouter;

// export default userRouter;
