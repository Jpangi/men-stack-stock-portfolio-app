const express = require("express");
const router = express.Router();

const { getStock } = require("../controllers/stocks");

router.get("/:userId", getStock);

module.exports = router;
