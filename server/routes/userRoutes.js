const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/users");

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
