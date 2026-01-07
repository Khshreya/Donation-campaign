import express from "express";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhooks.routes";

import profileRoutes from "./routes/profile.routes";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend is running fine" });
});


app.use(
  "/webhooks/clerk",
  express.raw({ type: "application/json" })
);
app.use("/api", profileRoutes);
app.use("/webhooks", webhookRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
