import { useParams } from "react-router-dom";

const Story: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Hikaye #{id}</h1>
            <p>Burada hikaye içeriği olacak...</p>
            <button>Seçenek 1</button>
            <button>Seçenek 2</button>
        </div>
    );
};

export default Story;
