import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist/vendor/katex', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'course.js', 'exercises.js', 'simulations.js', 'revision.js']) {
  await cp(file, `dist/${file}`);
}
for (const file of ['katex.min.css', 'katex.min.js', 'contrib/auto-render.min.js', 'fonts']) {
  await cp(`node_modules/katex/dist/${file}`, `dist/vendor/katex/${file}`, { recursive: true });
}
await cp('node_modules/katex/LICENSE', 'dist/vendor/katex/LICENSE');
await cp('.nojekyll', 'dist/.nojekyll');
console.log('Site statique généré dans dist/ (KaTeX et polices inclus, aucune ressource distante).');
