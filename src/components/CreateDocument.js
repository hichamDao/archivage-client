import React, { useState } from "react";
import API from "../api";

function CreateDocument() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>📄 Créer un document</h2>
            <form onSubmit={handleUpload}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Titre du document"
                    required
                    style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
                /><br />
                <input type="file" onChange={e => setFile(e.target.files[0])} required /><br />
                <button type="submit" style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    background: "#0070ba",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                }}>Uploader</button>
            </form>
        </div>
    );
}

export default CreateDocument;
