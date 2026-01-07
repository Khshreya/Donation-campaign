import { Router } from "express";
import { updateProfile } from "../controllers/profile.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/profile", requireAuth, updateProfile);

export default router;
