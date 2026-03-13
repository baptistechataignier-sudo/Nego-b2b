# NégoMaster 🤝

> **Le Duolingo de la Négociation B2B** — Parcours adaptatif complet pour former un commercial de zéro jusqu'au niveau Key Account Manager expert.

## 🚀 Lancer l'application

### Prérequis

- [Node.js](https://nodejs.org/) **v18+**
- npm (inclus avec Node.js)

### Installation & démarrage

```bash
# 1. Cloner le dépôt
git clone https://github.com/baptistechataignier-sudo/Nego-b2b.git
cd Nego-b2b

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

Ouvrir **http://localhost:5173** dans votre navigateur.

### Build de production

```bash
npm run build       # génère le dossier dist/
npm run preview     # prévisualiser le build (http://localhost:4173)
```

> Aucun backend requis — toutes les données sont en JSON local, la progression est sauvegardée dans le `localStorage` du navigateur.

---

## 📚 Contenu du parcours

### Niveau 1 — Commercial Junior 🌱
| Module | Leçons | Thèmes |
|--------|--------|--------|
| ⚖️ Fondamentaux | 2 | BATNA, ZOPA, ancrage, rapport de force |
| 🔍 Découverte des besoins | 2 | SPIN Selling, écoute active, reformulation |
| 📋 Présentation de l'offre | 1 | CAB, proposition de valeur, pitch ROI |
| 🛡️ Gestion des objections | 1 | Méthode AEAR, prix, délais, "je dois réfléchir" |
| 🏁 Techniques de closing | 1 | Closing alternatif, résumé-engagement, silence |

### Niveau 2 — Commercial Confirmé ⭐
*(débloqué après le Niveau 1)*
| Module | Leçons | Thèmes |
|--------|--------|--------|
| 💰 Défense des marges | 2 | Justifier le prix, technique Si-Alors, concessions graduées |
| 👥 Multi-interlocuteurs | 2 | Cartographie DG/Acheteur/DSI, sponsor interne |
| 📅 Cycles de vente longs | 1 | Relances à valeur ajoutée, qualification chaud/mort |
| 📑 Appels d'offres | 1 | Go/No-Go, CDC, BPU/DQE |
| ⚔️ Concurrence | 1 | Déconstruire l'objection prix, TCO |

### Niveau 3 — Key Account Manager 🏆
*(débloqué après le Niveau 2)*
| Module | Leçons | Thèmes |
|--------|--------|--------|
| 🗂️ Plan de compte | 2 | Mapping décisionnel, matrice Pouvoir/Faveur, account plan |
| 🎲 Négociation à enjeux | 1 | Préparation par scénarios, walk-away point |
| 📈 Upsell & Cross-sell | 1 | Signaux d'opportunité, règle des 3V |
| 📊 Business Review | 1 | Structure BR, KPIs, renouvellement de contrat |
| 🔐 Relation long terme | 2 | Signaux de dégradation, 4 niveaux de fidélité |

### 🎭 Simulation incluse
- **Renouvellement Parc IT — 300 postes** : 7 étapes face à un acheteur pur prix (Marc Leblanc). Conséquences narratives par choix, score et analyse détaillée.

---

## 🎮 Mécanique Duolingo

- **Test de niveau initial** → placement automatique Niveaux 1, 2 ou 3
- **4 types d'exercices** : QCM · Dialogue interactif · Remise en ordre · Vrai/Faux
- **Système XP + streak quotidien**
- **28 badges** débloqués progressivement
- **Feedback immédiat** avec explication pédagogique après chaque réponse

---

## 🏗️ Stack technique

```
React 18 + Vite 5
Tailwind CSS 3
Données JSON local (aucune API)
localStorage pour la persistance
```

### Architecture

```
src/
├── data/
│   ├── levels.js          # Registre central ALL_LEVELS, helpers
│   ├── level1.js          # Niveau 1 — 5 modules, 7 leçons, 23 exercices
│   ├── level2.js          # Niveau 2 — 5 modules, 9 leçons, 23 exercices
│   ├── level3.js          # Niveau 3 — 5 modules, 9 leçons, 22 exercices
│   ├── simulation.js      # Simulation IT renouvellement (7 étapes)
│   ├── placementTest.js   # 10 questions + algorithme de placement
│   └── badges.js          # 28 badges avec conditions de déverrouillage
├── hooks/
│   └── useProgress.js     # Reducer global : XP, streak, badges, persistence
└── components/
    ├── App.jsx             # Routeur état-machine
    ├── WelcomeScreen.jsx
    ├── PlacementTest.jsx
    ├── Dashboard.jsx
    ├── LessonView.jsx
    ├── SimulationView.jsx
    ├── ProfileView.jsx
    └── BadgeNotification.jsx
```

---

## 🔧 Étendre le contenu

Pour ajouter des leçons ou des simulations, éditez uniquement les fichiers `src/data/` — aucun changement de composant nécessaire. La structure JSON suit le même schéma dans les 3 niveaux.
