import React, { useState } from "react";
import API from "../api";
import "./Documents.css";

function DocumentForm({ onUpload }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Veuillez vous connecter !");
        if (!title || !file) return alert("Veuillez remplir tous les champs obligatoires");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", user.id);
        formData.append("file", file);

        try {
            setLoading(true);
            await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Document ajouté avec succès !");
            onUpload();
            setTitle("");
            setContent("");
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l’envoi du document !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2>🧾 Ajouter ou Corriger un Document</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre du document"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Contenu du document (optionnel)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="file"
                    accept=".pdf,.docx,.jpg,.png"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Analyse et envoi..." : "📤 Envoyer"}
                </button>
            </form>
        </div>
    );
}

export default DocumentForm;
