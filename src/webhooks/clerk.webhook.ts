import { Webhook } from "svix";
import { Request, Response } from "express";
import prisma from "../prisma";

export const clerkWebhook = async (req: Request, res: Response) => {
  const payload = req.body;
  const headers = req.headers;

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  const wh = new Webhook(webhookSecret);

  let event: any;

  try {
    event = wh.verify(
      JSON.stringify(payload),
      headers as any
    );
  } catch (err) {
    return res.status(400).json({ message: "Invalid webhook" });
  }

  // We only care about user.created
  if (event.type === "user.created") {
    const { id, email_addresses } = event.data;

    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      return res.status(200).json({ message: "No email, skipped" });
    }

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email,
        profileComplete: false,
      },
    });
  }

  res.json({ success: true });
};
