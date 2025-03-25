# Second contexte : Application pour Entraîneurs

[Voir le README du premier contexte](./README1.md)

## Présentation

Cette application web permet aux entraîneurs sportifs de créer et gérer des sessions d'entraînement sur différents terrains. Elle s'adresse aux coachs professionnels qui souhaitent organiser facilement leurs séances et suivre leurs participants. Développée dans le cadre du BTS SIO option SLAM, elle partage la même base d'utilisateurs que l'application de réservation de terrains sportifs.

### Fonctionnalités principales

- Inscription et connexion sécurisée
- Recherche et réservation de sessions d'entraînement
- Visualisation des sessions à venir
- Invitation de joueurs à rejoindre une session
- Description détaillée des séances proposées

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

![Modèle Conceptuel de Données](./public/readme/mcd2.png)

## Diagramme de Cas d'Utilisation

![Diagramme de Cas d'Utilisation](./public/readme/usecase2.png)

## Technologies utilisées

- Next.js
- React
- Prisma ORM
- MySQL
- Tailwind CSS
- TypeScript
- JSON Web Tokens (JWT) pour l'authentification
