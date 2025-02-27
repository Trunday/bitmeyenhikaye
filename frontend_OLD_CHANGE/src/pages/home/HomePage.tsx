import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // CSS dosyasını import ediyoruz

interface Story {
    _id: string;
    title: string;
}

const HomePage = () => {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/stories")
            .then((res) => res.json())
            .then((data) => setStories(data))
            .catch((error) => console.error("Hikayeleri çekerken hata:", error));
    }, []);

    return (
        <div className="homepage-container">
            <h1 className="homepage-title">Bitmeyen Hikaye</h1>
            <ul className="story-list">
                {stories.map((story) => (
                    <li key={story._id} className="story-item">
                        <Link to={`/story/${story._id}`} className="story-link">{story.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
