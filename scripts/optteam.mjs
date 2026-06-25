import sharp from 'sharp';
import { mkdir, rename, stat } from 'fs/promises';
const files = ['img 1.jpeg','img 2.JPEG','img 3.JPEG','img 4.jpeg'];
await mkdir('src/assets/_original', { recursive: true });
let before=0, after=0;
for (let i=0;i<files.length;i++){
  const src = 'src/assets/'+files[i];
  const out = `src/assets/team-${i+1}.webp`;
  const s0=(await stat(src)).size; before+=s0;
  await sharp(src).rotate().resize({width:1100, withoutEnlargement:true}).webp({quality:80}).toFile(out);
  await rename(src, 'src/assets/_original/'+files[i]);
  const s1=(await stat(out)).size; after+=s1;
  console.log(`${files[i]} ${(s0/1048576).toFixed(2)}MB -> team-${i+1}.webp ${(s1/1024).toFixed(0)}KB`);
}
console.log(`TOTAL ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(2)}MB`);
