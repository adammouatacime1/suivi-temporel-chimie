import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

test('publication depuis main : toutes les ressources locales existent à la racine', async () => {
  const html = await readFile('index.html', 'utf8');
  const paths = [...html.matchAll(/(?:href|src)="\.\/([^"#]+)"/g)].map(m => m[1]);
  assert.ok(paths.includes('vendor/katex/katex.min.js'));
  assert.ok(paths.includes('docs/cours-et-corriges.pdf'));
  for (const path of paths) await access(path);
  const css = await readFile('vendor/katex/katex.min.css', 'utf8');
  for (const [, font] of css.matchAll(/url\(([^)]+)\)/g)) {
    await access(`vendor/katex/${font.replaceAll('"', '').replaceAll("'", '')}`);
  }
  const pdf = await readFile('docs/cours-et-corriges.pdf');
  assert.equal(pdf.subarray(0,5).toString(), '%PDF-');
  assert.ok(pdf.length > 100000, 'Le cours PDF doit contenir le cours complet et les corrigés');
});
