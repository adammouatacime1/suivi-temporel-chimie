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

KaTeX est une dépendance de construction épinglée avec lockfile. Le build copie son JavaScript, sa feuille de style, ses polices et sa licence dans `dist/vendor/katex/`. Tout le dossier `dist/` constitue le site publiable ; les chemins relatifs fonctionnent sous le sous-chemin GitHub Pages du dépôt.

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

Le workflow `.github/workflows/pages.yml` construit et publie `dist/` à chaque push sur `main`, ou sur lancement manuel. Dans le dépôt GitHub, **Settings → Pages → Build and deployment → Source : GitHub Actions** doit être activé. Le compte doit disposer du droit de configurer Pages et Actions. Le dépôt doit être public pour bénéficier du fonctionnement gratuit standard de GitHub Pages.

Une fois Pages activé, relancer le workflow **Publier le cours sur GitHub Pages** si son premier passage a échoué. L’URL réellement déployée est affichée par GitHub dans **Settings → Pages** et dans l’environnement `github-pages`. Aucun domaine payant n’est nécessaire.

Une modification du contenu suivie d’un commit et d’un push sur `main` déclenche la mise à jour. Ne pas modifier directement les fichiers générés de `dist/`.
