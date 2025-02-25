import Story from "../../models/Story.js";

export default async function changeUniqStory(req, res) {
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
}
