import { Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/auth";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const clerkId = req.auth?.clerkId;

  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name, dob, country } = req.body;

  if (!name || !dob || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prisma.user.update({
    where: { clerkId },
    data: {
      name,
      dob: new Date(dob),
      country,
      profileComplete: true,
    },
  });

  res.json(user);
};
