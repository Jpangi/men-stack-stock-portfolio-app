//controllers/auth.js

/* ===================================
  ////////////  IMPORTS /////////////
 =================================== */
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

/* ===================================
  ////////////  ROUTES /////////////
 =================================== */
//  GET - grabs sign up form
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});
//  GET - grabs sign in form
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});
// POST - adds new account to user model
router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  const emailInDatabase = await User.findOne({ email: req.body.email });
  try {
    if (userInDatabase) {
      return res.send("Username already taken");
    }
    if (emailInDatabase) {
      return res.send("email is already taken");
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and confirm password must match");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    // validation logic

    const user = await User.create(req.body);
    res.redirect("/auth/sign-in");
  } catch (error) {
    res.send(`Error: ${error}`)
  }
});


// POST - adds new account to user model
router.post("/sign-in", async (req, res) => {
  // First, get the user from the database
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  // There is a user! Time to test their password with bcrypt
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }
  console.log( req.session);
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  };

  res.redirect(`/users/${userInDatabase._id}`);
});

//this is the route that logs the user out
router.get('/logout', (req, res) => {
    req.session.destroy(err => { //the req.session.destroy is what 'destroys the session'
        res.redirect('/user/login')
    })
});

module.exports = router;
