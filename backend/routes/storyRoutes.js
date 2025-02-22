import express from "express";
import Story from "../models/Story.js";

const router = express.Router();

// Tüm hikayeleri getir
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Hikayeler alınırken hata oluştu" });
  }
});

// Tek bir hikayeyi getir
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (err) {
    res.status(404).json({ error: "Hikaye bulunamadı" });
  }
});

export default router;
