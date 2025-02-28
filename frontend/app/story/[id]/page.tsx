"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/styles/StoryPage.css";

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
    const router = useRouter();
    const params = useParams(); // useParams ile ID'yi al
    const [story, setStory] = useState<Story | null>(null);

    useEffect(() => {
        if (!params || !params.id) return; // Eğer params henüz yüklenmediyse bekle

        const fetchStory = async () => {
            try {
                const res = await fetch(`http://localhost:5000/stories/${params.id}`);
                const data = await res.json();
                setStory(data);
            } catch (error) {
                console.error("Hikaye yüklenirken hata:", error);
            }
        };

        fetchStory();
    }, [params]);

    const handleChoiceClick = (nextStoryId: string) => {
        router.push(`/story/${nextStoryId}`);
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
