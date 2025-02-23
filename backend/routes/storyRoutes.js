import express from "express";
import Story from "../models/Story.js";

const router = express.Router();

// Tüm hikayeleri al
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni bir hikaye ekle
router.post("/", async (req, res) => {
  const { title, content, choices } = req.body;

  try {
    const newStory = new Story({ title, content, choices });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tek bir hikayeyi getir
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Hikaye bulunamadı" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
