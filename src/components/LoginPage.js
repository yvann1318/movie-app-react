import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {

        // Requête POST vers server.js 
        const response = await fetch('http://localhost:5000/utilisateur/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, mdp: password }),
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log('Authentification réussie', data);
            // Redirige l'utilisateur vers la page des films
            navigate('/movies');
        } else if (response.status === 401) {
            alert('Identifiants incorrects');
        } else {
            alert('Une erreur est survenue');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Connexion</h1>
            <div className="form-group">
                <label>Login</label>
                <input
                    type="text"
                    className="form-control"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Mot de passe</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin} className="btn btn-primary mt-3">
                Se connecter
            </button>
        </div>
    );
};

export default LoginPage;
