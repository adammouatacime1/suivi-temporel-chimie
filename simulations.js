// All model quantities use mmol, minutes and litres unless explicitly converted.
export const model = (t, xf = 4, k = 0.3) => xf * (1 - Math.exp(-k * Math.max(0, t)));
export const derivative = (t, xf = 4, k = 0.3) => xf * k * Math.exp(-k * Math.max(0, t));
export const halfTime = k => Math.log(2) / k;
export function zincState(zinc, acid, requested) {
  const zn = Math.max(0, Number(zinc) || 0), h = Math.max(0, Number(acid) || 0);
  const xmax = Math.min(zn, h / 2), x = Math.max(0, Math.min(xmax, Number(requested) || 0));
  return { xmax, x, zn: zn - x, h: h - 2 * x, zn2: x, h2: x,
    limiting: Math.abs(zn - h / 2) < 1e-9 ? 'mélange stœchiométrique : les deux réactifs s’épuisent ensemble' : zn < h / 2 ? 'zinc Zn' : 'ions H⁺' };
}
export function pressure(t, gasVolumeL = 0.5) {
  return 101300 + model(t) / 1000 * 8.314 * 298 / (gasVolumeL / 1000);
}
const f = (n, digits = 2) => Number(n).toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: digits });
const range = (id, label, min, max, step, value) => `<label for="${id}">${label}</label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;
const playback = id => `<div class="playback" role="group" aria-label="Lecture de la simulation"><button type="button" data-play="${id}">Lecture</button><button type="button" data-pause="${id}" disabled>Pause</button><button type="button" data-reset="${id}">Recommencer</button><span class="play-status" id="${id}-status" role="status">En pause · avancez aussi avec le curseur.</span></div>`;
const timeline = id => `${range(`${id}-time`, 'Temps t (min) · progression manuelle', 0, 20, 0.05, 0)}${playback(id)}`;

export function renderSimulations() {
  return String.raw`<section class="chapter" id="simulations" aria-labelledby="simulations-title">
    <header class="section-head"><p class="eyebrow">Laboratoire interactif</p><h2 id="simulations-title">Voir les relations prendre vie</h2><p>Cinq manipulations pour relier les espèces, les mesures et les courbes. Rien ne démarre automatiquement. Toutes les valeurs sont accessibles sans animation.</p></header>
    <p class="callout">Les courbes temporelles utilisent le <strong>modèle pédagogique</strong> \(x(t)=x_f(1-e^{-kt})\). Il illustre une transformation totale qui ralentit : ce n’est ni une loi universelle, ni un ajustement de mesures expérimentales. Sauf indication, \(x_f=4{,}00\,\mathrm{mmol}\), \(k=0{,}30\,\mathrm{min^{-1}}\), \(V=0{,}100\,\mathrm L\).</p>

    <article class="sim-card" id="sim-zinc"><p class="eyebrow">Module 01 · Conserver la matière</p><h3>Le tableau d’avancement vivant</h3><p class="formula">\(\mathrm{Zn(s)+2H^+(aq)\rightarrow Zn^{2+}(aq)+H_2(g)}\)</p><p>Pour chaque millimole d’avancement : 1 mmol de Zn et 2 mmol de H⁺ disparaissent ; 1 mmol de chacun des produits apparaît.</p>
      <div class="sim-grid"><div class="controls"><label for="zinc-initial">Quantité initiale de Zn (mmol)</label><input type="number" id="zinc-initial" min="0" max="10" step="0.1" value="4"><label for="acid-initial">Quantité initiale de H⁺ (mmol)</label><input type="number" id="acid-initial" min="0" max="20" step="0.1" value="10">${range('s1-time', 'Avancement x (mmol)', 0, 4, 0.01, 0)}${playback('s1')}<div id="s1-values" class="readouts" aria-live="off"></div></div><div><div id="zinc-particles" class="diagram"></div><p class="caption">Chaque disque représente un ensemble de 0,5 mmol d’une espèce, et non un atome. Le dernier disque est partiellement opaque si l’ensemble est incomplet. Les nombres du tableau sont les valeurs exactes du modèle.</p></div></div>
      <div class="table-wrap"><table><caption>Quantités de matière en mmol ; produits absents au départ</caption><thead><tr><th>Espèce</th><th>Initial</th><th>Variation</th><th>À l’avancement x</th></tr></thead><tbody id="zinc-table"></tbody></table></div><p class="warning">Le curseur décrit des états possibles, pas une loi temporelle. Ici, « Lecture » parcourt artificiellement les avancements de 0 à xₘₐₓ ; elle ne simule pas la cinétique réelle du zinc. Les ions spectateurs ne sont pas représentés.</p>
    </article>

    <article class="sim-card" id="sim-tangent"><p class="eyebrow">Module 02 · Lire une pente</p><h3>Courbe, tangente et vitesse</h3><p>Déplacez le point : sa hauteur indique l’avancement ; la pente de la tangente indique sa dérivée. La vitesse volumique divise cette pente par le volume de solution, ici 0,100 L.</p><div id="tangent-chart" class="chart"></div><div class="controls">${timeline('s2')}<label class="check-label"><input id="show-secant" type="checkbox"> Afficher une sécante sur un intervalle de 3 min</label></div><div class="readouts" id="tangent-values"></div><p class="caption">Trait plein : x(t) ; trait discontinu : tangente ; pointillés : sécante optionnelle. La sécante utilise deux états distincts de la même courbe ; elle donne une vitesse moyenne.</p><p class="formula">\(\dfrac{dx}{dt}=k x_f e^{-kt}\qquad v(t)=\dfrac{1}{V}\dfrac{dx}{dt}\)</p>
    </article>

    <article class="sim-card" id="sim-half"><p class="eyebrow">Module 03 · Mesurer une durée caractéristique</p><h3>Construire le temps de demi-réaction</h3><p>Partez de x<sub>f</sub>/2 sur l’axe vertical, rejoignez la courbe horizontalement, puis descendez vers l’axe des temps. Le plateau est une limite : il n’est pas atteint en une durée finie dans ce modèle.</p><div id="half-chart" class="chart"></div><div class="controls">${timeline('s3')}<label class="check-label"><input id="half-solution" type="checkbox" checked> Afficher la construction et sa valeur</label>${range('half-guess', 'À vous : placer un repère de temps (min)', 0, 20, 0.05, 5)}<output id="half-guess-value" for="half-guess">Mon repère : 5,00 min</output><button type="button" id="half-check">Vérifier mon repère</button><p id="half-feedback" role="status">Pour vous entraîner, masquez d’abord la construction.</p></div><div class="readouts" id="half-values"></div><p class="formula">\(x(t_{1/2})=x_f/2 \Rightarrow e^{-kt_{1/2}}=1/2 \Rightarrow t_{1/2}=\ln(2)/k\)</p>
    </article>

    <article class="sim-card" id="sim-pressure"><p class="eyebrow">Module 04 · Mesurer pour connaître x</p><h3>Du gaz à la pression</h3><p>Une transformation produit 1 mole de gaz par mole d’avancement dans une enceinte fermée. La solution reste à 298 K ; le volume de l’espace gazeux est constant pendant chaque expérience. L’air initial contribue à P₀.</p><div class="sim-grid"><div id="pressure-vessel" class="diagram"></div><div class="controls">${range('gas-volume', 'Volume gazeux Vg (L)', 0.2, 1, 0.05, 0.5)}<output id="gas-volume-value" for="gas-volume"></output>${timeline('s4')}<div class="readouts" id="pressure-values"></div></div></div><div id="pressure-chart" class="chart"></div><p class="formula">\(P-P_0=\dfrac{xRT}{V_g}\quad\Longleftrightarrow\quad x=\dfrac{V_g(P-P_0)}{RT}\)</p><p class="callout">Changer Vg change seulement la sensibilité de la mesure dans ce modèle : x(t) et k restent identiques. Chaque nouvelle configuration suppose la même pression initiale P₀ = 1 013 hPa. La formule suppose aussi l’absence d’autre variation du nombre de moles gazeuses ; la pression de vapeur est constante. Pour le calcul SI : 1 L = 10⁻³ m³ ; 1 hPa = 100 Pa ; x en mol ; R = 8,314 Pa·m³·mol⁻¹·K⁻¹.</p>
    </article>

    <article class="sim-card" id="sim-factors"><p class="eyebrow">Module 05 · Comparer deux expériences</p><h3>Plus rapide, jusqu’au même état final</h3><p>Mêmes quantités initiales et transformation totale : x<sub>f</sub> = 4,00 mmol dans les deux expériences. La référence a k = 0,30 min⁻¹ ; l’autre courbe utilise un k plus grand.</p><div class="controls"><label for="factor-choice">Facteur à interpréter</label><select id="factor-choice"><option value="temperature">Température plus élevée</option><option value="concentration">Réactifs moins dilués</option><option value="surface">Solide plus divisé</option><option value="catalyst">Présence d’un catalyseur</option></select>${range('factor-ratio', 'Rapport de constantes krapide/kréf (illustratif)', 1.2, 4, 0.1, 2)}<output id="factor-ratio-value" for="factor-ratio"></output></div><p id="factor-explanation" class="callout"></p><div id="factors-chart" class="chart"></div><div class="controls">${timeline('s5')}</div><div class="readouts" id="factor-values"></div><p class="warning">Les rapports de k sont choisis pour comparer les courbes. Aucune température réelle, loi température-vitesse ou donnée expérimentale n’est attribuée à ces valeurs. Un facteur cinétique n’impose pas en général le même avancement final : c’est ici une hypothèse de transformation totale avec mêmes quantités initiales. À température fixée, un catalyseur ne change pas l’état d’équilibre final.</p>
    </article>
    <p class="callout">À retenir : l’état, la mesure et la vitesse sont trois informations différentes.</p>
  </section>`;
}

const W = 640, H = 355, L = 65, R = 25, T = 32, B = 56;
function chart({ id, title, curves, marks = '', ymax = 4.4, ymin = 0, unit = 'x (mmol)', yticks = [0, 1, 2, 3, 4] }) {
  const px = t => L + t / 20 * (W - L - R), py = y => H - B - (y - ymin) / (ymax - ymin) * (H - T - B);
  const ticks = [0, 5, 10, 15, 20].map(t => `<line x1="${px(t)}" y1="${T}" x2="${px(t)}" y2="${H - B}" stroke="currentColor" opacity=".10"/><text x="${px(t)}" y="${H - B + 23}" text-anchor="middle">${t}</text>`).join('') + yticks.map(y => `<line x1="${L}" y1="${py(y)}" x2="${W - R}" y2="${py(y)}" stroke="currentColor" opacity=".10"/><text x="${L - 10}" y="${py(y) + 5}" text-anchor="end">${f(y, 0)}</text>`).join('');
  const paths = curves.map(c => { const path = Array.from({ length: 161 }, (_, i) => {const t = i / 8; return `${i ? 'L' : 'M'}${px(t).toFixed(2)},${py(c.fn(t)).toFixed(2)}`;}).join(' '); return `<path d="${path}" fill="none" stroke="${c.color}" stroke-width="3" ${c.dash ? `stroke-dasharray="${c.dash}"` : ''}/>`; }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">Axe horizontal : temps de 0 à 20 minutes. Axe vertical : ${unit}. Les valeurs au temps choisi sont données sous le graphique.</desc><defs><clipPath id="${id}-clip"><rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}"/></clipPath></defs>${ticks}<path d="M${L},${T}V${H - B}H${W - R}" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="${L}" y="19">${unit}</text><text x="${W - R}" y="${H - 13}" text-anchor="end">t (min)</text><g clip-path="url(#${id}-clip)">${paths}${typeof marks === 'function' ? marks(px, py) : marks}</g></svg>`;
}
const dot = (x, y, color = '#bd5a34') => `<circle cx="${x}" cy="${y}" r="5.5" fill="${color}" stroke="var(--surface, white)" stroke-width="2"/>`;
const teal = 'var(--curve-ref, #277e79)', amber = 'var(--curve-fast, #bd5a34)', purple = 'var(--curve-third, #8070c1)';

export function initSimulations() {
  const $ = id => document.getElementById(id);
  if (!$('simulations')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controllers = [];
  function player(id, render) {
    const input = $(`${id}-time`), play = document.querySelector(`[data-play="${id}"]`), pause = document.querySelector(`[data-pause="${id}"]`), reset = document.querySelector(`[data-reset="${id}"]`), status = $(`${id}-status`);
    let frame = 0, previous = 0, elapsed = 0, playing = false, position = +input.value;
    function stop(message = 'En pause · curseur disponible.') { playing = false; input.dataset.playing = 'false'; cancelAnimationFrame(frame); play.disabled = Number(input.max) === 0; pause.disabled = true; status.textContent = message; }
    function draw(timestamp) {
      if (!playing) return;
      if (!previous) previous = timestamp;
      const delta = timestamp - previous; previous = timestamp; elapsed += delta;
      if (!reduced.matches || elapsed >= 800) {
        const span = Number(input.max) - Number(input.min), increment = reduced.matches ? span / 20 : delta * span / 16000;
        position = Math.min(Number(input.max), position + increment); input.value = position; elapsed = 0; render();
        if (position >= Number(input.max)) { stop('Lecture terminée · recommencez ou déplacez le curseur.'); return; }
      }
      frame = requestAnimationFrame(draw);
    }
    play.addEventListener('click', () => { if (+input.max <= 0) return; if (+input.value >= +input.max) input.value = input.min; position = +input.value; playing = true; input.dataset.playing = 'true'; previous = 0; elapsed = 0; play.disabled = true; pause.disabled = false; status.textContent = reduced.matches ? 'Lecture par étapes · mouvement réduit.' : 'Lecture en cours.'; frame = requestAnimationFrame(draw); });
    pause.addEventListener('click', () => stop()); reset.addEventListener('click', () => { stop('Recommencé au début.'); input.value = input.min; render(); }); input.addEventListener('input', () => { stop(); render(); });
    controllers.push(stop); render(); return stop;
  }
  function numberField(id, max, update) {
    $(id).addEventListener('input', () => {
      const n = Number($(id).value);
      if (Number.isFinite(n) && (n < 0 || n > max)) $(id).value = Math.min(max, Math.max(0, n));
      update();
    });
    $(id).addEventListener('change', () => {
      const n = Number($(id).value);
      $(id).value = Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0;
      update();
    });
  }
  function drawZinc() {
    const state = zincState($('zinc-initial').value, $('acid-initial').value, $('s1-time').value);
    $('s1-time').max = state.xmax; $('s1-time').value = state.x; document.querySelector('[data-play="s1"]').disabled = state.xmax === 0 || $('s1-time').dataset.playing === 'true';
    $('s1-values').innerHTML = `<p><strong>x = ${f(state.x)} mmol</strong> · xₘₐₓ = ${f(state.xmax)} mmol</p><p>Limitant : ${state.limiting}.</p>`;
    const rows = [['Zn(s)', +$('zinc-initial').value, '−x', state.zn], ['H⁺(aq)', +$('acid-initial').value, '−2x', state.h], ['Zn²⁺(aq)', 0, '+x', state.zn2], ['H₂(g)', 0, '+x', state.h2]];
    $('zinc-table').innerHTML = rows.map(([name, initial, variation, current]) => `<tr><th scope="row">${name}</th><td>${f(initial)}</td><td>${variation}</td><td><strong>${f(current)}</strong></td></tr>`).join('');
    $('zinc-particles').innerHTML = `<svg viewBox="0 0 600 250" role="img" aria-label="Population des quatre espèces, proportionnelle aux quantités du tableau">${rows.map(([name, , , n], species) => {const x0 = 15 + species * 150; return `<text x="${x0 + 65}" y="23" text-anchor="middle">${name}</text><rect x="${x0}" y="36" width="132" height="173" rx="12" fill="none" stroke="currentColor" opacity=".25"/>${Array.from({ length: Math.ceil(n / 0.5) }, (_, i) => `<circle cx="${x0 + 15 + i % 5 * 25}" cy="${54 + Math.floor(i / 5) * 20}" r="6" fill="${[teal, amber, purple, '#48865b'][species]}" opacity="${Math.min(1, n / 0.5 - i)}"/>`).join('')}<text x="${x0 + 65}" y="237" text-anchor="middle">${f(n)} mmol</text>`;}).join('')}</svg>`;
  }
  const stopZinc = player('s1', drawZinc); numberField('zinc-initial', 10, () => {stopZinc(); drawZinc();}); numberField('acid-initial', 20, () => {stopZinc(); drawZinc();});
  function drawTangent() {
    const t = +$('s2-time').value, x = model(t), slope = derivative(t), a = Math.min(t, 17), b = a + 3, average = (model(b) - model(a)) / 3, secant = $('show-secant').checked;
    $('tangent-chart').innerHTML = chart({id:'tangent-svg', title:'Avancement, tangente et sécante', curves:[{fn:model,color:teal}], marks:(px,py)=> `<line x1="${px(0)}" y1="${py(x-slope*t)}" x2="${px(20)}" y2="${py(x+slope*(20-t))}" stroke="${amber}" stroke-width="2" stroke-dasharray="9 5"/>${secant ? `<line x1="${px(a)}" y1="${py(model(a))}" x2="${px(b)}" y2="${py(model(b))}" stroke="${purple}" stroke-width="3" stroke-dasharray="3 4"/>${dot(px(a),py(model(a)),purple)}${dot(px(b),py(model(b)),purple)}` : ''}${dot(px(t),py(x))}` });
    $('tangent-values').innerHTML = `<p><strong>t = ${f(t)} min</strong> · x = ${f(x,3)} mmol</p><p>Pente instantanée dx/dt = <strong>${f(slope,3)} mmol·min⁻¹</strong></p><p>v = <strong>${f(slope / 0.1,3)} mmol·L⁻¹·min⁻¹</strong> = ${f(slope/100,5)} mol·L⁻¹·min⁻¹</p>${secant ? `<p>Sécante de ${f(a)} à ${f(b)} min : Δx/Δt = ${f(average,3)} mmol·min⁻¹ ; v<sub>moy</sub> = ${f(average / 0.1,3)} mmol·L⁻¹·min⁻¹.</p>` : ''}`;
  }
  player('s2', drawTangent); $('show-secant').addEventListener('change', drawTangent);
  function drawHalf() {
    const t = +$('s3-time').value, half = halfTime(0.3), show = $('half-solution').checked, guess = +$('half-guess').value;
    $('half-chart').innerHTML = chart({id:'half-svg',title:'Construction du temps de demi-réaction',curves:[{fn:model,color:teal}],marks:(px,py)=>`<line x1="${px(0)}" y1="${py(4)}" x2="${px(20)}" y2="${py(4)}" stroke="currentColor" stroke-dasharray="8 5"/><text x="${px(18)}" y="${py(4)-8}">xf = 4</text>${show ? `<path d="M${px(0)},${py(2)}H${px(half)}V${py(0)}" fill="none" stroke="${amber}" stroke-width="2" stroke-dasharray="6 4"/><text x="${px(half)+9}" y="${py(2)-10}">xf/2 = 2</text>${dot(px(half),py(2),amber)}` : ''}${dot(px(t),py(model(t)))}<path d="M${px(guess)-6},${py(0)}l6,-10l6,10z" fill="${purple}"/>`});
    $('half-values').innerHTML = `<p>Point mobile : t = ${f(t)} min ; x(t) = ${f(model(t),3)} mmol.</p><p>x<sub>f</sub> = 4,00 mmol ; x<sub>f</sub>/2 = 2,00 mmol.${show ? ` <strong>t₁/₂ = ln(2)/0,30 = ${f(half,3)} min.</strong>` : ' Construction masquée pour l’exercice.'}</p>`;
    $('half-guess-value').textContent = `Mon repère (triangle) : ${f(guess)} min`;
  }
  player('s3',drawHalf); $('half-solution').addEventListener('change',drawHalf); $('half-guess').addEventListener('input',drawHalf);
  $('half-check').addEventListener('click',()=>{const delta=Math.abs(+$('half-guess').value-halfTime(.3)); $('half-feedback').textContent = `${delta <= .25 ? 'Bien placé !' : 'À ajuster.'} Le temps recherché est 2,31 min (tolérance graphique : 0,25 min). À cet instant, x = 2,00 mmol, soit la moitié de l’avancement final ; il ne s’agit pas de la moitié des 20 min affichées.`;});
  function drawPressure() {
    const t=+$('s4-time').value, volume=+$('gas-volume').value, x=model(t), p=pressure(t,volume), pmax=pressure(20,volume)/100, max=Math.ceil(pmax/50)*50;
    $('gas-volume-value').textContent=`Vg = ${f(volume)} L = ${f(volume/1000,5)} m³`;
    $('pressure-values').innerHTML=`<p>t = ${f(t)} min ; <strong>x = ${f(x,3)} mmol</strong></p><p>P₀ = 1 013 hPa ; <strong>P = ${f(p/100,1)} hPa</strong></p><p>ΔP = ${f((p-101300)/100,1)} hPa ; n(gaz formé) = ${f(x,3)} mmol.</p>`;
    $('pressure-vessel').innerHTML=`<svg viewBox="0 0 520 310" role="img" aria-label="Récipient fermé, espace gazeux constant, solution et capteur de pression"><path d="M90 62H310V264Q310 280 292 280H108Q90 280 90 264Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M93 170H307V263Q307 277 291 277H109Q93 277 93 263Z" fill="${teal}" opacity=".2"/><rect x="83" y="48" width="234" height="17" rx="4" fill="var(--text, #233e3b)"/><path d="M273 48V23H404V65" fill="none" stroke="currentColor" stroke-width="4"/><rect x="350" y="65" width="145" height="68" rx="8" fill="var(--surface,white)" stroke="currentColor" stroke-width="2"/><text x="423" y="92" text-anchor="middle">Capteur</text><text x="423" y="117" text-anchor="middle">${f(p/100,1)} hPa</text><text x="200" y="94" text-anchor="middle">Gaz : Vg = ${f(volume)} L</text><text x="200" y="238" text-anchor="middle">Solution · T = 298 K</text>${Array.from({length:Math.ceil(x*3)},(_,i)=>`<circle cx="${112+i%6*32}" cy="${118+Math.floor(i/6)*30}" r="5" fill="${amber}"/>`).join('')}<text x="200" y="305" text-anchor="middle">Enceinte fermée · schéma symbolique</text></svg>`;
    const ticks=[1000, Math.round((1000+max)/2),max]; $('pressure-chart').innerHTML=chart({id:'pressure-svg',title:'Pression en fonction du temps à volume gazeux fixé',unit:'P (hPa)',ymin:1000,ymax:max+15,yticks:ticks,curves:[{fn:u=>pressure(u,volume)/100,color:teal}],marks:(px,py)=>dot(px(t),py(p/100))});
  }
  const stopPressure=player('s4',drawPressure); $('gas-volume').addEventListener('input',()=>{stopPressure(); drawPressure();});
  const explanations={temperature:'Une température plus élevée accélère souvent une transformation. Ici, le rapport de k est un choix de visualisation ; il n’est associé à aucune valeur de température.',concentration:'Des réactifs moins dilués réagissent souvent plus vite. Pour conserver les mêmes quantités initiales, on peut comparer deux volumes de solution différents : la courbe représente alors x, pas une concentration. Le rapport de k reste illustratif.',surface:'À quantité identique de solide, une poudre présente souvent une surface accessible plus grande qu’un bloc. Il faut que la réaction ait lieu à cette interface ; la masse de réactif n’est pas augmentée.',catalyst:'Un catalyseur fournit un mécanisme réactionnel plus rapide et est régénéré. À température fixée, il permet d’atteindre plus vite le même état d’équilibre ; il n’en change pas la composition.'};
  function drawFactors(){const t=+$('s5-time').value, ratio=+$('factor-ratio').value, k=.3*ratio; $('factor-ratio-value').textContent=`krapide/kréf = ${f(ratio,1)} ; krapide = ${f(k,2)} min⁻¹`;
    $('factor-explanation').textContent=explanations[$('factor-choice').value];
    $('factors-chart').innerHTML=chart({id:'factors-svg',title:'Comparaison référence et expérience plus rapide',curves:[{fn:model,color:teal},{fn:u=>model(u,4,k),color:amber,dash:'9 5'}],marks:(px,py)=>`${dot(px(t),py(model(t)),teal)}${dot(px(t),py(model(t,4,k)),amber)}<line x1="${px(0)}" y1="${py(4)}" x2="${px(20)}" y2="${py(4)}" stroke="currentColor" stroke-dasharray="3 5"/>`});
    $('factor-values').innerHTML=`<p><strong>Référence (trait plein)</strong> : t₁/₂ = ${f(halfTime(.3))} min ; pente initiale = 1,20 mmol·min⁻¹.</p><p><strong>Plus rapide (tirets)</strong> : t₁/₂ = ${f(halfTime(k))} min ; pente initiale = ${f(4*k)} mmol·min⁻¹.</p><p>À t = ${f(t)} min : x<sub>réf</sub> = ${f(model(t),3)} mmol et x<sub>rapide</sub> = ${f(model(t,4,k),3)} mmol. Les deux limites sont x<sub>f</sub> = 4,00 mmol.</p>`;
  }
  const stopFactors=player('s5',drawFactors); $('factor-ratio').addEventListener('input',()=>{stopFactors();drawFactors();}); $('factor-choice').addEventListener('change',()=>{stopFactors();drawFactors();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden) controllers.forEach(stop=>stop());});
  reduced.addEventListener('change',()=>controllers.forEach(stop=>stop('Lecture en pause après changement du réglage de mouvement.')));
}
