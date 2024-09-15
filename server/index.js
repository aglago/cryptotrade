import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron"; // Using node-cron for scheduling
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React app's origin
    methods: ["GET"], // Allow only GET requests
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define Ticker Schema
const tickerSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

// Create Ticker Model
const Ticker = mongoose.model("Ticker", tickerSchema);

// Fetch and upsert tickers
const fetchAndStoreTickers = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Extract top 10 tickers from the response
    const tickers = Object.values(response.data).slice(0, 10);

    // Loop through each ticker and upsert the data into MongoDB
    for (const ticker of tickers) {
      await Ticker.findOneAndUpdate(
        { name: ticker.name }, // Find by name
        {
          last: parseFloat(ticker.last), // Last traded price
          buy: parseFloat(ticker.buy), // Buy price
          sell: parseFloat(ticker.sell), // Sell price
          volume: parseFloat(ticker.volume), // Volume
          base_unit: ticker.base_unit, // Base unit
        },
        { upsert: true, new: true } // Update if exists, insert if not
      );
    }
    console.log("Top 10 tickers updated successfully.");
  } catch (error) {
    console.error("Error fetching tickers:", error);
  }
};

// Run fetchAndStoreTickers at regular intervals (e.g., every minute)
cron.schedule("*/1 * * * *", () => {
  console.log("Fetching latest tickers...");
  fetchAndStoreTickers();
});

// Express route to retrieve data
app.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickers from database" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
