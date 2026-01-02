import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="logo">🧠 Archivage AI</div>
            <ul className="nav-links">
                <li><Link to="/">Accueil</Link></li>
                {user && <li><Link to="/dashboard">Mes Documents</Link></li>}
                {user && <li><Link to="/create">Créer</Link></li>}
                {user && <li><Link to="/payment">Paiement</Link></li>}
                {!user && <li><Link to="/login">Connexion</Link></li>}
                {!user && <li><Link to="/register">Inscription</Link></li>}
                {user && (
                    <li>
                        <button className="logout-btn" onClick={logout}>Déconnexion</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
