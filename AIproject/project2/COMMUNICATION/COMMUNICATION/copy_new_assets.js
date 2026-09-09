const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\prave\\.gemini\\antigravity\\brain\\9cbab17f-a7ec-4853-aa8c-f330c3156f3f';
const targetDir = 'e:\\technical8_10\\AIproject\\project2\\COMMUNICATION\\COMMUNICATION\\images';

const imageCopies = [
  { src: 'kallu_palm_toddy_1788964295801.jpg', dest: 'product-kallu.jpg' },
  { src: 'karupatti_kadalai_mittai_1788964942856.jpg', dest: 'product-kadalai-mittai.jpg' },
  { src: 'karupatti_natural_juice_1788964977271.jpg', dest: 'product-karupatti-juice.jpg' }
];

imageCopies.forEach(({ src, dest }) => {
  const sourcePath = path.join(brainDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied ${src} -> ${dest}`);
  } else {
    console.error(`✗ Source not found: ${sourcePath}`);
  }
});
