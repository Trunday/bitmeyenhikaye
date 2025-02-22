import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Story {
    title: string;
    content: string;
    choices: { text: string; nextStoryId: string }[];
}

const Story: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [story, setStory] = useState<Story | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/stories/${id}`) // TODO 1: API URL'ini güncelle
            .then((response) => setStory(response.data))
            .catch((error) => console.error("Hikaye verisi alınamadı:", error));
    }, [id]);

    return (
        <div>
            {story ? (
                <>
                    <h1>{story.title}</h1>
                    <p>{story.content}</p>
                    {story.choices.map((choice, index) => (
                        <button key={index} onClick={() => window.location.href = `/story/${choice.nextStoryId}`}>
                            {choice.text}
                        </button>
                    ))}
                </>
            ) : (
                <p>Hikaye yükleniyor...</p>
            )}
        </div>
    );
};

export default Story;
