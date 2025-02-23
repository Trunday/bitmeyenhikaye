import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Hikaye başlığı
  content: { type: String, required: true }, // Hikaye içeriği
  choices: [
    {
      text: { type: String, required: true }, // Kullanıcının seçeneği
      nextStoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" }, // Seçime göre devam edecek hikaye
    },
  ],
});

export default mongoose.model("Story", StorySchema);
