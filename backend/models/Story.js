import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  nextStoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: false,
  }, // ObjectId olmalı!
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  choices: [choiceSchema], // Seçenekler için alt şema
});

const Story = mongoose.model("Story", storySchema);

export default Story;
