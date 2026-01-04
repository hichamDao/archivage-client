import React, { useEffect, useState } from "react";
import API from "../api";
import DocumentForm from "./DocumentForm";
import DocumentList from "./DocumentList";
import "./Documents.css";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const loadDocs = async () => {
        try {
            const res = await API.get(`/documents/list/${user.id}`);
            setDocuments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) loadDocs();
    }, [user]);

    return (
        <div className="dashboard-container">
            <h1>📂 Espace Professionnel – {user?.username}</h1>
            <p className="intro">
                Gérez, corrigez et archivez vos fichiers facilement.
                Importez vos documents (Word, PDF, images) — notre système les convertit et les structure pour vous.
            </p>
            <DocumentForm onUpload={loadDocs} />
            <DocumentList documents={documents} />
        </div>
    );
}

export default Dashboard;
