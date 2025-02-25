import { useState } from "react";

interface Story {
    _id: string;
    title: string;
    content: string;
}

const EditStoryForm = ({ story }: { story: Story }) => {
    const [title, setTitle] = useState(story.title);
    const [content, setContent] = useState(story.content);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedStory = { title, content };

        try {
            const response = await fetch(`http://localhost:5000/api/stories/${story._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedStory),
            });

            if (!response.ok) {
                throw new Error("Hikaye güncellenemedi");
            }

            alert("Hikaye başarıyla güncellendi!");
        } catch (error) {
            console.error("Güncelleme hatası:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Başlık:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>İçerik:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />

            <button type="submit">Güncelle</button>
        </form>
    );
};

export default EditStoryForm;
