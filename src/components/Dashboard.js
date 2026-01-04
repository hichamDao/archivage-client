// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import API from "../api";


function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
    //const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        const fetchDocuments = async () => {
            try {
                const res = await API.get(`/documents/list/${user.id}`);
                setDocuments(res.data);
            } catch (error) {
                console.error("Erreur lors du chargement des documents :", error);
            }
        };

        fetchDocuments();
    }, [user.id]); // stable car user ne change plus


    const handleDownload = (doc) => {
        const blob = new Blob([Uint8Array.from(atob(doc.file), c => c.charCodeAt(0))], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${doc.title}.pdf`;
        link.click();
    };

    const goToPayment = async () => {
        setLoadingPayment(true);
        try {
            const res = await API.post("/payments/create", {
      userId: user.id,
      amount: 9.99
    });
            const { url } = res.data;
            if (url) {
                window.location.href = url; // redirection vers PayPal
            }
        } catch (err) {
            console.error("Erreur paiement :", err);
            alert("Erreur lors de la création du paiement.");
        } finally {
            setLoadingPayment(false);
        }
    };
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>📁 Mes Documents</h2>
            <p>
                {user.premium
                    ? "🌟 Compte Premium actif — stockage illimité"
                    : "⚙️ Compte Freemium — limité à 3 documents"}
            </p>

            {/* Message Premium */}
            {!user.premium && documents.length >= 3 && (
                <div style={{ color: "red", marginBottom: "15px" }}>
                    🚫 Vous avez atteint la limite Freemium !
                    <br />
                    <button
                        onClick={goToPayment}
                        disabled={loadingPayment}
                        style={{
                            backgroundColor: "#0070ba",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {loadingPayment ? "Redirection vers PayPal..." : "Payer avec PayPal"}
                    </button>
                </div>
            )}

            {/* Liste des documents */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {documents.map((doc) => (
                    <li key={doc.id} style={{ marginBottom: "10px" }}>
                        <strong>{doc.title}</strong>
                        <button
                            onClick={() => handleDownload(doc)}
                            style={{
                                marginLeft: "10px",
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            📥 Télécharger PDF
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
