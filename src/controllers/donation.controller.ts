import { Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/auth";

export const createDonation = async (req: AuthRequest, res: Response) => {
  const clerkId = req.auth?.clerkId;

  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { campaignId, amount, note } = req.body;

  if (!campaignId || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  const donation = await prisma.donation.create({
    data: {
      amount,
      note,
      donorId: user.id,
      campaignId,
    },
  });

  res.status(201).json(donation);
};
