import React, { useState } from "react";
import API from "../api";
import "./DocumentForm.css";

function DocumentForm() {
    const [documents, setDocuments] = useState([]);
     const [file, setFile] = useState(null);
     const [title, setTitle] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("userId", user.id);

        try {
            const res = await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Document ajouté !");
            setDocuments([...documents, res.data]);
        } catch (error) {
            if (error.response?.status === 403) {
                alert("🚫 Limite freemium atteinte ! Passez au Premium pour continuer.");
            } else {
                alert("Erreur lors de l'upload du document !");
            }
        }
    };
    return (
        <div className="doc-form-container">
            <h2>📄 Nouveau Document</h2>
            <form onSubmit={handleSubmit} className="doc-form">
                <input
                    type="text"
                    placeholder="Titre du document"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />

                <button type="submit">📤 Créer le document</button>
            </form>
        </div>
    );
}

export default DocumentForm;
