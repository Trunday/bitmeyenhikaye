import express from "express";
import StoryHomeGet from "./storyRoutes/storyHomeGet.js";
import StoryHomePost from "./storyRoutes/storyHomePost.js";
import getUniqStory from "./storyRoutes/getUniqStory.js";
import changeUniqStory from "./storyRoutes/changeUniqStory.js";

const router = express.Router();

// Tüm hikayeleri al
router.get("/", StoryHomeGet);

// Yeni bir hikaye ekle
router.post("/", StoryHomePost);

// Tek bir hikayeyi getir
router.get("/:id", getUniqStory);

// 📌 Hikaye Güncelleme Endpoint'i
router.put("/:id", changeUniqStory);

export default router;
