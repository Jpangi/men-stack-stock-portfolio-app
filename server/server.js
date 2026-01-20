// =======================
// ======= IMPORTS =======
// =======================
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");

// ===========================
// ======== MIDDLEWARE =======
// ===========================
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // if using cookies
  })
);
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api", stockRoutes);

// =======================================
// ====== DB CONNECTION========
// =======================================

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

let PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
