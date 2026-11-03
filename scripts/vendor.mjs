import { cp, mkdir, rm } from 'node:fs/promises';
const target = 'vendor/katex';
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const file of ['katex.min.css', 'katex.min.js', 'contrib/auto-render.min.js', 'fonts']) {
  await cp(`node_modules/katex/dist/${file}`, `${target}/${file}`, { recursive: true });
}
await cp('node_modules/katex/LICENSE', `${target}/LICENSE`);
console.log('KaTeX synchronisé dans vendor/katex/ ; versionner ces fichiers avec le lockfile.');
