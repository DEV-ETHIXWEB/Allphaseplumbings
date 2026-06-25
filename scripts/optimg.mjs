import sharp from 'sharp';
import { readdir, mkdir, stat, rename } from 'fs/promises';
import path from 'path';
const dir = 'public/projects';
const outBak = 'public/projects/_original';
await mkdir(outBak, { recursive: true });
const files = (await readdir(dir)).filter(f => /\.(jpe?g|png)$/i.test(f));
let before = 0, after = 0;
for (const f of files) {
  const src = path.join(dir, f);
  const base = f.replace(/\.(jpe?g|png)$/i, '');
  const out = path.join(dir, base + '.webp');
  const s0 = (await stat(src)).size; before += s0;
  await sharp(src).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out + '.tmp');
  await rename(src, path.join(outBak, f));
  await rename(out + '.tmp', out);
  const s1 = (await stat(out)).size; after += s1;
  console.log(`${f} ${(s0/1048576).toFixed(2)}MB -> ${base}.webp ${(s1/1024).toFixed(0)}KB`);
}
console.log(`TOTAL ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(2)}MB`);
