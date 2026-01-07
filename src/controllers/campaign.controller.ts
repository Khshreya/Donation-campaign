
import prisma from "../prisma";
import { Request, Response } from "express";

import { AuthRequest } from "../middleware/auth";

export const createCampaign = async (req: AuthRequest, res: Response) => {
  const clerkId = req.auth?.clerkId;

  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, description, goalAmount, imageUrl } = req.body;

  if (!title || !description || !goalAmount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const campaign = await prisma.campaign.create({
    data: {
      title,
      description,
      goalAmount,
      imageUrl,
      creatorId: user.id,
    },
  });

  res.status(201).json(campaign);
};
export const getAllCampaigns = async (req: Request, res: Response) => {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
          country: true,
        },
      },
    },
  });

  res.json(campaigns);
};

