# Web Task Automatisation
Ce projet a été créé dans le but d'automatiser une tâche sur une plateforme web. Il permet de se connecter à un compte utilisateur et de cliquer sur un bouton pour marquer sa présence en ligne. De plus, il se déconnecte automatiquement à une heure donnée.

## Prérequis
- Node.js
- TypeScript
## Installation
- Clonez le dépôt en utilisant git clone https://github.com/votre-nom-d-utilisateur/web-task-automatisation.git.
- Installez les dépendances en utilisant npm install.
Configuration
Ouvrez le fichier config.ts dans le répertoire src.
Remplacez les valeurs LOGIN_EMAIL et LOGIN_PASSWORD par les informations d'identification de votre compte utilisateur.
Remplacez le chemin d'accès à votre navigateur Chrome dans la constante CHROME_PATH si nécessaire.
Utilisation
Exécutez le script en utilisant npm run start.
Le script se connectera à la plateforme, cliquera sur le bouton pour marquer votre présence en ligne et se déconnectera automatiquement à l'heure spécifiée dans le fichier index.ts.
Pour arrêter le script, utilisez CTRL+C.
Licence
Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus d'informations.