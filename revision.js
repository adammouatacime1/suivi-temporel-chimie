export function renderRevision() {
return String.raw`
<section id="revision" class="chapter">
  <header class="section-head"><p class="eyebrow">LE PARCOURS EXPRESS</p><h2>Réviser avant le devoir</h2><p class="lead">Une méthode stable vaut mieux qu’une formule choisie au hasard.</p></header>
  <div class="callout"><strong>Si le temps presse</strong><p>Lisez cette fiche, travaillez les exercices <a href="#ex-tableau">3 : avancement</a>, <a href="#ex-pression">6 : pression</a>, <a href="#ex-tangente">9 : tangente</a> et <a href="#ex-demi">11 : demi-réaction</a>, puis résolvez une synthèse sans regarder le corrigé. Revenez au cours dès qu’une étape reste inexpliquée.</p></div>
  <h3>La chaîne de raisonnement à retenir</h3>
  <ol><li><strong>Équation équilibrée.</strong> Quels sont les réactifs, les produits, les coefficients ?</li><li><strong>État initial.</strong> Convertir les volumes et les masses ; calculer \(n_0=m/M\) ou \(n_0=CV\). Après mélange, distinguer \(n_0\) de \(C_0=n_0/V_{\text{total}}\).</li><li><strong>Tableau d’avancement.</strong> Écrire chaque \(n_i(t)\), puis calculer \(x_{\max}\). N’écrire \(x_f=x_{\max}\) que si la transformation est totale.</li><li><strong>Mesure → avancement.</strong> Partir de la grandeur mesurée et de la ligne du tableau correspondante. Isoler \(x(t)\), sans oublier les valeurs initiales.</li><li><strong>Courbe → pente.</strong> Tracer la tangente, choisir deux points éloignés sur cette droite, calculer \(\Delta x/\Delta t\), puis diviser par le volume du mélange réactionnel.</li><li><strong>Demi-réaction.</strong> Lire le plateau \(x_f\), puis chercher l’instant où \(x=x_f/2\).</li><li><strong>Vérification.</strong> À \(t=0\), retrouve-t-on l’état initial ? Les quantités restent-elles positives ? Les unités sont-elles cohérentes ?</li></ol>
  <div class="quick-grid">
    <article><h3>Avancement</h3><p>Pour \(aA+bB\to cC+dD\) :</p>\[n_A=n_{A,0}-ax,\quad n_C=n_{C,0}+cx\]\[x_{\max}=\min\left(\frac{n_{A,0}}a,\frac{n_{B,0}}b\right)\]<p>Les coefficients sont sans unité ; \(x\) est en mol.</p></article>
    <article><h3>Vitesse à volume constant</h3>\[v=\frac1V\frac{dx}{dt}=-\frac1a\frac{d[A]}{dt}=\frac1c\frac{d[C]}{dt}\]<p>Avec \(x\) en mol, \(V\) en L et \(t\) en s : \(v\) en mol·L⁻¹·s⁻¹. Convertir la pente en mol/s avant de diviser par \(V\).</p></article>
    <article><h3>Gaz et pression</h3>\[x=\frac{V_G}{\nu_GV_m}\qquad x=\frac{V_g(P-P_0)}{\nu_GRT}\]<p>Gaz recueilli sans pertes, volume ramené aux conditions de \(V_m\). Pour la pression : enceinte fermée, \(T\) et espace gazeux \(V_g\) constants, seul le gaz produit change la quantité gazeuse. Utiliser Pa, m³, K.</p></article>
    <article><h3>Demi-réaction</h3>\[x(t_{1/2})=\frac{x_f}{2}\]\[Y=Y_0+kx\Rightarrow Y(t_{1/2})=\frac{Y_0+Y_f}{2}\]<p>Le milieu entre les valeurs initiale et finale convient aussi si \(Y\) diminue. \(Y_f/2\) convient seulement si \(Y_0=0\).</p></article>
  </div>
  <h3>Mini-exemple : relier toutes les étapes</h3>
  <div class="worked"><p>On fait réagir 1,30 g de Zn (\(M=65,0\ \mathrm{g\,mol^{-1}}\)) avec 100 mL d’acide de concentration en H⁺ de 0,50 mol/L. Le volume de solution reste 0,100 L. Réaction totale : \(\mathrm{Zn+2H^+\to Zn^{2+}+H_2}\).</p><p>\(n_{\mathrm{Zn},0}=1,30/65,0=0,0200\ \mathrm{mol}\), \(n_{H^+,0}=0,50\times0,100=0,0500\ \mathrm{mol}\). Donc \(x_f=x_{\max}=\min(0,0200;0,0250)=0,0200\ \mathrm{mol}\) : Zn est limitant.</p><p>Il reste \(0,0500-2(0,0200)=0,0100\ \mathrm{mol}\) de H⁺. Si la tangente à 30 s passe par \((10\ \mathrm{s};6,0\ \mathrm{mmol})\) et \((50\ \mathrm{s};14,0\ \mathrm{mmol})\), sa pente est \(8,0/40=0,200\ \mathrm{mmol/s}\). La vitesse vaut \(v=2,00\times10^{-4}/0,100=2,00\times10^{-3}\ \mathrm{mol\,L^{-1}\,s^{-1}}\).</p><p>Pour le temps de demi-réaction, chercher \(x=10,0\ \mathrm{mmol}\). Ici, le point de tangence est à 30 s ; la droite donne \(x(30)=6,0+0,200(30-10)=10,0\ \mathrm{mmol}\). On en déduit donc \(t_{1/2}=30\ \mathrm{s}\), pour cette évolution croissante. Deux points quelconques d’une tangente, sans connaître la date du point de tangence ni la courbe, ne suffiraient pas.</p></div>
  <h3>Avant de rendre la copie</h3><ul><li>J’ai annoncé les hypothèses : transformation totale ? volume constant ? température constante ?</li><li>Chaque résultat est accompagné d’une unité et d’une phrase d’interprétation.</li><li>J’ai gardé les coefficients stœchiométriques dans le passage de \(n\) à \(x\) et dans les dérivées.</li><li>Je compare les pentes au même instant et les plateaux séparément.</li></ul>
  <button type="button" data-print>Imprimer le cours et les corrigés</button><p class="print-note">Le bouton « Imprimer » en haut du site ouvre l’impression du cours complet et de tous les corrigés. Choisissez « Enregistrer en PDF » pour conserver une copie.</p>
</section>
<section id="glossaire" class="chapter"><header class="section-head"><p class="eyebrow">LE LANGAGE DU CHAPITRE</p><h2>Symboles & unités</h2></header>
<dl class="glossary-list">
<dt>\(n_i\)</dt><dd>Quantité de matière de l’espèce \(i\), en mol ; 1 mmol = 10⁻³ mol.</dd>
<dt>\(C,[X]\)</dt><dd>Concentration molaire : quantité par volume de solution. Usuelle : mol/L ; SI : mol/m³. 1 mol/L = 1 000 mol/m³.</dd>
<dt>\(m,M\)</dt><dd>Masse (g) et masse molaire (g/mol) lorsque \(n=m/M\).</dd>
<dt>\(a,b,c,d,\nu_G\)</dt><dd>Coefficients stœchiométriques positifs, sans unité. \(\nu_G\) est celui du gaz formé.</dd>
<dt>\(x(t)\)</dt><dd>Avancement à l’instant \(t\), en mol. Dans ce cours, \(x(0)=0\) même si un produit est présent initialement.</dd>
<dt>\(x_{\max}\)</dt><dd>Avancement maximal permis par les quantités initiales des réactifs, en mol.</dd>
<dt>\(x_f\)</dt><dd>Avancement final effectivement atteint, en mol ; il peut être inférieur à \(x_{\max}\).</dd>
<dt>\(V\)</dt><dd>Volume du mélange réactionnel dans \(v=(1/V)dx/dt\). Ne pas le remplacer par le volume d’un prélèvement.</dd>
<dt>\(V_G,V_g,V_m\)</dt><dd>Volume de gaz produit (L ou m³), volume de l’espace gazeux (m³ en SI), volume molaire gazeux (L/mol ou m³/mol selon l’unité choisie).</dd>
<dt>\(t,t_{1/2}\)</dt><dd>Temps et temps de demi-réaction, en s ou min ; 1 min = 60 s.</dd>
<dt>\(dx/dt\)</dt><dd>Pente de la tangente à \(x(t)\), en mol/s si \(x\) est en mol et \(t\) en s.</dd>
<dt>\(v\)</dt><dd>Vitesse volumique de réaction ; mol·L⁻¹·s⁻¹, ou en SI mol·m⁻³·s⁻¹.</dd>
<dt>\(P,P_0,T,R\)</dt><dd>Pressions en Pa, température absolue en K (\(T=\theta+273,15\)), constante \(R=8,314\ \mathrm{Pa\,m^3\,mol^{-1}\,K^{-1}}\). 1 hPa = 100 Pa ; 1 kPa = 1 000 Pa.</dd>
<dt>\(\sigma,\lambda_i\)</dt><dd>Conductivité en S/m et conductivité molaire ionique en S·m²/mol. Dans \(\sigma=\sum\lambda_i[X_i]\), les concentrations sont en mol/m³.</dd>
<dt>\(G,K_{\mathrm{cell}}\)</dt><dd>Conductance \(G=I/U\) en S ; constante de cellule \(K_{\mathrm{cell}}=\ell/S_{\mathrm{électrode}}\) en m⁻¹ ; \(\sigma=K_{\mathrm{cell}}G\).</dd>
<dt>\(A,k\)</dt><dd>Absorbance sans unité et constante dans \(A=kC\) (L/mol si \(C\) est en mol/L). Dans le modèle exponentiel des simulations, \(k\) désigne une autre constante, en min⁻¹.</dd>
</dl></section>
<section id="erreurs" class="chapter"><header class="section-head"><p class="eyebrow">POUR GARDER LES POINTS QUI COMPTENT</p><h2>Les erreurs qui coûtent des points</h2></header>
<ol class="error-list">
<li><strong>Confondre concentration et quantité.</strong> Mélanger dilue les espèces, mais ne fait pas disparaître de soluté avant la réaction. Toujours écrire \(n=CV\) avec le volume de la solution qui possède cette concentration.</li>
<li><strong>Choisir le plus petit nombre de moles comme limitant.</strong> Comparer les rapports \(n_0/\nu\). Avec 3 mmol de Zn et 4 mmol de H⁺, H⁺ est limitant puisque \(4/2=2<3\).</li>
<li><strong>Confondre produit total et produit formé.</strong> Si \(n_{C,0}\ne0\), alors \(n_C=n_{C,0}+cx\), donc \(x=(n_C-n_{C,0})/c\).</li>
<li><strong>Diviser la hauteur par le temps pour obtenir une vitesse instantanée.</strong> \(x(t)/t\) est une moyenne depuis 0 quand \(x(0)=0\). Pour l’instantané, il faut la pente de la tangente.</li>
<li><strong>Utiliser deux points de la courbe pour une tangente.</strong> Les deux points doivent appartenir à la droite tangente. Une sécante donne une vitesse moyenne.</li>
<li><strong>Oublier le volume ou un coefficient.</strong> \(dx/dt\) n’est pas \(v\) ; et \(-d[H^+]/dt=2v\) pour Zn + 2 H⁺.</li>
<li><strong>Prendre la moitié d’une pression finale.</strong> Avec \(P_0=100\ \mathrm{kPa}\), \(P_f=140\ \mathrm{kPa}\), la demi-réaction correspond à 120 kPa, pas 70 kPa.</li>
<li><strong>Oublier les ions spectateurs.</strong> Ils ne figurent pas dans l’équation ionique simplifiée, mais contribuent à la conductivité totale.</li>
<li><strong>Introduire des litres dans \(PV=nRT\) avec \(R=8,314\).</strong> Le volume doit être en m³. 100 mL = 0,100 L = 10⁻⁴ m³ ; 100 cm³ = 100 mL.</li>
<li><strong>Assimiler un plateau à un épuisement certain.</strong> Il signifie une évolution devenue non mesurable à l’échelle étudiée ; un équilibre peut aussi donner un plateau. Pour conclure au limitant épuisé, il faut la transformation totale.</li>
<li><strong>Déclarer qu’une réaction ralentit toujours.</strong> Les cas habituels du chapitre ralentissent souvent quand les réactifs s’épuisent. Échauffement, autocatalyse et mécanismes complexes peuvent conduire à d’autres évolutions.</li>
<li><strong>Dire qu’un catalyseur augmente forcément \(x_f\).</strong> À température fixée, il accélère l’accès à l’état final d’équilibre sans modifier cet équilibre. Une variation de température peut, elle, modifier aussi l’équilibre.</li>
</ol><div class="callout"><strong>La bonne habitude</strong><p>Avant tout calcul, écrire en une phrase ce que la mesure permet de connaître. Par exemple : « La surpression donne la quantité de H₂ formé, donc l’avancement puisque son coefficient vaut 1. »</p></div></section>`;
}
