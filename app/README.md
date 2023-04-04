# Punto Game Web Application

Cette application web est conçue pour jouer au jeu Punto. Elle utilise React, react-router-dom et d'autres modules pour créer et gérer les jeux, les utilisateurs et les cartes. L'application communique avec l'API Punto Game pour effectuer les opérations.

## Installation

Assurez-vous d'avoir Node.js et npm installés sur votre système.

1. Clonez ce dépôt.
2. Exécutez `npm install` pour installer les dépendances nécessaires.
3. Configurez vos variables d'environnement avec un fichier `.env` en vous basant sur le modèle `.env.example`.
4. Lancez l'application en exécutant `npm start`. L'application sera disponible sur le port 3000 (ou le port spécifié dans les variables d'environnement).

## Structure de l'application

L'application contient les composants et pages suivantes :

- HomePage : Page d'accueil de l'application.
- LoginPage : Page de connexion pour les utilisateurs.
- SignupPage : Page d'inscription pour les utilisateurs.
- CreatePage : Page de création d'un nouveau jeu.
- LobbyPage : Page du lobby pour un jeu spécifique.

## Routage

L'application utilise la bibliothèque react-router-dom pour gérer la navigation entre les différentes pages. Voici les routes définies :

- "/" : Page d'accueil (HomePage).
- "/login" : Page de connexion (LoginPage).
- "/signup" : Page d'inscription (SignupPage).
- "/game" : Page de création d'un nouveau jeu (CreatePage). Cette route est protégée et nécessite une authentification.
- "/game/:id" : Page du lobby pour un jeu spécifique (LobbyPage).

### PrivateRoute

Un composant appelé `PrivateRoute` est utilisé pour protéger les routes qui nécessitent une authentification. Si un utilisateur non authentifié tente d'accéder à une route protégée, il sera redirigé vers la page de connexion.

## Utilisation

1. Lancez l'API Punto Game et assurez-vous qu'elle fonctionne correctement.
2. Ouvrez l'application web dans un navigateur en vous rendant à l'adresse `http://localhost` (ou l'adresse du serveur hébergeant l'application).
3. Inscrivez-vous ou connectez-vous pour accéder aux fonctionnalités du jeu.


