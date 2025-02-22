import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Story {
    _id: string;
    title: string;
}

const Home: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/stories") // TODO 1: API URL'ini güncelle
            .then((response) => setStories(response.data))
            .catch((error) => console.error("Hikaye verisi alınamadı:", error));
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

export default Home;
