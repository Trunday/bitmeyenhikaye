import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        <div>
            <h1>{story.title}</h1>
            <p>{story.content}</p>
            <h2>Seçenekler:</h2>
            <ul>
                {story.choices.map((choice, index) => (
                    <li key={index}>
                        <button onClick={() => handleChoiceClick(choice.nextStoryId)}>
                            {choice.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoryPage;
