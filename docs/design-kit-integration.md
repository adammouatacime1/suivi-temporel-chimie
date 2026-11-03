# Intégration du langage visuel Diffraction Lab

Cette note décrit la provenance et les règles d’adaptation du design de Diffraction Lab au cours **Suivi temporel d’une transformation chimique — vitesse de réaction**. Le kit fournit une interface ; les équations, le cours, les exercices et les modèles de chimie restent ceux de ce dépôt.

## Provenance exacte

- Dépôt de référence : [`adammouatacime1/diffraction-lab-3d`](https://github.com/adammouatacime1/diffraction-lab-3d).
- Branche examinée : `livraison-diffraction-lab-3d`.
- Révision de distribution du kit examinée : **`b11607e208d996535705630ee71d9bcd30e64857`**.
- [Système visuel à cette révision](https://github.com/adammouatacime1/diffraction-lab-3d/blob/b11607e208d996535705630ee71d9bcd30e64857/design-kit/DESIGN-SYSTEM.md), [CSS source](https://github.com/adammouatacime1/diffraction-lab-3d/blob/b11607e208d996535705630ee71d9bcd30e64857/design-kit/src/styles.css), [composants et contrats](https://github.com/adammouatacime1/diffraction-lab-3d/blob/b11607e208d996535705630ee71d9bcd30e64857/design-kit/src/Core.tsx).
- La documentation du kit précise une seconde révision : **`db725076835a54065b8a59cf7c2b8375f4856e49`**. C’est la révision de l’application de diffraction dont le langage visuel a été relevé et dont les captures ont été faites ; ce n’est pas la révision de distribution du kit ci-dessus.
- Références visuelles examinées : ordinateur clair et sombre en 1 440 × 1 000 px, mobile clair en 390 × 844 px, dans `design-kit/references/` du dépôt source. Métadonnées : `capture-metadata.json`, captures du 21 octobre 2026, densité 1. Les images montrent l’application de diffraction réelle, pas le site de chimie.

Les documents utiles sont également conservés dans [design-kit](../design-kit/README.md). Les captures de référence servent à comparer composition et thèmes ; elles ne sont pas utilisées comme images de fond ou comme simulations.

## Tokens repris du kit

Les noms ci-dessous sont ceux du kit, sous la racine `.lab-kit`. L’application de chimie peut les relier à ses variables sémantiques existantes (`--bg`, `--surface`, `--ink`, etc.) sans modifier leurs fonctions.

| Rôle | Token source | Clair | Sombre |
| --- | --- | --- | --- |
| Page | `--lk-bg` | `#edf2f5` | `#121c24` |
| Panneau | `--lk-panel` | `#ffffff` | `#1b2934` |
| Fond secondaire | `--lk-panel-soft` | `#f6f9fb` | `#22323e` |
| Texte principal | `--lk-text` | `#243b49` | `#dce7ee` |
| Texte secondaire source | `--lk-muted` | `#7c8e99` | `#94a7b5` |
| Séparation | `--lk-line` | `#e6edf1` | `#2c3d48` |
| Accent | `--lk-accent` | `#218ca2` | `#64c2d2` |
| Fond d’accent | `--lk-accent-soft` | `#e9f5f6` | `#24424c` |
| Vue scientifique CSS | `--lk-scene` | `#e8f1f7` | `#162a38` |

Les ombres source sont très légères : `0 4px 24px #28485904` en clair et `0 5px 24px #00000011` en sombre. Les panneaux sont surtout délimités par une bordure de 1 px et un rayon de 13 px. Les commandes utilisent un rayon de 7 px ; les onglets un cadre de 10 px.

La pile typographique est `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. **Aucune police Inter n’est téléchargée ni distribuée.** Sur iPhone, la police système prend le relais. `Georgia, serif` reste adapté aux symboles italiques ; KaTeX conserve ses propres polices mathématiques locales. Les valeurs calculées utilisent des chiffres tabulaires et la virgule française.

## Organisation à respecter

| Élément du kit | Adaptation au site de chimie |
| --- | --- |
| `LabHeader` | Bandeau clair/sombre, marque de chimie, thème, PDF/impression et accès au sommaire. |
| `WorkspaceHeading` | Surtitre de chapitre, titre sans-serif et introduction sur le fond de page. La hiérarchie est celle d’un espace de travail scientifique. |
| Modes | Les deux parcours existants, « Comprendre le cours » et « Réviser avant le devoir », prennent la forme de commandes segmentées. |
| `LabLayout` | Sommaire et progression à gauche sur ordinateur ; contenu principal à droite. |
| `Panel` / `ExperimentList` | Sommaire numéroté en panneau, entrée courante signalée, progression dans un panneau distinct. |
| `SimulationCard` | Titre de module, paramètres, scène SVG, commandes de lecture et explication. Aucun moteur de diffraction n’est importé. |
| `MetricGrid` | Valeurs calculées avec leur grandeur, leur valeur et leur unité, sans information portée uniquement par la couleur. |
| `Callout` / avertissement | Explications, exemples et limites du modèle ; le contenu pédagogique reste intégral. |

Repères dimensionnels source : largeur maximale 1 800 px ; bandeau de 80 px, marges latérales de 36 px ; introduction `34px 36px 25px` ; colonne latérale de 266 px, intervalle de 22 px ; cartes espacées de 16 px. Les titres de l’espace de travail sont à 30 px sur ordinateur, 28 px sous 850 px et 26 px sous 600 px. Les en-têtes de panneaux ont une marge interne de 17 px ; les titres des simulations sont à 16 px.

Les adaptations responsive suivent le même rythme : sous 1 150 px, colonne de 240 px et marges de 22 px ; sous 850 px, colonne de 210 px et marges de 16 px ; sous 600 px, une colonne et marges de 12 px. Le kit dispose les réglages après la simulation sur mobile. Un long cours conserve cependant sa progression de lecture et son accès au sommaire : le bouton de sommaire du site constitue une adaptation d’usage, pas un nouveau mode scientifique.

Un parcours qui rejoint une ancre reste un **lien natif**. Son apparence segmentée ne justifie pas un faux `role="tab"`. Un véritable groupe d’onglets, s’il est ajouté ultérieurement, devra fournir les panneaux correspondants et les touches fléchées, Début et Fin décrites dans le kit.

## Adaptation statique, sans migration React

Le site conserve ses modules JavaScript et son rendu HTML/SVG. Le kit livré propose des composants React, mais leur installation n’est pas nécessaire pour reprendre ses tokens, dimensions, organisation et états. Le portage est fait dans les fichiers HTML et CSS existants ; le kit n’impose ni React, ni Three.js, ni Vite au modèle de chimie.

Les correspondances d’interface ne doivent pas changer les identifiants utilisés par les contrôles, les données de progression ou les ancres. Les fonctions de calcul restent dans leurs modules ; le CSS ne modifie pas les valeurs scientifiques. Les ressources restent locales et leurs chemins relatifs sont compatibles avec le sous-chemin GitHub Pages.

Le site pilote déjà son thème avec `data-theme` sur `html`. Le site synchronise cet état existant avec `data-lab-theme` sur `body.lab-kit` : les thèmes viennent donc bien de la racine locale du kit, tandis que les clés de stockage existantes sont conservées. La distribution source du kit, elle, utilise `data-lab-theme` sur chaque racine `.lab-kit` pour isoler plusieurs laboratoires. Ne pas annoncer que ces deux contrats sont identiques.

Les pictogrammes de chimie peuvent être des SVG locaux simples. La marque d’ondes de Diffraction Lab identifie le laboratoire source ; elle ne doit pas être présentée comme le logo scientifique d’un cours de cinétique. La provenance et les notices Lucide du dossier `resources` sont à conserver si des ressources correspondantes sont réutilisées.

## Lisibilité et accessibilité : adaptations explicites

Le kit reproduit fidèlement un laboratoire dense. Il contient des sous-titres de 5 à 8 px et des textes d’interface de 9 à 12 px. Le cours est une lecture longue : ses paragraphes, exercices, légendes utiles et consignes gardent une taille confortable, généralement de **14 à 16 px au minimum**, avec un interligne d’environ 1,7. Les petits corps du kit ne servent pas à réduire le texte pédagogique.

La politique de zoom laisse les commandes natives du navigateur disponibles : la balise viewport ne comporte ni `maximum-scale` ni `user-scalable=no`. Sur iPhone, le lecteur peut agrandir avec le geste de zoom ; sur ordinateur, avec le zoom du navigateur. Les champs de saisie passent à 16 px sur téléphone pour éviter l’agrandissement automatique de Safari. Les boutons tactiles et leurs zones de focus conservent une cible d’au moins 44 px, même lorsque leur dessin reprend les commandes compactes du kit.

Les différences de contraste doivent être documentées, plutôt que d’attribuer au kit une conformité qu’il ne revendique pas. Calcul WCAG sur les couleurs hexadécimales opaques :

| Texte / fond | Rapport calculé | Conséquence |
| --- | --- | --- |
| Secondaire source `#7c8e99` / blanc | 3,39:1 | Insuffisant pour un petit texte utile. |
| Secondaire source `#7c8e99` / page `#edf2f5` | 3,01:1 | Insuffisant pour un petit texte utile. |
| Accent source `#218ca2` / blanc | 3,93:1 | Éviter de l’utiliser seul pour un petit texte de lecture. |
| Secondaire sombre `#94a7b5` / panneau `#1b2934` | 5,98:1 | Contraste suffisant pour du texte courant. |

Accommodations appliquées : employer le texte principal pour les explications essentielles ; utiliser un secondaire de lecture plus sombre **`#5b7180`** en clair, qui donne 5,10:1 sur blanc et 4,52:1 sur le fond de page ; pour les petits liens, un accent de lecture **`#166d80`** donne 5,94:1 sur blanc et 5,27:1 sur la page. Ces variantes sont des adaptations locales ; les tokens source restent inchangés. Sur le fond de scène, les légendes utilisent le texte principal pour dépasser 4,5:1. Le bouton de parcours reprend le fond `#243e4e` du bouton Lecture du kit avec son texte blanc (11,2:1), car le primaire turquoise source avec un petit texte blanc ne dépasse pas 3,93:1. Les liens restent identifiables par leur soulignement ou leur contexte de commande. Les formes, pointillés, libellés et unités continuent de distinguer les séries graphiques.

Les montages SVG conservent leurs légendes HTML lisibles sur téléphone. Les simulations restent compréhensibles à l’arrêt et leurs curseurs accessibles au clavier. La préférence de réduction des animations concerne à la fois les transitions CSS et le démarrage des animations JavaScript ; reprendre seulement la palette ne suffit pas à préserver ces comportements.

## Vérifier les mises à jour

Après une modification du thème ou des espacements : comparer une vue 1 440 × 1 000 et une vue 390 × 844 dans les deux thèmes ; vérifier les titres, les cartes et les commandes. À 390 px et avec un zoom accru, contrôler l’absence de débordement horizontal de page, les formules, les légendes et les groupes de boutons. Vérifier aussi le sommaire au clavier, le lien PDF et la progression locale.

Les contrôles scientifiques existants restent nécessaires : une adaptation d’interface ne dispense pas de `npm test` et de `npm run build`. Les captures source sont des références de composition ; elles ne prouvent pas à elles seules le fonctionnement du site de chimie ni une identité de rendu entre polices et navigateurs.

## Composants effectivement intégrés

La feuille source `design-kit/src/styles.css` est inchangée, chargée avant l’unique adaptateur `styles.css`. `app.js` associe les classes `lk-` aux éléments existants et compose les en-têtes des simulations sans changer leurs identifiants ou leurs gestionnaires. Les champs numériques gardent leur type et leurs bornes ; seule leur enveloppe reprend `lk-parameter-label` / `lk-number-unit`. Les 12 icônes Lucide locales proviennent de la version 0.468.0 ; leur licence est conservée. Les deux séries graphiques utilisent le bleu `#218dba` et l’orange `#c26a46` de la source, avec traits continus/pointillés et légendes conservés. Les réglages du tableau vivant passent après son schéma sur mobile, comme les réglages du kit.

## Résultats de cette intégration

Vérifications du 3 novembre 2026 :

- `npm test` : **8 tests réussis**, dont bilans, dérivées, demi-réaction, pression, réponses françaises et ressources de publication.
- `npm run build` : réussi, kit et icônes inclus dans `dist/` avec des chemins relatifs.
- `tests/design.py` : **88 contrôles réussis**. Les 12 grandes sections conservent leurs textes, formules TeX, légendes SVG et paramètres. Les tokens et la police correspondent au kit source ; les deux thèmes sont contrôlés à 390, 600, 768 et 1440 px, avec contrastes, cibles de 44 px et focus clavier.
- `tests/browser.py` sur `/suivi-temporel-chimie/` : les 14 réponses, 28 indices, corrections, 4 QCM et 5 simulations fonctionnent ; sauvegarde locale, impression, thèmes, animations et réduction des mouvements vérifiés. Les largeurs 320, 375, 390, 768 et 1440 px n’ont pas de débordement de page.
- Comparaison visuelle : accueil et simulations en clair/sombre avec les captures du laboratoire et de l’exemple du kit ; cours et exercice vérifiés sur une fenêtre 390 × 844.
- PDF régénéré avec le nouveau style d’impression : 53 pages et les 14 corrections présentes. Son URL reste identique.

Ces essais sont effectués dans Chromium avec des dimensions de téléphone ; ils ne constituent pas un essai sur un iPhone physique avec Safari. Le dépôt de diffraction est resté inchangé.

Les rares formules inline plus longues que la colonne passent dans un défilement local accessible au clavier, recalculé à l’ouverture des corrigés et au redimensionnement. Aucune expression n’est raccourcie. Les liens directs aux sections sont repositionnés après le chargement des polices pour conserver les ancres sous l’en-tête.
