// src/components/Login.js
import React, { useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/users/login", { username, password });

            if (res.data && res.data.username) {
                login(res.data); // Met à jour le contexte
                alert("Connexion réussie !");
                navigate("/dashboard");
            } else {
                alert("Utilisateur ou mot de passe incorrect !");
            }
        } catch (error) {
            console.error(error);
            alert("Utilisateur ou mot de passe incorrect !");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    required
                /><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                /><br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
