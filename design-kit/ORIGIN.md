# Provenance et utilisation dans le cours de chimie

Les fichiers `src/styles.css`, `src/Core.tsx`, `src/index.ts`, `README.md`,
`DESIGN-SYSTEM.md`, `INTEGRATION.md` et `resources/README.md` sont des copies
inchangées du dossier `design-kit` du laboratoire de diffraction, à la révision
`b11607e208d996535705630ee71d9bcd30e64857` (branche
`livraison-diffraction-lab-3d`). La documentation d’origine décrit l’ensemble du
kit React et renvoie aussi à ses exemples et captures, disponibles dans ce dépôt
d’origine. Ces exemples ne sont pas nécessaires au site de chimie.

Le cours de chimie conserve son moteur JavaScript et ses schémas scientifiques.
Il utilise la feuille de styles du kit et les classes `lk-` dans une racine
`.lab-kit`, avec le thème local `data-lab-theme`. Les éventuelles adaptations de
mise en page appartiennent au fichier `styles.css` du cours ; la feuille source
du kit reste intacte. Les composants React de référence sont fournis comme
documentation : le site de chimie ne charge ni React ni ReactDOM.

`../icons.js` fournit douze icônes SVG dont les dessins et attributs sont copiés
de `lucide-react` **0.468.0**, téléchargé depuis le registre npm officiel. Les
clés internes à React sont omises lors de la sérialisation SVG. Cette adaptation
permet de conserver exactement les tracés sans ajouter React aux dépendances.
La notice originale du paquet est conservée dans `ICON-LICENSE`.

`resources/diffraction-mark.svg` accompagne la documentation source ; cette
marque appartient au laboratoire d’origine et n’est pas l’identité du cours de
chimie. Le pictogramme de chimie utilise l’icône Lucide `flask-conical`.
