import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StoryPage.css"; // CSS dosyasını import ediyoruz

interface Choice {
    text: string;
    nextStoryId: string;
}

interface Story {
    _id: string;
    title: string;
    content: string;
    choices: Choice[];
}

const StoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [story, setStory] = useState<Story | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5000/stories/${id}`)
            .then((res) => res.json())
            .then((data) => setStory(data))
            .catch((error) => console.error("Hikaye yüklenirken hata:", error));
    }, [id]);

    const handleChoiceClick = (nextStoryId: string) => {
        navigate(`/story/${nextStoryId}`);
    };

    if (!story) return <p>Hikaye yükleniyor...</p>;

    return (
        <div className="story-container">
            <h1 className="story-title">{story.title}</h1>
            <p className="story-content">{story.content}</p>
            <h2 className="choices-title">Seçenekler:</h2>
            <ul className="choices-list">
                {story.choices.map((choice, index) => (
                    <li key={index} className="choice-item">
                        <button className="choice-button" onClick={() => handleChoiceClick(choice.nextStoryId)}>
                            {choice.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoryPage;
