import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        // Redirige vers la page d'accueil (ou '/'), pas '/login'
        navigate('/');
    };
    return (
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
            Déconnexion
        </button>
    );
};

export default LogoutButton;
