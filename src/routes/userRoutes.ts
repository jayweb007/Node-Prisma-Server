import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();

//creating CRUD

//Creating user
router.post("/", async (req, res) => {
  const { email, name, username } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
      },
    });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: "Email or Username exist" });
    // res.status(400).json(e);
  }
});

//get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

//get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "User not Found!" });
  }
});

//update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;

  try {
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: { bio, name, image },
    });
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the User" });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: `${id} User deleted successfully!` });
  } catch (e) {
    res.status(404).json({ error: `${id} User to delete does not exist` });
  }
});

export default router;
