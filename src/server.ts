import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running fine" });
});
app.post("/test", (req, res) => {
  const data = req.body;
  res.json({
    message: "Received data successfully",
    data: data,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
