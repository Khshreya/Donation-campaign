import { Router } from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../controllers/campaign.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/campaigns", getAllCampaigns);             
router.get("/campaigns/:id", getCampaignById);          
router.post("/campaigns", requireAuth, createCampaign); 

export default router;
