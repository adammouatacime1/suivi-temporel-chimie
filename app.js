import { icon } from './icons.js';
import { renderCourse } from './course.js';
import { renderSimulations, initSimulations } from './simulations.js';
import { renderExercises, initExercises } from './exercises.js';
import { renderRevision } from './revision.js';

document.querySelector('#course-content').innerHTML = renderCourse();
document.querySelector('#simulation-content').innerHTML = renderSimulations();
document.querySelector('#exercise-content').innerHTML = renderExercises();
document.querySelector('#revision-content').innerHTML = renderRevision();
// Presentation adapters: reuse the canonical kit classes without changing the
// scientific modules, their controls, labels, IDs, values or event handlers.
const presentationClasses = {
  '.chapter': 'lk-panel', '.path-card': 'lk-panel', '.reading-note': 'lk-callout',
  '.eyebrow': 'lk-eyebrow', '.sim-card': 'lk-simulation',
  '.pdf-button': 'lk-button', '.text-button': 'lk-text-button',
  '.check-label': 'lk-toggle'
};
for (const [selector, className] of Object.entries(presentationClasses)) {
  document.querySelectorAll(selector).forEach(el => el.classList.add(className));
}
document.querySelectorAll('main button').forEach(button => button.classList.add('lk-button'));
document.querySelectorAll('.controls input[type="number"]').forEach(input => {
  const label = document.querySelector(`label[for="${input.id}"]`);
  if (!label) return;
  const parameter = document.createElement('div');
  parameter.className = 'lk-parameter';
  const row = document.createElement('div');
  row.className = 'lk-parameter-label';
  const number = document.createElement('div');
  number.className = 'lk-number-unit';
  label.before(parameter);
  parameter.append(row);
  row.append(label, number);
  number.append(input);
});

document.querySelectorAll('.sim-card').forEach(card => {
  const eyebrow = card.querySelector(':scope > .eyebrow');
  const title = card.querySelector(':scope > h3');
  const header = document.createElement('header');
  const copy = document.createElement('div');
  header.className = 'lk-simulation-heading';
  copy.className = 'lk-simulation-title';
  header.append(copy);
  card.prepend(header);
  if (eyebrow) copy.append(eyebrow);
  if (title) copy.append(title);
});
document.querySelector('.brand-icon').innerHTML = icon('flask-conical', 23);
const navigationIcons = { '#simulations': 'chart-no-axes-combined', '#exercices': 'book-open', '#revision': 'file-down' };
for (const [href, name] of Object.entries(navigationIcons)) {
  const marker = document.querySelector(`#sidebar a[href="${href}"] .nav-symbol`);
  if (marker) { marker.innerHTML = icon(name, 15); marker.setAttribute('aria-hidden', 'true'); }
}
document.querySelectorAll('.nav-home > span, .path-card > span:last-child, .primary-button > span, footer .brand > span').forEach(marker => {
  marker.innerHTML = icon('chevron-right', 16);
  marker.setAttribute('aria-hidden', 'true');
});
document.querySelector('.reading-note > span').innerHTML = icon('book-open', 18);
document.querySelector('.figure-label > span:last-child').innerHTML = icon('chart-no-axes-combined', 16);

const modes = document.createElement('nav');
modes.className = 'workspace-modes lk-tabs';
modes.setAttribute('aria-label', 'Parcours pédagogiques');
modes.innerHTML = `<a href="#bases">${icon('book-open', 16)}Comprendre le cours</a><a href="#revision">${icon('file-down', 16)}Réviser avant le devoir</a>`;
document.querySelector('.hero').append(modes);
document.querySelector('#print').insertAdjacentHTML('afterbegin', icon('printer', 16));
document.querySelector('#menu').innerHTML = `Sommaire ${icon('menu', 16)}`;
document.querySelectorAll('.pdf-button').forEach(link => link.insertAdjacentHTML('afterbegin', icon('file-down', 16)));
document.querySelectorAll('[data-play]').forEach(button => {
  button.classList.add('lk-play-button');
  button.insertAdjacentHTML('afterbegin', icon('play', 16));
});
document.querySelectorAll('[data-pause]').forEach(button => button.insertAdjacentHTML('afterbegin', icon('pause', 16)));
document.querySelectorAll('[data-reset]').forEach(button => button.insertAdjacentHTML('afterbegin', icon('rotate-ccw', 16)));

initSimulations();
initExercises();

// Make the progress contract independent of content presentation.
const chapterIds = ['bases', 'avancement', 'quantites', 'suivi', 'vitesse', 'demi', 'facteurs'];
for (const id of chapterIds) {
  if (!document.querySelector(`[data-progress="${id}"]`)) {
    const label = document.createElement('label');
    label.className = 'check-understood';
    label.innerHTML = `<input type="checkbox" data-progress="${id}"> J’ai compris ce chapitre`;
    document.getElementById(id).append(label);
  }
}
let saved = {};
try { saved = JSON.parse(localStorage.getItem('chimie-progress') || '{}') || {}; } catch {}
const checks = [...document.querySelectorAll('[data-progress]')];
function updateProgress() {
  const count = checks.filter(el => chapterIds.includes(el.dataset.progress) && el.checked).length;
  document.querySelector('#progress').value = count;
  document.querySelector('#progress-text').textContent = `${count} / 7 chapitres compris`;
}
for (const el of checks) {
  el.checked = saved[el.dataset.progress] === true;
  el.closest('label')?.classList.add('check-understood');
  el.addEventListener('change', () => {
    saved[el.dataset.progress] = el.checked;
    try { localStorage.setItem('chimie-progress', JSON.stringify(saved)); }
    catch { document.querySelector('#progress-status').textContent = 'Stockage indisponible : la progression reste valable pour cette visite.'; }
    updateProgress();
  });
}
updateProgress();
document.querySelector('#reset-progress').addEventListener('click', () => {
  saved = {};
  checks.forEach(el => { el.checked = false; });
  try { localStorage.removeItem('chimie-progress'); } catch {}
  updateProgress();
  document.querySelector('#progress-status').textContent = 'Progression réinitialisée.';
});
const themeButton = document.querySelector('#theme');
function themeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.body.dataset.labTheme = dark ? 'dark' : 'light';
  themeButton.innerHTML = icon(dark ? 'sun' : 'moon', 18);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#121c24' : '#edf2f5';
  themeButton.setAttribute('aria-label', `Activer le mode ${dark ? 'clair' : 'sombre'}`);
  themeButton.setAttribute('aria-pressed', String(dark));
}
themeLabel();
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('chimie-theme', next); } catch {}
  themeLabel();
});
const menuButton = document.querySelector('#menu');
function closeMenu() {
  document.querySelector('#sidebar').classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = document.querySelector('#sidebar').classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#sidebar a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', e => {
  if (!e.target.closest('#sidebar') && !e.target.closest('#menu')) closeMenu();
});
let printDetails = [];
let printing = false;
window.addEventListener('beforeprint', () => {
  if (printing) return;
  printing = true;
  printDetails = [...document.querySelectorAll('details')].filter(el => !el.open);
  printDetails.forEach(el => { el.open = true; });
});
window.addEventListener('afterprint', () => {
  printDetails.forEach(el => { el.open = false; });
  printDetails = [];
  printing = false;
});
document.querySelectorAll('#print, [data-print]').forEach(button => button.addEventListener('click', () => window.print()));
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    document.querySelectorAll('#sidebar a').forEach(a => a.classList.toggle('active', a.hash === `#${entry.target.id}`));
    const revision = ['revision', 'glossaire', 'erreurs', 'exercices'].includes(entry.target.id);
    document.querySelectorAll('.workspace-modes a').forEach(a => {
      if ((a.hash === '#revision') === revision) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('section[id]').forEach(el => observer.observe(el));

// Keep long inline equations readable at every width, including Safari.
function fitInlineMath() {
  document.querySelectorAll('.chapter .katex').forEach(math => {
    if (math.closest('.katex-display')) return;
    math.classList.remove('math-scroll');
    math.removeAttribute('tabindex');
    const owner = math.closest('p, li, dd, td, th, label');
    if (owner && owner.clientWidth > 0 && math.getBoundingClientRect().width > owner.clientWidth - 2) {
      math.classList.add('math-scroll');
      math.tabIndex = 0;
    }
  });
}
let mathResizeFrame;
window.addEventListener('resize', () => {
  cancelAnimationFrame(mathResizeFrame);
  mathResizeFrame = requestAnimationFrame(fitInlineMath);
});
document.addEventListener('toggle', event => {
  if (event.target instanceof HTMLDetailsElement) requestAnimationFrame(fitInlineMath);
}, true);
function typeset() {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.querySelector('main'), {
      delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
      throwOnError: false,
      trust: false,
      strict: 'warn'
    });
  }
  // A direct hash URL may target an exercise inserted by the modules.
  fitInlineMath();
  const initialHash = location.hash;
  document.fonts.ready.then(() => {
    fitInlineMath();
    if (initialHash && location.hash === initialHash) document.getElementById(decodeURIComponent(initialHash.slice(1)))?.scrollIntoView();
  });
}
if (document.readyState === 'complete') typeset();
else window.addEventListener('load', typeset, { once: true });
