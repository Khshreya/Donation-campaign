import { Router } from "express";
import { createCampaign } from "../controllers/campaign.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/campaigns", requireAuth, createCampaign);

export default router;
