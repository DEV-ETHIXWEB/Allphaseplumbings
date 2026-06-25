import sharp from 'sharp';
import { stat, rename, mkdir } from 'fs/promises';
async function conv(src, out, w){
  const s0=(await stat(src)).size;
  await sharp(src, { density: 200 }).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  const s1=(await stat(out)).size;
  console.log(`${src} ${(s0/1024).toFixed(0)}KB -> ${out} ${(s1/1024).toFixed(0)}KB`);
}
await mkdir('src/assets/_original', { recursive: true });
// PHCC badge: rendered ~120px tall, ratio 1627:648 -> width ~640 @2x
await conv('src/assets/badge-phcc.svg', 'src/assets/badge-phcc.webp', 700);
// chatbot face: small circle, ~220px @2x
await conv('src/assets/chatbot face.png', 'src/assets/chatbot-face.webp', 240);
await rename('src/assets/badge-phcc.svg', 'src/assets/_original/badge-phcc.svg');
await rename('src/assets/chatbot face.png', 'src/assets/_original/chatbot face.png');
