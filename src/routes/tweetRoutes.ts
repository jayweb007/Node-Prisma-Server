import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//creating CRUD

//Creating tweet
router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;

  try {
    const result = await prisma.tweet.create({
      data: { content, image, userId },
    });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e });
    // res.status(400).json(e);
  }
});

//get all tweets
router.get("/", async (req, res) => {
  const tweets = await prisma.tweet.findMany();
  res.status(200).json(tweets);
});

//get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await prisma.tweet.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(tweet);
  } catch (error) {
    res.status(404).json({ error: "Tweet not Found!" });
  }
});

//update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, content, image, impression } = req.body;

  try {
    const tweetUpdated = await prisma.tweet.update({
      where: {
        id: Number(id),
      },
      data: { userId, content, image, impression },
    });
    res.status(200).json(tweetUpdated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the Tweet" });
  }
});

//delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tweet.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: `${id} Tweet deleted successfully!` });
  } catch (e) {
    res.status(404).json({ error: `${id} Tweet to delete does not exist` });
  }
});

export default router;
