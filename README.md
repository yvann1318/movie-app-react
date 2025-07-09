# Movie App

Bienvenue dans **Movie App**, une application web pour parcourir un catalogue de films, consulter les détails et gérer vos favoris.

## Prérequis

Avant de commencer, assurez-vous d’avoir :

1. **Windows 10 (ou supérieur)**
2. **Node.js** (v14 ou supérieur) et **npm** installés ; vérifiez :

   ```bash
   node -v
   npm -v
   ```

## Installation du projet

1. **Clonez** le dépôt Git et placez-vous dans le dossier :

   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>
   ```

2. **Configurez la connexion à MySQL** :

   * Ouvrez le fichier `backend/server.js` dans votre éditeur de code.
   * Localisez la section suivante :

     ```js
     const db = mysql.createConnection({
       host: '127.0.0.1',
       user: 'root',
       password: '',
       database: 'movie_app',
       port: 3306
     });
     ```
   * **Remplacez** chaque valeur par vos propres informations :

     ```js
     const db = mysql.createConnection({
       host: 'VOTRE_HOTE',          // ex. '127.0.0.1'
       user: 'VOTRE_UTILISATEUR',   // ex. 'root'
       password: 'VOTRE_MOT_DE_PASSE',
       database: 'movie_app',       // gardez ce nom à moins d’en avoir créé un différent
       port: VOTRE_PORT             // ex. 3306
     });
     ```
   * Sauvegardez `server.js`.

3. **Importez la base de données** :

## Démarrage en un clic

Pour lancer simultanément tous les composants :

1. Assurez-vous d’être à la racine du projet (contenant `start-servers.bat`).
2. Double-cliquez sur **start-servers.bat** ou exécutez :

   ```bash
   start-servers.bat
   ```
3. Trois fenêtres de terminal s’ouvriront :

   * **MySQL** : démarrage du service Windows MySQL
   * **Backend** : installation des dépendances et lancement du serveur Node.js
   * **Frontend** : installation des dépendances et lancement de la webapp React

> **Astuce :** lisez les messages d’erreur dans la fenêtre correspondante si un service ne démarre pas.

## Accès à l’application

* **Frontend (UI)** : ouvrez votre navigateur à

  ```
  http://localhost:3000
  ```
* **Backend (API)** : l’API est disponible à

  ```
  http://localhost:5000
  ```

