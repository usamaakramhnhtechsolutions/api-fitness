const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
// const http = require('http');
// const jwt = require("jsonwebtoken");

// Import Routes
const authRoutes = require("./routes/authRoutes");
// Import communityRoutes
const postRoutes = require("./routes/CommunityRoutes");
// Import challengeRoutes
const challengeRoutes = require("./routes/challengeRoutes");
// Import mealRoutes
const mealRoutes = require("./routes/mealRoutes"); // Ensure the path is correct

dotenv.config();

const app = express(); // Corrected line

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(compression());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://usama1234567:usama1234567@usama.16lut.mongodb.net/?retryWrites=true&w=majority&appName=usama"; // Default URI for local MongoDB
// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Use the mealRoutes here
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/challenges", challengeRoutes);

// Error Handling for Routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Server
const PORT = process.env.PORT || 5001; // Default port is 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});