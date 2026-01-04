import React, { useEffect, useState } from "react";
import API from "../api";
import "./Documents.css";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("");

    const loadDocs = async () => {
        try {
            const res = await API.get(`/documents/list/${user.id}`);
            setDocuments(res.data);
        } catch (err) {
            console.error("Erreur chargement documents :", err);
        }
    };

    useEffect(() => {
        if (user) loadDocs();
    }, [user]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title) return alert("Titre et fichier obligatoires !");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("userId", user.id);

        try {
            const res = await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Document ajouté !");
            setDocuments([res.data, ...documents]);
            setTitle("");
            setFile(null);
        } catch (err) {
            if (err.response?.status === 403) {
                alert("🚫 Limite freemium atteinte ! Passez au Premium.");
            } else {
                alert("Erreur lors de l'upload !");
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce document ?")) return;
        try {
            await API.delete(`/documents/delete/${id}`);
            setDocuments(documents.filter((d) => d.id !== id));
        } catch (err) {
            console.error("Erreur suppression :", err);
        }
    };

    const handleDownload = (doc) => {
        const blob = new Blob([doc.file], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${doc.title}.pdf`;
        link.click();
    };

    // Filtrer documents
    const filteredDocs = documents.filter((d) =>
        d.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="dashboard-docs-container">
            <h2>📂 Mes Documents</h2>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="doc-upload-form">
                <input
                    type="text"
                    placeholder="Titre du document"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">📤 Ajouter</button>
            </form>

            {/* Filtre */}
            <input
                type="text"
                placeholder="🔍 Filtrer par titre..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="doc-filter"
            />

            {/* Liste documents */}
            <div className="doc-grid">
                {filteredDocs.length === 0 && <p>Aucun document trouvé.</p>}

                {filteredDocs.map((doc) => (
                    <div key={doc.id} className="doc-card">
                        <h3>{doc.title}</h3>
                        <p>{doc.content || "Aucun contenu"}</p>
                        <small>Créé le : {new Date(doc.createdAt).toLocaleString()}</small>
                        <div className="doc-card-buttons">
                            <button onClick={() => handleDownload(doc)}>📥 Télécharger</button>
                            <button onClick={() => handleDelete(doc.id)}>🗑 Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
