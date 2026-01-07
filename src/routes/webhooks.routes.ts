import { Router } from "express";
import { clerkWebhook } from "../webhooks/clerk.webhook";

const router = Router();

router.post("/clerk", clerkWebhook);

export default router;
