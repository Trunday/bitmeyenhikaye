import express from "express";
import registerPost from "./authRoutes/registerPost.js";
import loginPost from "./authRoutes/loginPost.js";

const router = express.Router();

// Kullanıcı Kaydı
router.post("/register", registerPost);

// Kullanıcı Girişi
router.post("/login", loginPost);

export default router;