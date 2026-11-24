const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const env = require("./config/env");

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.frontendUrl,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Basic rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/api", apiLimiter);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FX-ALGO backend is running",
  });
});


module.exports = app;