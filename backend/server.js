const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: '127.0.0.1', // Adresse du serveur MySQL
    user: 'root',      // Nom d'utilisateur MySQL
    password: '',      // Mot de passe MySQL
    database: 'movie_app', // Nom de la base de données
    port: 3306         // Port par défaut de MySQL
});

// Connexion à MySQL
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
    } else {
        console.log('Connecté à MySQL');
    }
});

// Routes

// 1. Récupérer tous les films favoris
app.get('/filmfavoris', (req, res) => {
    db.query('SELECT * FROM filmfavoris', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des films favoris :', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// 2. Ajouter un film aux favoris
app.post('/filmfavoris', (req, res) => {
    const { imdbID, poster, title, type, yearMovie } = req.body;

    db.query(
        'INSERT INTO filmfavoris (imdbID, poster, title, type, yearMovie) VALUES (?, ?, ?, ?, ?)',
        [imdbID, poster, title, type, yearMovie],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout du film :', err);
                res.status(500).send(err);
            } else {
                res.json({ message: 'Film ajouté avec succès', id: result.insertId });
            }
        }
    );
});

// 3. Supprimer un film des favoris
app.delete('/filmfavoris/:imdbID', (req, res) => {
    const { imdbID } = req.params;

    db.query('DELETE FROM filmfavoris WHERE imdbID = ?', [imdbID], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du film :', err);
            res.status(500).send(err);
        } else {
            res.json({ message: 'Film supprimé avec succès' });
        }
    });
});

// 4. Authentification de l'utilisateur
app.post('/utilisateur/auth', (req, res) => {
    const { login, mdp } = req.body;

    db.query(
        'SELECT * FROM utilisateur WHERE login = ? AND mdp = ?',
        [login, mdp],
        (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'authentification :', err);
                res.status(500).send(err);
            } else if (results.length > 0) {
                res.json({ message: 'Authentification réussie', user: results[0] });
            } else {
                res.status(401).json({ message: 'Identifiants invalides' });
            }
        }
    );
});

// 5. Ajouter un utilisateur
app.post('/utilisateur', (req, res) => {
    const { login, mdp } = req.body;

    db.query(
        'INSERT INTO utilisateur (login, mdp) VALUES (?, ?)',
        [login, mdp],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
                res.status(500).send(err);
            } else {
                res.json({ message: 'Utilisateur ajouté avec succès', id: result.insertId });
            }
        }
    );
});

// Lancement du serveur
app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
