import { renderCourse } from './course.js';
import { renderSimulations, initSimulations } from './simulations.js';
import { renderExercises, initExercises } from './exercises.js';
import { renderRevision } from './revision.js';

document.querySelector('#course-content').innerHTML = renderCourse();
document.querySelector('#simulation-content').innerHTML = renderSimulations();
document.querySelector('#exercise-content').innerHTML = renderExercises();
document.querySelector('#revision-content').innerHTML = renderRevision();
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
  }
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(el => observer.observe(el));

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
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
}
if (document.readyState === 'complete') typeset();
else window.addEventListener('load', typeset, { once: true });
