# Web Task Automatisation

Ce projet a été créé dans le but d'automatiser une tâche sur une plateforme web. Il permet de se connecter à un compte utilisateur et de cliquer sur un bouton pour marquer sa présence en ligne. De plus, il se déconnecte automatiquement à une heure donnée.

## Prérequis

- `Node.js` doit être installé sur la machine
- Un fichier `.env` doit être présent à la racine du projet et contenir les variables d'environnement suivantes :
  - `LOGIN_URL`: l'URL de la page de connexion de la plateforme
  - `DASHBOARD_URL`: l'URL de la page du dashboard de la plateforme
  - `CHROME_PATH`: le chemin d'accès à l'exécutable de Chrome ou Chromium sur la machine
  - `LOGIN_EMAIL`: l'adresse e-mail de l'utilisateur pour se connecter à la plateforme
  - `LOGIN_PASSWORD`: le mot de passe de l'utilisateur pour se connecter à la plateforme

## Installation

- Clonez le dépôt en utilisant la commande:

```sh
git clone https://github.com/BlakvGhost/web-task-automatisation.git
```

- Installez les dépendances en utilisant:

```sh
npm install
```

## Fonctionnement

Le script se compose de plusieurs fonctions :

- `log(message: string)`: une fonction utilitaire pour afficher un message dans la console avec un retour à la ligne.
- `connect()`: une fonction qui ouvre une instance de navigateur et une nouvelle page dans le navigateur, accède à la page de connexion de la plateforme, saisit les informations de connexion, clique sur le bouton de connexion et attend la navigation vers le dashboard. Cette fonction renvoie le navigateur et la page courante.
- `login()`: une fonction qui appelle `connect()` pour se connecter à la plateforme et ferme ensuite l'instance de navigateur pour marquer sa présence en ligne.
- `logout()`: une fonction qui appelle `connect()` pour accéder à la page du dashboard de la plateforme, effectue une action pour se déconnecter de la plateforme, puis ferme l'instance de navigateur pour marquer sa présence hors ligne.
- `scheduleJob()`: une fonction qui permet de planifier l'exécution d'une tâche à une heure spécifique, en utilisant une syntaxe similaire à celle de la crontab.

***Le script planifie deux tâches :***

- Une tâche de connexion qui s'exécute tous les jours à 08h00.
- Une tâche de déconnexion qui s'exécute tous les jours à 18h00.
Le script vérifie également l'état de connexion de l'utilisateur avant de se connecter ou de se déconnecter, afin d'éviter des connexions ou déconnexions inutiles.

Modifiez les l'heures de connexion/deconnexion en modifiant les variables dans le `.env`.

## Utilisation

- Exécutez le script en utilisant:

```sh
npm run start
```

- Le script se connectera à la plateforme, cliquera sur le bouton pour marquer votre présence en ligne et se déconnectera automatiquement à l'heure spécifiée dans le fichier `index.ts`.
- Pour arrêter le script, utilisez `CTRL+C`.

## Limitations

- Ce script a été testé avec succès uniquement sur la plateforme cible mentionnée dans le fichier `.env`. Il est possible que le script ne fonctionne pas correctement sur d'autres plateformes en raison de différences dans la structure de la page web ou dans les noms des éléments HTML.
- Ce script n'est pas conçu pour être exécuté en continu, il est seulement prévu pour une utilisation ponctuelle à des horaires spécifiques.
- Ce script utilise des identifiants de connexion stockés en clair dans le fichier `.env`. Il est fortement recommandé de ne pas stocker des informations de connexion sensibles de cette manière et de mettre en place des mécanismes de sécurité appropriés si vous souhaitez utiliser ce script dans un contexte de production.

## Auteur

- [BlakvGhost Portfolio](https://kabirou-dev.vercel.app)

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus d'informations.
