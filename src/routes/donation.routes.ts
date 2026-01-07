import { Router } from "express";
import { createDonation } from "../controllers/donation.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/donations", requireAuth, createDonation);

export default router;
