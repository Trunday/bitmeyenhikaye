import express from "express";
import mongoose from "mongoose";
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
  try {
    // Gelen veriyi al
    const { title, content, choices } = req.body;

    // nextStoryId değerlerini ObjectId'ye çevir
    const updatedChoices = choices.map((choice) => ({
      text: choice.text,
      nextStoryId: mongoose.Types.ObjectId.isValid(choice.nextStoryId)
        ? new mongoose.Types.ObjectId(choice.nextStoryId)
        : null, // Eğer geçerli bir ObjectId değilse null yap
    }));

    // Yeni hikaye oluştur
    const newStory = new Story({
      title,
      content,
      choices: updatedChoices,
    });

    // Veritabanına kaydet
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

// 📌 Hikaye Güncelleme Endpoint'i
router.put("/:id", async (req, res) => {
  try {
    const { title, content, choices } = req.body;
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { title, content, choices },
      { new: true, runValidators: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Hikaye bulunamadı" });
    }

    res.json(updatedStory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hikaye güncellenirken hata oluştu", error });
  }
});

export default router;
