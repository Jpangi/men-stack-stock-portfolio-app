const axios = require("axios");
const Stock = require("../models/stocks");
const PortfolioSnapshot = require("../models/portfolioSnapshot");

// GET /api/stock-quote?symbol=AAPL

// const fetchStockQuote = async (req, res) => {
//   if (!query.trim()) return;
//   setLoading(true);
//   try {
//     const { symbol } = req.query;
//     if (!symbol) return res.status(400).json({ message: "Symbol required" });

//     const res = await axios.get("https://www.alphavantage.co/query", {
//       params: {
//         function: "GLOBAL_QUOTE",
//         symbol,
//         apikey: process.env.ALPHA_VANTAGE_API_KEY,
//       },
//     });

//     const quote = data["Global Quote"];
//     if (!quote || Object.keys(quote).length === 0)
//       return res.status(404).json({ message: "Symbol not found" });

//     res.json({
//       symbol: quote["01. symbol"],
//       currentPrice: Number(quote["05. price"]),
//       changePercent: quote["10. change percent"],
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch quote", error: err.message });
//   }
// };

// POST /api/addStock
const addStock = async (req, res) => {
  try {
    const { symbol, shares, avgBuyPrice, currentPrice } = req.body;
    const userId = req.user._id;

    if (!symbol || !shares || !avgBuyPrice || !currentPrice) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Stock.findOne({ symbol, userId });
    if (existing)
      return res.status(409).json({ message: "Stock already added" });

    const stock = await Stock.create({
      symbol,
      shares,
      avgBuyPrice,
      currentPrice,
      userId,
      lastUpdated: new Date(),
    });

    res.status(201).json({ stock });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add stock", error: err.message });
  }
};

const userStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user._id });
    res.status(200).json({ message: "success", stocks });
    if (!stocks) return res.json({ message: "stock list not found" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "could not get stocks", error: error.message });
  }
};

const singleStock = async (req, res) => {
  try {
    const foundStock = await Stock.findById(req.params.stockId);
    if (!foundStock)
      return res
        .status(400)
        .json({ message: "Stock not found", error: error.message });
    res.status(200).json({ message: "found stock", foundStock });
  } catch (error) {
    res
      .status(200)
      .json({ message: " error finding single stock", error: error.message });
  }
};
//function to update stock price
const refreshStock = async (req, res) => {
  try {
    const { stockId } = req.params;

    // 1️⃣ Find stock & ensure ownership
    const stock = await Stock.findOne({
      _id: stockId,
      userId: req.user._id,
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // 2️⃣ Fetch latest price
    const quote = await fetchStockQuote(stock.symbol);

    // 3️⃣ Update price
    const updatedStock = await Stock.findByIdAndUpdate(
      stockId,
      {
        currentPrice: quote.currentPrice,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Stock price refreshed",
      stock: updatedStock,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to refresh stock",
      error: error.message,
    });
  }
};

const removeStock = async (req, res) => {
  try {
    const deleteStock = await Stock.findByIdAndDelete(
      req.params.stockId,
      req.body
    );
    res.status(200).json(deleteStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const dashboardUpdate = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const stocks = await Stock.find({ userId });

    const totalValue = stocks.reduce(
      (sum, stock) => sum + stock.shares * stock.currentPrice,
      0
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize date

    await PortfolioSnapshot.findOneAndUpdate(
      { userId, date: today },
      { totalValue },
      { upsert: true, new: true }
    );

    res.json({ success: true, totalValue });
  } catch (error) {
    console.error("Dashboard update error:", error);
    res.status(500).json({ error: "Failed to update dashboard" });
  }
};

module.exports = {
  addStock,
  userStocks,
  singleStock,
  removeStock,
  refreshStock,
  dashboardUpdate,
};
