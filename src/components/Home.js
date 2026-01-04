import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="overlay">
                    <h1 className="hero-title">Archivage Intelligent</h1>
                    <p className="hero-subtitle">
                        Protégez, structurez et valorisez vos documents importants
                    </p>
                    <button className="cta-button" onClick={() => navigate("/register")}>
                        Commencer maintenant
                    </button>
                </div>
            </header>

            <section className="about-section">
                <h2>📁 Objectif du projet</h2>
                <p>
                    Dans un monde où les données jouent un rôle central, de nombreuses
                    sociétés — qu’elles soient <b>publiques</b> ou <b>privées</b> — conservent encore
                    leurs archives sous forme papier, souvent mal structurées, fragiles et
                    difficiles à retrouver.
                </p>
                <p>
                    <b>Archivage Intelligent</b> vise à <b>numériser</b>, <b>corriger</b> et
                    <b>sécuriser</b> ces documents dans des formats numériques fiables tels que
                    le <b>PDF</b>, afin d’assurer leur <b>conservation à long terme</b> et leur
                    <b>accessibilité instantanée</b>.
                </p>
            </section>

            <section className="features-section">
                <h2>🚀 Fonctionnalités clés</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2995/2995644.png"
                            alt="Upload"
                        />
                        <h3>Ajout de documents</h3>
                        <p>
                            Importez facilement vos fichiers depuis votre ordinateur ou votre
                            mobile pour un archivage rapide et sécurisé.
                        </p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4205/4205939.png"
                            alt="Correction"
                        />
                        <h3>Analyse & Correction</h3>
                        <p>
                            Les documents mal scannés ou abîmés sont automatiquement
                            corrigés pour garantir une lecture claire et structurée.
                        </p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/633/633652.png"
                            alt="PDF"
                        />
                        <h3>Conversion en PDF</h3>
                        <p>
                            Sauvegardez chaque document en format PDF sécurisé, idéal pour
                            l’archivage numérique à long terme.
                        </p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
                            alt="Cloud"
                        />
                        <h3>Sauvegarde Cloud</h3>
                        <p>
                            Vos documents sont stockés dans une base de données protégée,
                            accessible à tout moment depuis votre espace personnel.
                        </p>
                    </div>
                </div>
            </section>

            <section className="premium-section">
                <h2>💎 Version Premium</h2>
                <p>
                    Les utilisateurs enregistrés peuvent ajouter jusqu’à <b>3 documents gratuitement</b>.
                    Passez ensuite à la version <b>Premium</b> pour profiter d’un espace illimité,
                    d’une sauvegarde automatique et d’un support prioritaire.
                </p>
                <button className="premium-button" onClick={() => navigate("/login")}>
                    Découvrir Premium
                </button>
            </section>

            <footer className="footer">
                <p>© 2026 Archivage Intelligent — Sécurité et performance des données</p>
            </footer>
        </div>
    );
}

export default Home;
