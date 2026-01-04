import React from "react";
import "./Documents.css";

function DocumentList({ documents }) {
    const downloadPDF = (doc) => {
        const blob = new Blob([Uint8Array.from(atob(doc.file), (c) => c.charCodeAt(0))], {
            type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${doc.title}.pdf`;
        link.click();
    };

    return (
        <div className="doc-list">
            {documents.length === 0 ? (
                <p>Aucun document pour le moment.</p>
            ) : (
                documents.map((doc) => (
                    <div key={doc.id} className="doc-card">
                        <div className="doc-header">
                            <h3>{doc.title}</h3>
                            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="doc-content">
                            {doc.content?.substring(0, 120) || "Aucun aperçu disponible..."}...
                        </p>
                        <div className="doc-actions">
                            <button onClick={() => downloadPDF(doc)}>📥 Télécharger</button>
                            <a
                                href={`data:application/pdf;base64,${doc.file}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                👁️ Voir PDF
                            </a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default DocumentList;
