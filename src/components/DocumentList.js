import React, { useEffect, useState } from "react";
import API from "../api";

function DocumentList() {
    const [docs, setDocs] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const loadDocs = async () => {
        const res = await API.get(`/document/list?userId=${user.id}`);
        setDocs(res.data);
    };

    useEffect(() => { loadDocs(); }, []);

    const handleDelete = async id => {
        await API.delete(`/document/delete/${id}`);
        loadDocs();
    };

    return (
        <div>
            <h3>Mes documents</h3>
            {docs.map(d => (
                <div key={d.id}>
                    <strong>{d.title}</strong> - {d.content}
                    <button onClick={() => handleDelete(d.id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default DocumentList;
