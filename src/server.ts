import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkWebhook } from "./webhooks/clerk.webhook";

dotenv.config();

const app = express();
app.use(cors());

// ✅ RAW BODY ONLY FOR WEBHOOK
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

// ❌ JSON parser AFTER webhook
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ status: "Backend is running fine" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
