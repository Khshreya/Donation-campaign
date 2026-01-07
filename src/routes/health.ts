import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "Backend is running fine" });
});

export default router;
