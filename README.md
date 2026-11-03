# suivi-temporel-chimie

Un cours interactif en français pour la **2e Bac Sciences Mathématiques A (Maroc)** : suivi temporel d’une transformation chimique et vitesse de réaction.

## Étudier

Deux parcours : comprendre le cours de bout en bout ou réviser avant un devoir. Le site comprend sept chapitres, cinq simulations, douze exercices progressifs et deux synthèses corrigées, quatre questions de compréhension, une fiche de révision, un glossaire et les erreurs fréquentes.

Les modèles des simulations sont pédagogiques et explicitement annoncés. Les quantités, pentes et pressions sont calculées à partir du même modèle. Les commandes permettent de lire, mettre en pause, recommencer ou choisir manuellement un état. Le réglage système « réduire les animations » est respecté.

Le thème et les cases « J’ai compris » sont conservés dans le stockage local du navigateur. Aucun compte, backend, clé API, collecte de données ou ressource distante à la lecture. Le bouton **Imprimer le cours et les corrigés**, également disponible dans la fiche de révision sur téléphone, déplie les corrigés pendant l’impression puis restaure leur état.

## Développement local

Prérequis : Node.js 24, npm et Python 3.

```sh
npm ci
npm test
npm run dev
```

Le serveur écoute sur le port 8000. `npm run dev` génère d’abord `dist/` puis le sert. Après une modification, exécuter `npm run build` et recharger la page ; le serveur peut rester lancé. Aucun transpileur ni framework n’est nécessaire.

```sh
npm run build
python3 -m http.server 8000 --directory dist
```

KaTeX est une dépendance de construction épinglée avec lockfile. Son JavaScript, sa feuille de style, ses polices et sa licence sont versionnés dans `vendor/katex/` pour permettre la publication directe depuis la racine. Après une mise à jour de KaTeX et du lockfile, exécuter `npm run vendor` et versionner les ressources synchronisées. Le build recopie ces ressources et le PDF dans `dist/`. Tout le dossier `dist/` constitue le site publiable ; les chemins relatifs fonctionnent sous le sous-chemin GitHub Pages du dépôt.

## Modifier le contenu

- `course.js` : les sept chapitres, exemples et schémas SVG.
- `exercises.js` : énoncés, indices, réponses attendues, tolérances et corrections.
- `simulations.js` : modèles numériques, graphiques et commandes.
- `revision.js` : fiche de révision, glossaire et erreurs fréquentes.
- `styles.css`, `index.html`, `app.js` : présentation, navigation, thème et progression.

Les formules utilisent `\( ... \)` ou `\[ ... \]` dans des chaînes `String.raw`. Conserver les identifiants de section et d’exercice pour préserver les liens et les cases déjà enregistrées. Après changement d’un calcul ou d’un modèle, mettre à jour et exécuter les tests.

## Vérification

`npm test` vérifie les bilans stœchiométriques, les bornes, la dérivée, la demi-réaction, les conversions SI, les nombres français et la structure des exercices.

Un test fonctionnel complet est fourni dans `tests/browser.py`. Il nécessite Python Playwright et Chromium (chemin configurable par `CHROMIUM_PATH`). Avec le serveur de `dist/` lancé :

```sh
python3 tests/browser.py http://127.0.0.1:8000/
```

Il teste les largeurs 320, 375, 390, 768 et 1440 px, les 14 réponses numériques, les 28 indices, les corrections, les QCM, les cinq simulations, les modes de mouvement, la persistance, le thème, les liens, les formules et l’impression. Les captures et le PDF de vérification sont écrits dans `/tmp/`. L’émulation Chromium ne remplace pas un essai sur Safari/iOS réel.

## Publication gratuite sur GitHub Pages

Le réglage actif est **Settings → Pages → Deploy from a branch → main → /(root)**. La racine contient directement le site complet : `index.html`, les modules, `vendor/katex/` et `docs/cours-et-corriges.pdf`. Il n’est pas nécessaire de changer ce réglage ni de construire le site pour le publier. Le dépôt doit être public pour bénéficier du fonctionnement gratuit standard de GitHub Pages.

Chaque push sur `main` déclenche la publication GitHub Pages depuis cette racine. Le workflow `.github/workflows/pages.yml` vérifie les tests et le build, sans lancer de second déploiement. Le dossier `dist/` reste une copie autonome utile pour les tests et d’autres hébergements statiques.

Le bouton **PDF** et la fiche de révision ouvrent `./docs/cours-et-corriges.pdf`, une vraie ressource du site utilisable depuis un téléphone. Ce PDF est une photographie imprimable du cours ; après modification du contenu, le régénérer avec le bouton Imprimer ou le script ci-dessous, puis versionner le fichier :

```sh
# Avec le serveur local lancé et Python Playwright + Chromium disponibles :
python3 scripts/export-pdf.py http://127.0.0.1:8000/ docs/cours-et-corriges.pdf
npm run build
```

L’URL déployée est affichée par GitHub dans **Settings → Pages**. Aucun domaine payant n’est nécessaire. Après une modification du contenu, faire un commit puis un push sur `main` ; ne pas modifier directement les fichiers générés de `dist/`.
