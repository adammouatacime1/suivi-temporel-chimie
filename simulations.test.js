import test from 'node:test';
import assert from 'node:assert/strict';
import { model, derivative, halfTime, zincState, pressure } from './simulations.js';

const near = (a, b, epsilon = 1e-9) => assert.ok(Math.abs(a - b) <= epsilon, `${a} ≠ ${b}`);

test('tableau : limites, coefficients et conservation des éléments', () => {
  for (const zn0 of [0, 0.1, 1, 4, 10]) for (const h0 of [0, 0.1, 2, 10, 20]) {
    for (const request of [-1, 0, 0.137, 1, 10, 100]) {
      const s = zincState(zn0, h0, request);
      assert.ok(s.x >= 0 && s.x <= s.xmax);
      for (const key of ['zn', 'h', 'zn2', 'h2']) assert.ok(s[key] >= 0);
      near(s.zn + s.zn2, zn0); // Zn atoms
      near(s.h + 2 * s.h2, h0); // H atoms
      near(s.zn2, s.h2);
      near(s.xmax, Math.min(zn0, h0 / 2));
    }
  }
  near(zincState(4, 6, 100).x, 3);
  near(zincState(4, 6, 100).zn, 1);
});

test('modèle : origine, demi-réaction et dérivée cohérentes', () => {
  for (const k of [0.1, 0.3, 0.6, 1.2]) {
    near(model(0, 4, k), 0);
    near(model(halfTime(k), 4, k), 2);
    for (const t of [1, 3, 10, 20]) {
      const h = 1e-4;
      near((model(t + h, 4, k) - model(t - h, 4, k)) / (2 * h), derivative(t, 4, k), 1e-7);
      assert.ok(model(t, 4, k) <= 4);
    }
  }
  near(derivative(0), 1.2);
});

test('pression : SI, pression initiale et inversion de la mesure', () => {
  for (const volume of [0.2, 0.5, 1]) for (const t of [0, halfTime(0.3), 20]) {
    near(pressure(0, volume), 101300);
    const measuredExtentMol = (volume / 1000) * (pressure(t, volume) - 101300) / (8.314 * 298);
    near(measuredExtentMol, model(t) / 1000);
  }
  near(pressure(2) - 101300, 2 * (pressure(2, 1) - 101300));
});

test('facteurs : même plateau et temps de demi-réaction réduit', () => {
  near(model(1000, 4, 0.3), model(1000, 4, 0.6));
  near(halfTime(0.6), halfTime(0.3) / 2);
  assert.ok(model(2, 4, 0.6) > model(2, 4, 0.3));
});
