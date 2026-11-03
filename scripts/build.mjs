import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'course.js', 'exercises.js', 'simulations.js', 'revision.js', '.nojekyll', 'vendor', 'docs']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log('Site statique généré dans dist/ ; identique à la publication depuis main, avec KaTeX et le PDF.');
