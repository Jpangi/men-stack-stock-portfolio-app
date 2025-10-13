const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const isSignedIn = require("../middleware/is-signed-in");


// GET /:userId - Show user profile/dashboard
router.get("/:userId", isSignedIn, async (req, res) => {
  try {
    // Make sure user can only see their own profile
    if (req.session.user._id !== req.params.userId) {
      return res.status(403).send("Unauthorized");
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("users/index", { user });
  } catch (error) {
    res.status(500).send("Error loading user profile");
  }
});

module.exports = router;