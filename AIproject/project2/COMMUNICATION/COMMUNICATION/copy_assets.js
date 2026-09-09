const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\prave\\.gemini\\antigravity\\brain\\d49aa78a-bbc9-4446-909f-6d0b19b436b8';
const targetDir = path.join(__dirname, 'images');

const imageCopies = [
  { src: 'fresh_pathaneer_1788942529669.jpg', dest: 'product-pathaneer.jpg' },
  { src: 'tuber_powder_flow_1788942554790.jpg', dest: 'product-tuber-powder.jpg' },
  { src: 'fresh_nungu_pods_1788942587584.jpg', dest: 'product-nungu-fresh.jpg' },
  { src: 'karupatti_jaggery_cone_1788942702115.jpg', dest: 'product-karupatti.jpg' },
  { src: 'panakarkandu_rock_candy_1788942759826.jpg', dest: 'product-panakarkandu.jpg' },
  { src: 'palm_sugar_granules_1788942816112.jpg', dest: 'product-palm-sugar.jpg' },
  { src: 'palm_leaf_kottan_1788942879643.jpg', dest: 'product-leaf-kottan.jpg' },
  { src: 'palm_fiber_brush_1788942957933.jpg', dest: 'product-fiber-brush.jpg' },
  { src: 'panam_pazham_halwa_1788943040501.jpg', dest: 'product-fruit-halwa.jpg' },
  { src: 'emperor_palm_casket_1788943154730.jpg', dest: 'product-emperor-casket.jpg' }
];

imageCopies.forEach(({ src, dest }) => {
  const sourcePath = path.join(brainDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${sourcePath}`);
  }
});
