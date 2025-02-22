import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  title: String,
  content: String,
  choices: [
    {
      text: String,
      nextStoryId: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("Story", storySchema);
