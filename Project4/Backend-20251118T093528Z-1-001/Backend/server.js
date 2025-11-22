const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect");
require("dotenv").config();

// ROUTES
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");


const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// CONNECT DB
connectDB();

// ROUTES
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/seller", sellerRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// START SERVER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
