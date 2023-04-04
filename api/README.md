# Punto Game API

Cette API est conçue pour gérer les fonctionnalités du jeu Punto. Elle utilise Express.js, MongoDB, Socket.IO et plusieurs autres modules pour créer et gérer les jeux, les utilisateurs, les jetons et les cartes.

## Installation

Assurez-vous d'avoir Node.js et npm installés sur votre système.

1. Clonez ce dépôt.
2. Exécutez `npm install` pour installer les dépendances nécessaires.
3. Configurez vos variables d'environnement avec un fichier `.env` en vous basant sur le modèle `.env.example`.
4. Lancez l'API en exécutant `npm start` ou `node index.js`. L'API sera disponible sur le port 3000.

## Routes

Voici les routes disponibles :

- POST `/login` : Permet de se connecter en tant qu'utilisateur.
- POST `/signup` : Permet de s'inscrire en tant qu'utilisateur.
- POST `/checktoken` : Vérifie la validité du jeton d'accès.
- POST `/creategame` : Crée un nouveau jeu.
- GET `/statusgame`:gameId : Récupère le statut du jeu spécifié.
- POST `/startgame` : Démarre un jeu existant.
- GET `/listsgames` : Liste tous les jeux disponibles.
- POST `/joingame` : Rejoindre un jeu existant.
- POST `/setcard` : Ajoute une carte dans un jeu.

## Événements Socket.IO

Les événements suivants sont émis et écoutés par le serveur Socket.IO :

- `gameadded` : Émis lorsqu'un nouveau jeu est créé.
- `useradded` : Émis lorsqu'un utilisateur rejoint un jeu.
- `gameremoved` : Émis lorsqu'un jeu est supprimé.
- `userremoved` : Émis lorsqu'un utilisateur quitte un jeu.
- `cardadd` : Émis lorsqu'une carte est ajoutée à un jeu.

Pour vous connecter à l'API via Socket.IO, utilisez l'adresse `http://localhost:3000` (ou l'adresse du serveur hébergeant l'API).