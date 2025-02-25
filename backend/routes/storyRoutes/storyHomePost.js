import mongoose from "mongoose";
import Story from "../../models/Story";

export default function StoryHomePost() {
  async (req, res) => {
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
  };
}
