import test from 'node:test';
import assert from 'node:assert/strict';
import { renderExercises, parseFrenchNumber } from './exercises.js';

test('réponses numériques : virgule française et notation scientifique', () => {
  for (const [input, expected] of [
    [' 2,50 ', 2.5],
    ['0,0002', 2e-4],
    ['4,17e-4', 4.17e-4],
    ['2×10^-3', 2e-3],
    ['−1,2 × 10^−3', -1.2e-3],
    ['1\u202f000,5', 1000.5],
    ['.5', 0.5],
  ]) assert.equal(parseFrenchNumber(input), expected, input);

  // Do not silently accept a partial number, an unconverted unit or non-finite input.
  for (const input of ['', ' ', '1,2,3', '1 mol', '1/2', '0x10', 'Infinity', 'NaN', '1e999']) {
    assert.ok(Number.isNaN(parseFrenchNumber(input)), `should reject ${JSON.stringify(input)}`);
  }
});

test('atelier complet : 14 réponses, 28 indices indépendants, corrections masquées', () => {
  const html = renderExercises();
  const forms = [...html.matchAll(/<form class="numeric-check" data-exercise="([^"]+)"/g)].map(match => match[1]);
  const hintTargets = [...html.matchAll(/data-hint="([^"]+)"/g)].map(match => match[1]);
  assert.equal(forms.length, 14);
  assert.equal(new Set(forms).size, 14);
  assert.equal(hintTargets.length, 28);
  assert.equal(new Set(hintTargets).size, 28);
  for (const id of hintTargets) {
    assert.ok(html.includes(`id="${id}" hidden`), `${id} must exist and start hidden`);
    assert.ok(html.includes(`aria-controls="${id}" aria-expanded="false"`));
  }
  assert.equal([...html.matchAll(/<details class="correction">/g)].length, 14);
  assert.ok(!/<details class="correction"[^>]*\bopen\b/.test(html));
  assert.ok(forms.includes('synthese-gaz') && forms.includes('synthese-conductivite'));
});

test('corrigé du dosage : les coefficients du dosage et de la réaction suivie restent distincts', () => {
  const html = renderExercises();
  const dosage = html.slice(html.indexOf('id="ex-dosage"'), html.indexOf('id="ex-tangente"'));
  // The titration gives 0.600 mmol in 5 mL, hence 12.0 mmol in the original
  // 100 mL flask. The followed decomposition consumes two H2O2 per extent.
  // This text regression protects the essential two-reaction reasoning.
  assert.ok(dosage.includes('(5/2)C_TV_E'));
  assert.ok(dosage.includes('0,000600/0,00500=0,120'));
  assert.ok(dosage.includes('x=(20,0-12,0)/2='));
  assert.ok(dosage.includes('4,00\\ \\mathrm{mmol}'));
  assert.ok(dosage.includes('flacons distincts'));
});
