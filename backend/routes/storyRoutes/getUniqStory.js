import Story from "../../models/Story.js";

export default function getUniqStory() {
  async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).json({ message: "Hikaye bulunamadı" });
      res.json(story);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
