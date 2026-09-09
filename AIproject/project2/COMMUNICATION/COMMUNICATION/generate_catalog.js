const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const imagesDir = path.join(projectDir, 'images');
const productsImgDir = path.join(imagesDir, 'products');

if (!fs.existsSync(productsImgDir)) {
  fs.mkdirSync(productsImgDir, { recursive: true });
}

// 73 Authentic Products across All Ecosystem Categories
const ALL_PRODUCTS = [
  // 1. Palm Jaggery & Panai Vellam
  {
    id: "karupatti-cone",
    name: "Traditional Panai Karupatti (Cone Jaggery)",
    subtitle: "Stone-Ground Unrefined Palm Sugar Cake",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 199,
    rating: 4.96,
    reviewsCount: 312,
    badge: "Traditional Artisan Craft",
    isFeatured: true,
    isNew: false,
    image: "images/product-karupatti.jpg",
    shortDesc: "Dense, aromatic dark jaggery cakes hand-poured in conical woven palmyra leaf cups. Infused with sun-dried ginger and black pepper.",
    fullDescription: "Panai Karupatti represents the pinnacle of traditional South Indian unrefined sweeteners. Tapped fresh twice daily, the sap is gently concentrated in hygienic food-grade stainless pans over low tamarind-wood embers and hand-poured into conical palmyra leaf cups to cure naturally without chemical hardeners or bleaching agents.",
    ingredients: ["100% Pure Palmyra Palm Sap", "Sun-Dried Sunthi Ginger (<1%)", "Crushed Tellicherry Black Pepper (<0.5%)"],
    nutrition: { servingSize: "20g piece", calories: "72 kcal", carbs: "18 g", sugars: "17 g", iron: "1.6 mg (9% DV)", potassium: "190 mg (4% DV)" },
    status: "available",
    variants: [{ name: "400g Hand-Cured Box (2 Cones)", price: 199 }, { name: "1kg Family Pantry Pack", price: 449 }]
  },
  {
    id: "sukku-karupatti",
    name: "Sukku Karupatti (Ginger & Pepper)",
    subtitle: "Zesty Digestive Herbal Palm Jaggery",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 249,
    rating: 4.92,
    reviewsCount: 184,
    badge: "Heritage Digestive Blend",
    isFeatured: false,
    isNew: false,
    image: "images/products/sukku-karupatti.svg",
    shortDesc: "Pure palm jaggery infused with roasted dry ginger (sukku), coriander seeds, and whole black peppercorns for comforting warmth.",
    fullDescription: "A treasured kitchen staple in Tamil Nadu, crafted by simmering unbleached palm sap with crushed sunthi ginger and roasted coriander seeds. Imparts an exhilarating spiced molasses flavor that elevates morning herbal tea and traditional decoctions.",
    ingredients: ["Pure Palmyra Palm Sap", "Sun-Dried Ginger (Sukku 2%)", "Tellicherry Black Pepper (1%)", "Roasted Coriander Seeds (1%)"],
    nutrition: { servingSize: "20g piece", calories: "70 kcal", carbs: "17.5 g", sugars: "16.5 g", iron: "1.8 mg", potassium: "195 mg" },
    status: "available",
    variants: [{ name: "350g Artisan Box", price: 249 }, { name: "700g Value Pack", price: 469 }]
  },
  {
    id: "thippili-karupatti",
    name: "Thippili Karupatti (Long Pepper Jaggery)",
    subtitle: "Piquant Botanical Palm Jaggery",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 279,
    rating: 4.88,
    reviewsCount: 96,
    badge: "Traditional Botanical Blend",
    isFeatured: false,
    isNew: true,
    image: "images/products/thippili-karupatti.svg",
    shortDesc: "Infused with wild Indian long pepper (thippili) and licorice root, delivering complex sweet-spicy depth to beverages.",
    fullDescription: "Long pepper (Piper retrofractum) brings an earthy, tingling sweet pungency that pairs exquisitely with the deep mineral caramel of wild palmyra sap. Cast in manageable bite-sized cubes.",
    ingredients: ["Pure Palmyra Palm Sap", "Indian Long Pepper (Thippili 1.5%)", "Athimadhuram Licorice (<1%)"],
    nutrition: { servingSize: "20g piece", calories: "71 kcal", carbs: "17.8 g", sugars: "16.8 g", iron: "1.7 mg", potassium: "185 mg" },
    status: "available",
    variants: [{ name: "300g Kraft Pouch", price: 279 }, { name: "600g Duo Pack", price: 519 }]
  },
  {
    id: "karupatti-granular",
    name: "Karupatti Podi (Granular Palm Jaggery)",
    subtitle: "Free-Flowing Crushed Jaggery Powder",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 229,
    rating: 4.90,
    reviewsCount: 220,
    badge: "Instant Stirring",
    isFeatured: false,
    isNew: false,
    image: "images/products/karupatti-granular.svg",
    shortDesc: "Micro-crushed unrefined palm jaggery that dissolves instantly in coffee, tea, porridges, and baking batters.",
    fullDescription: "Eliminates the effort of grating solid jaggery blocks. Our granular Karupatti is produced by finely agitating cooling palm syrup at the crystallization point, creating light, dissolvable granules.",
    ingredients: ["100% Pure Granulated Palmyra Palm Jaggery"],
    nutrition: { servingSize: "1 tbsp (15g)", calories: "55 kcal", carbs: "13.8 g", sugars: "13 g", iron: "1.2 mg", potassium: "150 mg" },
    status: "available",
    variants: [{ name: "400g Stand-up Pouch", price: 229 }, { name: "1kg Kitchen Canister", price: 499 }]
  },
  {
    id: "karupatti-cubes",
    name: "Karupatti Reserve Cubes",
    subtitle: "Precision-Cut Single-Serve Palm Jaggery",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 179,
    rating: 4.87,
    reviewsCount: 145,
    badge: "Table Top Ready",
    isFeatured: false,
    isNew: false,
    image: "images/products/karupatti-cubes.svg",
    shortDesc: "Portion-controlled 10-gram cubes of pure palm jaggery designed for cafes, breakfast tables, and on-the-go tea sweetening.",
    fullDescription: "Cast into uniform bite-sized geometric cubes for seamless portioning in coffee cups and herbal brews without mess or knives.",
    ingredients: ["100% Pure Palmyra Palm Sap"],
    nutrition: { servingSize: "1 Cube (10g)", calories: "36 kcal", carbs: "9 g", sugars: "8.5 g", iron: "0.8 mg", potassium: "95 mg" },
    status: "available",
    variants: [{ name: "250g Jar (25 Cubes)", price: 179 }, { name: "500g Refill Pouch", price: 329 }]
  },
  {
    id: "karupatti-paagu",
    name: "Karupatti Paagu (Liquid Palm Jaggery)",
    subtitle: "Slow-Reduced Viscous Dessert Nectar",
    category: "sweeteners",
    categoryLabel: "Palm Jaggery & Sweeteners",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 349,
    rating: 4.94,
    reviewsCount: 178,
    badge: "Signature Reserve",
    isFeatured: true,
    isNew: false,
    image: "images/product-nectar.jpg",
    shortDesc: "Silky, slow-reduced liquid jaggery with notes of salted caramel and smoky vanilla. Ready to drizzle over dosas, waffles, and ice cream.",
    fullDescription: "Concentrated under gentle vacuum at 68°C to 76° Brix. Retains its golden pourability without crystallizing on the shelf, offering a distinct tropical alternative to maple syrup and honey.",
    ingredients: ["100% Pure Palmyra Palm Blossom Sap"],
    nutrition: { servingSize: "1 tbsp (15ml)", calories: "50 kcal", carbs: "13 g", sugars: "12 g", iron: "0.8 mg", potassium: "140 mg" },
    status: "available",
    variants: [{ name: "300ml Amber Glass Flask", price: 349 }, { name: "600ml Pantry Decanter", price: 629 }]
  },

  // 2. Palm Sugar & Natural Sweeteners
  {
    id: "palm-sugar-crystals",
    name: "AURA Pure Palm Sugar Crystals",
    subtitle: "Raw Artisanal Granulated Palm Sugar",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 299,
    rating: 4.95,
    reviewsCount: 265,
    badge: "1:1 Cane Sugar Swap",
    isFeatured: true,
    isNew: false,
    image: "images/product-palm-sugar.jpg",
    shortDesc: "Golden, unrefined granulated sugar with a buttery molasses aroma, milled for seamless 1:1 culinary replacement.",
    fullDescription: "AURA Palm Sugar Crystals deliver the complex flavor profile of brown sugar with the dry dissolution of fine turbinado. Sourced from slow-reduced Palmyra nectar without chemical flow agents or synthetic bleaches.",
    ingredients: ["100% Pure Crystallized Palmyra Palm Sap"],
    nutrition: { servingSize: "1 tsp (4g)", calories: "15 kcal", carbs: "3.8 g", sugars: "3.7 g", potassium: "35 mg" },
    status: "available",
    variants: [{ name: "400g Stand-up Pouch", price: 299 }, { name: "1kg Baker's Reserve", price: 649 }]
  },
  {
    id: "panakarkandu-rock",
    name: "Artisanal Panakarkandu (Palm Rock Candy)",
    subtitle: "Naturally Grown Palm Sugar Crystals",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 329,
    rating: 4.97,
    reviewsCount: 198,
    badge: "Unprocessed Rock Candy",
    isFeatured: true,
    isNew: false,
    image: "images/product-panakarkandu.jpg",
    shortDesc: "Slow-crystallized natural amber candy gems harvested from aging clay vessels. Beloved in South Indian vocal care and soothing milk infusions.",
    fullDescription: "Panakarkandu is grown through slow evaporative crystallization over 60 days. The resulting large amber jewels melt slowly, releasing delicate floral sweetness with zero harsh industrial processing.",
    ingredients: ["100% Naturally Crystallized Palmyra Palm Sugar"],
    nutrition: { servingSize: "1 Gem (5g)", calories: "19 kcal", carbs: "4.8 g", sugars: "4.7 g", potassium: "42 mg" },
    status: "available",
    variants: [{ name: "350g Glass Preserve Jar", price: 329 }, { name: "750g Family Pack", price: 649 }]
  },
  {
    id: "panakarkandu-spiced",
    name: "Spiced Panakarkandu (Cardamom & Pepper)",
    subtitle: "Herbal Crushed Palm Rock Sugar",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 389,
    rating: 4.91,
    reviewsCount: 132,
    badge: "Traditional Throat Soother",
    isFeatured: false,
    isNew: true,
    image: "images/products/panakarkandu-spiced.svg",
    shortDesc: "Coarsely crushed palm candy blended with green cardamom seeds, black pepper, and roasted almonds for warm soothing milk.",
    fullDescription: "A traditional household remedy across Tamil Nadu, Panakarkandu paired with warm milk and freshly cracked pepper provides comforting throat lubrication during cooler seasons.",
    ingredients: ["Palmyra Palm Rock Candy", "Green Cardamom Pods (2%)", "Black Pepper (1%)", "Finely Slivers of Almonds (3%)"],
    nutrition: { servingSize: "1 tbsp (10g)", calories: "42 kcal", carbs: "9.2 g", sugars: "8.8 g" },
    status: "available",
    variants: [{ name: "300g Hexagonal Jar", price: 389 }, { name: "600g Refill Tub", price: 699 }]
  },
  {
    id: "micro-palm-sugar",
    name: "Micro-Milled Palm Icing Sugar",
    subtitle: "Confectioner's Velvet Palm Powder",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 349,
    rating: 4.86,
    reviewsCount: 88,
    badge: "Gourmet Pastry Grade",
    isFeatured: false,
    isNew: true,
    image: "images/products/micro-palm-sugar.svg",
    shortDesc: "Air-classified ultra-fine palm sugar powder for macarons, dusting pastries, glazes, and silk-smooth frostings.",
    fullDescription: "Milled to under 40 microns without cornstarch additives. Melts on the tongue like confectioner's sugar while imparting a warm golden hue and rich caramel notes.",
    ingredients: ["100% Micro-Milled Palmyra Palm Sugar"],
    nutrition: { servingSize: "1 tsp (4g)", calories: "15 kcal", carbs: "3.8 g", sugars: "3.7 g" },
    status: "available",
    variants: [{ name: "350g Resealable Tin", price: 349 }]
  },
  {
    id: "palm-sugar-sachets",
    name: "Palm Sugar Cafe Reserve Sachets",
    subtitle: "Single-Serve Hospitality Box (50 Sachets)",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 249,
    rating: 4.89,
    reviewsCount: 110,
    badge: "Cafe & Travel Friendly",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-sugar-sachets.svg",
    shortDesc: "Fifty 5g unbleached paper sachets of granular palm sugar. Perfect for specialty espresso bars, flights, and conscious dining.",
    fullDescription: "Compostable single-serve paper sticks allowing conscious consumers to replace refined white table sugar packets wherever they travel.",
    ingredients: ["100% Pure Palmyra Palm Sugar"],
    nutrition: { servingSize: "1 Sachet (5g)", calories: "19 kcal", carbs: "4.8 g", sugars: "4.7 g" },
    status: "available",
    variants: [{ name: "Box of 50 Sachets (250g)", price: 249 }, { name: "Carton of 200 Sachets", price: 799 }]
  },
  {
    id: "neera-honey-syrup",
    name: "Virgin Neera Nectar (Grade-A)",
    subtitle: "Raw Unpasteurized Sap Reduction",
    category: "sweeteners",
    categoryLabel: "Palm Sugar & Sweeteners",
    palmPart: "Inflorescence Vascular Sap",
    palmPartId: "inflorescence",
    price: 449,
    rating: 4.96,
    reviewsCount: 167,
    badge: "Ultra-Premium Reserve",
    isFeatured: true,
    isNew: false,
    image: "images/products/neera-honey-syrup.svg",
    shortDesc: "Rare, non-scorched blonde palm blossom syrup with bright floral notes of jasmine and wild tropical honeycomb.",
    fullDescription: "Only 10% of dawn harvest sap meets the pristine low-acidity criteria required for Grade-A Virgin Neera Nectar. Vacuum concentrated at 55°C to preserve delicate top floral aromatics.",
    ingredients: ["100% Single-Grove Palmyra Palm Sap"],
    nutrition: { servingSize: "1 tbsp (15ml)", calories: "52 kcal", carbs: "13.2 g", sugars: "12.4 g" },
    status: "available",
    variants: [{ name: "250ml Heavy Glass Decanter", price: 449 }, { name: "500ml Executive Reserve", price: 799 }]
  },

  // 3. Fresh Pathaneer & Non-Alcoholic Beverages
  {
    id: "pathaneer-fresh",
    name: "Fresh Pathaneer — Non-Alcoholic",
    subtitle: "Chilled Pure Dawn Palm Sap (Zero Alcohol)",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Cold-Harvested Inflorescence Sap (Neera)",
    palmPartId: "inflorescence",
    price: 149,
    rating: 4.99,
    reviewsCount: 420,
    badge: "Fresh Pathaneer — Non-Alcoholic",
    isFeatured: true,
    isNew: false,
    image: "images/product-pathaneer.jpg",
    shortDesc: "Authentic, crystal-fresh sweet palm sap tapped at dawn into insulated chill vessels. 100% non-alcoholic, naturally isotonic, and free of slaked lime.",
    fullDescription: "Fresh Pathaneer is the sacred living elixir of South India's coastal palm groves. Harvested at 5:00 AM before sunrise into vacuum-insulated stainless steel flasks at 3°C, natural fermentation is completely arrested without chemical lime. It is sterile-microfiltered, bottled cold, and contains absolutely zero alcohol. Refreshing, naturally mineral-rich, and pure.",
    ingredients: ["100% Pure Non-Fermented Palmyra Palm Sap (Borassus flabellifer)"],
    nutrition: { servingSize: "1 Bottle (300ml)", calories: "65 kcal", carbs: "15 g", sugars: "14 g", potassium: "260 mg", magnesium: "22 mg", alcoholByVolume: "0.0% ABV" },
    status: "available",
    variants: [{ name: "300ml Chilled Bottle", price: 149 }, { name: "Pack of 4 (4 x 300ml)", price: 499 }, { name: "Case of 12 (Refrigerated Express)", price: 1399 }]
  },
  {
    id: "pathaneer-botanical-spritzer",
    name: "Pathaneer Sparkling Botanical Spritzer",
    subtitle: "Effervescent Cold Sap with Mountain Mint",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 179,
    rating: 4.93,
    reviewsCount: 164,
    badge: "Non-Alcoholic (0.0% ABV)",
    isFeatured: true,
    isNew: true,
    image: "images/product-elixir.jpg",
    shortDesc: "Pure dawn Pathaneer lightly carbonated and infused with fresh key lime extract, cardamom distillate, and garden mint.",
    fullDescription: "Elevating rural refreshment into a contemporary sparkling botanical aperitif. Uses gentle carbonation to lift the delicate caramel sweetness of Pathaneer, balanced with crisp zesty botanicals.",
    ingredients: ["Fresh Non-Alcoholic Pathaneer (85%)", "Sparkling Spring Water", "Cold-Pressed Key Lime Extract", "Cardamom Distillate", "Wild Mint"],
    nutrition: { servingSize: "330ml Bottle", calories: "68 kcal", carbs: "16 g", sugars: "15 g", potassium: "240 mg", vitaminC: "14 mg" },
    status: "available",
    variants: [{ name: "330ml Glass Bottle", price: 179 }, { name: "4-Pack Craft Carrier", price: 649 }]
  },
  {
    id: "pathaneer-kokum-cooler",
    name: "Pathaneer Kokum & Jeera Cooler",
    subtitle: "Coastal Saline Botanical Hydrator",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 159,
    rating: 4.88,
    reviewsCount: 118,
    badge: "Non-Alcoholic (0.0% ABV)",
    isFeatured: false,
    isNew: true,
    image: "images/products/pathaneer-kokum-cooler.svg",
    shortDesc: "A tangy coastal refreshment blending sweet non-alcoholic Pathaneer with sun-dried Kokum rind and roasted cumin seeds.",
    fullDescription: "Inspired by the Konkan and Coromandel coastal traditions. The natural sweetness of dawn palm sap balances the deep ruby tang of kokum fruit, enriched with pink Himalayan rock salt and roasted cumin.",
    ingredients: ["Fresh Pure Pathaneer (80%)", "Wild Kokum Extract", "Roasted Cumin Seed Distillate", "Pink Rock Salt (<0.5%)"],
    nutrition: { servingSize: "300ml Bottle", calories: "58 kcal", carbs: "13.5 g", sugars: "12 g", sodium: "45 mg" },
    status: "available",
    variants: [{ name: "300ml Bottle", price: 159 }, { name: "6-Pack Pantry Box", price: 849 }]
  },
  {
    id: "pathaneer-nannari",
    name: "Neera Nannari Herbal Elixir",
    subtitle: "Sarsaparilla & Sweet Palm Sap Blend",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 189,
    rating: 4.95,
    reviewsCount: 172,
    badge: "Non-Alcoholic (0.0% ABV)",
    isFeatured: false,
    isNew: false,
    image: "images/products/pathaneer-nannari.svg",
    shortDesc: "Ancient South Indian botanical root blend: wild Indian Sarsaparilla (Nannari) decoction infused directly into sweet virgin Neera.",
    fullDescription: "Nannari root is celebrated across Tamil Nadu for its distinct earthy, vanilla-wood aroma and refreshing culinary qualities. When paired with cold non-alcoholic palm sap, it creates an unforgettable heritage refreshment.",
    ingredients: ["Pure Palmyra Neera Sap (82%)", "Wild Nannari Root Extract (Decoction)", "Lemon Juice", "Spring Water"],
    nutrition: { servingSize: "300ml Bottle", calories: "62 kcal", carbs: "14.5 g", sugars: "13.8 g", potassium: "210 mg" },
    status: "available",
    variants: [{ name: "300ml Bottle", price: 189 }, { name: "Pack of 6 Bottles", price: 999 }]
  },
  {
    id: "pathaneer-vetiver-fizz",
    name: "Vetiver (Khus) Virgin Palm Fizz",
    subtitle: "Cooling Aromatic Herbaceous Sap Soda",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 169,
    rating: 4.86,
    reviewsCount: 94,
    badge: "Non-Alcoholic (0.0% ABV)",
    isFeatured: false,
    isNew: true,
    image: "images/products/pathaneer-vetiver-fizz.svg",
    shortDesc: "Gently carbonated sweet palm sap aromatized with slow-distilled fragrant Vetiver (Khus) roots from coastal delta farms.",
    fullDescription: "Vetiver grass roots impart a soothing smoky-earthy floral profile reminiscent of rain striking dry soil. Blended with sweet Neera sap for a sophisticated non-alcoholic mocktail base.",
    ingredients: ["Fresh Palmyra Sap", "Hydro-Distilled Vetiver Root Essence", "Carbonated Water"],
    nutrition: { servingSize: "300ml Bottle", calories: "55 kcal", carbs: "13 g", sugars: "12 g" },
    status: "available",
    variants: [{ name: "300ml Bottle", price: 169 }, { name: "4-Pack Carrier", price: 599 }]
  },
  {
    id: "pathaneer-citrus-tonic",
    name: "Neera Cold-Pressed Lime Morning Tonic",
    subtitle: "Daily Morning Botanical Revitalizer",
    category: "beverages",
    categoryLabel: "Fresh Pathaneer & Drinks",
    palmPart: "Fresh Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 159,
    rating: 4.90,
    reviewsCount: 135,
    badge: "Non-Alcoholic (0.0% ABV)",
    isFeatured: false,
    isNew: false,
    image: "images/products/pathaneer-citrus-tonic.svg",
    shortDesc: "Fresh morning Neera married with cold-pressed green lime juice and sea salt. The quintessential coastal farmer's sunrise refresher.",
    fullDescription: "Provides natural unrefined carbohydrates, bio-potassium, and vitamin C to jumpstart hydration upon waking without refined sugars or artificial additives.",
    ingredients: ["Pure Palmyra Neera Sap (88%)", "Fresh Key Lime Juice (10%)", "Mineral Sea Salt (<1%)"],
    nutrition: { servingSize: "250ml Glass Bottle", calories: "52 kcal", carbs: "12.5 g", sugars: "11.5 g", vitaminC: "18 mg (20% DV)" },
    status: "available",
    variants: [{ name: "250ml Bottle", price: 159 }, { name: "Weekly 7-Day Box", price: 999 }]
  },

  // 4. Nungu / Ice Apple & Derivatives
  {
    id: "fresh-nungu-pods",
    name: "Fresh Coastal Nungu (Ice Apple)",
    subtitle: "Tender Translucent Palm Fruit Kernels",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm (Nungu)",
    palmPartId: "fruit",
    price: 199,
    rating: 4.98,
    reviewsCount: 388,
    badge: "Fresh Tender Nungu",
    isFeatured: true,
    isNew: false,
    image: "images/product-nungu-fresh.jpg",
    shortDesc: "Freshly sliced translucent, jelly-like Nungu (Ice Apple) fruit pods harvested during peak summer tenderness. Suspended in delicate tender coconut water.",
    fullDescription: "Nungu is the crown jewel of tropical hydration. Each tough outer drupe husk protects three tender, crystalline endosperm sockets filled with pure botanical water. We hand-peel the kernels under sterile refrigerated conditions, pack them fresh with zero artificial preservatives, and rush them to your table.",
    ingredients: ["100% Tender Palmyra Palm Fruit Endosperm (Borassus flabellifer)", "Natural Tender Palm Cellular Water"],
    nutrition: { servingSize: "100g (Approx. 3 Pieces)", calories: "43 kcal", carbs: "10 g", sugars: "8.5 g", protein: "0.8 g", potassium: "155 mg", moisture: "91.8%" },
    status: "available",
    variants: [{ name: "350g Fresh Jar (6-8 Kernels)", price: 199 }, { name: "700g Family Hydration Tub", price: 369 }]
  },
  {
    id: "nungu-rose-sharbat",
    name: "Tender Nungu Rose Sharbat",
    subtitle: "Translucent Fruit Slices in Rose Blossom Syrup",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm",
    palmPartId: "fruit",
    price: 249,
    rating: 4.93,
    reviewsCount: 210,
    badge: "Summer Gourmet Reserve",
    isFeatured: true,
    isNew: false,
    image: "images/products/nungu-rose-sharbat.svg",
    shortDesc: "Bite-sized cubes of tender translucent Nungu soaked in clarified palm-blossom nectar syrup with organic Damask rose petal extracts.",
    fullDescription: "A luxurious adaptation of Tamil and Persian summer desserts. Spoon chilled tender Nungu cubes over falooda, chia seed bowls, kulfi, or eat straight from the jar for an exquisite sensory burst.",
    ingredients: ["Tender Nungu Fruit Endosperm", "Clarified Palm Sap Syrup", "Organic Damask Rose Hydrosol", "Non-GMO Citric Acid"],
    nutrition: { servingSize: "100g", calories: "78 kcal", carbs: "18 g", sugars: "16 g", potassium: "140 mg" },
    status: "available",
    variants: [{ name: "350g Glass Preserve Jar", price: 249 }, { name: "Duo Pack (2 x 350g)", price: 469 }]
  },
  {
    id: "nungu-aloe-cooler",
    name: "Nungu & Aloe Vera Cellular Hydrator",
    subtitle: "Tender Pulp with Cold-Pressed Aloe Gel",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm",
    palmPartId: "fruit",
    price: 189,
    rating: 4.89,
    reviewsCount: 142,
    badge: "92% Natural Cellular Moisture",
    isFeatured: false,
    isNew: true,
    image: "images/products/nungu-aloe-cooler.svg",
    shortDesc: "Crushed tender Nungu jelly pieces blended with wild-harvested coastal Aloe Vera inner gel and tender palm syrup.",
    fullDescription: "A soothing textural drink packed with natural polysaccharides and plant electrolytes. Offers gentle cooling relief on sweltering humid afternoons.",
    ingredients: ["Tender Palmyra Nungu Fruit (45%)", "Pure Aloe Vera Fillet Gel (35%)", "Palm Sap Nectar", "Water"],
    nutrition: { servingSize: "250ml", calories: "54 kcal", carbs: "12.8 g", sugars: "11.2 g" },
    status: "available",
    variants: [{ name: "250ml Bottle", price: 189 }, { name: "6-Pack Wellness Pack", price: 999 }]
  },
  {
    id: "nungu-fruit-crisps",
    name: "Sun-Cured Nungu Fruit Crisps",
    subtitle: "Gentle Dehydrated Tender Fruit Chips",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm",
    palmPartId: "fruit",
    price: 249,
    rating: 4.87,
    reviewsCount: 89,
    badge: "Dehydrated Super-Fruit",
    isFeatured: false,
    isNew: true,
    image: "images/products/nungu-fruit-crisps.svg",
    shortDesc: "Delicately sliced tender Nungu gently dehydrated under low solar temperatures into chewy, translucent fruit jerky crisps.",
    fullDescription: "Preserves the ephemeral seasonal delight of fresh summer Nungu for year-round snacking. Naturally sweet, high in dietary fiber, and contains zero added oils or sugar coatings.",
    ingredients: ["100% Dehydrated Tender Palmyra Palm Endosperm"],
    nutrition: { servingSize: "30g Pouch", calories: "95 kcal", carbs: "22 g", sugars: "16 g", dietaryFiber: "2.4 g" },
    status: "available",
    variants: [{ name: "60g Resealable Kraft Pouch", price: 249 }, { name: "150g Snacker Bag", price: 549 }]
  },
  {
    id: "nungu-coulis",
    name: "Nungu Dessert Coulis & Pulp",
    subtitle: "Artisanal Pastry Topping & Puree",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm",
    palmPartId: "fruit",
    price: 299,
    rating: 4.90,
    reviewsCount: 76,
    badge: "Culinary Chef Grade",
    isFeatured: false,
    isNew: false,
    image: "images/products/nungu-coulis.svg",
    shortDesc: "Silky, translucent tender fruit puree formulated for fine-dining pastry chefs, sorbet bases, and craft mocktails.",
    fullDescription: "Cold-crushed to preserve delicate colloidal fruit structures. Whisk into panna cotta, fold into yogurt bowls, or use as a glaze for modern tropical tarts.",
    ingredients: ["Tender Palmyra Endosperm Puree (90%)", "Light Palm Blossom Nectar (10%)"],
    nutrition: { servingSize: "50g", calories: "45 kcal", carbs: "11 g", sugars: "9.5 g" },
    status: "available",
    variants: [{ name: "250g Squeeze Bottle", price: 299 }, { name: "1kg Bakery Tub", price: 899 }]
  },
  {
    id: "nungu-tender-jelly",
    name: "Nungu Jelly Bites (Plant-Based)",
    subtitle: "Gelatin-Free Tender Fruit Candy",
    category: "nungu",
    categoryLabel: "Nungu & Tender Fruit",
    palmPart: "Tender Fruit Endosperm",
    palmPartId: "fruit",
    price: 199,
    rating: 4.85,
    reviewsCount: 114,
    badge: "100% Vegan Gelatin-Free",
    isFeatured: false,
    isNew: true,
    image: "images/products/nungu-tender-jelly.svg",
    shortDesc: "Natural fruit jelly cubes made with minced tender Nungu, agar-agar, and raw palm sugar. A clean fruit treat for children and adults.",
    fullDescription: "Free from animal gelatin and petroleum dyes. Captures the authentic bounce and cooling hydration of fresh summer fruit in convenient bite-sized confections.",
    ingredients: ["Tender Nungu Fruit (60%)", "Palm Sugar", "Seaweed Agar-Agar", "Natural Cardamom"],
    nutrition: { servingSize: "40g Serving", calories: "60 kcal", carbs: "14 g", sugars: "12 g" },
    status: "available",
    variants: [{ name: "200g Box", price: 199 }, { name: "400g Family Pack", price: 369 }]
  },

  // 5. Palmyra Tuber (Panai Kizhangu) & Flours / Powders
  {
    id: "palmyra-tuber-powder",
    name: "Palmyra Palm Tuber Powder",
    subtitle: "Stone-Ground Panai Kizhangu Flour",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber (Odiyal)",
    palmPartId: "tuber",
    price: 299,
    rating: 4.97,
    reviewsCount: 340,
    badge: "Raw Tuber → Sliced → Powder",
    isFeatured: true,
    isNew: false,
    image: "images/product-tuber-powder.jpg",
    shortDesc: "Visual Journey: Raw subterranean tuber un-earthed → washed, sliced & sun-dried → cold stone-milled into a golden, nutrient-rich prebiotic flour.",
    fullDescription: "Panai Kizhangu is an ancient agroforestry subterranean tuber that develops when wild Palmyra seeds germinate in coastal sandy trenches over 120 days. We hand-harvest the fibrous roots, steam-blanch them to deactivate natural bitterness, sun-dry the sliced rounds in clean solar glass tunnels, and cold stone-mill them below 35°C into a dense, fiber-rich functional flour.",
    ingredients: ["100% Pure Germinated Palmyra Palm Tubers (Odiyal - Borassus haustorium)"],
    nutrition: { servingSize: "30g (approx. 1/4 cup)", calories: "105 kcal", carbs: "23 g", dietaryFiber: "6.2 g (22% DV)", resistantStarch: "4.4 g", protein: "2.1 g", iron: "1.4 mg", calcium: "42 mg" },
    status: "available",
    variants: [{ name: "450g Kraft Stand-Up Pouch", price: 299 }, { name: "1kg Family Pantry Pouch", price: 579 }]
  },
  {
    id: "boiled-panai-kizhangu",
    name: "Steamed Panai Kizhangu (Whole Tubers)",
    subtitle: "Seasonally Harvested Boiled Tubers",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 169,
    rating: 4.91,
    reviewsCount: 215,
    badge: "Winter Seasonal Harvest",
    isFeatured: false,
    isNew: false,
    image: "images/products/boiled-panai-kizhangu.svg",
    shortDesc: "Whole germinated tubers boiled with turmeric and sea salt, peeled and vacuum-sealed for rustic coastal snacking.",
    fullDescription: "In Tamil winter tradition, boiled Panai Kizhangu is a revered seasonal food eaten by peeling back the fibrous outer husk to reveal the sweet, earthy, fiber-rich starch core.",
    ingredients: ["Fresh Palmyra Palm Tubers", "Wild Turmeric (<1%)", "Sea Salt (<1%)"],
    nutrition: { servingSize: "1 Tuber (Approx. 60g)", calories: "82 kcal", carbs: "18 g", dietaryFiber: "4.5 g", protein: "1.6 g" },
    status: "available",
    variants: [{ name: "Pack of 5 Tubers (300g)", price: 169 }, { name: "Pack of 12 Tubers", price: 349 }]
  },
  {
    id: "odiyal-flour",
    name: "Roasted Odiyal Flour (Gluten-Free)",
    subtitle: "Dark-Toasted Resistant Starch Flour",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 279,
    rating: 4.88,
    reviewsCount: 160,
    badge: "100% Grain-Free & Vegan",
    isFeatured: false,
    isNew: false,
    image: "images/product-tuber.jpg",
    shortDesc: "Sun-dried raw Odiyal tubers stone-milled and slow-roasted for baking, gluten-free sourdough enrichment, and porridge bases.",
    fullDescription: "Odiyal flour features a dense, nutty flavor reminiscent of roasted chestnuts and buckwheat. Its unique resistant starch properties provide a slow, sustained metabolic energy curve.",
    ingredients: ["100% Roasted Palmyra Palm Tuber Flour"],
    nutrition: { servingSize: "30g", calories: "102 kcal", carbs: "22 g", dietaryFiber: "5.8 g", protein: "2.0 g" },
    status: "available",
    variants: [{ name: "400g Pouch", price: 279 }, { name: "1kg Baker's Sack", price: 549 }]
  },
  {
    id: "odiyal-puttu-mix",
    name: "Spiced Odiyal Puttu Breakfast Mix",
    subtitle: "Heritage Coastal Steamed Rice & Tuber Mix",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 229,
    rating: 4.90,
    reviewsCount: 138,
    badge: "Ready-to-Steam Breakfast",
    isFeatured: false,
    isNew: true,
    image: "images/products/odiyal-puttu-mix.svg",
    shortDesc: "Coarsely ground Odiyal tuber flour blended with roasted red rice flour, cumin, and sea salt. Ready for traditional bamboo steaming.",
    fullDescription: "A traditional coastal breakfast delicacy. Mix with a splash of water until crumbly, layer with freshly grated coconut in a puttu steamer, and serve with ripe bananas or palm jaggery.",
    ingredients: ["Roasted Odiyal Tuber Flour (55%)", "Roasted Red Rice Flour (42%)", "Cumin Powder", "Sea Salt"],
    nutrition: { servingSize: "50g Dry Mix", calories: "175 kcal", carbs: "38 g", dietaryFiber: "4.8 g", protein: "3.2 g" },
    status: "available",
    variants: [{ name: "500g Box", price: 229 }, { name: "1kg Family Pack", price: 419 }]
  },
  {
    id: "odiyal-kanji-mix",
    name: "Prebiotic Odiyal Kanji Hearth Porridge",
    subtitle: "Nourishing Herbal Morning Porridge Powder",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 249,
    rating: 4.94,
    reviewsCount: 185,
    badge: "Gut-Microbiome Friendly",
    isFeatured: false,
    isNew: false,
    image: "images/products/odiyal-kanji-mix.svg",
    shortDesc: "Odiyal tuber flour enriched with roasted fenugreek, garlic flakes, cumin, and curry leaf powder for restorative morning broth.",
    fullDescription: "Celebrated in Jaffna and Tirunelveli hearth kitchens as a comforting, digestive porridge. Whisk 2 tablespoons into boiling water or light coconut milk for 5 minutes.",
    ingredients: ["Odiyal Tuber Flour (70%)", "Fenugreek Seeds (5%)", "Dehydrated Garlic", "Cumin", "Curry Leaf Powder", "Pink Salt"],
    nutrition: { servingSize: "25g", calories: "88 kcal", carbs: "18 g", dietaryFiber: "4.2 g", protein: "2.4 g" },
    status: "available",
    variants: [{ name: "350g Kraft Jar", price: 249 }, { name: "700g Refill Pouch", price: 449 }]
  },
  {
    id: "tuber-millet-energy",
    name: "Multi-Millet & Palmyra Tuber Energy Flour",
    subtitle: "Ancient Grain & Tuber Super-Blend",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 289,
    rating: 4.86,
    reviewsCount: 110,
    badge: "High Fiber Multi-Grain",
    isFeatured: false,
    isNew: true,
    image: "images/products/tuber-millet-energy.svg",
    shortDesc: "Combines roasted Odiyal tuber flour with Little Millet (Samai), Foxtail Millet (Thinai), and Sprouted Ragi.",
    fullDescription: "Formulated for nourishing rotis, pancakes, and dosas. Marries the gut-friendly resistant starch of wild palmyra tubers with calcium-rich whole millets.",
    ingredients: ["Palmyra Tuber Flour (40%)", "Sprouted Ragi Flour (25%)", "Foxtail Millet Flour (20%)", "Little Millet Flour (15%)"],
    nutrition: { servingSize: "40g", calories: "142 kcal", carbs: "29 g", dietaryFiber: "5.5 g", protein: "4.1 g", calcium: "85 mg" },
    status: "available",
    variants: [{ name: "500g Bag", price: 289 }, { name: "1kg Sack", price: 529 }]
  },
  {
    id: "odiyal-savory-chips",
    name: "Roasted Kizhangu Vadai Crisps",
    subtitle: "Stone-Ground Tuber Savory Snack",
    category: "tuber",
    categoryLabel: "Palm Tuber & Powders",
    palmPart: "Germinated Seed Tuber",
    palmPartId: "tuber",
    price: 149,
    rating: 4.89,
    reviewsCount: 195,
    badge: "Baked Zero-Trans-Fat",
    isFeatured: false,
    isNew: false,
    image: "images/products/odiyal-savory-chips.svg",
    shortDesc: "Crisp, savory baked crackers made from seasoned Odiyal tuber dough with crushed black pepper, fennel, and curry leaves.",
    fullDescription: "A crunchy guilt-free teatime snack. Baked in solar ovens rather than deep-fried, providing hearty fiber with traditional coastal crunch.",
    ingredients: ["Palmyra Tuber Flour (65%)", "Cold-Pressed Sesame Oil (8%)", "Fennel Seeds", "Curry Leaves", "Black Pepper", "Sea Salt"],
    nutrition: { servingSize: "30g Serving", calories: "115 kcal", carbs: "19 g", dietaryFiber: "3.5 g", fat: "3.2 g" },
    status: "available",
    variants: [{ name: "150g Snacker Pouch", price: 149 }, { name: "Trio Party Pack (3 x 150g)", price: 399 }]
  },

  // 6. Ripe Palm Fruit (Panam Pazham) Foods
  {
    id: "panam-pazham-halwa",
    name: "Panam Pazham Halwa (Ripe Palm Fruit)",
    subtitle: "Artisanal Heritage Confectionery",
    category: "fruit",
    categoryLabel: "Ripe Fruit & Foods",
    palmPart: "Mature Ripe Fruit Pulp (Panam Pazham)",
    palmPartId: "fruit",
    price: 349,
    rating: 4.97,
    reviewsCount: 280,
    badge: "Traditional Royal Sweet",
    isFeatured: true,
    isNew: false,
    image: "images/product-fruit-halwa.jpg",
    shortDesc: "Golden-amber gelatinous halwa crafted by slow-simmering aromatic ripe Palmyra fruit pulp with pure palm jaggery, A2 ghee, and roasted cashews.",
    fullDescription: "In late monsoon, mature Palmyra fruits turn glossy dark-violet, releasing an intoxicatingly sweet tropical perfume. Master sweetmakers extract the golden fibrous pulp, strain it through fine cotton, and slowly braise it with palm jaggery and pure cow ghee until it forms glossy, melt-in-mouth confection blocks.",
    ingredients: ["Pure Ripe Palmyra Fruit Pulp (55%)", "Palm Jaggery (30%)", "Pure Desi Cow Ghee (10%)", "Roasted Cashew Kernels (5%)", "Cardamom"],
    nutrition: { servingSize: "35g Piece", calories: "128 kcal", carbs: "22 g", sugars: "18 g", fat: "4.2 g", vitaminA: "65 mcg" },
    status: "available",
    variants: [{ name: "250g Luxury Gift Box", price: 349 }, { name: "500g Celebration Tin", price: 649 }]
  },
  {
    id: "panam-fruit-pulp",
    name: "Concentrated Panam Pazham Fruit Pulp",
    subtitle: "Sterile Packaged Ripe Fruit Puree",
    category: "fruit",
    categoryLabel: "Ripe Fruit & Foods",
    palmPart: "Mature Ripe Fruit Pulp",
    palmPartId: "fruit",
    price: 299,
    rating: 4.88,
    reviewsCount: 92,
    badge: "100% Natural Fruit Puree",
    isFeatured: false,
    isNew: true,
    image: "images/products/panam-fruit-pulp.svg",
    shortDesc: "Dense golden puree extracted from sweet ripe palm fruits. Ideal for authentic culinary recipes, ice creams, and desserts.",
    fullDescription: "Captures the elusive seasonal flavor of South Asian ripe palm fruits. Aseptic cold-fill packaging retains natural beta-carotenes and tropical fruit aromas.",
    ingredients: ["100% Ripe Palmyra Palm Fruit Pulp (Borassus flabellifer)"],
    nutrition: { servingSize: "50g", calories: "55 kcal", carbs: "13.5 g", sugars: "11 g", vitaminA: "85 mcg" },
    status: "available",
    variants: [{ name: "400g Glass Jar", price: 299 }, { name: "1kg Bakery Pouch", price: 649 }]
  },
  {
    id: "panam-pattu-leather",
    name: "Panam Pattu (Sun-Cured Fruit Leathers)",
    subtitle: "Traditional Dried Ripe Fruit Strips",
    category: "fruit",
    categoryLabel: "Ripe Fruit & Foods",
    palmPart: "Mature Ripe Fruit Pulp",
    palmPartId: "fruit",
    price: 199,
    rating: 4.90,
    reviewsCount: 165,
    badge: "Sun-Cured Ancient Candy",
    isFeatured: false,
    isNew: false,
    image: "images/products/panam-pattu-leather.svg",
    shortDesc: "Thin sun-dried fruit sheets made by spreading ripe palm fruit pulp on clean woven frond mats under the intense coastal summer sun.",
    fullDescription: "The original zero-waste fruit candy of ancient coastal communities. Chewy, richly aromatic, and sweet without added corn syrups or synthetic binders.",
    ingredients: ["Pure Ripe Palmyra Fruit Pulp", "Trace Palmyra Blossom Syrup"],
    nutrition: { servingSize: "30g", calories: "88 kcal", carbs: "21 g", sugars: "17 g", dietaryFiber: "2.8 g" },
    status: "available",
    variants: [{ name: "150g Roll Pouch", price: 199 }, { name: "300g Value Pack", price: 369 }]
  },
  {
    id: "panam-fruit-jam",
    name: "Spiced Ripe Palm Fruit Preserve",
    subtitle: "Artisanal Toast & Cheese Spread",
    category: "fruit",
    categoryLabel: "Ripe Fruit & Foods",
    palmPart: "Mature Ripe Fruit Pulp",
    palmPartId: "fruit",
    price: 269,
    rating: 4.92,
    reviewsCount: 120,
    badge: "Pectin-Free Natural Set",
    isFeatured: false,
    isNew: false,
    image: "images/products/panam-fruit-jam.svg",
    shortDesc: "Ripe palm fruit cooked down with unrefined palm sugar, star anise, Ceylon cinnamon, and lemon peel.",
    fullDescription: "A rich, complex fruit spread with hints of roasted mango and fig. Pairs magnificently with warm sourdough, goat cheese platters, and parathas.",
    ingredients: ["Ripe Palmyra Palm Fruit (65%)", "Palm Sugar (30%)", "Lemon Juice", "Ceylon Cinnamon", "Star Anise"],
    nutrition: { servingSize: "1 tbsp (20g)", calories: "48 kcal", carbs: "12 g", sugars: "11 g" },
    status: "available",
    variants: [{ name: "280g Glass Jar", price: 269 }, { name: "Duo Breakfast Pack", price: 499 }]
  },
  {
    id: "panam-kernel-brittle",
    name: "Toasted Palm Seed Kernel Chikki",
    subtitle: "Nutty Seed Kernel Praline Brittle",
    category: "fruit",
    categoryLabel: "Ripe Fruit & Foods",
    palmPart: "Mature Seed Kernel",
    palmPartId: "fruit",
    price: 219,
    rating: 4.85,
    reviewsCount: 88,
    badge: "Crunchy Kernel Snack",
    isFeatured: false,
    isNew: true,
    image: "images/products/panam-kernel-brittle.svg",
    shortDesc: "Edible roasted mature palm fruit seed kernels bound in crunchy cracked palm jaggery candy.",
    fullDescription: "Utilizes the edible inner seed kernel of mature palmyra fruits, toasted to a golden crunch and set in thin crystalline jaggery brittle.",
    ingredients: ["Roasted Palmyra Seed Kernels (50%)", "Pure Palm Jaggery (48%)", "Cardamom", "Sea Salt"],
    nutrition: { servingSize: "30g", calories: "135 kcal", carbs: "18 g", protein: "3.5 g", fat: "5.5 g" },
    status: "available",
    variants: [{ name: "180g Kraft Box", price: 219 }]
  },

  // 7. Palm-Based Drink Mixes & Functional Blends
  {
    id: "karupatti-masala-chai",
    name: "TALARA Karupatti Masala Chai Blend",
    subtitle: "CTC Black Tea Infused with Palm Jaggery",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Inflorescence Sap & Single-Origin Tea",
    palmPartId: "inflorescence",
    price: 299,
    rating: 4.96,
    reviewsCount: 310,
    badge: "Pre-Sweetened Heritage Blend",
    isFeatured: true,
    isNew: false,
    image: "images/products/karupatti-masala-chai.svg",
    shortDesc: "Nilgiri orthodox black tea pre-blended with granular palm jaggery, crushed ginger, cardamom, cinnamon, and cloves.",
    fullDescription: "Simply add milk and boil for 3 minutes to create authentic South Indian roadside Karupatti Tea without measuring sugar or pounding whole spices.",
    ingredients: ["Assam & Nilgiri Black CTC Tea (45%)", "Pure Granular Palm Jaggery (40%)", "Sunthi Dry Ginger (6%)", "Cardamom (4%)", "Cinnamon", "Cloves"],
    nutrition: { servingSize: "1 tbsp (12g Mix)", calories: "38 kcal", carbs: "8.5 g", sugars: "7.8 g" },
    status: "available",
    variants: [{ name: "250g Airtight Tin", price: 299 }, { name: "500g Refill Bag", price: 549 }]
  },
  {
    id: "panakarkandu-golden-milk",
    name: "Panakarkandu Golden Milk Mix (Haldi Doodh)",
    subtitle: "Curcumin, Palm Rock Candy & Black Pepper",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Crystallized Sap & Botanical Spices",
    palmPartId: "inflorescence",
    price: 329,
    rating: 4.94,
    reviewsCount: 245,
    badge: "Bedtime Botanical Elixir",
    isFeatured: false,
    isNew: false,
    image: "images/products/panakarkandu-golden-milk.svg",
    shortDesc: "High-curcumin Lakadong turmeric blended with powdered palm rock candy, roasted almond meal, black pepper, and saffron threads.",
    fullDescription: "A soothing nightly ritual for all ages. Stir into warm oat, almond, or dairy milk. The black pepper piperine optimizes curcumin absorption while the palm rock candy provides soothing warmth.",
    ingredients: ["Crushed Panakarkandu (50%)", "Lakadong Turmeric (25%)", "Almond Flour (15%)", "Green Cardamom", "Tellicherry Pepper", "Kashmiri Saffron"],
    nutrition: { servingSize: "10g (1 mug)", calories: "39 kcal", carbs: "8.2 g", sugars: "7.5 g" },
    status: "available",
    variants: [{ name: "200g Luxury Glass Jar", price: 329 }, { name: "400g Refill Pouch", price: 599 }]
  },
  {
    id: "sukku-malli-palm-coffee",
    name: "Sukku Malli Palm Coffee Mix",
    subtitle: "Caffeine-Free Herbal Spiced Brew",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Inflorescence Sap & Heritage Herbs",
    palmPartId: "inflorescence",
    price: 249,
    rating: 4.93,
    reviewsCount: 228,
    badge: "100% Caffeine-Free",
    isFeatured: false,
    isNew: false,
    image: "images/products/sukku-malli-palm-coffee.svg",
    shortDesc: "Traditional Tamil Sukku Malli Kaapi: roasted coriander seeds, dry ginger, and pepper pre-blended with unrefined Karupatti.",
    fullDescription: "A century-old caffeine-free morning brew enjoyed in coastal villages for vitality and mental clarity. Boil 1 spoon in water for a robust, spicy, soothing decoction.",
    ingredients: ["Pure Granular Palm Jaggery (50%)", "Roasted Coriander Seeds (Malli 25%)", "Sun-Dried Ginger (Sukku 15%)", "Black Pepper", "Holy Basil (Tulsi)", "Cardamom"],
    nutrition: { servingSize: "10g", calories: "34 kcal", carbs: "7.8 g", sugars: "7.0 g" },
    status: "available",
    variants: [{ name: "250g Jar", price: 249 }, { name: "500g Value Pack", price: 449 }]
  },
  {
    id: "tuber-morning-cocoa",
    name: "Prebiotic Tuber Breakfast Cocoa",
    subtitle: "Rich Dutch Cacao with Resistant Starch Flour",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Germinated Tuber & Concentrated Sap",
    palmPartId: "tuber",
    price: 349,
    rating: 4.89,
    reviewsCount: 104,
    badge: "Prebiotic Morning Fuel",
    isFeatured: false,
    isNew: true,
    image: "images/products/tuber-morning-cocoa.svg",
    shortDesc: "Creamy gourmet hot cocoa blending dark single-origin cacao with fine prebiotic Palmyra tuber flour and golden palm sugar.",
    fullDescription: "Thickens slightly in hot milk like a luxurious European drinking chocolate while providing 4 grams of prebiotic resistant starch per serving to nourish beneficial gut microbiota.",
    ingredients: ["Pure Dutch Processed Cacao (40%)", "Palmyra Tuber Flour (35%)", "AURA Palm Sugar (25%)", "Sea Salt"],
    nutrition: { servingSize: "20g", calories: "76 kcal", carbs: "14 g", dietaryFiber: "3.8 g", protein: "2.5 g" },
    status: "available",
    variants: [{ name: "250g Kraft Tin", price: 349 }]
  },
  {
    id: "palm-electrolyte-sachets",
    name: "Active Neera Electrolyte Drink Mix",
    subtitle: "Dehydrated Palm Blossom Electrolyte Powder",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Freeze-Dried Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 299,
    rating: 4.91,
    reviewsCount: 156,
    badge: "10-Sachet Sports Box",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-electrolyte-sachets.svg",
    shortDesc: "Instant hydration powder made from spray-dried pure palm sap, lemon juice, and pink salt. Empty into 500ml water bottle for pure hydration.",
    fullDescription: "Replaces artificial neon chemical hydration powders with pure plant-sourced potassium, magnesium, and bio-available carbohydrates.",
    ingredients: ["Dehydrated Palmyra Sap Powder (78%)", "Spray-Dried Lemon Juice (15%)", "Pink Himalayan Salt (7%)"],
    nutrition: { servingSize: "1 Sachet (12g)", calories: "42 kcal", potassium: "210 mg", sodium: "140 mg", magnesium: "18 mg" },
    status: "available",
    variants: [{ name: "Box of 10 Sachets", price: 299 }, { name: "30-Sachet Monthly Bundle", price: 799 }]
  },
  {
    id: "herbal-palm-kashayam",
    name: "Heritage Spiced Palm Kashayam Mix",
    subtitle: "Ten-Botanical Seasonal Immune Decoction",
    category: "mixes",
    categoryLabel: "Drink Mixes & Blends",
    palmPart: "Inflorescence Sap & Forest Herbs",
    palmPartId: "inflorescence",
    price: 269,
    rating: 4.88,
    reviewsCount: 130,
    badge: "Traditional Family Decoction",
    isFeatured: false,
    isNew: false,
    image: "images/products/herbal-palm-kashayam.svg",
    shortDesc: "An ancestral decoction powder featuring holy basil, malabar nut, ginger, and cumin bound in powdered Karupatti jaggery.",
    fullDescription: "A trusted traditional household recipe brewed during seasonal monsoon weather shifts to bring soothing comfort to the respiratory passages.",
    ingredients: ["Palm Jaggery Powder (55%)", "Tulsi", "Adhatoda Vasica (Adathodai)", "Sunthi", "Black Pepper", "Licorice"],
    nutrition: { servingSize: "10g", calories: "35 kcal", carbs: "8.1 g", sugars: "7.2 g" },
    status: "available",
    variants: [{ name: "200g Jar", price: 269 }, { name: "400g Family Tub", price: 479 }]
  },

  // 8. Traditional Palm-Based Confectionery & Gourmet Foods
  {
    id: "karupatti-mysore-pak",
    name: "Artisan Karupatti Mysore Pak",
    subtitle: "Ghee & Palm Jaggery Traditional Melt",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 399,
    rating: 4.98,
    reviewsCount: 360,
    badge: "Pure A2 Cow Ghee",
    isFeatured: true,
    isNew: false,
    image: "images/products/karupatti-mysore-pak.svg",
    shortDesc: "Silky, melt-in-mouth royal sweet crafted with roasted gram flour, generous pure cow ghee, and dark mineral-rich palm jaggery.",
    fullDescription: "A healthy elevation of South India's most famous sweet. Replaces white refined cane sugar completely with deep, caramelized Panai Karupatti, resulting in an unctuous, aromatic delicacy.",
    ingredients: ["Pure Palm Jaggery (Karupatti 40%)", "Pure Cow Ghee (35%)", "Roasted Besan Gram Flour (25%)", "Cardamom"],
    nutrition: { servingSize: "1 Piece (30g)", calories: "145 kcal", carbs: "16 g", sugars: "12 g", fat: "8.5 g", protein: "2.1 g" },
    status: "available",
    variants: [{ name: "250g Decorative Gift Box", price: 399 }, { name: "500g Festival Box", price: 749 }]
  },
  {
    id: "karupatti-halwa",
    name: "Tirunelveli Style Karupatti Wheat Halwa",
    subtitle: "Slow-Stirred Fermented Wheat Milk Halwa",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 369,
    rating: 4.95,
    reviewsCount: 290,
    badge: "Iconic Heritage Recipe",
    isFeatured: false,
    isNew: false,
    image: "images/products/karupatti-halwa.svg",
    shortDesc: "Extracted Samba wheat milk slow-braised for 6 hours in copper cauldrons with molten palm jaggery and golden cashew nuts.",
    fullDescription: "Famous across the world for its glossy, elastic texture and deeply smoky caramel warmth. Handcrafted by master halwa artisans in Tirunelveli.",
    ingredients: ["Extracted Samba Whole Wheat Milk (40%)", "Pure Palm Jaggery (38%)", "Pure Cow Ghee (18%)", "Whole Cashews (4%)"],
    nutrition: { servingSize: "40g Serving", calories: "160 kcal", carbs: "22 g", sugars: "17 g", fat: "7.2 g" },
    status: "available",
    variants: [{ name: "300g Traditional Tin", price: 369 }, { name: "600g Celebration Tub", price: 689 }]
  },
  {
    id: "palm-kadalai-mittai",
    name: "Karupatti Kadalai Mittai (Peanut Chikki)",
    subtitle: "Wood-Roasted Peanut & Palm Jaggery Brittle",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 149,
    rating: 4.91,
    reviewsCount: 240,
    badge: "Crispy Traditional Snack",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-kadalai-mittai.svg",
    shortDesc: "Crunchy wood-roasted peanuts bonded with crisp unrefined palm jaggery candy. High protein, zero corn syrup.",
    fullDescription: "From the heritage candy hub of Kovilpatti. Hand-cut into crisp golden-brown squares that deliver satisfying crunch and enduring satiety.",
    ingredients: ["Roasted Groundnuts / Peanuts (55%)", "Pure Palmyra Palm Jaggery (45%)", "Cardamom"],
    nutrition: { servingSize: "30g Piece", calories: "148 kcal", protein: "5.2 g", carbs: "15 g", fat: "7.8 g" },
    status: "available",
    variants: [{ name: "200g Box (8 Bars)", price: 149 }, { name: "400g Pantry Jar", price: 279 }]
  },
  {
    id: "panai-paniyaram-mix",
    name: "Panai Karupatti Paniyaram Ready-Mix",
    subtitle: "Stone-Ground Fermented Batter Mix",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Inflorescence Sap & Heritage Grains",
    palmPartId: "inflorescence",
    price: 199,
    rating: 4.87,
    reviewsCount: 135,
    badge: "15-Minute Home Snack",
    isFeatured: false,
    isNew: true,
    image: "images/products/panai-paniyaram-mix.svg",
    shortDesc: "Fermented red rice and black gram flour pre-blended with crushed palm jaggery, cardamom, and desiccated coconut flakes.",
    fullDescription: "Whisk with water to create plump, crispy-outside, fluffy-inside sweet appams or paniyaram balls in a cast iron skillet.",
    ingredients: ["Red Rice Flour (40%)", "Granular Palm Jaggery (35%)", "Urad Dal Flour (15%)", "Grated Dry Coconut (8%)", "Cardamom"],
    nutrition: { servingSize: "40g Mix", calories: "148 kcal", carbs: "32 g", protein: "3.2 g" },
    status: "available",
    variants: [{ name: "400g Stand-up Pouch", price: 199 }, { name: "800g Family Pack", price: 369 }]
  },
  {
    id: "ellu-karupatti-urundai",
    name: "Black Sesame Palm Jaggery Balls (Ellu Urundai)",
    subtitle: "Calcium-Rich Traditional Energy Ladoo",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 179,
    rating: 4.93,
    reviewsCount: 180,
    badge: "Natural Iron & Calcium Snack",
    isFeatured: false,
    isNew: false,
    image: "images/products/ellu-karupatti-urundai.svg",
    shortDesc: "Toasted nutrient-dense black sesame seeds pounded with warm soft Karupatti palm jaggery into wholesome energy rounds.",
    fullDescription: "A centuries-old postpartum and sports energy food packed with natural plant calcium, iron, and sesame lignans.",
    ingredients: ["Black Sesame Seeds (55%)", "Pure Palmyra Palm Jaggery (45%)", "Cardamom"],
    nutrition: { servingSize: "1 Ball (25g)", calories: "122 kcal", calcium: "185 mg (19% DV)", iron: "2.1 mg (12% DV)", protein: "3.8 g" },
    status: "available",
    variants: [{ name: "Box of 10 Balls (250g)", price: 179 }, { name: "Duo Box (500g)", price: 329 }]
  },
  {
    id: "palm-coconut-barfi",
    name: "Palm Sugar Tender Coconut Barfi",
    subtitle: "Chewy Fresh Coconut Fudge Squares",
    category: "foods",
    categoryLabel: "Traditional Foods & Sweets",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 289,
    rating: 4.89,
    reviewsCount: 140,
    badge: "Fresh Coconut & Palm Sugar",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-coconut-barfi.svg",
    shortDesc: "Succulent freshly grated coastal coconut gently caramelized with golden palm sugar crystals and cardamom.",
    fullDescription: "A moist, melt-in-mouth confection free of synthetic coloring or white sugar. Celebrates the harmony of South India's two most famous palms.",
    ingredients: ["Fresh Grated Coconut (50%)", "Pure Palm Sugar (45%)", "Cow Ghee (<5%)", "Cardamom"],
    nutrition: { servingSize: "30g Piece", calories: "135 kcal", carbs: "16 g", fat: "7.5 g", dietaryFiber: "2.1 g" },
    status: "available",
    variants: [{ name: "250g Gift Box", price: 289 }, { name: "500g Box", price: 549 }]
  },

  // 9. Eco-Friendly Palm Leaf Products (Frond Arts)
  {
    id: "frond-dinner-set",
    name: "FROND-FORM Sculpted Dining Plates (25-Pack)",
    subtitle: "Thermo-Pressed Palm Leaf Tableware",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Naturally Shed Leaf Petioles & Fronds",
    palmPartId: "frond",
    price: 499,
    rating: 4.96,
    reviewsCount: 315,
    badge: "100% Home-Compostable in 45 Days",
    isFeatured: true,
    isNew: false,
    image: "images/product-homeware.jpg",
    shortDesc: "Architectural 10-inch square dinner plates thermo-molded from shed Palmyra fronds. Water-resistant, microwave-safe, zero plastic.",
    fullDescription: "Redefining single-use and reusable tableware. Instead of felling trees or coating paper in polyethylene plastic, FROND-FORM molds shed leaf bases under clean 145°C steam pressure. Binds natural leaf lignin to produce sturdy, hydrophobic plates.",
    ingredients: ["100% Naturally Shed Palmyra Palm Leaf Fronds", "Zero Adhesives, Resins, or Bleaches"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Pack of 25 Plates (10-Inch)", price: 499 }, { name: "Party Host Case of 100", price: 1799 }]
  },
  {
    id: "frond-deep-bowls",
    name: "Thermo-Pressed Palm Frond Bowls (25-Pack)",
    subtitle: "Leak-Proof Soup & Dessert Bowls",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Naturally Shed Fronds",
    palmPartId: "frond",
    price: 299,
    rating: 4.92,
    reviewsCount: 180,
    badge: "Hot Liquid Safe",
    isFeatured: false,
    isNew: false,
    image: "images/products/frond-deep-bowls.svg",
    shortDesc: "Sturdy 350ml round bowls capable of holding boiling hot broths, curries, and icy desserts without sagging or leaking.",
    fullDescription: "Certified under US FDA 21 CFR standards for direct hot food contact. Compostable in home garden soil within 6 weeks.",
    ingredients: ["100% Steam-Pressed Palmyra Frond Fiber"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Pack of 25 Bowls (350ml)", price: 299 }, { name: "Case of 100 Bowls", price: 999 }]
  },
  {
    id: "palm-leaf-kottan",
    name: "Handwoven Chettinad Palm Leaf Kottan Basket",
    subtitle: "Artisanal Heritage Lidded Storage Basket",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Young Tender Frond Blades",
    palmPartId: "frond",
    price: 599,
    rating: 4.98,
    reviewsCount: 220,
    badge: "Artisan Cooperative Made",
    isFeatured: true,
    isNew: false,
    image: "images/product-leaf-kottan.jpg",
    shortDesc: "Vibrant, durable lidded storage basket micro-woven by master women artisans from hand-split, sun-bleached Palmyra palm leaves.",
    fullDescription: "A celebrated craft from the Chettinad region. Young supple palm fronds are split into 2mm strands, dyed with non-toxic natural pigments, and hand-woven over 14 hours into a resilient, feather-light heirloom basket with handle and lid.",
    ingredients: ["100% Hand-Split Palmyra Palm Leaf", "Natural Plant Dyes"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Medium Cylinder Basket (8x8 inch)", price: 599 }, { name: "Large Hamper Basket (12x12 inch)", price: 999 }]
  },
  {
    id: "frond-serving-trays",
    name: "Sculpted Palm Leaf Appetizer Platters",
    subtitle: "Set of 6 Heavy-Duty Entertaining Trays",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Naturally Shed Leaf Petioles",
    palmPartId: "frond",
    price: 399,
    rating: 4.89,
    reviewsCount: 96,
    badge: "Reusable for Dry Foods",
    isFeatured: false,
    isNew: true,
    image: "images/products/frond-serving-trays.svg",
    shortDesc: "Elongated 14x6 inch serving trays featuring natural organic leaf grain striations. Sturdy enough for cheeses, sushi, and finger foods.",
    fullDescription: "Each platter showcases unique organic grain variations. Wipe clean with a damp cloth for repeated dry food use, then compost naturally.",
    ingredients: ["100% Heat-Molded Shed Palmyra Frond"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Set of 6 Trays", price: 399 }, { name: "Set of 12 Trays", price: 729 }]
  },
  {
    id: "palm-leaf-placemats",
    name: "Woven Palm Leaf Dining Placemats",
    subtitle: "Set of 4 Natural Coastal Table Mats",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Young Frond Leaf Strips",
    palmPartId: "frond",
    price: 449,
    rating: 4.91,
    reviewsCount: 112,
    badge: "Heat-Resistant Tableware",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-leaf-placemats.svg",
    shortDesc: "Braided natural sand-colored palm frond mats that protect fine dining tables from heat rings and spills while adding organic warmth.",
    fullDescription: "Hand-braided in concentric ribbed circles. Naturally repellent to grease and easily rinsed with cool water.",
    ingredients: ["100% Sun-Dried Palmyra Palm Leaf Ribs"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Set of 4 Mats (14-inch Round)", price: 449 }, { name: "Set of 6 Mats", price: 649 }]
  },
  {
    id: "palm-leaf-coasters",
    name: "Hand-Braided Palm Leaf Coasters",
    subtitle: "Set of 6 Drink Coasters with Holder",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Young Frond Strips",
    palmPartId: "frond",
    price: 249,
    rating: 4.88,
    reviewsCount: 140,
    badge: "Natural Moisture Wicking",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-leaf-coasters.svg",
    shortDesc: "Spiral-woven beverage coasters that absorb condensation droplets without sticking to wet cocktail or coffee glasses.",
    fullDescription: "Comes nested inside a matching handwoven palm leaf holder bowl. 100% biodegradable and zero plastic.",
    ingredients: ["100% Palmyra Palm Frond"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Set of 6 Coasters + Caddy", price: 249 }]
  },
  {
    id: "palm-leaf-hamper-box",
    name: "Panai Olai Hexagonal Wedding Favor Box",
    subtitle: "Pack of 10 Biodegradable Gift Boxes",
    category: "frond",
    categoryLabel: "Palm Leaf Homeware",
    palmPart: "Tender Frond Blades",
    palmPartId: "frond",
    price: 349,
    rating: 4.90,
    reviewsCount: 88,
    badge: "Zero-Plastic Gift Packaging",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-leaf-hamper-box.svg",
    shortDesc: "Intricately hand-folded hexagonal gift boxes with interlocking lid tabs, made from sun-bleached palm leaves.",
    fullDescription: "Replaces plastic wedding favor boxes with natural coastal heritage elegance. Fits dry fruits, sweets, or jewelry.",
    ingredients: ["100% Natural Palm Fronds"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Pack of 10 Boxes", price: 349 }, { name: "Bulk Event Pack of 50", price: 1499 }]
  },

  // 10. Palm Fiber Products & Eco-Homeware
  {
    id: "fiber-pot-scrubber",
    name: "COIRA Basal Fiber Heavy Duty Scrubber",
    subtitle: "Tough Cast-Iron & Kitchen Scrub Brush",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Basal Leaf Sheath Coarse Fibers",
    palmPartId: "fiber",
    price: 149,
    rating: 4.94,
    reviewsCount: 380,
    badge: "Zero Microplastics Shedding",
    isFeatured: true,
    isNew: false,
    image: "images/product-fiber-brush.jpg",
    shortDesc: "Stiff, spring-resilient household scrub brush crafted from combed Palmyra leaf-base fibers. Tough on burnt pans, zero microplastics.",
    fullDescription: "Synthetic nylon sponges shed millions of microplastic filaments into city sewers. Palmyra sheath fibers—traditionally used for deep-sea rigging ropes—are naturally grease-repelling, acid-resistant, and tough on cast iron without scratching seasoning.",
    ingredients: ["100% Palmyra Palm Basal Fiber", "Fallen Hardwood Handle", "Copper Wire Binding"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Single Heavy-Duty Scrubber", price: 149 }, { name: "Trio Pack (3 Brushes)", price: 389 }]
  },
  {
    id: "fiber-counter-brush",
    name: "Hardwood & Palmyra Fiber Dusting Brush",
    subtitle: "Ergonomic Countertop & Hearth Brush",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Leaf Base Sheath Fibers & Hardwood",
    palmPartId: "fiber",
    price: 399,
    rating: 4.91,
    reviewsCount: 165,
    badge: "Fallen Hardwood Handle",
    isFeatured: false,
    isNew: false,
    image: "images/products/fiber-counter-brush.svg",
    shortDesc: "Dense natural bristles hand-set into an ergonomic handle carved from naturally fallen seasoned Palmyra palm hardwood.",
    fullDescription: "Sweeps coffee grounds, breadcrumbs, flour, and fireplace ash cleanly with zero static cling. Built for decades of daily utility.",
    ingredients: ["Palmyra Basal Sheath Fiber", "Fallen Palmyra Hardwood Handle", "Natural Tung Oil Finish"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Standard Counter Brush (12-Inch)", price: 399 }]
  },
  {
    id: "fiber-body-brush",
    name: "Dry Skin Exfoliating Palmyra Body Brush",
    subtitle: "Ayurvedic Dry-Brushing Wellness Tool",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Soft-Combed Basal Sheath Fiber",
    palmPartId: "fiber",
    price: 349,
    rating: 4.89,
    reviewsCount: 142,
    badge: "Natural Lymphatic Care",
    isFeatured: false,
    isNew: true,
    image: "images/products/fiber-body-brush.svg",
    shortDesc: "Gentle yet invigorating dry-skin body brush crafted from finely combed soft palmyra bristles with organic cotton hand strap.",
    fullDescription: "Used in traditional Gharshana dry-brushing routines to buff away dry epidermal cells and stimulate cutaneous micro-circulation.",
    ingredients: ["Fine-Combed Palmyra Sheath Bristles", "Fallen Hardwood Base", "Organic Cotton Strap"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Handheld Palm Brush", price: 349 }, { name: "Long-Handle Back Brush", price: 499 }]
  },
  {
    id: "palm-coir-door-mat",
    name: "Heavy-Duty Palmyra Fiber Scraper Mat",
    subtitle: "Outdoor Mud & Debris Boot Scraper",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Basal Leaf Sheath Coarse Fiber",
    palmPartId: "fiber",
    price: 699,
    rating: 4.96,
    reviewsCount: 210,
    badge: "Weather-Proof Natural Wire",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-coir-door-mat.svg",
    shortDesc: "Dense, wire-stiff vertical palmyra fiber tufts woven into a heavy natural rubber backing. Scrapes thick mud and withstands heavy monsoon rain.",
    fullDescription: "Far tougher than standard coconut coir mats. Palmyra fiber retains its upright bristle stiffness for years of outdoor foot traffic.",
    ingredients: ["100% Unbleached Palmyra Basal Fiber", "Natural Vulcanized Tree Rubber Backing"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Standard Entry Mat (45x75 cm)", price: 699 }, { name: "Grand Foyer Mat (60x90 cm)", price: 999 }]
  },
  {
    id: "palm-fiber-garden-twine",
    name: "Palmyra Fiber High-Tensile Garden Cordage",
    subtitle: "100-Meter Spool of Natural Plant Twine",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Leaf Base Sheath Fiber",
    palmPartId: "fiber",
    price: 199,
    rating: 4.88,
    reviewsCount: 120,
    badge: "Zero Synthetic Plastic Twine",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-fiber-garden-twine.svg",
    shortDesc: "Rot-resistant natural plant twine for tying tomatoes, climbing creepers, staking trees, and tying organic parcels.",
    fullDescription: "Unlike synthetic polypropylene baling twine that pollutes soil with plastic fragments, Palmyra twine naturally composts into rich humus over 18 months.",
    ingredients: ["100% Twisted Palmyra Sheath Fibers"],
    nutrition: null,
    status: "available",
    variants: [{ name: "100m Spool (2mm Thickness)", price: 199 }, { name: "Duo Pack (2 x 100m)", price: 349 }]
  },
  {
    id: "palm-root-soil-geo",
    name: "Palmyra Fiber Erosion-Control Geotextile",
    subtitle: "Regenerative Hillside & Canal Mesh (3x1m)",
    category: "fiber",
    categoryLabel: "Palm Fiber & Eco-Craft",
    palmPart: "Structural Sheath & Trunk Fiber",
    palmPartId: "fiber",
    price: 899,
    rating: 4.85,
    reviewsCount: 45,
    badge: "Civil Engineering Bio-Net",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-root-soil-geo.svg",
    shortDesc: "Open-mesh biodegradable netting engineered to stabilize riverbanks, coastal sand dunes, and road cuttings while vegetation establishes.",
    fullDescription: "Possesses superior tensile strength and water permeability. High natural lignin content provides a 3-5 year working lifespan before harmless biodegradation.",
    ingredients: ["100% Heavy-Gauge Palmyra Sheath Fiber Cordage"],
    nutrition: null,
    status: "available",
    variants: [{ name: "3 x 1 Meter Roll", price: 899 }, { name: "Contractor Roll (10 x 2 Meter)", price: 4499 }]
  },

  // 11. Modern Palmyra Innovations & Biomaterials
  {
    id: "tala-pulp-cartons",
    name: "TALA-PULP Zero-Tree Packaging Trays",
    subtitle: "Molded Agricultural Residue Cushioning (10-Pack)",
    category: "biomaterials",
    categoryLabel: "Biomaterials & Hardwood",
    palmPart: "Pruned Frond Biomass Residues",
    palmPartId: "frond",
    price: 449,
    rating: 4.87,
    reviewsCount: 78,
    badge: "Tree-Free & Ocean-Safe",
    isFeatured: false,
    isNew: true,
    image: "images/products/tala-pulp-cartons.svg",
    shortDesc: "Rigid protective cushioning trays thermo-formed entirely from unbleached Palmyra agricultural residues. Replaces Styrofoam and plastic foams.",
    fullDescription: "Chlorine-free mechanical pulping converts discarded leaf petioles into dense, custom-contoured protective packaging that cushions glassware, electronics, and luxury bottles.",
    ingredients: ["100% Upcycled Palmyra Agro-Residues", "Zero PFAS Forever Chemicals"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Pack of 10 Trays (Bottle/Flask Shipper)", price: 449 }]
  },
  {
    id: "palm-wood-spatula",
    name: "Hand-Carved Palmyra Wood Cooking Spatula",
    subtitle: "Heirloom Striated Hardwood Kitchen Tool",
    category: "biomaterials",
    categoryLabel: "Biomaterials & Hardwood",
    palmPart: "Naturally Fallen Mature Hardwood",
    palmPartId: "trunk",
    price: 299,
    rating: 4.95,
    reviewsCount: 230,
    badge: "Non-Felled Fallen Timber Only",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-wood-spatula.svg",
    shortDesc: "Turned and shaped from dense, termite-resistant end-of-life palmyra heartwood. Gentle on non-stick pans, heat-resistant, beautiful striated grain.",
    fullDescription: "Harvested strictly under our zero-felling policy from trees that concluded their 80-100 year lifespan. Palmyra heartwood is naturally hydrophobic and does not harbor bacterial growth.",
    ingredients: ["100% Naturally Fallen Borassus flabellifer Hardwood", "Cold-Pressed Walnut Oil Polish"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Flat Saute Spatula (12-inch)", price: 299 }, { name: "Set of 3 Cooking Spoons", price: 799 }]
  },
  {
    id: "palm-wood-salt-cellar",
    name: "Palmyra Hardwood Salt Cellar & Leaf Lid",
    subtitle: "Turned Tabletop Cellar with Small Spoon",
    category: "biomaterials",
    categoryLabel: "Biomaterials & Hardwood",
    palmPart: "Fallen Hardwood & Pressed Leaf",
    palmPartId: "trunk",
    price: 549,
    rating: 4.96,
    reviewsCount: 165,
    badge: "Artisanal Table Artifact",
    isFeatured: true,
    isNew: false,
    image: "images/products/palm-wood-salt-cellar.svg",
    shortDesc: "Hand-turned wooden condiment vessel featuring dark fibrous grain, magnetic swivel leaf lid, and matching miniature hardwood spoon.",
    fullDescription: "The high natural density of mature palmyra wood repels ambient humidity, keeping finishing sea salt and spices dry and free-flowing on dining tables.",
    ingredients: ["Fallen Palmyra Palm Hardwood", "Brass Pivot Rivet", "Organic Carnauba Wax"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Single Cellar with Spoon", price: 549 }, { name: "Duo Cellar Set (Salt & Pepper)", price: 999 }]
  },
  {
    id: "palm-biochar-filter",
    name: "Activated Palm Seed Biochar Granules",
    subtitle: "Natural Water & Odor Clarification Media",
    category: "biomaterials",
    categoryLabel: "Biomaterials & Hardwood",
    palmPart: "Pyrolyzed Empty Drupe Husks & Seeds",
    palmPartId: "fruit",
    price: 399,
    rating: 4.88,
    reviewsCount: 65,
    badge: "Carbon-Negative Material",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-biochar-filter.svg",
    shortDesc: "High surface-area activated carbon granules produced by oxygen-starved pyrolysis of empty palmyra fruit seed stones.",
    fullDescription: "Unmatched micro-porosity for adsorbing chlorine, heavy metals, and odors in home carafes, terrariums, and soil remediation.",
    ingredients: ["100% High-Surface Activated Carbon from Palmyra Seed Stones"],
    nutrition: null,
    status: "available",
    variants: [{ name: "500g Granule Pouch", price: 399 }, { name: "1kg Bulk Bag", price: 699 }]
  },
  {
    id: "palm-wood-incense-plinth",
    name: "Striated Palmyra Wood Aromatherapy Plinth",
    subtitle: "Brass-Inlaid Incense & Dhoop Burner",
    category: "biomaterials",
    categoryLabel: "Biomaterials & Hardwood",
    palmPart: "Fallen Mature Hardwood",
    palmPartId: "trunk",
    price: 349,
    rating: 4.92,
    reviewsCount: 110,
    badge: "Handmade Home Decor",
    isFeatured: false,
    isNew: false,
    image: "images/products/palm-wood-incense-plinth.svg",
    shortDesc: "Minimalist boat-shaped incense holder with dark striated grain that catches falling ash cleanly. Inlaid with solid brass accents.",
    fullDescription: "A serene centerpiece for meditation corners and studio workspaces, highlighting the dramatic natural black-and-gold fiber grain of Borassus wood.",
    ingredients: ["Fallen Palmyra Hardwood", "Solid Brass Inlay"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Standard 10-Inch Plinth", price: 349 }]
  },

  // 12. Luxury Gift Collections & Curations
  {
    id: "emperor-palm-casket",
    name: "THE EMPEROR PALM Grand Heritage Box",
    subtitle: "Curated Multi-Product Heirloom Collection",
    category: "curations",
    categoryLabel: "Luxury Gift Collections",
    palmPart: "Full Tree Integration (Sap, Wood, Frond, Fiber)",
    palmPartId: "trunk",
    price: 1999,
    rating: 4.99,
    reviewsCount: 185,
    badge: "Numbered Collector's Edition",
    isFeatured: true,
    isNew: false,
    image: "images/product-emperor-casket.jpg",
    shortDesc: "The ultimate celebration of Borassus flabellifer: Liquid Jaggery Paagu, Palm Sugar Crystals, Karupatti blocks, Leaf Kottan, and turned wood cellar in a bespoke casket.",
    fullDescription: "Housed within an heirloom keepsake casket crafted from naturally fallen century-old Palmyra heartwood, the Emperor Palm Collection unites our finest culinary and lifestyle treasures in a zero-waste tour-de-force.",
    ingredients: [
      "1x Liquid Palm Jaggery Paagu (300ml Flask)",
      "1x AURA Palm Sugar Crystals (400g Pouch)",
      "1x Traditional Cone Karupatti Block (200g in Leaf Cup)",
      "1x Hand-Turned Palmyra Hardwood Salt Cellar with Spoon",
      "2x FROND-FORM Sculpted Appetizer Platters",
      "1x Signed Certificate of Provenance & Tapper Stewardship Card"
    ],
    nutrition: null,
    status: "available",
    variants: [{ name: "Standard Collector's Casket", price: 1999 }, { name: "Monogram Engraved Reserve Edition", price: 2499 }]
  },
  {
    id: "tappers-dawn-collection",
    name: "Tapper's Dawn Heritage Culinary Hamper",
    subtitle: "Gourmet Sweetener & Beverage Trio",
    category: "curations",
    categoryLabel: "Luxury Gift Collections",
    palmPart: "Inflorescence Sap Spectrum",
    palmPartId: "inflorescence",
    price: 1299,
    rating: 4.96,
    reviewsCount: 140,
    badge: "Gourmet Gifting Box",
    isFeatured: false,
    isNew: false,
    image: "images/products/tappers-dawn-collection.svg",
    shortDesc: "Contains Fresh Non-Alcoholic Pathaneer, Panakarkandu Rock Sugar, Liquid Jaggery Nectar, and a handwoven palm leaf gift basket.",
    fullDescription: "A thoughtfully curated culinary journey tracing fresh dawn sap from living tree crown to crystalline sugar and aged sweetening reserves.",
    ingredients: ["Fresh Pathaneer (300ml)", "Panakarkandu Jar (350g)", "Karupatti Paagu (300ml)", "Chettinad Palm Leaf Kottan Basket"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Complete 4-Piece Hamper", price: 1299 }]
  },
  {
    id: "zero-waste-entertaining",
    name: "The Zero-Waste Sustainable Host Crate",
    subtitle: "Tableware & Fiber Hospitality Set",
    category: "curations",
    categoryLabel: "Luxury Gift Collections",
    palmPart: "Shed Fronds, Sheath Fibers & Hardwood",
    palmPartId: "frond",
    price: 1499,
    rating: 4.95,
    reviewsCount: 95,
    badge: "Plastic-Free Hospitality",
    isFeatured: false,
    isNew: true,
    image: "images/products/zero-waste-entertaining.svg",
    shortDesc: "25 Frond Dinner Plates, 25 Frond Bowls, 4 Woven Placemats, 6 Palm Coasters, and 2 Natural Fiber Pot Scrubbers in a reusable carryall.",
    fullDescription: "Everything a conscious modern home needs to host dinner parties, outdoor feasts, and picnics with zero single-use plastic waste.",
    ingredients: ["Frond Plates & Bowls", "Woven Leaf Placemats & Coasters", "Palmyra Fiber Kitchen Brushes"],
    nutrition: null,
    status: "available",
    variants: [{ name: "Curated Host Crate", price: 1499 }]
  },

  // 13. Coming Soon / Future Product Concepts
  {
    id: "freeze-dried-pathaneer",
    name: "Freeze-Dried Pathaneer Tablets [Concept]",
    subtitle: "Effervescent Instant Sap Hydration",
    category: "concepts",
    categoryLabel: "Coming Soon & Concepts",
    palmPart: "Lyophilized Dawn Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 399,
    rating: 5.0,
    reviewsCount: 0,
    badge: "Concept Lab Prototype",
    isFeatured: false,
    isNew: true,
    image: "images/products/freeze-dried-pathaneer.svg",
    shortDesc: "Drop one effervescent tablet into chilled water to recreate pure, isotonic sweet Pathaneer anywhere in the world in 30 seconds.",
    fullDescription: "Our R&D biotechnology division is developing low-temperature lyophilization that stabilizes delicate heat-sensitive palm sap polyphenols and electrolytes into dissolvable zero-waste mineral tablets.",
    ingredients: ["Freeze-Dried Pure Palmyra Sap Extract", "Natural Effervescent Base", "Micro-Encapsulated Lime"],
    nutrition: null,
    status: "concept",
    variants: [{ name: "Tube of 15 Tablets (Prototype)", price: 399 }]
  },
  {
    id: "palmyrin-skin-serum",
    name: "Palmyrin Antioxidant Plant Face Serum [Concept]",
    subtitle: "Botanical Polyphenol Skin Hydration",
    category: "concepts",
    categoryLabel: "Coming Soon & Concepts",
    palmPart: "Spadix Exudate & Blossom Polyphenols",
    palmPartId: "inflorescence",
    price: 799,
    rating: 5.0,
    reviewsCount: 0,
    badge: "Concept Lab Prototype",
    isFeatured: false,
    isNew: true,
    image: "images/products/palmyrin-skin-serum.svg",
    shortDesc: "Clean cosmetic formulation utilizing concentrated Borassus blossom polyphenols to combat urban environmental oxidation.",
    fullDescription: "In vitro laboratory screening reveals that unfermented female palm blossom sap has remarkable free-radical scavenging properties. Formulated in a squalane and rose hydrosol base.",
    ingredients: ["Cold-Purified Palmyra Polyphenol Extract", "Olive Squalane", "Damask Rose Hydrosol", "Hyaluronic Acid"],
    nutrition: null,
    status: "concept",
    variants: [{ name: "30ml Dropper Flask", price: 799 }]
  },
  {
    id: "palm-pith-plant-leather",
    name: "Bio-Circular Palm Leather Card Sleeve [Concept]",
    subtitle: "Cruelty-Free Plant-Based Material",
    category: "concepts",
    categoryLabel: "Coming Soon & Concepts",
    palmPart: "Pruned Trunk Sheath Fibrous Pith",
    palmPartId: "trunk",
    price: 649,
    rating: 5.0,
    reviewsCount: 0,
    badge: "Concept Lab Prototype",
    isFeatured: false,
    isNew: true,
    image: "images/products/palm-pith-plant-leather.svg",
    shortDesc: "Supple, water-repellent vegan leather engineered from discarded fibrous leaf sheaths bound with natural rubber latex.",
    fullDescription: "Eliminates petrochemical PU leathers and animal hides. Tests show tensile strength exceeding 18 MPa with rich embossed plant grain.",
    ingredients: ["Upcycled Palmyra Leaf Sheath Pith", "Natural Hevea Rubber Latex Binder"],
    nutrition: null,
    status: "concept",
    variants: [{ name: "Minimalist 4-Pocket Card Sleeve", price: 649 }]
  },
  {
    id: "tuber-prebiotic-pasta",
    name: "Grain-Free Resistant Starch Tuber Pasta [Concept]",
    subtitle: "Artisanal Odiyal Flour Penne Rigate",
    category: "concepts",
    categoryLabel: "Coming Soon & Concepts",
    palmPart: "Germinated Tuber (Odiyal)",
    palmPartId: "tuber",
    price: 349,
    rating: 5.0,
    reviewsCount: 0,
    badge: "Concept Lab Prototype",
    isFeatured: false,
    isNew: true,
    image: "images/products/tuber-prebiotic-pasta.svg",
    shortDesc: "Gluten-free bronze-die extruded penne pasta made from cold-milled germinated Odiyal tubers and golden flaxseed.",
    fullDescription: "Holds an al-dente texture while delivering 8 grams of prebiotic dietary fiber per portion with zero wheat or corn starches.",
    ingredients: ["Stone-Milled Palmyra Tuber Flour (80%)", "Golden Flaxseed Flour (15%)", "Psyllium Husk (5%)"],
    nutrition: null,
    status: "concept",
    variants: [{ name: "250g Artisan Box", price: 349 }]
  }
];

// Generate individual distinctive SVG visuals for products that don't already have an individual JPEG
ALL_PRODUCTS.forEach(p => {
  if (p.image.endsWith('.svg')) {
    const fileName = path.basename(p.image);
    const filePath = path.join(productsImgDir, fileName);

    // Color theme based on category
    let gradStart = '#2b1b0b';
    let gradEnd = '#120d06';
    let accentColor = '#d9923b';
    let subIcon = 'M12 2v8';
    let shapeType = 'jar';

    if (p.category === 'beverages') {
      gradStart = '#0c231a';
      gradEnd = '#06120d';
      accentColor = '#4ade80';
      shapeType = 'bottle';
    } else if (p.category === 'nungu') {
      gradStart = '#0e2b30';
      gradEnd = '#071618';
      accentColor = '#67e8f9';
      shapeType = 'fruit';
    } else if (p.category === 'tuber') {
      gradStart = '#261b0c';
      gradEnd = '#110b04';
      accentColor = '#f59e0b';
      shapeType = 'pouch';
    } else if (p.category === 'fruit') {
      gradStart = '#331a08';
      gradEnd = '#170a02';
      accentColor = '#fb923c';
      shapeType = 'dish';
    } else if (p.category === 'mixes') {
      gradStart = '#2b1509';
      gradEnd = '#130903';
      accentColor = '#f97316';
      shapeType = 'tin';
    } else if (p.category === 'foods') {
      gradStart = '#291809';
      gradEnd = '#140b03';
      accentColor = '#fbbf24';
      shapeType = 'box';
    } else if (p.category === 'frond') {
      gradStart = '#1a2612';
      gradEnd = '#0c1407';
      accentColor = '#a3e635';
      shapeType = 'leaf';
    } else if (p.category === 'fiber') {
      gradStart = '#261d12';
      gradEnd = '#130d06';
      accentColor = '#d4a373';
      shapeType = 'brush';
    } else if (p.category === 'biomaterials') {
      gradStart = '#1f1b14';
      gradEnd = '#0d0b08';
      accentColor = '#e2c299';
      shapeType = 'wood';
    } else if (p.category === 'curations') {
      gradStart = '#26170c';
      gradEnd = '#120a04';
      accentColor = '#f4c07c';
      shapeType = 'hamper';
    } else if (p.category === 'concepts') {
      gradStart = '#131e2b';
      gradEnd = '#080d14';
      accentColor = '#38bdf8';
      shapeType = 'concept';
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </radialGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Deep Atmospheric Background -->
  <rect width="600" height="600" fill="url(#bgGrad)"/>

  <!-- Radial Halo Accent -->
  <circle cx="300" cy="270" r="180" fill="url(#glowGrad)" filter="url(#softGlow)"/>

  <!-- Geometric Decorative Frame -->
  <rect x="24" y="24" width="552" height="552" rx="16" fill="none" stroke="${accentColor}" stroke-opacity="0.18" stroke-width="1.5"/>
  <rect x="36" y="36" width="528" height="528" rx="12" fill="none" stroke="${accentColor}" stroke-opacity="0.08" stroke-width="1"/>

  <!-- TALARA Heritage Seal at Top -->
  <g transform="translate(300, 75)" text-anchor="middle">
    <circle cx="0" cy="0" r="20" fill="#000" fill-opacity="0.4" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1"/>
    <path d="M0 -12 V12 M-12 0 H12 M-8 -8 L8 8 M-8 8 L8 -8" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round"/>
    <text y="32" fill="${accentColor}" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="4">TALARA BOTANICALS</text>
    <text y="44" fill="#a1a1aa" font-family="sans-serif" font-size="8" letter-spacing="2">BORASSUS FLABELLIFER</text>
  </g>

  <!-- Center Product Silhouette & Geometry -->
  <g transform="translate(300, 275)">
    <!-- Base Plate/Shadow -->
    <ellipse cx="0" cy="115" rx="130" ry="24" fill="#000" fill-opacity="0.6"/>

    <!-- Distinct Product Shape Representation -->
    <rect x="-70" y="-85" width="140" height="175" rx="18" fill="#141916" stroke="${accentColor}" stroke-opacity="0.5" stroke-width="2"/>
    <rect x="-60" y="-75" width="120" height="70" rx="6" fill="#0c100e" stroke="${accentColor}" stroke-opacity="0.2" stroke-width="1"/>
    
    <!-- Packaging Label Art -->
    <rect x="-55" y="10" width="110" height="65" rx="4" fill="#1b231f" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1"/>
    <text x="0" y="30" text-anchor="middle" fill="${accentColor}" font-family="monospace" font-size="9" font-weight="bold" letter-spacing="1">100% PURE</text>
    <text x="0" y="45" text-anchor="middle" fill="#f4f4f5" font-family="sans-serif" font-size="11" font-weight="bold">${p.badge.substring(0, 18)}</text>
    <text x="0" y="60" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="8">ORIGIN: TAMIL NADU</text>

    <!-- Top Cap / Seal -->
    <rect x="-35" y="-105" width="70" height="22" rx="5" fill="${accentColor}" fill-opacity="0.8"/>
    <circle cx="0" cy="-94" r="5" fill="#121815"/>
  </g>

  <!-- Bottom Badges & Typographic Title -->
  <g transform="translate(300, 480)" text-anchor="middle">
    <!-- Category & Part -->
    <rect x="-140" y="-22" width="280" height="24" rx="12" fill="#000" fill-opacity="0.5" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1"/>
    <text y="-6" fill="${accentColor}" font-family="monospace" font-size="10" font-weight="bold" letter-spacing="1.5">${p.categoryLabel.toUpperCase()}</text>

    <!-- Product Name -->
    <text y="24" fill="#ffffff" font-family="serif" font-size="20" font-weight="bold">${p.name.length > 28 ? p.name.substring(0, 26) + '...' : p.name}</text>
    <text y="42" fill="#9ca3af" font-family="sans-serif" font-size="11" font-style="italic">${p.subtitle}</text>

    <!-- Price Tag in INR (₹) -->
    <g transform="translate(0, 68)">
      <rect x="-65" y="-14" width="130" height="28" rx="14" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="1.2"/>
      <text y="5" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" letter-spacing="1">₹${p.price}</text>
    </g>
  </g>
</svg>`;

    fs.writeFileSync(filePath, svgContent, 'utf8');
  }
});

console.log('Generated individual distinctive product visuals!');

// Now write js/data.js with the full 73 products, PALM_ANATOMY, and other data structures.
const fullDataContent = `/**
 * TALARA - The Palmyra Company
 * Borassus flabellifer Multi-Product Ecosystem Data Store
 * All nutritional, material, and safety data strictly follows scientific guidelines.
 * All prices strictly in Indian Rupees (₹ / INR).
 */

const PALM_ANATOMY = [
  {
    id: "inflorescence",
    partName: "Inflorescence Spadix & Sap (Neera)",
    botanicalTerm: "Inflorescentia Borassi",
    harvestSeason: "February – July (Peak Sap Flow)",
    role: "The living vascular sap tapped non-destructively twice daily from flowering stalks.",
    modernValue: "Fresh non-alcoholic Pathaneer, unrefined cone jaggery, crystal sugars, sparkling elixirs, and digestive blends.",
    utilizationRate: "High biological yield; 100–150 liters sap per mature tree annually without harm to tree life.",
    relatedProductIds: ["pathaneer-fresh", "karupatti-cone", "palm-sugar-crystals", "panakarkandu-rock", "karupatti-paagu"],
    icon: "flower"
  },
  {
    id: "fruit",
    partName: "Tender Fruit Endosperm (Nungu) & Ripe Pulp",
    botanicalTerm: "Endospermium & Mesocarpium Borassi",
    harvestSeason: "May – August (Peak Summer Nungu) & September (Ripe Fruit)",
    role: "Translucent tender ice apple sockets in summer, ripening into golden aromatic pulp by late monsoon.",
    modernValue: "Hydrating fresh Nungu kernels, rose sharbats, tender fruit crisps, and traditional Panam Pazham halwa.",
    utilizationRate: "100% whole-fruit utilization; kernels eaten fresh, ripe pulp processed, empty stone shells pyrolyzed into biochar.",
    relatedProductIds: ["fresh-nungu-pods", "nungu-rose-sharbat", "panam-pazham-halwa", "panam-fruit-pulp"],
    icon: "droplet"
  },
  {
    id: "frond",
    partName: "Fan Fronds & Petioles",
    botanicalTerm: "Folium & Petiolus",
    harvestSeason: "Year-Round (Cyclical Seasonal Shedding & Pruning)",
    role: "Aerodynamic, rigid 2-meter leaves with tough fibrous stems engineered to withstand coastal winds.",
    modernValue: "Thermo-pressed compostable dining ware, micro-woven Chettinad Kottan carryalls, molded zero-tree packaging.",
    utilizationRate: "12–15 shed fronds per tree annually; 100% home-compostable in garden soil within 45 days.",
    relatedProductIds: ["frond-dinner-set", "palm-leaf-kottan", "frond-deep-bowls", "palm-leaf-placemats"],
    icon: "layers"
  },
  {
    id: "fiber",
    partName: "Basal Leaf Sheath Fibers",
    botanicalTerm: "Fibra Vaginae Foliorum",
    harvestSeason: "Annual Maintenance Pruning",
    role: "Tough, wire-like structural fiber bundles securing the leaf base to the tree trunk.",
    modernValue: "Heavy-duty cast-iron scrubbers, countertop dusters, dry-skin body brushes, and erosion-control geotextile nets.",
    utilizationRate: "Zero synthetic microplastics; high tensile strength and natural grease and water resistance.",
    relatedProductIds: ["fiber-pot-scrubber", "fiber-counter-brush", "palm-coir-door-mat"],
    icon: "scissors"
  },
  {
    id: "tuber",
    partName: "Germinated Seed Tuber (Panai Kizhangu / Odiyal)",
    botanicalTerm: "Borassus Haustorium / Tuber",
    harvestSeason: "Post-Monsoon (November – January)",
    role: "Subterranean starch reservoir developed from planted Palmyra seeds during 120 days of germination in coastal sands.",
    modernValue: "Gluten-free resistant starch prebiotic flour, steamed Kizhangu, breakfast puttu mixes, and porridge blends.",
    utilizationRate: "High dietary fiber yield; cultivated in arid sandy soils requiring zero chemical fertilizers or irrigation.",
    relatedProductIds: ["palmyra-tuber-powder", "boiled-panai-kizhangu", "odiyal-flour", "odiyal-puttu-mix"],
    icon: "sprout"
  },
  {
    id: "trunk",
    partName: "Mature Natural-Fall Hardwood",
    botanicalTerm: "Lignum Borassi",
    harvestSeason: "End-of-Life Natural Windfalls Only (Strict Non-Felling Policy)",
    role: "Dense fibrous heartwood renowned for extreme termite resistance and dramatic dark striated grain.",
    modernValue: "Turned heirloom salt cellars, cooking spatulas, and presentation caskets for luxury hampers.",
    utilizationRate: "Strict non-felling policy; harvested exclusively from trees that naturally concluded their 80–100 year lifecycle.",
    relatedProductIds: ["emperor-palm-casket", "palm-wood-salt-cellar", "palm-wood-spatula"],
    icon: "box"
  }
];

const PRODUCTS_DATA = ${JSON.stringify(ALL_PRODUCTS, null, 2)};

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "ETHICAL WILD HARVEST",
    title: "Climbing with Modern Safety Rigging",
    summary: "Master tappers scale 30-meter wild palms using engineered arbor safety harnesses, gathering pure dawn sap and shed fronds with zero harm to tree longevity.",
    detail: "Palmyra palms grow wild in coastal agroforestry tracts. We eliminate the extreme physical hazards of traditional climbing by supplying high-tensile safety ascenders and life-insurance coverage to every cooperative member.",
    metrics: "100% Non-Felled Trees • 420+ Certified Tappers • Fair Living Wage",
    icon: "shield-check"
  },
  {
    step: "02",
    phase: "CRYO-COLD EXTRACTION",
    title: "Arresting Fermentation Purely (Lime-Free)",
    summary: "Traditional harvesting coats pots with chemical slaked lime to halt yeast. TALARA replaces this with lime-free stainless vacuum-insulated chill flasks.",
    detail: "By maintaining sap temperature at 3°C from the moment of exudation atop the tree crown, we naturally arrest wild fermentation without alkaline chemicals, delivering pure, neutral-pH virgin Pathaneer.",
    metrics: "Zero Slaked Lime • Under 4°C Collection • Pristine Neutral pH",
    icon: "thermometer-snowflake"
  },
  {
    step: "03",
    phase: "PRECISION EVAPORATION",
    title: "Low-Thermal Vacuum Concentration",
    summary: "Instead of burning open wood vats that scorch sugars, our automated evaporators gently concentrate sap at 68°C under gentle vacuum.",
    detail: "Controlled low-heat reduction prevents caramel scorching while safeguarding heat-sensitive micro-nutrients, natural polyphenols, and delicate floral volatiles.",
    metrics: "68°C Gentle Vacuum Boil • 65% Less Energy • Preserved Mineral Profile",
    icon: "flame"
  },
  {
    step: "04",
    phase: "LABORATORY ACCREDITATION",
    title: "ISO 17025 Safety & Purity Assays",
    summary: "Every production batch undergoes comprehensive chromatographic screening for heavy metals, pesticides, microbial pathogens, and glycemic stability.",
    detail: "We bridge ancient botanical heritage with clinical modern accountability. Certificates of Analysis (CoA) are logged digitally on each product's batch QR code for complete transparency.",
    metrics: "FSSAI & US FDA Compliant • Heavy Metal Screened • Zero Synthetic Preservatives",
    icon: "microscope"
  },
  {
    step: "05",
    phase: "CLOSED-LOOP PACKAGING",
    title: "Zero-Tree Molded Pulp & Glass",
    summary: "Secondary packaging and cushioning are engineered directly from pruned palmyra leaves, paired with UV-protecting amber glass and kraft paper.",
    detail: "No petroleum bubble wraps or virgin paperboards. The palm wraps its own products in a fully compostable closed lifecycle loop.",
    metrics: "100% Tree-Free Pulp • Recyclable UV Amber Glass • Home Compostable Seals",
    icon: "package-check"
  },
  {
    step: "06",
    phase: "PROVENANCE TRACEABILITY",
    title: "Direct Grove-to-Door Delivery",
    summary: "From coastal agroforestry clusters straight to your doorstep across India with cold-chain freshness and batch-level farm provenance.",
    detail: "Customers can scan the underside of every container to view the exact geographical palm grove coordinates, harvest date, and the master tapper family who gathered the sap.",
    metrics: "Real-Time Grove GPS • Batch Harvest Date • Direct Consumer Trace",
    icon: "map-pin"
  }
];

const SCIENCE_VS_TRADITION = [
  {
    aspect: "Glycemic Impact & Blood Sugar",
    traditionTitle: "Traditional Belief",
    traditionText: "Folk healers and elders historically referred to palm jaggery as 'diabetes-safe sugar' that could be eaten without restriction.",
    scienceTitle: "Modern Scientific Reality",
    scienceText: "Rigorous clinical testing reveals unrefined palm sugar has a moderately lower Glycemic Index (~38–42 vs 65 for table sugar) and causes fewer sharp blood glucose spikes. However, it still contains ~90% carbohydrates by weight and contributes caloric energy. It is NOT a diabetes cure and must be accounted for in diabetic diets.",
    status: "Nuanced: Favorable profile, but requires moderation."
  },
  {
    aspect: "Microbial Safety & Natural Sap",
    traditionTitle: "Traditional Method",
    traditionText: "Tappers coated clay pots with wet slaked lime (calcium hydroxide) to raise pH and prevent yeast fermentation in hot weather.",
    scienceTitle: "Modern Scientific Innovation",
    scienceText: "While lime is chemically effective at retarding yeast, it introduces high alkalinity, unpleasant chalky taste, and requires harsh acid neutralization. Modern food safety achieves far superior sterility through insulated stainless cryo-chambers, micro-filtration, and non-thermal pulsed electric field processing.",
    status: "Upgraded: Eliminated chemical lime with cryo-technology."
  },
  {
    aspect: "Mineral & Micronutrient Value",
    traditionTitle: "Traditional Belief",
    traditionText: "Prescribed in Ayurvedic traditions for nourishing vitality, combating seasonal fatigue, and supporting maternal recovery.",
    scienceTitle: "Modern Scientific Reality",
    scienceText: "Spectrometric assays confirm unrefined Palmyra nectar contains meaningful trace amounts of potassium, magnesium, iron, and zinc, along with B-complex vitamins that are stripped completely out of refined white cane sugar. While not a pharmaceutical supplement, it is demonstrably more nutrient-dense than refined alternatives.",
    status: "Verified: Substantially higher trace mineral density."
  },
  {
    aspect: "Biodegradable Frond Mechanics",
    traditionTitle: "Traditional Craft",
    traditionText: "Centuries of coastal villagers stitched fallen palm leaves together for disposable plates at feasts and temple gatherings.",
    scienceTitle: "Modern Scientific Innovation",
    scienceText: "Material science analysis shows Palmyra petiole fibers have high lignin content (~32%) and natural hydrophobic waxes. By applying controlled 145°C steam pressure, we trigger thermal lignin plasticization, forming structurally rigid, water-resistant, oil-resistant homeware without synthetic adhesives.",
    status: "Validated: Natural botanical lignin replaces toxic polymers."
  }
];

const SUSTAINABILITY_METRICS = {
  treesFelled: "0",
  treesFelledLabel: "Trees Felled (Strict Non-Destructive Harvest Policy)",
  biomassUtilization: "94.8%",
  biomassUtilizationLabel: "Maximum-Value Biomass Utilization Rate across Sap, Frond, Fruit, Fiber & Tuber",
  tapperFamilies: "420+",
  tapperFamiliesLabel: "Tapper & Artisan Families Supported with Living Wages & Modern Safety Rigging",
  plasticDisplaced: "18.5 Tons",
  plasticDisplacedLabel: "Single-Use Plastics Displaced Annually by Frond Tableware & Molded Pulp",
  waterFootprint: "Near-Zero Irrigation",
  waterFootprintLabel: "Deep Taproots Thrive Solely on Natural Coastal Groundwater & Seasonal Monsoons"
};

const FAQ_DATA = [
  {
    q: "Is TALARA palm sugar safe for people with diabetes?",
    a: "TALARA palm sweeteners have a lower glycemic index (GI ~38–42) than standard white cane sugar (GI ~65) and contain natural trace minerals. However, it is still a concentrated source of carbohydrates. It does NOT lower blood glucose, nor does it treat or cure diabetes. If you are diabetic or prediabetic, always consult your physician or registered dietitian before introducing any sweetener into your dietary plan."
  },
  {
    q: "How does TALARA harvest without harming or chopping down the palm?",
    a: "Palmyra palms live for 80 to 120 years. We harvest living inflorescence sap twice daily, gather naturally shed fronds from the ground, harvest seasonal surplus fruit, and prune leaf-sheath fibers during annual canopy health maintenance. We never chop down trees for our consumer products. The only timber we ever utilize comes from trees that have reached end-of-life natural windfall."
  },
  {
    q: "What is the difference between Palmyra Palm and Coconut Palm?",
    a: "While both belong to the Arecaceae palm family, the Palmyra Palm (Borassus flabellifer) is a rugged, drought-resilient wild palm native to South and Southeast Asia with iconic broad fan-shaped fronds. Its sap produces a distinctively deeper, more complex caramel-molasses note with higher mineral ash density, and its leaf petioles are significantly tougher and more fibrous than coconut fronds."
  },
  {
    q: "Are your products certified and tested for heavy metals?",
    a: "Yes. Every production batch is tested in accredited ISO/IEC 17025 laboratory facilities for heavy metals (lead, arsenic, cadmium, mercury), pesticide residues, microbial pathogens (E. coli, Salmonella), and moisture levels. Certificates of Analysis can be accessed by scanning the batch QR code on your product."
  },
  {
    q: "What makes Fresh Pathaneer non-alcoholic?",
    a: "Fresh Pathaneer is harvested into vacuum-insulated chill vessels at 3°C right at dawn. Keeping the sap chilled arrests yeast action before fermentation can begin, and sterile microfiltration prevents subsequent fermentation. Unlike toddy, Fresh Pathaneer is completely non-alcoholic (0.0% ABV) and suitable for the whole family."
  }
];
`;

fs.writeFileSync(path.join(projectDir, 'js', 'data.js'), fullDataContent, 'utf8');
console.log('Successfully wrote js/data.js with ' + ALL_PRODUCTS.length + ' products!');
