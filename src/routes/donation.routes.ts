import { Router } from "express";
import {
  createDonation,
  getDonationsByCampaign,
} from "../controllers/donation.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/donations", requireAuth, createDonation);
router.get("/campaigns/:id/donations", getDonationsByCampaign);

export default router;
