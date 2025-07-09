@echo off
rem Script pour démarrer le service MySQL, le backend et le frontend

REM Nom du service MySQL Windows. Ajustez-le si nécessaire (par ex. MySQL80)
SET MYSQL_SERVICE_NAME=MySQL80

echo --------------------------------------------------
echo Démarrage du service MySQL "%MYSQL_SERVICE_NAME%"...
net start "%MYSQL_SERVICE_NAME%" || (
    echo Échec du démarrage du service "%MYSQL_SERVICE_NAME%". Tentative avec "MySQL"...
    net start "MySQL" || echo Impossible de démarrer le service MySQL. Vérifiez le nom du service.
)
echo --------------------------------------------------
timeout /t 3 > nul

echo Démarrage du serveur backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm install && node server.js"

echo Démarrage du serveur frontend...
start "Frontend Server" cmd /k "cd /d %~dp0 && npm install && npm start"

echo Tous les services ont été lancés.
pause
