import { useState, useEffect } from "react";
import "./AdminPage.css"; // CSS dosyasını import ediyoruz

// Hikaye veri tipi
interface Story {
    _id: string;
    title: string;
    content: string;
    choices: { text: string; nextStoryId: string }[];
}

const AdminPage = () => {
    const [tab, setTab] = useState<"add" | "edit">("add"); // Sekme yönetimi
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [choices, setChoices] = useState([{ text: "", nextStoryId: "" }]);
    const [stories, setStories] = useState<Story[]>([]);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    // Hikayeleri çek
    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const response = await fetch("http://localhost:5000/stories");
            const data = await response.json();
            setStories(data);
        } catch (error) {
            console.error("Hikayeleri yüklerken hata oluştu:", error);
        }
    };

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

        const response = await fetch("http://localhost:5000/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStory),
        });

        if (response.ok) {
            alert("Hikaye eklendi!");
            setTitle("");
            setContent("");
            setChoices([{ text: "", nextStoryId: "" }]);
            fetchStories();
        } else {
            alert("Hata oluştu!");
        }
    };

    const handleEditClick = (story: Story) => {
        setSelectedStory(story);
        setTab("edit");
    };

    const handleUpdate = async () => {
        if (!selectedStory) return;

        const response = await fetch(`http://localhost:5000/stories/${selectedStory._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedStory),
        });

        if (response.ok) {
            alert("Hikaye güncellendi!");
            fetchStories();
            setSelectedStory(null);
            setTab("add");
        } else {
            alert("Güncelleme başarısız!");
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Paneli</h1>

            {/* Sekme butonları */}
            <div className="tab-buttons">
                <button className={`tab-button ${tab === "add" ? "active" : ""}`} onClick={() => setTab("add")}>Yeni Hikaye Ekle</button>
                <button className={`tab-button ${tab === "edit" ? "active" : ""}`} onClick={() => setTab("edit")}>Hikayeleri Düzenle</button>
            </div>

            {/* Yeni Hikaye Ekleme Bölümü */}
            {tab === "add" && (
                <div className="add-story">
                    <h2>Yeni Hikaye Ekle</h2>
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
                            <div key={index} className="choice-input">
                                <input
                                    type="text"
                                    placeholder="Seçenek Metni"
                                    value={choice.text}
                                    onChange={(e) => handleChoiceChange(index, "text", e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Sonraki Hikaye ID"
                                    value={choice.nextStoryId}
                                    onChange={(e) => handleChoiceChange(index, "nextStoryId", e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddChoice}>
                            Yeni Seçenek Ekle
                        </button>
                        <button type="submit">Hikayeyi Kaydet</button>
                    </form>
                </div>
            )}

            {/* Hikaye Düzenleme Bölümü */}
            {tab === "edit" && (
                <div className="edit-story">
                    <h2>Hikayeleri Düzenle</h2>
                    {stories.length > 0 ? (
                        <ul className="story-list">
                            {stories.map((story) => (
                                <li key={story._id} className="story-item">
                                    {story.title}
                                    <button className="edit-button" onClick={() => handleEditClick(story)}>Düzenle</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Henüz hikaye yok.</p>
                    )}

                    {/* Düzenleme Formu */}
                    {selectedStory && (
                        <div className="update-story">
                            <h3>Hikaye Güncelle</h3>
                            <input
                                type="text"
                                value={selectedStory.title}
                                onChange={(e) => setSelectedStory({ ...selectedStory, title: e.target.value })}
                            />
                            <textarea
                                value={selectedStory.content}
                                onChange={(e) => setSelectedStory({ ...selectedStory, content: e.target.value })}
                            />
                            <button onClick={handleUpdate}>Güncelle</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
