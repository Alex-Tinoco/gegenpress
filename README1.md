# # Premier contexte : Réservation de Terrains Sportifs

[Voir le README du second contexte](./README2.md)

## Présentation

Cette application web permet aux utilisateurs de réserver des terrains sportifs et de participer à des matchs organisés par d'autres joueurs. Développée dans le cadre du BTS SIO option SLAM, elle offre une interface simple pour la gestion des réservations sportives.

### Fonctionnalités principales

- Inscription et connexion sécurisée
- Recherche et réservation de terrains sportifs
- Visualisation des réservations à venir
- Invitation d'autres joueurs à rejoindre une réservation

## Installation et lancement

### Prérequis

- Node.js (v18 ou supérieur)
- MySQL

### Étapes d'installation

1. Cloner le projet

   ```
   git clone https://github.com/Alex-Tinoco/hinqo-games
   cd hinqo-games
   ```

2. Installer les dépendances

   ```
   npm install
   ```

3. Configurer la base de données et l'authentification

   - Créer un fichier `.env` à la racine du projet
   - Ajouter les lignes suivantes en remplaçant les valeurs par vos informations
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/nom_de_la_base"
     JWT_SECRET_KEY="votre_clé_secrète_très_longue_et_complexe"
     ```

4. Initialiser la base de données

   ```
   npx prisma migrate dev --name init
   ```

5. Lancer l'application

   ```
   npm run dev
   ```

6. Accéder à l'application
   - Ouvrir un navigateur web
   - Aller à l'adresse http://localhost:3000

## Modèle Conceptuel de Données (MCD)

![Modèle Conceptuel de Données](./public/readme/mcd1.png)

## Diagramme de Cas d'Utilisation

![Diagramme de Cas d'Utilisation](./public/readme/usecase1.png)

## Technologies utilisées

- Next.js
- React
- Prisma ORM
- MySQL
- Tailwind CSS
- TypeScript
- JSON Web Tokens (JWT) pour l'authentification
