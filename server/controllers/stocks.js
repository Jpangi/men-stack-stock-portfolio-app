const express = require("express");
const axios = require("axios");
const Stock = require("../models/Stock"); // your Stock model
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const getStock = async (req, res) => {
  try {
    const userId = req.user._id; // or from auth middleware

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const userStocks = await Stock.find({ userId });
    if (userStocks.length === 0 || !userStocks) {
      return res.json({ message: "No stocks found", portfolio: [] });
    }

    const symbols = userStocks.map((s) => s.symbol);

    const stockDataPromises = symbols.map((symbol) =>
      axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol,
          apikey: ALPHA_VANTAGE_KEY,
        },
      })
    );

    const stockData = await Promise.all(stockDataPromises);

    const portfolio = userStocks.map((s) => {
      const stockInfo = stockData.find(
        (d) => d["Global Quote"]["01. symbol"] === s.symbol
      );
      return {
        ...s.toObject(),
        price: stockInfo ? stockInfo["05. price"] : null,
      };
    });

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

module.exports = { getStock };
