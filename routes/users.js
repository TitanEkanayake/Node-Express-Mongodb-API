const express = require("express");
const router = express.Router();
const User = require("../models/user");

// getting all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// getting one
router.get("/:id", getuser, (req, res) => {
  res.json(res.user);
});
//creating one
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// updating one
router.patch("/:id", getuser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.description != null) {
    res.user.description = req.body.description;
  }
  try {
    const updateduser = await res.user.save();
    res.json(updateduser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// deleting one
router.delete("/:id", getuser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getuser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find the user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}
module.exports = router;
