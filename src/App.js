import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './components/LoginPage';
import MoviesPage from './components/MoviePage'; // Déplacez le contenu actuel de `App` ici

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route pour la page de connexion */}
                <Route path="/" element={<LoginPage />} />

                {/* Route pour la page des films */}
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </Router>
    );
};

export default App;
