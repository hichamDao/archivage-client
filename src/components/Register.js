import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await API.post("/auth/register", form);
        alert("Inscription réussie !");
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required /><br />
                <input name="email" placeholder="Email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required /><br />
                <button type="submit">Créer un compte</button>
            </form>
        </div>
    );
}

export default Register;
