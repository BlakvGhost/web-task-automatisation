# Web Task Automatisation

Ce projet a été créé dans le but d'automatiser une tâche sur une plateforme web. Il permet de se connecter à un compte utilisateur et de cliquer sur un bouton pour marquer sa présence en ligne. De plus, il se déconnecte automatiquement à une heure donnée.

## Prérequis

- Node.js
- TypeScript

## Installation

- Clonez le dépôt en utilisant git clone <https://github.com/BlakvGhost/web-task-automatisation.git>.
- Installez les dépendances en utilisant `npm install`.

## Configuration

- Ouvrez le fichier config.ts dans le répertoire src.
- Remplacez les valeurs `LOGIN_EMAIL` et `LOGIN_PASSWORD` par les informations d'identification de votre compte utilisateur.
- Remplacez le chemin d'accès à votre navigateur Chrome dans la constante `CHROME_PATH` si nécessaire.

## Utilisation

- Exécutez le script en utilisant `npm run start`.
- Le script se connectera à la plateforme, cliquera sur le bouton pour marquer votre présence en ligne et se déconnectera automatiquement à l'heure spécifiée dans le fichier `index.ts`.
- Pour arrêter le script, utilisez `CTRL+C`.

## Fonctionnement du code

Le fichier src/index.ts contient deux fonctions principales : login() et logout(). La fonction login() se connecte à la plateforme cible en utilisant les identifiants fournis dans le fichier .env, puis clique sur le bouton permettant de marquer l'utilisateur comme étant en ligne. La fonction logout() déconnecte l'utilisateur en cliquant sur le bouton de déconnexion.

Le script utilise également la librairie node-schedule pour planifier l'exécution des fonctions login() et logout() à des heures spécifiques. Les horaires de connexion et de déconnexion peuvent être modifiés dans le fichier src/index.ts.

## Limitations

Ce script a été testé avec succès uniquement sur la plateforme cible mentionnée dans le fichier .env. Il est possible que le script ne fonctionne pas correctement sur d'autres plateformes en raison de différences dans la structure de la page web ou dans les noms des éléments HTML.
Ce script n'est pas conçu pour être exécuté en continu, il est seulement prévu pour une utilisation ponctuelle à des horaires spécifiques.
Ce script utilise des identifiants de connexion stockés en clair dans le fichier .env. Il est fortement recommandé de ne pas stocker des informations de connexion sensibles de cette manière et de mettre en place des mécanismes de sécurité appropriés si vous souhaitez utiliser ce script dans un contexte de production.

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus d'informations.
