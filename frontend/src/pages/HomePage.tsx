import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Story {
    _id: string;
    title: string;
}

const HomePage = () => {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/stories")
            .then((res) => res.json())
            .then((data) => setStories(data))
            .catch((error) => console.error("Hikayeleri çekerken hata:", error));
    }, []);

    return (
        <div>
            <h1>Bitmeyen Hikaye</h1>
            <ul>
                {stories.map((story) => (
                    <li key={story._id}>
                        <Link to={`/story/${story._id}`}>{story.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
