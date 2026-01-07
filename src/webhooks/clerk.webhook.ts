import { Request, Response } from "express";
import { Webhook } from "svix";
import prisma from "../prisma";

export const clerkWebhook = async (req: Request, res: Response) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "Missing CLERK_WEBHOOK_SECRET" });
  }

  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  const payload = req.body.toString(); // 👈 VERY IMPORTANT

  const wh = new Webhook(secret);

  let event: any;

  try {
    event = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      },
    });
  }

  return res.status(200).json({ received: true });
};
