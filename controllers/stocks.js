// // Routes for stocks

/* ===================================
  ////////////  IMPORTS /////////////
 =================================== */
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const isSignedIn = require("../middleware/is-signed-in");

/* ===================================
  ////////////  ROUTES /////////////
 =================================== */
//  GET - grabs all of the stocks from a user
router.get("/", isSignedIn, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  res.render("users/show.ejs", { user: currentUser });
});
//  GET - grabs add stocks form
router.get("/new", isSignedIn, async (req, res) => {
  console.log(req.session.user);
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.send("User not found!");
    res.render("new", { user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error loading form.");
  }
});
//  GET - grabs edit form for stocks
router.get("/:stockId/edit", isSignedIn, async (req, res) => {
  console.log(req.session.user);
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.send("User not found!");
    const stock = user.stocks.id(req.params.stockId);
    if (!stock) return res.status(404).send("Stock not found");

    res.render("edit.ejs", { stock, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error loading form.");
  }
});
//  CREATE -  adds stocks from the form
router.post("/", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.send("User not found!");
    currentUser.stocks.push(req.body);
    await currentUser.save();
    res.redirect("/stocks");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error adding stock.");
  }
});

//  DELETE -  removes stocks from the list
router.delete("/:stockId", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.send("User not found!");
    await currentUser.stocks.id(req.params.stockId).deleteOne();
    await currentUser.save();
    res.redirect("/stocks");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error deleting stock.");
  }
});

//  UPDATE -  edits a stocks from the list
router.put("/:stockId", isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.send("User not found!");
    const stock = currentUser.stocks.id(req.params.stockId);
    if (!stock) return res.status(404).send("Stock not found");
    stock.set(req.body)
    await currentUser.save();
    res.redirect("/stocks");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error updating stock.");
  }
});

module.exports = router;
