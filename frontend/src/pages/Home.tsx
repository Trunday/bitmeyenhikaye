import { Link } from "react-router-dom";

const Home: React.FC = () => {
    // Örnek hikaye listesi
    const stories = [
        { id: 1, title: "Kayıp Prens" },
        { id: 2, title: "Gizemli Orman" },
        { id: 3, title: "Sihirli Şato" },
        { id: 4, title: "Karanlık Mağara" },
        { id: 5, title: "Denizler Altında" },
        { id: 6, title: "Uzay Macerası" },
    ];

    return (
        <div>
            <h1>Bitmeyen Hikaye</h1>
            <ul>
                {stories.map((story) => (
                    <li key={story.id}>
                        <Link to={`/story/${story.id}`}>{story.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
