const mongoose = require("mongoose");

const PortfolioSnapshotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔹 ADD INDEX HERE (after schema definition)
PortfolioSnapshotSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("PortfolioSnapshot", PortfolioSnapshotSchema);
