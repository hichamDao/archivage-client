import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate("/")}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3022/3022096.png"
                    alt="Archivage Logo"
                    className="logo"
                />
                <span>Archivage Intelligent</span>
            </div>

            <ul className="navbar-links">
                <li><Link to="/">Accueil</Link></li>
                {user ? (
                    <>
                        <li><Link to="/dashboard">Mes Documents</Link></li>
                        <li><Link to="/premium">Premium</Link></li>
                        <li><button className="logout-btn" onClick={logout}>Déconnexion</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Connexion</Link></li>
                        <li><Link to="/register">Inscription</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
