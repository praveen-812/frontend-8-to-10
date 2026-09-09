const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- STARTING ECOSYSTEM INTEGRITY VERIFICATION (18 PRODUCTS) ---');

const dataCode = fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8');
const sandbox = {};
try {
  vm.createContext(sandbox);
  vm.runInContext(dataCode + '\nsandboxExports = { PRODUCTS_DATA, PALM_ANATOMY };', sandbox);
  console.log('✓ js/data.js evaluated cleanly.');
} catch (e) {
  console.error('✗ Syntax error in js/data.js:', e);
  process.exit(1);
}

const { PRODUCTS_DATA, PALM_ANATOMY } = sandbox.sandboxExports;
console.log(`✓ Total products count: ${PRODUCTS_DATA.length}`);

if (PRODUCTS_DATA.length !== 18) {
  console.error(`✗ Expected exactly 18 products, got ${PRODUCTS_DATA.length}`);
  process.exit(1);
}

// 2. Check for duplicate images
const seenImages = new Map();
let duplicateCount = 0;
PRODUCTS_DATA.forEach(p => {
  if (seenImages.has(p.image)) {
    console.error(`✗ DUPLICATE IMAGE FOUND: "${p.image}" used by both "${seenImages.get(p.image)}" and "${p.name}" (${p.id})`);
    duplicateCount++;
  } else {
    seenImages.set(p.image, p.name);
  }
});

if (duplicateCount === 0) {
  console.log('✓ ZERO DUPLICATE IMAGES: Every single product has its own unique image!');
} else {
  console.error(`✗ Found ${duplicateCount} duplicate images!`);
  process.exit(1);
}

// 3. Verify all image files exist on disk
let missingImages = 0;
PRODUCTS_DATA.forEach(p => {
  const fullPath = path.join(__dirname, p.image);
  if (!fs.existsSync(fullPath)) {
    console.error(`✗ MISSING IMAGE FILE: ${p.image} for product "${p.name}"`);
    missingImages++;
  }
});
if (missingImages === 0) {
  console.log('✓ All 18 product image files exist on disk!');
} else {
  console.error(`✗ ${missingImages} image files missing!`);
  process.exit(1);
}

// 4. Verify separate ALCOHOL product is completely removed
const alcoholProd = PRODUCTS_DATA.find(p => p.id === 'kallu-traditional' || p.name.toUpperCase() === 'ALCOHOL');
if (alcoholProd) {
  console.error(`✗ Product "ALCOHOL" was found in PRODUCTS_DATA! Must be removed.`);
  process.exit(1);
} else {
  console.log('✓ Separate "ALCOHOL" product has been completely removed.');
}

// 5. Verify FRESH KALLU is the ONLY alcohol product
const alcoholicProducts = PRODUCTS_DATA.filter(p => p.isAlcoholic);
console.log(`\nAlcoholic Products count: ${alcoholicProducts.length}`);
if (alcoholicProducts.length !== 1) {
  console.error(`✗ Expected exactly 1 alcohol product on the website, found ${alcoholicProducts.length}`);
  process.exit(1);
}
const soleAlcohol = alcoholicProducts[0];
if (soleAlcohol.name === 'FRESH KALLU' && soleAlcohol.id === 'pathaneer-fresh' && soleAlcohol.image === 'images/product-pathaneer.jpg') {
  console.log(`✓ Product 16 verified: FRESH KALLU is the sole alcohol product!`);
  console.log(`  - Image kept unchanged: ${soleAlcohol.image}`);
  console.log(`  - Warning label: "${soleAlcohol.warningLabel}"`);
  console.log(`  - Warning sub: "${soleAlcohol.warningSub}"`);
  if (soleAlcohol.warningLabel === '21+ ONLY' && soleAlcohol.warningSub === 'For Adults Aged 21 and Above') {
    console.log(`✓ Professional statutory 21+ label verified!`);
  } else {
    console.error(`✗ Warning labels do not match 21+ ONLY / For Adults Aged 21 and Above`);
    process.exit(1);
  }
} else {
  console.error(`✗ FRESH KALLU configuration failed: ${JSON.stringify(soleAlcohol)}`);
  process.exit(1);
}

// 6. Verify Product 17: Karupatti Kadalai Mittai
const prod17 = PRODUCTS_DATA[16];
console.log(`\nProduct 17 Inspection:`);
console.log(`- ID: ${prod17.id}`);
console.log(`- Name: ${prod17.name}`);
console.log(`- Badge: ${prod17.badge}`);
console.log(`- Image: ${prod17.image}`);
if (prod17.id === 'karupatti-kadalai-mittai' && prod17.image === 'images/product-kadalai-mittai.jpg') {
  console.log('✓ Product 17 verified: Karupatti Kadalai Mittai (Palm Jaggery & Peanut Sweet)');
} else {
  console.error('✗ Product 17 verification failed!');
  process.exit(1);
}

// 7. Verify Product 18: Karupatti Natural Juice
const prod18 = PRODUCTS_DATA[17];
console.log(`\nProduct 18 Inspection:`);
console.log(`- ID: ${prod18.id}`);
console.log(`- Name: ${prod18.name}`);
console.log(`- Badge: ${prod18.badge}`);
console.log(`- Image: ${prod18.image}`);
if (prod18.id === 'karupatti-natural-juice' && prod18.image === 'images/product-karupatti-juice.jpg') {
  console.log('✓ Product 18 verified: Karupatti Natural Juice (Refreshing Non-Alcoholic Drink)');
} else {
  console.error('✗ Product 18 verification failed!');
  process.exit(1);
}

// 8. Verify all prices in INR and realistic
let priceIssues = 0;
PRODUCTS_DATA.forEach(p => {
  if (typeof p.price !== 'number' || p.price <= 0 || p.price > 10000) {
    console.error(`✗ Unrealistic price: ${p.price} for "${p.name}"`);
    priceIssues++;
  }
});
if (priceIssues === 0) {
  console.log('\n✓ All 18 product prices are valid positive numbers in ₹ INR!');
}

console.log('\n--- ALL 18 ECOSYSTEM INTEGRITY CHECKS PASSED! ---');
