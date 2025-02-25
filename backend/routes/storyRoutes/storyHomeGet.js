import Story from "../../models/Story.js";

export default function StoryHomeGet() {
  async (req, res) => {
    try {
      const stories = await Story.find();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
