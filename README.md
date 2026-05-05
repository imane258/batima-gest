# Batima-Gest 🏢
### Plateforme de Gestion de Copropriété

## 👥 Groupe
- **Étudiant 1** : [Imene Chekaba]
- **Étudiant 2** : [Imene Isaad]
- **Étudiant 3** : [Asma Layadi]

## 🔗 Liens
- **Application** : https://batima-gest-lemon.vercel.app
- **GitHub** : https://github.com/imane258/batima-gest

## 🎯 Mapping du Thème : Copropriété (Batima-Gest)

| Élément | Description |
|--------|-------------|
| **Table A** | `residents` — Les résidents de la copropriété (gérés via Supabase Auth) |
| **Table B** | `parties_communes` — Les espaces communs consultables (Ascenseur, Parking, Jardin...) |
| **Table C** | `signalements` — Les signalements de pannes créés par les résidents, reliant Table A et Table B avec une date et un statut |
| **Fichier** | Photo du problème signalé (JPG/PNG), uploadée dans Supabase Storage (bucket `signalements-photos`) |

## 🔐 Identifiants de Test
- **Email** : ahmed.test@batima-gest.dz
- **Mot de passe** : Test1234!

## 🏗️ Analyse d'Architecture

### 1. Pourquoi Vercel + Supabase est plus logique financièrement qu'un serveur classique ? (CAPEX vs OPEX)

Un serveur physique classique implique des coûts **CAPEX** (Capital Expenditure) élevés : achat de machines, installation, infrastructure réseau, climatisation de la salle serveur. Ces investissements sont lourds dès le départ, avant même d'avoir un seul utilisateur.

Avec **Vercel + Supabase**, on passe à un modèle **OPEX** (Operational Expenditure) : on paie uniquement ce qu'on consomme, mensuellement. Le plan gratuit de Supabase suffit pour lancer ce projet, et Vercel offre un hébergement gratuit avec CI/CD intégré. Pour une startup ou un projet académique, ce modèle est bien plus logique car il réduit le risque financier initial à zéro.

### 2. Comment Vercel gère-t-il la scalabilité par rapport à un Data Center physique ?

Un Data Center physique nécessite une infrastructure lourde : serveurs rack, système de climatisation, alimentation redondante, maintenance humaine. La scalabilité est limitée par le matériel disponible et demande du temps (commande, installation).

**Vercel** utilise une architecture **Serverless** et un réseau CDN mondial. Chaque page ou API est déployée comme une fonction indépendante qui s'exécute à la demande. Si 1000 utilisateurs se connectent simultanément, Vercel scale automatiquement sans aucune intervention. Il n'y a pas de serveur à gérer, pas de climatisation, pas de rack — tout est abstrait dans le cloud.

### 3. Données Structurées vs Données Non-Structurées dans Batima-Gest

**Données structurées** : toutes les informations stockées dans les tables PostgreSQL de Supabase — les résidents (`residents`), les parties communes (`parties_communes`) et les signalements (`signalements`). Ces données sont organisées en lignes et colonnes avec des types définis (uuid, text, timestamp...).

**Données non-structurées** : les photos des problèmes signalés (ascenseur en panne, fuite d'eau...) uploadées par les résidents. Ces fichiers image (JPG, PNG) sont stockés dans **Supabase Storage** — ils n'ont pas de structure tabulaire et sont référencés uniquement par leur URL dans la colonne `photo_url` de la table `signalements`.