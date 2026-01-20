const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },
    shares: {
      type: Number,
      required: true,
    },
    avgBuyPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("Stock", stockSchema);
