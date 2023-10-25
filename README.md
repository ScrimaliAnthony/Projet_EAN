# Projet EAN

[Accédez au site ici](http://www.scrimboxean.com/)

## Table des matières

- [Description](#description)
- [Technologies utilisées](#technologies-utilisées)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Clone du répertoire](#clone-du-répertoire)
  - [Configuration de la base de données](#configuration-de-la-base-de-données)
    - [Étapes pour configurer la base de données](#étapes-pour-configurer-la-base-de-données)
    - [Commandes SQL](#commandes-sql)
  - [Configuration du Back-End](#configuration-du-back-end)
    - [Variables d'environnement pour le Back-End](#variables-denvironnement-pour-le-back-end)
    - [Installation des dépendances](#installation-des-dépendances)
    - [Démarrage du serveur](#démarrage-du-serveur)
    - [API Endpoints](#api-endpoints)
  - [Configuration du Front-End](#configuration-du-front-end)
    - [Variables d'environnement pour le Front-End](#variables-denvironnement-pour-le-front-end)
    - [Installation des dépendances](#installation-des-dépendances-1)
    - [Démarrage de l'application](#démarrage-de-lapplication)
- [Licence](#licence)
- [Contact](#contact)


## Description

Projet EAN a pour but de permettre la création d'annonces dans une base de données pour des produits de types livres, musiques, audiovisuel et jeux vidéo. Chaque annonce est associée à un code-barres unique. Ce projet n'est pas un site de e-commerce en soi, mais sert à préparer des annonces pour un futur site de e-commerce.

## Technologies utilisées

- Base de données: MySQL
- Back-end: Node.js / Express
- Front-end: React
- Styles: SCSS
- Hébergement: Google Cloud Platform

### Hébergement sur Google Cloud

Ce projet est hébergé et fonctionne sur Google Cloud Platform, utilisant différents services tels que Compute Engine, Cloud Storage, etc. Ceci garantit une haute disponibilité et une mise à l'échelle facile.

## Fonctionnalités

- Création d'annonces associées à un code-barres unique.
- Visualisation des annonces.
- Modification et suppression d'annonces.
- Système de connexion pour sécuriser les fonctionnalités de création, modification et suppression.

## Installation

## Prérequis

- Node.js v18+
- MySQL 8.x
- Vite.js
- React

### Clone du répertoire

git clone git@github.com:ScrimaliAnthony/ScrimboxEAN.git

### Configuration de la base de données

Assurez-vous d'avoir MySQL installé et opérationnel. La configuration de la base de données est gérée par des fichiers `.sql` dans le répertoire `bdd`.

### Étapes pour configurer la base de données

1. **Initialisation de la base de données**
    - Exécutez le fichier `scrimbox_ean.sql`. Ce fichier supprimera la base de données `scrimbox_ean` si elle existe déjà, puis la recréera et l'utilisera.
    
2. **Création des tables**
    - Exécutez les 6 fichiers dont le nom commence par `table`. Ces fichiers créent les tables nécessaires pour le fonctionnement de l'application.
    - Note : L'ordre d'exécution de ces fichiers n'est pas important, mais assurez-vous que toutes les tables soient créées.

3. **Création de la vue**
    - Enfin, exécutez le fichier `vue_produits.sql` pour créer une vue SQL dans votre base de données.

### Commandes SQL

Si vous préférez, vous pouvez également copier et coller les commandes SQL directement dans votre client MySQL pour configurer la base de données.


### Configuration du Back-End

#### Variables d'environnement pour le Back-End

Créez un fichier `.env` à la racine du répertoire back-end pour stocker vos variables d'environnement. Voici un exemple de fichier `.env` :

# Configuration de la base de données
`DB_HOST`="localhost"  
`DB_USER`="root"  
`DB_PASSWORD`=''  
`DB_NAME`=scrimbox_ean  
`JWT_SECRET`=VotreCleSecrete # Clé secrète pour JWT  

# Configuration de Google Cloud
`GC_ID`="VotreIDGoogleCloud"  
`GC_BUCKETImages`="VotreBucketImages"         # Nom du bucket pour les images  
`GC_BUCKETVideo`="VotreBucketVideos"          # Nom du bucket pour les vidéos  
`URL_BUCKETImages`="VotreURLBucketImages"  
`URL_BUCKETVideo`="VotreURLBucketVideos"  

# Chemin du fichier de clé pour Google Cloud
KEYFILE="VotreCheminVersLeFichierDeCle"

#### Installation des dépendances

Exécutez la commande suivante dans le répertoire `back` pour installer toutes les dépendances du projet :

`npm install` ou `yarn install` ou `pnpm install`

#### Démarrage du serveur

Pour démarrer le serveur en mode développement, exécutez :

`nodemon src/server.js`

Cela démarrera le serveur en mode développement et il sera accessible à l'adresse `http://localhost:PORT\, où `PORT` est le numéro de port configuré dans votre fichier `.env`.

## API Endpoints

Les routes suivantes sont disponibles pour interagir avec le back-end :

### Audiovisuels

| Route                 | Méthode HTTP | Description                                        |
| --------------------- | ------------ | -------------------------------------------------- |
| `/audioVisuel/`       | GET          | Récupère la liste de tous les produits audiovisuels.|
| `/audioVisuel/:id`    | GET          | Récupère un produit audiovisuel spécifique par ID.  |
| `/audioVisuel/`       | POST         | Crée un nouveau produit audiovisuel.                |
| `/audioVisuel/:id`    | PUT          | Met à jour un produit audiovisuel spécifique.       |
| `/audioVisuel/:id`    | DELETE       | Supprime un produit audiovisuel spécifique.         |

### Livres

| Route                 | Méthode HTTP | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `/livre/`             | GET          | Récupère la liste de tous les produits livres.     |
| `/livre/:id`          | GET          | Récupère un produit livre spécifique par ID.        |
| `/livre/`             | POST         | Crée un nouveau produit livre.                      |
| `/livre/:id`          | PUT          | Met à jour un produit livre spécifique.             |
| `/livre/:id`          | DELETE       | Supprime un produit livre spécifique.               |

### Musique

| Route                 | Méthode HTTP | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `/musique/`           | GET          | Récupère la liste de tous les produits musique.    |
| `/musique/:id`        | GET          | Récupère un produit musique spécifique par ID.      |
| `/musique/`           | POST         | Crée un nouveau produit musique.                    |
| `/musique/:id`        | PUT          | Met à jour un produit musique spécifique.           |
| `/musique/:id`        | DELETE       | Supprime un produit musique spécifique.             |

### Jeux vidéo

| Route                 | Méthode HTTP | Description                                        |
| --------------------- | ------------ | -------------------------------------------------- |
| `/jeuxVideo/`         | GET          | Récupère la liste de tous les produits jeux vidéo.  |
| `/jeuxVideo/:id`      | GET          | Récupère un produit jeux vidéo spécifique par ID.    |
| `/jeuxVideo/`         | POST         | Crée un nouveau produit jeux vidéo.                  |
| `/jeuxVideo/:id`      | PUT          | Met à jour un produit jeux vidéo spécifique.         |
| `/jeuxVideo/:id`      | DELETE       | Supprime un produit jeux vidéo spécifique.           |

### Produits

| Route                 | Méthode HTTP | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `/produit/`           | GET          | Récupère la liste de tous les produits.            |
| `/produit/:id`        | GET          | Récupère un produit spécifique par ID.              |

### Codes-barres uniques

| Route                 | Méthode HTTP | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `/uniqueCodeBarre/`   | GET          | Récupère la liste de tous les codes-barres.        |
| `/uniqueCodeBarre/`   | POST         | Crée un nouveau code-barres.                       |
| `/uniqueCodeBarre/:id`| DELETE       | Supprime un code-barres spécifique.                |

### Utilisateurs

| Route                 | Méthode HTTP | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `/user/create`        | POST         | Crée un nouvel utilisateur.                        |
| `/user/login`         | POST         | Se connecte à un compte utilisateur.               |


### Configuration du Front-End

#### Variables d'environnement pour le Front-End

Créez un fichier `.env` à la racine du répertoire front-end pour stocker vos variables d'environnement. Voici un exemple de fichier `.env` :

VITE_API_URL=http://localhost:8080/

#### Installation des dépendances

Exécutez la commande suivante dans le répertoire `front` pour installer toutes les dépendances du projet :

`npm install` ou `yarn install` ou `pnpm install`

#### Démarrage de l'application

Pour démarrer l'application en mode développement, exécutez :

`npm run dev`

Ou si vous utilisez Yarn :

`yarn dev`

Ou si vous utilisez pnpm :

`pnpm run dev`

L'application sera alors accessible à l'adresse `http://localhost:3000/` ou un autre port si vous avez configuré différemment.

## Licence

Tous droits réservés. Aucune partie de ce projet ne peut être reproduite, distribuée ou transmise sous quelque forme ou par quelque moyen que ce soit, sans l'autorisation écrite préalable de l'auteur.

## Contact

Pour toute question ou information supplémentaire, n'hésitez pas à me contacter :

- E-mail: [anthony.scrimali@gmail.com](mailto:anthony.scrimali@gmail.com)
- LinkedIn: [Anthony Scrimali](https://www.linkedin.com/in/anthony-scrimali-02187b146/)
