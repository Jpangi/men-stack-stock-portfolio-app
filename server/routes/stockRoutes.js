const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  addStock,
  userStocks,
  singleStock,
  removeStock,
} = require("../controllers/stocks");

// Add a stock to user's portfolio
router.post("/addStock", requireAuth, addStock);
// Get all stocks from a user's portfolio
router.get("/user-stocks", requireAuth, userStocks);
// Get one stocks from a user's portfolio
router.get("/:stockId", requireAuth, singleStock);
router.delete("/:stockId", requireAuth, removeStock);

module.exports = router;
