const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  // Stock model (MongoDB)

  userId: ObjectId,
  symbol: String, // e.g., "AAPL"
  shares: Number,
  purchasePrice: Number,
});

const Stock = mongoose.model("stock", stockSchema);

module.exports = Stock;
