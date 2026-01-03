const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth"); //protects routes

const { getStock } = require("../controllers/stocks");

router.get("/:userId", requireAuth, getStock);

module.exports = router;
