// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Success from "./components/Success" ;
import Cancel from "./components/Cancel";
import Navbar from "./components/Navbar";
import DocumentForm from "./components/DocumentForm";


function AppRoutes() {
    const { user, logout } = useContext(AuthContext);

    return (

        <Router>

            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/create" element={user ? <DocumentForm /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
