import { useState } from "react";

const AdminPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [choices, setChoices] = useState([{ text: "", nextStoryId: "" }]);

    const handleAddChoice = () => {
        setChoices([...choices, { text: "", nextStoryId: "" }]);
    };

    const handleChoiceChange = (index: number, field: string, value: string) => {
        const newChoices = [...choices];
        newChoices[index] = { ...newChoices[index], [field]: value };
        setChoices(newChoices);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newStory = { title, content, choices };

        const response = await fetch("http://localhost:5000/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStory),
        });

        if (response.ok) {
            alert("Hikaye eklendi!");
            setTitle("");
            setContent("");
            setChoices([{ text: "", nextStoryId: "" }]);
        } else {
            alert("Hata oluştu!");
        }
    };

    return (
        <div>
            <h2>Hikaye Ekle</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Başlık"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Hikaye İçeriği"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <h4>Seçenekler:</h4>
                {choices.map((choice, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Seçenek Metni"
                            value={choice.text}
                            onChange={(e) =>
                                handleChoiceChange(index, "text", e.target.value)
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sonraki Hikaye ID"
                            value={choice.nextStoryId}
                            onChange={(e) =>
                                handleChoiceChange(index, "nextStoryId", e.target.value)
                            }
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddChoice}>
                    Yeni Seçenek Ekle
                </button>
                <button type="submit">Hikayeyi Kaydet</button>
            </form>
        </div>
    );
};

export default AdminPage;
