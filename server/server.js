// =======================
// ======= IMPORTS =======
// =======================
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("../server/routes/stockRoutes");
const requireAuth = require("./middleware/auth"); //protects routes

// ===========================
// ======== MIDDLEWARE =======
// ===========================
app.use(express.json());

// app.use(
//   cors({
//     origin: "https://grounds-for-debate.onrender.com", // exact frontend URL
//     credentials: true,
//   })
// );
app.use("/users", userRoutes);
app.use("/api/stocks", stockRoutes);

// ===========================
// ====== DB CONNECTION ======
// ===========================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

let PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
