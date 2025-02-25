import { useState, useEffect } from "react";
import EditStoryForm from "./EditStoryForm";

interface Story {
    _id: string;
    title: string;
    content: string;
}

const AdminPanel: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/stories")
            .then((res) => res.json())
            .then((data) => setStories(data))
            .catch((err) => console.error("Hikayeler yüklenirken hata oluştu:", err));
    }, []);

    const handleEditClick = (story: Story) => {
        setSelectedStory(story);
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <ul>
                {stories.map((story) => (
                    <li key={story._id}>
                        {story.title}
                        <button onClick={() => handleEditClick(story)}>Düzenle</button>
                    </li>
                ))}
            </ul>

            {selectedStory && <EditStoryForm story={selectedStory} />}
        </div>
    );
};

export default AdminPanel;
