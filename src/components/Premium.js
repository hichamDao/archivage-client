import React, { useState } from "react";
import API from "../api";
import "./Premium.css";

function Premium() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    const handlePayPalPayment = async () => {
        if (!user) {
            setError("Veuillez d'abord vous connecter.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await API.post("/payments/create", {
                userId: user.id,
                amount: 9.99, // 💶 Montant de l’abonnement
            });
            window.location.href = res.data.url; // Redirection vers PayPal
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la création du paiement !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="premium-container">
            <div className="premium-header">
                <h1>💎 Passez à Archivage Premium</h1>
                <p>
                    Profitez d’un stockage illimité, d’une sécurité renforcée et d’un accès prioritaire.
                </p>
            </div>

            <div className="premium-card">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1321/1321836.png"
                    alt="Premium Plan"
                    className="premium-icon"
                />

                <h2>Formule Premium</h2>
                <ul>
                    <li>📂 Stockage illimité</li>
                    <li>🔒 Sécurité renforcée des documents</li>
                    <li>⚡ Accès rapide et prioritaire</li>
                    <li>☁️ Sauvegarde automatique</li>
                </ul>

                <div className="price-section">
                    <h3>Seulement 9,99 € / mois</h3>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                        alt="PayPal Logo"
                        className="paypal-logo"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    className="paypal-button"
                    onClick={handlePayPalPayment}
                    disabled={loading}
                >
                    {loading ? "Redirection vers PayPal..." : "Payer avec PayPal"}
                </button>

                <p className="note">
                    Vous serez redirigé vers la page officielle de PayPal pour finaliser votre paiement.
                </p>
            </div>

            <div className="info-section">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2656/2656242.png"
                    alt="Security"
                    className="info-img"
                />
                <div>
                    <h2>Pourquoi passer au Premium ?</h2>
                    <p>
                        Le plan gratuit vous permet d’ajouter jusqu’à <b>3 documents</b>.
                        En Premium, vous profitez d’un espace <b>illimité</b>, d’une sauvegarde automatique
                        et d’une meilleure protection de vos archives professionnelles.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Premium;
