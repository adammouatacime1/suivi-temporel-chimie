const S = String.raw;

const exercises = [
  {
    id: 'quantites', number: '01', level: 'Prendre ses repères', title: 'De la masse et du volume aux moles',
    statement: S`<p>On dispose de <strong>0,654 g de zinc</strong> et de <strong>25,0 mL d’une solution d’acide</strong> de concentration en ions H⁺ égale à 0,200 mol·L⁻¹. On donne \(M(\mathrm{Zn})=65,4\ \mathrm{g\,mol^{-1}}\).</p><p>Calculer les deux quantités initiales en mol puis en mmol. Saisir ci-dessous la quantité initiale de H⁺ <strong>en mmol</strong>.</p>`,
    hints: [S`Pour le solide, utiliser \(n=m/M\). Pour les ions en solution, utiliser \(n=CV\).`, S`Avec C en mol·L⁻¹, convertir 25,0 mL en 0,0250 L. Une mole contient 1 000 mmol.`],
    answer: 5, unit: 'mmol', tolerance: 0.03,
    feedback: 'Oui : 0,00500 mol = 5,00 mmol de H⁺. Le zinc représente 10,0 mmol.',
    retry: 'Vérifie le volume : 25,0 mL = 0,0250 L. Le résultat demandé est en mmol.',
    correction: S`<p>Pour le zinc : \(n_{\mathrm{Zn},0}=0,654/65,4=0,0100\ \mathrm{mol}=10,0\ \mathrm{mmol}\).</p><p>Pour les ions : \(n_{\mathrm{H^+},0}=0,200\times0,0250=0,00500\ \mathrm{mol}=\boxed{5,00\ \mathrm{mmol}}\).</p><p>Le volume utilisé est celui de la solution contenant les ions, avant mélange.</p>`,
    error: 'Multiplier directement 0,200 par 25,0 donne une erreur d’un facteur 1 000 si le résultat est annoncé en mol.'
  },
  {
    id: 'dilution', number: '02', level: 'Prendre ses repères', title: 'Une concentration change après mélange',
    statement: S`<p>On mélange <strong>20,0 mL</strong> d’une solution de HCl de concentration en H⁺ <strong>0,300 mol·L⁻¹</strong> avec <strong>30,0 mL d’eau</strong>. Les volumes sont supposés additifs. Aucune réaction n’a encore lieu ; HCl est totalement dissocié.</p><p>Calculer la concentration en H⁺ après ce mélange, <strong>en mol·L⁻¹</strong>, puis expliquer ce qui a été conservé.</p>`,
    hints: [S`L’ajout d’eau conserve la quantité de soluté : \(C_iV_i=C_fV_f\).`, S`Le volume final est 50,0 mL, et non 30,0 mL. La quantité de H⁺ est 6,00 mmol.`],
    answer: 0.12, unit: 'mol·L⁻¹', tolerance: 0.001,
    feedback: 'Exact : 0,120 mol·L⁻¹. La quantité de H⁺ reste 6,00 mmol ; seule sa répartition dans un plus grand volume change.',
    retry: 'Additionne les deux volumes, puis divise les 6,00 mmol conservées par le volume total en L.',
    correction: S`<p>Avant dilution : \(n_{\mathrm{H^+}}=0,300\times0,0200=0,00600\ \mathrm{mol}\).</p><p>Après mélange : \(V_f=0,0200+0,0300=0,0500\ \mathrm L\), donc \(C_f=0,00600/0,0500=\boxed{0,120\ \mathrm{mol\,L^{-1}}}\).</p><p>La quantité de H⁺ est conservée pendant la dilution. Cette conservation ne s’appliquerait plus à H⁺ pendant une réaction qui le consomme.</p>`,
    error: 'Le volume d’eau ajouté n’est pas le volume final. Une dilution avant réaction et une consommation chimique sont deux phénomènes différents.'
  },
  {
    id: 'tableau', number: '03', level: 'Construire le raisonnement', title: 'Un produit est déjà présent',
    statement: S`<p>La réaction est \(\mathrm{Zn(s)+2H^+(aq)\rightarrow Zn^{2+}(aq)+H_2(g)}\). Initialement : 4,00 mmol de Zn, 10,0 mmol de H⁺, <strong>1,00 mmol de Zn²⁺</strong> et aucun H₂.</p><p>Construire le tableau, calculer toutes les quantités à \(x=1,50\ \mathrm{mmol}\), puis \(x_{\max}\). Saisir la quantité de Zn²⁺ à cet avancement <strong>en mmol</strong>.</p>`,
    hints: [S`Pour un réactif, soustraire son coefficient multiplié par x. Pour un produit, ajouter ce terme à sa quantité initiale.`, S`Pour Zn²⁺ : \(n=1,00+x\), avec toutes les quantités exprimées en mmol.`],
    answer: 2.5, unit: 'mmol', tolerance: 0.02,
    feedback: 'Exact : 2,50 mmol de Zn²⁺ sont présentes, dont 1,00 mmol étaient déjà là.',
    retry: 'Il faut ajouter le produit formé à la quantité de Zn²⁺ initialement présente.',
    correction: S`<div class="table-wrap"><table><caption>Quantités exprimées en mmol</caption><thead><tr><th>État</th><th>Zn</th><th>H⁺</th><th>Zn²⁺</th><th>H₂</th></tr></thead><tbody><tr><th>Initial</th><td>4,00</td><td>10,0</td><td>1,00</td><td>0</td></tr><tr><th>À x</th><td>4,00 − x</td><td>10,0 − 2x</td><td>1,00 + x</td><td>x</td></tr><tr><th>x = 1,50</th><td>2,50</td><td>7,00</td><td>2,50</td><td>1,50</td></tr></tbody></table></div><p>Le maximum permis est \(x_{\max}=\min(4,00;10,0/2)=4,00\ \mathrm{mmol}\). Le zinc est limitant. Si la transformation est totale, les quantités finales sont respectivement 0 ; 2,00 ; 5,00 et 4,00 mmol.</p><p>Résultat demandé : \(\boxed{n(\mathrm{Zn^{2+}})=2,50\ \mathrm{mmol}}\).</p>`,
    error: 'La quantité d’un produit n’est égale à son coefficient multiplié par x que si ce produit est absent initialement.'
  },
  {
    id: 'limitant', number: '04', level: 'Construire le raisonnement', title: 'Le plus petit nombre de moles ne suffit pas',
    statement: S`<p>On fait réagir 0,270 g d’aluminium avec 80,0 mL d’une solution contenant H⁺ à 0,300 mol·L⁻¹. \(M(\mathrm{Al})=27,0\ \mathrm{g\,mol^{-1}}\).</p><p>Équation : \(\mathrm{2Al+6H^+\rightarrow2Al^{3+}+3H_2}\). La transformation est totale. Identifier le réactif limitant, calculer \(x_f\), les quantités restantes et la quantité de H₂ produite. Saisir cette dernière <strong>en mmol</strong>.</p>`,
    hints: [S`Comparer \(n_{\mathrm{Al},0}/2\) et \(n_{\mathrm{H^+},0}/6\).`, S`Les quantités initiales sont 10,0 mmol de Al et 24,0 mmol de H⁺. Les rapports sont donc 5,00 mmol et 4,00 mmol.`],
    answer: 12, unit: 'mmol', tolerance: 0.1,
    feedback: 'Oui : H⁺ est limitant, x_f = 4,00 mmol et n(H₂) = 3x_f = 12,0 mmol.',
    retry: 'Avec cette écriture de l’équation, H₂ a pour coefficient 3. Le produit formé vaut donc 3x_f.',
    correction: S`<p>\(n_{\mathrm{Al},0}=0,270/27,0=10,0\ \mathrm{mmol}\) et \(n_{\mathrm{H^+},0}=0,300\times0,0800=24,0\ \mathrm{mmol}\).</p><p>\(x_{\max}=\min(10,0/2;24,0/6)=4,00\ \mathrm{mmol}\). H⁺ est limitant. La transformation étant totale, \(x_f=x_{\max}\).</p><p>Il reste \(10,0-2\times4,00=2,00\ \mathrm{mmol}\) de Al et aucun H⁺. Il se forme 8,00 mmol de Al³⁺ et \(\boxed{12,0\ \mathrm{mmol}}\) de H₂.</p>`,
    error: 'On compare les quantités divisées par les coefficients, jamais seulement les quantités initiales. La valeur de x dépend de l’écriture choisie de l’équation.'
  },
  {
    id: 'gaz', number: '05', level: 'Relier mesure et avancement', title: 'Du volume de gaz à l’avancement',
    statement: S`<p>On suit \(\mathrm{Zn+2H^+\rightarrow Zn^{2+}+H_2}\). Le gaz formé est recueilli quantitativement dans une seringue, à température et pression constantes. On néglige sa dissolution et on suppose le volume mesuré corrigé de toute vapeur d’eau. Aucun H₂ n’est présent initialement.</p><p>À un instant donné, \(V(\mathrm{H_2})=48,0\ \mathrm{mL}\). Dans les conditions de mesure, \(V_m=24,0\ \mathrm{L\,mol^{-1}}\). Calculer x <strong>en mmol</strong>.</p>`,
    hints: [S`Utiliser \(n(\mathrm{H_2})=V(\mathrm{H_2})/V_m\).`, S`48,0 mL = 0,0480 L. Le coefficient de H₂ est 1, donc \(x=n(\mathrm{H_2})\).`],
    answer: 2, unit: 'mmol', tolerance: 0.02,
    feedback: 'Exact : 0,0480/24,0 = 0,00200 mol, soit x = 2,00 mmol.',
    retry: 'Convertis le volume gazeux en L avant de le diviser par le volume molaire.',
    correction: S`<p>Le tableau donne \(n(\mathrm{H_2})=x\). Ainsi \(x=0,0480/24,0=0,00200\ \mathrm{mol}=\boxed{2,00\ \mathrm{mmol}}\).</p><p>Si le produit gazeux avait pour coefficient \(\nu_G\), on aurait \(x=V_G/(\nu_GV_m)\), en l’absence de ce gaz initialement.</p>`,
    error: 'Le volume gazeux recueilli n’est ni le volume de la solution, ni le volume libre d’une enceinte fermée.'
  },
  {
    id: 'pression', number: '06', level: 'Relier mesure et avancement', title: 'Soustraire la pression initiale',
    statement: S`<p>Une enceinte fermée contient une solution et un espace gazeux constant de 100,0 mL, initialement rempli d’air à \(P_0=100,00\ \mathrm{kPa}\). La réaction \(\mathrm{Zn+2H^+\rightarrow Zn^{2+}+H_2}\) y produit H₂.</p><p>La température est constante, \(T=300\ \mathrm K\), et \(R=8,31\ \mathrm{Pa\,m^3\,mol^{-1}\,K^{-1}}\). On néglige dissolution, fuite et toute autre variation des moles gazeuses. À l’instant t, \(P=124,93\ \mathrm{kPa}\). Calculer x <strong>en mmol</strong>.</p>`,
    hints: [S`Le gaz initial exerce déjà une pression : \(x=V_g(P-P_0)/(RT)\).`, S`\(V_g=1,000\times10^{-4}\ \mathrm{m^3}\) et \(P-P_0=24\,930\ \mathrm{Pa}\).`],
    answer: 1, unit: 'mmol', tolerance: 0.01,
    feedback: 'Exact : la surpression correspond à 1,00 mmol de H₂, donc à x = 1,00 mmol.',
    retry: 'Il faut utiliser la surpression en Pa et le volume gazeux en m³. Le coefficient de H₂ est 1.',
    correction: S`<p>À t = 0 : \(P_0V_g=n_0RT\). À t : \(PV_g=(n_0+x)RT\). La soustraction élimine l’air initial : \((P-P_0)V_g=xRT\).</p><p>\(x=\dfrac{(1,000\times10^{-4})\times24\,930}{8,31\times300}=1,000\times10^{-3}\ \mathrm{mol}=\boxed{1,00\ \mathrm{mmol}}\).</p><p>Ces relations utilisent le volume gazeux libre, qui reste constant, et non le volume de solution.</p>`,
    error: 'Employer P au lieu de P − P₀ attribuerait à la réaction le gaz qui était déjà présent dans l’enceinte.'
  },
  {
    id: 'conductivite', number: '07', level: 'Relier mesure et avancement', title: 'Les ions spectateurs conduisent aussi',
    statement: S`<p>Dans un volume de solution constant \(V=100,0\ \mathrm{mL}\), un ester réagit avec les ions hydroxyde :</p><p>\(\mathrm{CH_3COOC_2H_5+OH^-\rightarrow CH_3COO^-+C_2H_5OH}\).</p><p>Initialement : 12,0 mmol d’ester, 10,0 mmol de OH⁻ et 10,0 mmol de Na⁺ ; aucun ion éthanoate. Les seules espèces ioniques sont Na⁺, OH⁻ et CH₃COO⁻. À température constante, on donne les conductivités molaires ioniques (valeurs arrondies pour l’exercice) : \(\lambda_{\mathrm{Na^+}}=5,00\times10^{-3}\), \(\lambda_{\mathrm{OH^-}}=20,0\times10^{-3}\), \(\lambda_{\mathrm{CH_3COO^-}}=4,00\times10^{-3}\), en S·m²·mol⁻¹.</p><p>À t, la conductivité est 1,54 S·m⁻¹. Établir σ(x) puis calculer x <strong>en mmol</strong>.</p>`,
    hints: [S`Écrire \(\sigma=\lambda_{\mathrm{Na^+}}[\mathrm{Na^+}]+\lambda_{\mathrm{OH^-}}[\mathrm{OH^-}]+\lambda_{\mathrm{CH_3COO^-}}[\mathrm{CH_3COO^-}]\).`, S`Le volume SI vaut \(10^{-4}\ \mathrm{m^3}\) et les concentrations initiales ioniques valent 100 mol·m⁻³. On obtient \(\sigma=2,50-0,0160\,x/V\), avec x en mol et V en m³.`],
    answer: 6, unit: 'mmol', tolerance: 0.06,
    feedback: 'Oui : x = 6,00 mmol. Na⁺ ne réagit pas, mais sa contribution de 0,500 S·m⁻¹ est présente.',
    retry: 'Vérifie les unités SI et conserve le terme de Na⁺. La conductivité diminue car OH⁻ est remplacé par un ion moins conducteur.',
    correction: S`<p>\([\mathrm{Na^+}]=100\), \([\mathrm{OH^-}]=100-x/V\), \([\mathrm{CH_3COO^-}]=x/V\), en mol·m⁻³, avec x en mol et \(V=10^{-4}\ \mathrm{m^3}\).</p><p>\(\sigma=0,00500\times100+0,0200(100-x/V)+0,00400x/V=2,50-0,0160x/V\).</p><p>\(x=\dfrac{(2,50-1,54)10^{-4}}{0,0160}=0,00600\ \mathrm{mol}=\boxed{6,00\ \mathrm{mmol}}\).</p><p>Contrôle : \(0\le x\le10,0\ \mathrm{mmol}\). À la fin d’une transformation totale, \(\sigma_f=0,900\ \mathrm{S\,m^{-1}}\). La mesure demandée est une conductivité σ, pas une conductance G en S ; on passerait de G à σ avec la constante de cellule.</p>`,
    error: 'Utiliser mol·L⁻¹ avec λ en S·m²·mol⁻¹ oublie un facteur 1 000. Un ion spectateur reste nécessaire dans la somme.'
  },
  {
    id: 'dosage', number: '08', level: 'Relier mesure et avancement', title: 'Un prélèvement raconte l’état du mélange',
    statement: S`<p>On suit la décomposition \(\mathrm{2H_2O_2\rightarrow2H_2O+O_2}\). Chaque flacon identique contient initialement 100,0 mL de H₂O₂ à 0,200 mol·L⁻¹. À chaque date, on utilise un <strong>flacon distinct</strong> : on prélève 5,00 mL puis on effectue une trempe dont l’efficacité a été vérifiée. Aucune dilution avant dosage n’est réalisée ; le mélange est homogène et son volume est supposé constant.</p><p>Le prélèvement est dosé en milieu acide par MnO₄⁻ à \(C_T=0,0200\ \mathrm{mol\,L^{-1}}\), selon \(\mathrm{2MnO_4^-+5H_2O_2+6H^+\rightarrow2Mn^{2+}+5O_2+8H_2O}\). Le volume équivalent vaut 12,0 mL.</p><p>Déterminer la quantité de H₂O₂ restante dans le flacon, puis l’avancement de la <strong>réaction suivie</strong>. Saisir x <strong>en mmol</strong>.</p>`,
    hints: [S`Au dosage : \(n(\mathrm{H_2O_2})/5=n(\mathrm{MnO_4^-})/2\). Calculer d’abord la quantité dans les 5,00 mL.`, S`Le prélèvement contient 0,600 mmol de H₂O₂. La concentration restante vaut 0,120 mol·L⁻¹. Pour la réaction suivie : \(n(\mathrm{H_2O_2},t)=n_0-2x\).`],
    answer: 4, unit: 'mmol', tolerance: 0.04,
    feedback: 'Exact : 12,0 mmol de H₂O₂ restent dans le flacon, donc x = (20,0 − 12,0)/2 = 4,00 mmol.',
    retry: 'Distingue les deux équations : le facteur 5/2 appartient au dosage ; le facteur 2 de n₀ − 2x appartient à la décomposition.',
    correction: S`<p>Dans le prélèvement, à l’équivalence : \(n_{\mathrm{H_2O_2},p}=(5/2)C_TV_E=(5/2)\times0,0200\times0,0120=0,000600\ \mathrm{mol}\).</p><p>La concentration restante est \(C(t)=0,000600/0,00500=0,120\ \mathrm{mol\,L^{-1}}\). Le flacon de 0,1000 L contient donc 12,0 mmol ; il en contenait 20,0 mmol au départ.</p><p>Pour la réaction suivie : \(x=(20,0-12,0)/2=\boxed{4,00\ \mathrm{mmol}}\).</p><p>L’usage de flacons distincts évite de retirer successivement du volume et de la matière au même mélange. La trempe doit empêcher une consommation significative avant et pendant la préparation du dosage ; elle ne signifie pas automatiquement que le simple refroidissement arrête toute réaction.</p>`,
    error: 'La quantité dosée appartient au prélèvement, pas au flacon entier. L’équivalence du dosage ne signifie pas que la réaction étudiée était terminée.'
  },
  {
    id: 'tangente', number: '09', level: 'Lire une courbe', title: 'La pente de la tangente, pas la hauteur',
    statement: S`<p>Le volume du mélange est constant : \(V=200\ \mathrm{mL}\). À t = 3,0 min, on trace la tangente à la courbe x(t). Deux points éloignés <strong>de cette tangente</strong> ont pour coordonnées A(2,0 min ; 1,40 mmol) et B(6,0 min ; 3,00 mmol).</p><p>Calculer \(\mathrm dx/\mathrm dt\), puis la vitesse volumique instantanée à 3,0 min, <strong>en mol·L⁻¹·min⁻¹</strong>.</p>`,
    hints: [S`La pente vaut \((x_B-x_A)/(t_B-t_A)\).`, S`La pente vaut 0,400 mmol·min⁻¹. Diviser ensuite par V = 0,200 L et convertir les mmol en mol.`],
    answer: 0.002, unit: 'mol·L⁻¹·min⁻¹', tolerance: 0.00002,
    feedback: 'Oui : v(3,0 min) = 2,00 × 10⁻³ mol·L⁻¹·min⁻¹. Les coordonnées de A et B servent à mesurer la même tangente.',
    retry: 'La pente n’est pas encore la vitesse volumique : il faut la diviser par 0,200 L.',
    correction: S`<p>\(\left.\dfrac{\mathrm dx}{\mathrm dt}\right|_{3\,\mathrm{min}}\simeq\dfrac{3,00-1,40}{6,0-2,0}=0,400\ \mathrm{mmol\,min^{-1}}=4,00\times10^{-4}\ \mathrm{mol\,min^{-1}}\).</p><p>\(v(3,0\ \mathrm{min})=\dfrac{4,00\times10^{-4}}{0,200}=\boxed{2,00\times10^{-3}\ \mathrm{mol\,L^{-1}\,min^{-1}}}\).</p><p>En secondes, on diviserait cette valeur par 60 : \(3,33\times10^{-5}\ \mathrm{mol\,L^{-1}\,s^{-1}}\). A et B sont choisis sur la tangente, même s’ils ne sont pas sur la courbe.</p>`,
    error: 'Calculer x/t mesure la pente d’une droite venant de l’origine, pas nécessairement celle de la tangente au point étudié.'
  },
  {
    id: 'moyenne', number: '10', level: 'Lire une courbe', title: 'Une sécante donne une vitesse moyenne',
    statement: S`<p>Dans une solution de volume constant 150 mL, l’avancement passe de 1,20 mmol à t = 20,0 s à 3,00 mmol à t = 80,0 s.</p><p>Calculer la vitesse volumique moyenne entre ces dates, <strong>en mol·L⁻¹·s⁻¹</strong>. Expliquer quelle droite du graphique fournit cette valeur.</p>`,
    hints: [S`\(v_{\mathrm{moy}}=(x_2-x_1)/(V(t_2-t_1))\).`, S`\(\Delta x=1,80\times10^{-3}\ \mathrm{mol}\), \(\Delta t=60,0\ \mathrm s\) et V = 0,150 L.`],
    answer: 0.0002, unit: 'mol·L⁻¹·s⁻¹', tolerance: 0.000002,
    feedback: 'Exact : 2,00 × 10⁻⁴ mol·L⁻¹·s⁻¹. La droite joignant les deux points est une sécante.',
    retry: 'Utilise les variations : 1,80 mmol en 60,0 s. Il faut aussi tenir compte du volume.',
    correction: S`<p>\(v_{\mathrm{moy}}=\dfrac{(3,00-1,20)\times10^{-3}}{0,150\times(80,0-20,0)}=\boxed{2,00\times10^{-4}\ \mathrm{mol\,L^{-1}\,s^{-1}}}\).</p><p>La pente de la sécante vaut \(3,00\times10^{-5}\ \mathrm{mol\,s^{-1}}\). La division par V donne la vitesse volumique moyenne. Elle ne fournit pas directement la vitesse instantanée à 20 s, à 80 s ou au milieu de l’intervalle.</p>`,
    error: 'Utiliser 80 s au dénominateur oublie que l’intervalle commence à 20 s.'
  },
  {
    id: 'demi', number: '11', level: 'Lire une courbe', title: 'La moitié d’une variation de conductivité',
    statement: S`<p>Une transformation à volume et température constants est suivie par une conductivité affine en x : \(\sigma=\sigma_0+Kx\), avec K négatif. On mesure \(\sigma_0=2,50\ \mathrm{S\,m^{-1}}\) et un plateau final \(\sigma_f=0,900\ \mathrm{S\,m^{-1}}\).</p><div class="table-wrap"><table><caption>Mesures de la même transformation</caption><thead><tr><th>t (s)</th><th>0</th><th>20</th><th>40</th><th>60</th><th>120</th></tr></thead><tbody><tr><th>σ (S·m⁻¹)</th><td>2,50</td><td>2,00</td><td>1,70</td><td>1,45</td><td>1,00</td></tr></tbody></table></div><p>Calculer la conductivité à demi-réaction puis déterminer \(t_{1/2}\) <strong>en secondes</strong>.</p>`,
    hints: [S`À demi-réaction, \(x=x_f/2\). Dans une relation affine, cela correspond au milieu entre la valeur initiale et la valeur finale.`, S`\(\sigma(t_{1/2})=(2,50+0,900)/2=1,70\ \mathrm{S\,m^{-1}}\). Chercher cette valeur dans le tableau.`],
    answer: 40, unit: 's', tolerance: 1,
    feedback: 'Oui : t₁/₂ = 40 s, lorsque σ = 1,70 S·m⁻¹. La moitié de σf ne convient pas ici.',
    retry: 'La valeur à repérer est la moyenne de σ₀ et σf, pas σf/2.',
    correction: S`<p>\(\sigma_f=\sigma_0+Kx_f\), donc \(\sigma(t_{1/2})=\sigma_0+Kx_f/2=(\sigma_0+\sigma_f)/2\).</p><p>On obtient \(\sigma(t_{1/2})=1,70\ \mathrm{S\,m^{-1}}\), atteint à \(\boxed{t_{1/2}=40\ \mathrm s}\).</p><p>La demi-réaction correspond à la moitié de l’avancement final, et non à la moitié d’une durée supposée de fin. Prendre la moitié de la valeur finale de la grandeur mesurée exige une relation proportionnelle à x, donc une valeur initiale nulle.</p>`,
    error: 'σf/2 = 0,450 S·m⁻¹ est même inférieur au plateau : cette valeur ne sera jamais atteinte dans cette évolution.'
  },
  {
    id: 'facteurs', number: '12', level: 'Comparer des expériences', title: 'Plus vite, avec le même état final',
    statement: S`<p>Deux transformations totales ont les mêmes réactifs et quantités initiales : \(x_f=5,00\ \mathrm{mmol}\). Pour illustrer seulement l’allure des courbes, on utilise le <strong>modèle pédagogique</strong> \(x(t)=x_f(1-e^{-kt})\).</p><p>On choisit \(k_{\mathrm{réf}}=0,0200\ \mathrm{s^{-1}}\) et \(k_{\mathrm{rapide}}=0,0500\ \mathrm{s^{-1}}\). Ces choix ne constituent pas une loi quantitative température-vitesse. Comparer les pentes initiales et les temps de demi-réaction. Saisir \(t_{1/2}\) de l’expérience rapide <strong>en secondes</strong>.</p>`,
    hints: [S`Pour ce modèle : \(\mathrm dx/\mathrm dt=kx_fe^{-kt}\) et \(t_{1/2}=\ln(2)/k\).`, S`La pente initiale rapide est 2,5 fois celle de référence. Les deux courbes tendent vers le même xf.`],
    answer: Math.log(2) / 0.05, unit: 's', tolerance: 0.2,
    feedback: 'Exact : environ 13,9 s, contre 34,7 s pour la référence. Les pentes diffèrent ; le plateau reste 5,00 mmol.',
    retry: 'Divise ln(2), soit environ 0,693, par 0,0500 s⁻¹.',
    correction: S`<p>À t = 0, les pentes sont \(k x_f\) : 0,100 mmol·s⁻¹ pour la référence et 0,250 mmol·s⁻¹ pour l’expérience rapide.</p><p>\(t_{1/2,\mathrm{réf}}=0,693147/0,0200=34,7\ \mathrm s\) et \(\boxed{t_{1/2,\mathrm{rapide}}=13,9\ \mathrm s}\).</p><p>La cinétique est différente alors que les deux transformations totales atteignent le même avancement final imposé par leurs quantités initiales. Un catalyseur peut accélérer l’approche de l’état final ; à température fixée, il ne modifie pas l’état d’équilibre final.</p>`,
    error: 'Une courbe plus rapide ne doit pas être dessinée avec un plateau plus haut si seule la vitesse change et si les mêmes quantités initiales conduisent à une transformation totale.'
  },
  {
    id: 'synthese-gaz', number: '13', level: 'Problème de synthèse · 20 min', title: 'Décomposition de l’eau oxygénée',
    statement: S`<p>On introduit 50,0 mL de H₂O₂ à 0,120 mol·L⁻¹ dans un réacteur avec un catalyseur. On étudie \(\mathrm{2H_2O_2(aq)\rightarrow2H_2O(l)+O_2(g)}\). La transformation est totale, le volume de solution reste 50,0 mL. Le dioxygène, absent initialement, est recueilli quantitativement ; dissolution et vapeur d’eau sont négligées. La pression et la température du gaz recueilli sont constantes et \(V_m=24,0\ \mathrm{L\,mol^{-1}}\).</p><div class="table-wrap"><table><caption>Volumes de dioxygène relevés ; 72,0 mL est le plateau final</caption><thead><tr><th>t (s)</th><th>0</th><th>20</th><th>40</th><th>60</th><th>100</th><th>200</th></tr></thead><tbody><tr><th>V(O₂) (mL)</th><td>0</td><td>24,0</td><td>36,0</td><td>45,0</td><td>60,0</td><td>72,0</td></tr></tbody></table></div><ol><li>Calculer la quantité initiale de H₂O₂ et l’avancement final ; vérifier le plateau gazeux.</li><li>Exprimer x à partir du volume gazeux et déterminer le temps de demi-réaction.</li><li>Calculer la vitesse volumique moyenne entre 20 s et 60 s.</li><li>La tangente à V(O₂)(t) à 40 s passe par A(20 s ; 26,0 mL) et B(60 s ; 46,0 mL). En déduire la vitesse volumique instantanée à 40 s.</li><li>Expliquer l’effet d’un catalyseur plus efficace sur le temps de demi-réaction et sur le volume final.</li></ol><p>Saisir le résultat de la question 4 <strong>en mol·L⁻¹·s⁻¹</strong>.</p>`,
    hints: [S`Pour l’équation écrite, \(n(\mathrm{H_2O_2})=n_0-2x\) et \(n(\mathrm{O_2})=x\). Ainsi \(x=V(\mathrm{O_2})/V_m\).`, S`La pente gazeuse de la tangente est 0,500 mL·s⁻¹. La convertir en L·s⁻¹, diviser par Vm, puis par les 0,0500 L de solution.`],
    answer: 0.0005 / 24 / 0.05, unit: 'mol·L⁻¹·s⁻¹', tolerance: 0.000006,
    feedback: 'Oui : v(40 s) ≈ 4,17 × 10⁻⁴ mol·L⁻¹·s⁻¹. Le volume de solution intervient après la conversion du débit gazeux en dx/dt.',
    retry: 'La pente gazeuse vaut 0,500 mL/s ; attention à la conversion mL → L et aux deux volumes de rôles différents.',
    correction: S`<p><strong>1. Bilan.</strong> \(n_0=0,120\times0,0500=0,00600\ \mathrm{mol}\). Pour une transformation totale, \(x_f=n_0/2=3,00\ \mathrm{mmol}\). Donc \(V_{G,f}=x_fV_m=0,00300\times24,0=0,0720\ \mathrm L=72,0\ \mathrm{mL}\), conforme au plateau.</p><p><strong>2. Demi-réaction.</strong> \(x=V_G/V_m\). Comme \(V_G(0)=0\), \(V_G(t_{1/2})=72,0/2=36,0\ \mathrm{mL}\), donc \(t_{1/2}=40\ \mathrm s\).</p><p><strong>3. Vitesse moyenne.</strong> Entre 20 s et 60 s, \(\Delta x=(0,0450-0,0240)/24,0=8,75\times10^{-4}\ \mathrm{mol}\). Ainsi \(v_{\mathrm{moy}}=8,75\times10^{-4}/(0,0500\times40)=4,375\times10^{-4}\ \mathrm{mol\,L^{-1}\,s^{-1}}\), soit \(4,38\times10^{-4}\) à trois chiffres significatifs.</p><p><strong>4. Vitesse instantanée.</strong> \(\mathrm dV_G/\mathrm dt=(46,0-26,0)/(60-20)=0,500\ \mathrm{mL\,s^{-1}}=5,00\times10^{-4}\ \mathrm{L\,s^{-1}}\). Donc \(v=\dfrac1{V V_m}\dfrac{\mathrm dV_G}{\mathrm dt}=\dfrac{5,00\times10^{-4}}{0,0500\times24,0}=\boxed{4,17\times10^{-4}\ \mathrm{mol\,L^{-1}\,s^{-1}}}\).</p><p><strong>5. Catalyse.</strong> Dans les mêmes conditions finales et avec les mêmes quantités initiales, une catalyse plus efficace peut diminuer le temps de demi-réaction ; elle ne change pas les 72,0 mL attendus pour cette transformation totale.</p>`,
    error: 'Le facteur 2 concerne H₂O₂ consommé, pas O₂ formé. Les points de tangente ne sont pas obligatoirement des points expérimentaux de la courbe.'
  },
  {
    id: 'synthese-conductivite', number: '14', level: 'Problème de synthèse · 25 min', title: 'Du zinc suivi par conductimétrie',
    statement: S`<p>On place 0,981 g de zinc dans 200,0 mL d’une solution d’acide chlorhydrique, totalement dissocié, de concentration 0,100 mol·L⁻¹. On étudie \(\mathrm{Zn+2H^+\rightarrow Zn^{2+}+H_2}\), supposée totale. On donne \(M(\mathrm{Zn})=65,4\ \mathrm{g\,mol^{-1}}\). Le volume de solution et la température sont constants ; les effets des bulles sur la cellule sont évités. Les seules espèces ioniques sont H⁺, Cl⁻ et Zn²⁺ ; aucun Zn²⁺ n’est présent initialement.</p><p>Conductivités molaires ioniques arrondies en S·m²·mol⁻¹ : \(\lambda_{\mathrm{H^+}}=35,0\times10^{-3}\), \(\lambda_{\mathrm{Cl^-}}=7,60\times10^{-3}\), \(\lambda_{\mathrm{Zn^{2+}}}=10,6\times10^{-3}\).</p><div class="table-wrap"><table><caption>Conductivités mesurées ; 1,290 S·m⁻¹ est le plateau final</caption><thead><tr><th>t (s)</th><th>0</th><th>20</th><th>40</th><th>60</th><th>120</th><th>240</th></tr></thead><tbody><tr><th>σ (S·m⁻¹)</th><td>4,260</td><td>3,369</td><td>2,775</td><td>2,330</td><td>1,500</td><td>1,290</td></tr></tbody></table></div><ol><li>Déterminer le réactif limitant et l’avancement final. Calculer la quantité de zinc restant.</li><li>Établir \(\sigma=4,260-297x\), avec σ en S·m⁻¹ et x en mol. Justifier le rôle de Cl⁻.</li><li>Calculer x à 40 s puis en déduire le temps de demi-réaction.</li><li>Vérifier la conductivité finale à partir des ions présents au plateau.</li><li>À 40 s, la pente de la tangente à σ(t) vaut −0,0223 S·m⁻¹·s⁻¹. Calculer la vitesse volumique en mol·L⁻¹·s⁻¹.</li></ol><p>Saisir l’avancement à 40 s <strong>en mmol</strong>.</p>`,
    hints: [S`Initialement : 15,0 mmol de Zn et 20,0 mmol de H⁺. Cl⁻ a une quantité constante égale à 20,0 mmol.`, S`Pour la conductivité, utiliser \(V=2,000\times10^{-4}\ \mathrm{m^3}\). Puis \(x=(4,260-\sigma)/297\) en mol.`],
    answer: 5, unit: 'mmol', tolerance: 0.05,
    feedback: 'Exact : x(40 s) = 5,00 mmol = xf/2. Ici le temps de demi-réaction vaut donc 40 s.',
    retry: 'La différence 4,260 − 2,775 vaut 1,485 S/m. La division par 297 donne des mol, à convertir en mmol.',
    correction: S`<p><strong>1. Bilan.</strong> \(n_{\mathrm{Zn},0}=0,981/65,4=0,0150\ \mathrm{mol}\), \(n_{\mathrm{H^+},0}=0,100\times0,2000=0,0200\ \mathrm{mol}\). Donc \(x_f=\min(0,0150;0,0200/2)=0,0100\ \mathrm{mol}\). H⁺ est limitant ; il reste 5,00 mmol de zinc.</p><p><strong>2. Conductivité.</strong> \(V=2,000\times10^{-4}\ \mathrm{m^3}\). Les concentrations SI sont \([\mathrm{H^+}]=(0,0200-2x)/V\), \([\mathrm{Zn^{2+}}]=x/V\) et \([\mathrm{Cl^-}]=0,0200/V=100\ \mathrm{mol\,m^{-3}}\).</p><p>\(\sigma=0,0350(100-2x/V)+0,0106x/V+0,00760\times100=4,260-0,0594x/V=4,260-297x\).</p><p><strong>3. Avancement et demi-réaction.</strong> \(x(40\ \mathrm s)=(4,260-2,775)/297=0,00500\ \mathrm{mol}=\boxed{5,00\ \mathrm{mmol}}\). C’est \(x_f/2\) : \(t_{1/2}=40\ \mathrm s\).</p><p><strong>4. Plateau.</strong> Il n’y a plus de H⁺ ; \([\mathrm{Zn^{2+}}]=50,0\ \mathrm{mol\,m^{-3}}\) et \([\mathrm{Cl^-}]=100\ \mathrm{mol\,m^{-3}}\). Ainsi \(\sigma_f=0,0106\times50,0+0,00760\times100=1,290\ \mathrm{S\,m^{-1}}\), conformément à la mesure.</p><p><strong>5. Vitesse.</strong> \(\mathrm d\sigma/\mathrm dt=-297\,\mathrm dx/\mathrm dt\). Donc \(\mathrm dx/\mathrm dt=0,0223/297=7,51\times10^{-5}\ \mathrm{mol\,s^{-1}}\). Avec le volume en L pour l’unité demandée : \(v=(7,51\times10^{-5})/0,2000=3,75\times10^{-4}\ \mathrm{mol\,L^{-1}\,s^{-1}}\).</p>`,
    error: 'Cl⁻ n’apparaît pas dans l’équation de réaction, mais ne disparaît pas de la solution. Une pente de conductivité négative correspond ici à une vitesse de réaction positive.'
  }
];

const comprehension = [
  { id: 'plateau', question: 'Un plateau de x(t) signifie-t-il forcément que tous les réactifs ont disparu ?', answers: ['Oui, tous les réactifs ont été consommés.', 'Non, l’avancement ne varie plus sensiblement ; un réactif peut rester.'], correct: 1, feedback: 'Un plateau signifie une pente pratiquement nulle à l’échelle de l’observation. Une transformation totale laisse souvent le réactif en excès ; une transformation limitée peut atteindre un équilibre avec plusieurs réactifs présents.' },
  { id: 'pente', question: 'La courbe x(t) est plus haute à t₂ qu’à t₁. Peut-on conclure que v(t₂) est plus grande ?', answers: ['Oui, plus x est grand, plus la réaction est rapide.', 'Non, il faut comparer les pentes des tangentes.'], correct: 1, feedback: 'La hauteur renseigne sur l’avancement déjà atteint. La vitesse renseigne sur sa variation par unité de temps et de volume : elle dépend de la pente, pas de la hauteur.' },
  { id: 'catalyseur', question: 'À température fixée, que modifie un catalyseur ?', answers: ['Il peut accélérer l’approche de l’état final sans modifier l’état d’équilibre final.', 'Il augmente toujours l’avancement final.'], correct: 0, feedback: 'Le catalyseur agit sur la cinétique. À température fixée, il ne modifie pas l’état d’équilibre final ; il ne permet donc pas de déduire un nouveau plateau uniquement parce qu’il accélère la réaction.' },
  { id: 'pression-zero', question: 'Dans une enceinte initialement remplie d’air, la pression à demi-réaction est…', answers: ['La moitié de la pression finale.', 'La moyenne des pressions initiale et finale, si P est affine en x.'], correct: 1, feedback: 'Si P = P₀ + Kx, alors P(t₁/₂) = P₀ + Kxf/2 = (P₀ + Pf)/2. La moitié de Pf conviendrait seulement pour une grandeur initialement nulle et proportionnelle à x.' }
];

function exerciseCard(e) {
  return `<article class="exercise" id="ex-${e.id}">
    <div class="exercise-meta"><span class="eyebrow">Exercice ${e.number} · ${e.level}</span></div>
    <h3>${e.title}</h3>
    <div class="exercise-statement">${e.statement}</div>
    <form class="numeric-check" data-exercise="${e.id}" novalidate>
      <label for="answer-${e.id}">Ta réponse en ${e.unit}</label>
      <div class="answer-row"><input id="answer-${e.id}" name="answer" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-describedby="feedback-${e.id}" placeholder="Valeur numérique"><span class="answer-unit">${e.unit}</span><button type="submit">Vérifier</button></div>
      <p class="answer-feedback" id="feedback-${e.id}" role="status" aria-live="polite"></p>
    </form>
    <div class="hint-buttons"><button type="button" class="secondary" data-hint="hint-${e.id}-1" aria-controls="hint-${e.id}-1" aria-expanded="false">Indice 1</button><button type="button" class="secondary" data-hint="hint-${e.id}-2" aria-controls="hint-${e.id}-2" aria-expanded="false">Indice 2</button></div>
    <div class="callout exercise-hint" id="hint-${e.id}-1" hidden><strong>Indice 1.</strong> ${e.hints[0]}</div>
    <div class="callout exercise-hint" id="hint-${e.id}-2" hidden><strong>Indice 2.</strong> ${e.hints[1]}</div>
    <details class="correction"><summary>Voir la correction détaillée</summary><div class="worked">${e.correction}<p class="warning"><strong>Erreur à éviter.</strong> ${e.error}</p></div></details>
    <label class="understood"><input type="checkbox" data-progress="ex-${e.id}"> J’ai compris la méthode de cet exercice</label>
  </article>`;
}

export function renderExercises() {
  return S`<section class="chapter" id="exercices" aria-labelledby="exercices-title">
    <div class="section-head"><span class="eyebrow">08 · S’entraîner, puis vérifier</span><h2 id="exercices-title">Du premier calcul au problème de synthèse</h2><p class="lead">Douze exercices progressifs, puis deux sujets pour relier les méthodes. Cherche sur papier avant d’ouvrir la correction : le raisonnement compte autant que le résultat.</p></div>
    <div class="callout"><strong>Comment utiliser cet atelier ?</strong> Les indices se dévoilent séparément. Tu peux saisir une virgule française, un point ou une notation comme <code>2e-4</code>. Saisis seulement le nombre dans l’unité indiquée. Une tolérance de lecture et d’arrondi est acceptée ; aucun score ne prétend prédire ta note.</div>
    <div class="exercise-list">${exercises.map(exerciseCard).join('')}</div>
    <section class="understanding-questions" aria-labelledby="understanding-title"><span class="eyebrow">Dire pourquoi</span><h3 id="understanding-title">Quatre questions de compréhension</h3><p>Choisis une réponse, puis lis l’explication, même si tu as juste.</p>
      ${comprehension.map(q => `<article class="exercise comprehension" data-question="${q.id}"><h4>${q.question}</h4><div class="question-options">${q.answers.map((answer, i) => `<button type="button" class="secondary" data-choice="${i}" aria-pressed="false">${answer}</button>`).join('')}</div><p class="answer-feedback" role="status" aria-live="polite"></p></article>`).join('')}
    </section>
  </section>`;
}

/** Accept French decimal commas and scientific notation, without silently stripping units. */
export function parseFrenchNumber(raw) {
  const normalized = String(raw).trim().replace(/[\s\u00a0\u202f]/g, '').replace(/−/g, '-').replace(/,/g, '.').replace(/(?:×|x|\*)10\^([+-]?\d+)$/i, 'e$1');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)) return NaN;
  const result = Number(normalized);
  return Number.isFinite(result) ? result : NaN;
}

export function initExercises() {
  document.querySelectorAll('[data-hint]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.hint);
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      target.hidden = expanded;
    });
  });
  document.querySelectorAll('form[data-exercise]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const exercise = exercises.find(e => e.id === form.dataset.exercise);
      const input = form.elements.answer;
      const output = form.querySelector('.answer-feedback');
      const value = parseFrenchNumber(input.value);
      if (!Number.isFinite(value)) {
        output.textContent = 'Saisis un nombre, par exemple 1,25 ou 2e-4, sans recopier l’unité.';
        output.dataset.result = 'invalid';
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      input.removeAttribute('aria-invalid');
      const correct = Math.abs(value - exercise.answer) <= exercise.tolerance + Number.EPSILON;
      output.dataset.result = correct ? 'correct' : 'retry';
      output.textContent = correct ? exercise.feedback : `Pas encore. ${exercise.retry} Tu peux utiliser les indices et réessayer.`;
    });
  });
  document.querySelectorAll('[data-question]').forEach(card => {
    const question = comprehension.find(q => q.id === card.dataset.question);
    card.querySelectorAll('[data-choice]').forEach(button => {
      button.addEventListener('click', () => {
        card.querySelectorAll('[data-choice]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
        const correct = Number(button.dataset.choice) === question.correct;
        const output = card.querySelector('.answer-feedback');
        output.dataset.result = correct ? 'correct' : 'retry';
        output.textContent = `${correct ? 'Exact.' : 'À revoir.'} ${question.feedback}`;
      });
    });
  });
}
