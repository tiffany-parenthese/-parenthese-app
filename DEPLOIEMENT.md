# 🚀 Déploiement Parent'Hèse sur Vercel

## Ce dont tu as besoin
- Un compte **GitHub** (gratuit) → github.com
- Un compte **Vercel** (gratuit) → vercel.com (connexion avec GitHub)

---

## Étape 1 — Installer les outils sur ton ordinateur

Ouvre un terminal (sur Mac : CMD+Espace → "Terminal") et tape :

```bash
# Vérifier que Node.js est installé (version 18+)
node --version

# Si pas installé → télécharger sur nodejs.org
```

---

## Étape 2 — Préparer le projet localement

```bash
# Dans le terminal, aller dans le dossier du projet
cd parenthese-deploy

# Installer les dépendances
npm install

# Tester en local (ouvre http://localhost:5173)
npm run dev
```

Si l'app s'affiche dans le navigateur → ✅ tout fonctionne.

---

## Étape 3 — Mettre le projet sur GitHub

1. Va sur **github.com** → "New repository"
2. Nom : `parenthese-app` → "Create repository"
3. Dans le terminal :

```bash
git init
git add .
git commit -m "Initial commit - Parent'Hèse"
git remote add origin https://github.com/TON-USERNAME/parenthese-app.git
git push -u origin main
```

---

## Étape 4 — Déployer sur Vercel

1. Va sur **vercel.com** → "Add New Project"
2. Importe ton repo GitHub `parenthese-app`
3. Vercel détecte automatiquement que c'est Vite/React
4. Clique **"Deploy"**
5. Dans 2 minutes tu as une URL : `https://parenthese-app.vercel.app`

---

## Mise à jour de l'app

Quand tu veux mettre à jour (nouveau fichier App.tsx) :

```bash
# Copier le nouveau fichier
cp nouveau-familygo.tsx src/App.tsx

# Pousser sur GitHub
git add .
git commit -m "Mise à jour"
git push

# Vercel redéploie automatiquement ✨
```

---

## ⚠️ Différences avec la version Claude.ai

| Fonctionnalité | Claude.ai | Web (Vercel) |
|---|---|---|
| Données privées | Stockage Claude | localStorage (navigateur) |
| Données partagées | Partagées entre users | Locales au navigateur |
| Compte utilisateur | Stockage Claude | localStorage |
| Fonctionnel offline | ✅ | ✅ |

**Les données "partagées"** (activités communautaires, événements admin) ne sont pas
encore vraiment partagées entre utilisateurs sur le web — c'est ce que le backend
résoudra plus tard.
