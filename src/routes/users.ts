import { Router } from "express";
import prisma from "../prisma";

const router = Router();

// Create a user
router.post("/users", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default router;
