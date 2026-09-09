/**
 * TALARA - The Palmyra Company
 * Borassus flabellifer Multi-Product Ecosystem Data Store
 * All nutritional, material, and safety data strictly follows scientific guidelines.
 * All prices strictly in Indian Rupees (₹ / INR).
 * 
 * Curated 18 Authentic Creations:
 * Product 16: Fresh Kallu (Authentic Palm Beverage — 21+ ONLY)
 * Two Extra Products: Karupatti Kadalai Mittai & Karupatti Natural Juice
 * Every product maps to a genuine, unique, high-resolution product photograph.
 */

const PALM_ANATOMY = [
  {
    "id": "inflorescence",
    "partName": "Inflorescence Spadix & Sap (Neera)",
    "botanicalTerm": "Inflorescentia Borassi",
    "harvestSeason": "February – July (Peak Sap Flow)",
    "role": "The living vascular sap tapped non-destructively twice daily from flowering stalks.",
    "modernValue": "Fresh non-alcoholic Pathaneer, unrefined cone jaggery, crystal sugars, sparkling elixirs, fermented traditional palm toddy, natural jaggery juices, and artisan palm-jaggery dark chocolates.",
    "utilizationRate": "High biological yield; 100–150 liters sap per mature tree annually without harm to tree life.",
    "relatedProductIds": [
      "karupatti-cone",
      "karupatti-paagu",
      "palm-sugar-crystals",
      "panakarkandu-rock",
      "pathaneer-botanical-spritzer",
      "karupatti-dark-chocolate",
      "pathaneer-fresh",
      "karupatti-kadalai-mittai",
      "karupatti-natural-juice"
    ],
    "icon": "flower"
  },
  {
    "id": "fruit",
    "partName": "Tender Fruit Endosperm (Nungu) & Ripe Pulp",
    "botanicalTerm": "Endospermium & Mesocarpium Borassi",
    "harvestSeason": "May – August (Peak Summer Nungu) & September (Ripe Fruit)",
    "role": "Translucent tender ice apple sockets in summer, ripening into golden aromatic pulp by late monsoon.",
    "modernValue": "Hydrating fresh Nungu kernels, tender fruit preserves, and traditional royal Panam Pazham halwa confections.",
    "utilizationRate": "100% whole-fruit utilization; kernels eaten fresh, ripe pulp braised into heirloom halwa.",
    "relatedProductIds": [
      "fresh-nungu-pods",
      "tender-nungu-preserve",
      "panam-pazham-halwa"
    ],
    "icon": "droplet"
  },
  {
    "id": "frond",
    "partName": "Fan Fronds & Petioles",
    "botanicalTerm": "Folium & Petiolus",
    "harvestSeason": "Year-Round (Cyclical Seasonal Shedding & Pruning)",
    "role": "Aerodynamic, rigid 2-meter leaves with tough fibrous stems engineered to withstand coastal winds.",
    "modernValue": "Thermo-pressed compostable dining ware, micro-woven Chettinad Kottan carryalls, molded zero-tree packaging.",
    "utilizationRate": "12–15 shed fronds per tree annually; 100% home-compostable in garden soil within 45 days.",
    "relatedProductIds": [
      "frond-dinner-set",
      "palm-leaf-kottan"
    ],
    "icon": "layers"
  },
  {
    "id": "fiber",
    "partName": "Basal Leaf Sheath Fibers",
    "botanicalTerm": "Fibra Vaginae Foliorum",
    "harvestSeason": "Annual Maintenance Pruning",
    "role": "Tough, wire-like structural fiber bundles securing the leaf base to the tree trunk.",
    "modernValue": "Heavy-duty cast-iron scrubbers, countertop dusters, dry-skin body brushes, and erosion-control geotextile nets.",
    "utilizationRate": "Zero synthetic microplastics; high tensile strength and natural grease and water resistance.",
    "relatedProductIds": [
      "fiber-pot-scrubber"
    ],
    "icon": "scissors"
  },
  {
    "id": "tuber",
    "partName": "Germinated Seed Tuber (Panai Kizhangu / Odiyal)",
    "botanicalTerm": "Borassus Haustorium / Tuber",
    "harvestSeason": "Post-Monsoon (November – January)",
    "role": "Subterranean starch reservoir developed from planted Palmyra seeds during 120 days of germination in coastal sands.",
    "modernValue": "Gluten-free resistant starch prebiotic flour, steamed Kizhangu, breakfast puttu mixes, and porridge blends.",
    "utilizationRate": "High dietary fiber yield; cultivated in arid sandy soils requiring zero chemical fertilizers or irrigation.",
    "relatedProductIds": [
      "palmyra-tuber-powder",
      "steamed-panai-kizhangu"
    ],
    "icon": "sprout"
  },
  {
    "id": "trunk",
    "partName": "Mature Natural-Fall Hardwood",
    "botanicalTerm": "Lignum Borassi",
    "harvestSeason": "End-of-Life Natural Windfalls Only (Strict Non-Felling Policy)",
    "role": "Dense fibrous heartwood renowned for extreme termite resistance and dramatic dark striated grain.",
    "modernValue": "Turned heirloom salt cellars, cooking spatulas, and presentation caskets for luxury hampers.",
    "utilizationRate": "Strict non-felling policy; harvested exclusively from trees that naturally concluded their 80–100 year lifecycle.",
    "relatedProductIds": [
      "emperor-palm-casket"
    ],
    "icon": "box"
  }
];

const PRODUCTS_DATA = [
  // 1. Traditional Palm Jaggery
  {
    "id": "karupatti-cone",
    "name": "Traditional Panai Karupatti (Cone Jaggery)",
    "subtitle": "Stone-Ground Unrefined Palm Sugar Cake",
    "category": "sweeteners",
    "categoryLabel": "Palm Jaggery & Sweeteners",
    "palmPart": "Concentrated Inflorescence Sap",
    "palmPartId": "inflorescence",
    "price": 199,
    "rating": 4.96,
    "reviewsCount": 312,
    "badge": "Traditional Artisan Craft",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-karupatti.jpg",
    "shortDesc": "Dense, aromatic dark jaggery cakes hand-poured in conical woven palmyra leaf cups. Infused with sun-dried ginger and black pepper.",
    "fullDescription": "Panai Karupatti represents the pinnacle of traditional South Indian unrefined sweeteners. Tapped fresh twice daily, the sap is gently concentrated in hygienic food-grade stainless pans over low tamarind-wood embers and hand-poured into conical palmyra leaf cups to cure naturally without chemical hardeners or bleaching agents.",
    "ingredients": [
      "100% Pure Palmyra Palm Sap",
      "Sun-Dried Sunthi Ginger (<1%)",
      "Crushed Tellicherry Black Pepper (<0.5%)"
    ],
    "nutrition": {
      "servingSize": "20g piece",
      "calories": "72 kcal",
      "carbs": "18 g",
      "sugars": "17 g",
      "iron": "1.6 mg (9% DV)",
      "potassium": "190 mg (4% DV)"
    },
    "status": "available",
    "variants": [
      { "name": "400g Hand-Cured Box (2 Cones)", "price": 199 },
      { "name": "1kg Family Pantry Pack", "price": 449 }
    ]
  },

  // 2. Liquid Palm Nectar
  {
    "id": "karupatti-paagu",
    "name": "Signature Reserve Karupatti Paagu (Liquid Palm Nectar)",
    "subtitle": "Slow-Reduced Viscous Dessert Nectar",
    "category": "sweeteners",
    "categoryLabel": "Palm Jaggery & Sweeteners",
    "palmPart": "Fresh Inflorescence Sap",
    "palmPartId": "inflorescence",
    "price": 349,
    "rating": 4.94,
    "reviewsCount": 178,
    "badge": "Signature Reserve",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-nectar.jpg",
    "shortDesc": "Silky, slow-reduced liquid jaggery with notes of salted caramel and smoky vanilla. Ready to drizzle over dosas, waffles, and artisanal desserts.",
    "fullDescription": "Concentrated under gentle vacuum at 68°C to 76° Brix. Retains its golden pourability without crystallizing on the shelf, offering a distinct tropical alternative to maple syrup and honey.",
    "ingredients": [
      "100% Pure Palmyra Palm Blossom Sap"
    ],
    "nutrition": {
      "servingSize": "1 tbsp (15ml)",
      "calories": "50 kcal",
      "carbs": "13 g",
      "sugars": "12 g",
      "iron": "0.8 mg",
      "potassium": "140 mg"
    },
    "status": "available",
    "variants": [
      { "name": "300ml Amber Glass Flask", "price": 349 },
      { "name": "600ml Pantry Decanter", "price": 629 }
    ]
  },

  // 3. Granulated Palm Sugar
  {
    "id": "palm-sugar-crystals",
    "name": "AURA Pure Palm Sugar Crystals",
    "subtitle": "Raw Artisanal Granulated Palm Sugar",
    "category": "sweeteners",
    "categoryLabel": "Palm Sugar & Sweeteners",
    "palmPart": "Concentrated Inflorescence Sap",
    "palmPartId": "inflorescence",
    "price": 299,
    "rating": 4.95,
    "reviewsCount": 265,
    "badge": "1:1 Cane Sugar Swap",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-palm-sugar.jpg",
    "shortDesc": "Golden, unrefined granulated sugar with a buttery molasses aroma, milled for seamless 1:1 culinary replacement in coffees, bakes, and teas.",
    "fullDescription": "AURA Palm Sugar Crystals deliver the complex flavor profile of brown sugar with the dry dissolution of fine turbinado. Sourced from slow-reduced Palmyra nectar without chemical flow agents or synthetic bleaches.",
    "ingredients": [
      "100% Pure Crystallized Palmyra Palm Sap"
    ],
    "nutrition": {
      "servingSize": "1 tsp (4g)",
      "calories": "15 kcal",
      "carbs": "3.8 g",
      "sugars": "3.7 g",
      "potassium": "35 mg"
    },
    "status": "available",
    "variants": [
      { "name": "400g Stand-up Pouch", "price": 299 },
      { "name": "1kg Baker's Reserve", "price": 649 }
    ]
  },

  // 4. Palm Rock Candy
  {
    "id": "panakarkandu-rock",
    "name": "Artisanal Panangarkandu (Palm Rock Candy)",
    "subtitle": "Naturally Grown Amber Sugar Gems",
    "category": "sweeteners",
    "categoryLabel": "Palm Sugar & Sweeteners",
    "palmPart": "Concentrated Inflorescence Sap",
    "palmPartId": "inflorescence",
    "price": 329,
    "rating": 4.97,
    "reviewsCount": 198,
    "badge": "Artisanal Rock Candy",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-panakarkandu.jpg",
    "shortDesc": "Slow-crystallized natural amber candy gems harvested from aging earthen clay vessels. Beloved in South Indian vocal care and soothing milk infusions.",
    "fullDescription": "Panakarkandu is grown through slow evaporative crystallization over 60 days. The resulting large amber jewels melt slowly, releasing delicate floral sweetness with zero harsh industrial processing.",
    "ingredients": [
      "100% Naturally Crystallized Palmyra Palm Sugar"
    ],
    "nutrition": {
      "servingSize": "1 Gem (5g)",
      "calories": "19 kcal",
      "carbs": "4.8 g",
      "sugars": "4.7 g",
      "potassium": "42 mg"
    },
    "status": "available",
    "variants": [
      { "name": "350g Glass Preserve Jar", "price": 329 },
      { "name": "750g Family Pack", "price": 649 }
    ]
  },

  // 5. Sparkling Botanical Spritzer
  {
    "id": "pathaneer-botanical-spritzer",
    "name": "Pathaneer Sparkling Botanical Spritzer",
    "subtitle": "Effervescent Cold Sap with Mountain Mint",
    "category": "beverages",
    "categoryLabel": "Fresh Pathaneer & Drinks",
    "palmPart": "Fresh Inflorescence Sap",
    "palmPartId": "inflorescence",
    "price": 179,
    "rating": 4.93,
    "reviewsCount": 164,
    "badge": "Non-Alcoholic (0.0% ABV)",
    "isFeatured": true,
    "isNew": true,
    "image": "images/product-elixir.jpg",
    "shortDesc": "Pure dawn Pathaneer lightly carbonated and infused with fresh key lime extract, cardamom distillate, and garden mountain mint.",
    "fullDescription": "Elevating rural refreshment into a contemporary sparkling botanical aperitif. Uses gentle carbonation to lift the delicate caramel sweetness of Pathaneer, balanced with crisp zesty botanicals.",
    "ingredients": [
      "Fresh Non-Alcoholic Pathaneer (85%)",
      "Sparkling Spring Water",
      "Cold-Pressed Key Lime Extract",
      "Cardamom Distillate",
      "Wild Mint"
    ],
    "nutrition": {
      "servingSize": "330ml Bottle",
      "calories": "68 kcal",
      "carbs": "16 g",
      "sugars": "15 g",
      "potassium": "240 mg",
      "vitaminC": "14 mg"
    },
    "status": "available",
    "variants": [
      { "name": "330ml Glass Bottle", "price": 179 },
      { "name": "4-Pack Craft Carrier", "price": 649 }
    ]
  },

  // 6. Fresh Coastal Nungu
  {
    "id": "fresh-nungu-pods",
    "name": "Fresh Coastal Nungu (Ice Apple)",
    "subtitle": "Tender Translucent Palm Fruit Kernels",
    "category": "nungu",
    "categoryLabel": "Nungu & Tender Fruit",
    "palmPart": "Tender Fruit Endosperm (Nungu)",
    "palmPartId": "fruit",
    "price": 199,
    "rating": 4.98,
    "reviewsCount": 388,
    "badge": "Fresh Tender Nungu",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-nungu-fresh.jpg",
    "shortDesc": "Freshly harvested translucent, jelly-like Nungu (Ice Apple) fruit pods harvested during peak summer tenderness. Suspended in delicate tender coconut water.",
    "fullDescription": "Nungu is the crown jewel of tropical hydration. Each tough outer drupe husk protects three tender, crystalline endosperm sockets filled with pure botanical water. We hand-peel the kernels under sterile refrigerated conditions, pack them fresh with zero artificial preservatives, and rush them to your table.",
    "ingredients": [
      "100% Tender Palmyra Palm Fruit Endosperm (Borassus flabellifer)",
      "Natural Tender Palm Cellular Water"
    ],
    "nutrition": {
      "servingSize": "100g (Approx. 3 Pieces)",
      "calories": "43 kcal",
      "carbs": "10 g",
      "sugars": "8.5 g",
      "protein": "0.8 g",
      "potassium": "155 mg",
      "moisture": "91.8%"
    },
    "status": "available",
    "variants": [
      { "name": "350g Fresh Jar (6-8 Kernels)", "price": 199 },
      { "name": "700g Family Hydration Tub", "price": 369 }
    ]
  },

  // 7. Tender Nungu in Blossom Nectar
  {
    "id": "tender-nungu-preserve",
    "name": "Artisanal Tender Nungu in Blossom Nectar",
    "subtitle": "Tender Ice Apple Kernels in Golden Palm Syrup",
    "category": "nungu",
    "categoryLabel": "Nungu & Tender Fruit",
    "palmPart": "Tender Fruit Endosperm & Floral Sap",
    "palmPartId": "fruit",
    "price": 249,
    "rating": 4.95,
    "reviewsCount": 210,
    "badge": "Heritage Fruit Preserve",
    "isFeatured": false,
    "isNew": false,
    "image": "images/product-nungu.jpg",
    "shortDesc": "Pristine translucent Nungu fruit sockets bathed in delicate wild blossom nectar with edible floral petals. A cooling coastal summer delicacy.",
    "fullDescription": "Hand-extracted tender ice apple sockets suspended in clarified Palmyra nectar reduction. Retains the natural succulent texture and cooling cellular hydration of summer fruit year-round.",
    "ingredients": [
      "Tender Palmyra Palm Endosperm (65%)",
      "Clarified Palm Blossom Nectar (35%)"
    ],
    "nutrition": {
      "servingSize": "100g",
      "calories": "58 kcal",
      "carbs": "13.5 g",
      "sugars": "12 g",
      "potassium": "140 mg"
    },
    "status": "available",
    "variants": [
      { "name": "300g Glass Preserve Jar", "price": 249 },
      { "name": "Duo Pack (2 x 300g)", "price": 469 }
    ]
  },

  // 8. Palmyra Palm Tuber Powder
  {
    "id": "palmyra-tuber-powder",
    "name": "Palmyra Palm Tuber Powder (Panai Kizhangu)",
    "subtitle": "Stone-Ground Prebiotic Odiyal Flour",
    "category": "tuber",
    "categoryLabel": "Palm Tuber & Powders",
    "palmPart": "Germinated Seed Tuber (Odiyal)",
    "palmPartId": "tuber",
    "price": 299,
    "rating": 4.97,
    "reviewsCount": 340,
    "badge": "Raw Tuber → Sliced → Powder",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-tuber-powder.jpg",
    "shortDesc": "Visual Journey: Raw subterranean tuber un-earthed → washed, sliced & sun-dried → cold stone-milled into a golden, nutrient-rich prebiotic flour.",
    "fullDescription": "Panai Kizhangu is an ancient agroforestry subterranean tuber that develops when wild Palmyra seeds germinate in coastal sandy trenches over 120 days. We hand-harvest the fibrous roots, steam-blanch them to deactivate natural bitterness, sun-dry the sliced rounds in clean solar glass tunnels, and cold stone-mill them below 35°C into a dense, fiber-rich functional flour.",
    "ingredients": [
      "100% Pure Germinated Palmyra Palm Tubers (Odiyal - Borassus haustorium)"
    ],
    "nutrition": {
      "servingSize": "30g (approx. 1/4 cup)",
      "calories": "105 kcal",
      "carbs": "23 g",
      "dietaryFiber": "6.2 g (22% DV)",
      "resistantStarch": "4.4 g",
      "protein": "2.1 g",
      "iron": "1.4 mg",
      "calcium": "42 mg"
    },
    "status": "available",
    "variants": [
      { "name": "450g Kraft Stand-Up Pouch", "price": 299 },
      { "name": "1kg Family Pantry Pouch", "price": 579 }
    ]
  },

  // 9. Steamed Whole Palmyra Tuber
  {
    "id": "steamed-panai-kizhangu",
    "name": "Steamed Panai Kizhangu (Whole Palmyra Tuber)",
    "subtitle": "Traditional Boiled Coastal Prebiotic Root",
    "category": "tuber",
    "categoryLabel": "Palm Tuber & Powders",
    "palmPart": "Germinated Seed Tuber (Odiyal)",
    "palmPartId": "tuber",
    "price": 169,
    "rating": 4.92,
    "reviewsCount": 280,
    "badge": "Whole Prebiotic Tuber",
    "isFeatured": false,
    "isNew": false,
    "image": "images/product-tuber.jpg",
    "shortDesc": "Whole seasonal subterranean tubers boiled with turmeric and sea salt. Unearth the sweet, fiber-dense ancient staple of coastal Tamil Nadu.",
    "fullDescription": "In Tamil winter agroforestry tradition, germinated Palmyra tubers are dug fresh from sandy trenches, steam-blanched with wild turmeric and sea salt, and vacuum-sealed. Naturally rich in gut-nourishing resistant starch and complex dietary fiber.",
    "ingredients": [
      "Fresh Palmyra Palm Tubers (99%)",
      "Wild Turmeric (<1%)",
      "Sea Salt (<1%)"
    ],
    "nutrition": {
      "servingSize": "1 Tuber (60g)",
      "calories": "82 kcal",
      "carbs": "18 g",
      "dietaryFiber": "4.5 g",
      "protein": "1.6 g"
    },
    "status": "available",
    "variants": [
      { "name": "Pack of 5 Tubers (300g)", "price": 169 },
      { "name": "Pack of 12 Tubers", "price": 349 }
    ]
  },

  // 10. Panam Pazham Halwa
  {
    "id": "panam-pazham-halwa",
    "name": "Panam Pazham Halwa (Ripe Palm Fruit)",
    "subtitle": "Artisanal Heritage Confectionery",
    "category": "foods",
    "categoryLabel": "Traditional Foods & Sweets",
    "palmPart": "Mature Ripe Fruit Pulp (Panam Pazham)",
    "palmPartId": "fruit",
    "price": 349,
    "rating": 4.97,
    "reviewsCount": 280,
    "badge": "Traditional Royal Sweet",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-fruit-halwa.jpg",
    "shortDesc": "Golden-amber gelatinous halwa crafted by slow-simmering aromatic ripe Palmyra fruit pulp with pure palm jaggery, A2 ghee, and roasted cashews.",
    "fullDescription": "In late monsoon, mature Palmyra fruits turn glossy dark-violet, releasing an intoxicatingly sweet tropical perfume. Master sweetmakers extract the golden fibrous pulp, strain it through fine cotton, and slowly braise it with palm jaggery and pure cow ghee until it forms glossy, melt-in-mouth confection blocks.",
    "ingredients": [
      "Pure Ripe Palmyra Fruit Pulp (55%)",
      "Palm Jaggery (30%)",
      "Pure Desi Cow Ghee (10%)",
      "Roasted Cashew Kernels (5%)",
      "Cardamom"
    ],
    "nutrition": {
      "servingSize": "35g Piece",
      "calories": "128 kcal",
      "carbs": "22 g",
      "sugars": "18 g",
      "fat": "4.2 g",
      "vitaminA": "65 mcg"
    },
    "status": "available",
    "variants": [
      { "name": "250g Luxury Gift Box", "price": 349 },
      { "name": "500g Celebration Tin", "price": 649 }
    ]
  },

  // 11. Sculpted Palm Leaf Dining Set
  {
    "id": "frond-dinner-set",
    "name": "FROND-FORM Sculpted Dining Tableware Set",
    "subtitle": "Thermo-Pressed Palm Leaf Tableware (25-Pack)",
    "category": "frond",
    "categoryLabel": "Palm Leaf Homeware",
    "palmPart": "Naturally Shed Leaf Petioles & Fronds",
    "palmPartId": "frond",
    "price": 499,
    "rating": 4.96,
    "reviewsCount": 315,
    "badge": "100% Home-Compostable in 45 Days",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-homeware.jpg",
    "shortDesc": "Architectural 10-inch dinner plates and bowls thermo-molded from shed Palmyra fronds. Water-resistant, microwave-safe, zero plastic.",
    "fullDescription": "Redefining single-use and reusable tableware. Instead of felling trees or coating paper in polyethylene plastic, FROND-FORM molds shed leaf bases under clean 145°C steam pressure. Binds natural leaf lignin to produce sturdy, hydrophobic plates that naturally biodegrade into rich garden soil.",
    "ingredients": [
      "100% Naturally Shed Palmyra Palm Leaf Fronds",
      "Zero Adhesives, Resins, or Bleaches"
    ],
    "nutrition": null,
    "status": "available",
    "variants": [
      { "name": "Pack of 25 Plates (10-Inch)", "price": 499 },
      { "name": "Party Host Case of 100", "price": 1799 }
    ]
  },

  // 12. Chettinad Handwoven Kottan Basket
  {
    "id": "palm-leaf-kottan",
    "name": "Handwoven Chettinad Palm Leaf Kottan Basket",
    "subtitle": "Artisanal Heritage Lidded Storage Basket",
    "category": "frond",
    "categoryLabel": "Palm Leaf Homeware",
    "palmPart": "Young Tender Frond Blades",
    "palmPartId": "frond",
    "price": 599,
    "rating": 4.98,
    "reviewsCount": 220,
    "badge": "Artisan Cooperative Made",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-leaf-kottan.jpg",
    "shortDesc": "Vibrant, durable lidded storage basket micro-woven by master women artisans from hand-split, sun-bleached Palmyra palm leaves.",
    "fullDescription": "A celebrated craft from the Chettinad region. Young supple palm fronds are split into 2mm strands, dyed with non-toxic natural pigments, and hand-woven over 14 hours into a resilient, feather-light heirloom basket with handle and lid.",
    "ingredients": [
      "100% Hand-Split Palmyra Palm Leaf",
      "Natural Plant Dyes"
    ],
    "nutrition": null,
    "status": "available",
    "variants": [
      { "name": "Medium Cylinder Basket (8x8 inch)", "price": 599 },
      { "name": "Large Hamper Basket (12x12 inch)", "price": 999 }
    ]
  },

  // 13. Heavy-Duty Basal Fiber Scrubber
  {
    "id": "fiber-pot-scrubber",
    "name": "COIRA Basal Fiber Heavy-Duty Scrubber",
    "subtitle": "Tough Cast-Iron & Kitchen Scrub Brush",
    "category": "fiber",
    "categoryLabel": "Palm Fiber & Eco-Craft",
    "palmPart": "Basal Leaf Sheath Coarse Fibers",
    "palmPartId": "fiber",
    "price": 149,
    "rating": 4.94,
    "reviewsCount": 380,
    "badge": "Zero Microplastics Shedding",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-fiber-brush.jpg",
    "shortDesc": "Stiff, spring-resilient household scrub brush crafted from combed Palmyra leaf-base fibers. Tough on burnt pans, zero microplastics.",
    "fullDescription": "Synthetic nylon sponges shed millions of microplastic filaments into city sewers. Palmyra sheath fibers—traditionally used for deep-sea rigging ropes—are naturally grease-repelling, acid-resistant, and tough on cast iron without scratching seasoning.",
    "ingredients": [
      "100% Palmyra Palm Basal Fiber",
      "Fallen Hardwood Handle",
      "Copper Wire Binding"
    ],
    "nutrition": null,
    "status": "available",
    "variants": [
      { "name": "Single Heavy-Duty Scrubber", "price": 149 },
      { "name": "Trio Pack (3 Brushes)", "price": 389 }
    ]
  },

  // 14. Emperor Palm Keepsake Casket
  {
    "id": "emperor-palm-casket",
    "name": "THE EMPEROR PALM Grand Heritage Keepsake Box",
    "subtitle": "Curated Multi-Product Heirloom Collection",
    "category": "curations",
    "categoryLabel": "Luxury Gift Collections",
    "palmPart": "Full Tree Integration (Sap, Wood, Frond, Fiber)",
    "palmPartId": "trunk",
    "price": 1999,
    "rating": 4.99,
    "reviewsCount": 185,
    "badge": "Numbered Collector's Edition",
    "isFeatured": true,
    "isNew": false,
    "image": "images/product-emperor-casket.jpg",
    "shortDesc": "The ultimate celebration of Borassus flabellifer: Liquid Jaggery Paagu, Palm Sugar Crystals, Karupatti blocks, Leaf Kottan, and turned wood cellar in a bespoke casket.",
    "fullDescription": "Housed within an heirloom keepsake casket crafted from naturally fallen century-old Palmyra heartwood, the Emperor Palm Collection unites our finest culinary and lifestyle treasures in a zero-waste tour-de-force.",
    "ingredients": [
      "1x Liquid Palm Jaggery Paagu (300ml Flask)",
      "1x AURA Palm Sugar Crystals (400g Pouch)",
      "1x Traditional Cone Karupatti Block (200g in Leaf Cup)",
      "1x Hand-Turned Palmyra Hardwood Salt Cellar with Spoon",
      "2x FROND-FORM Sculpted Appetizer Platters",
      "1x Signed Certificate of Provenance & Tapper Stewardship Card"
    ],
    "nutrition": null,
    "status": "available",
    "variants": [
      { "name": "Standard Collector's Casket", "price": 1999 },
      { "name": "Monogram Engraved Reserve Edition", "price": 2499 }
    ]
  },

  // 15. Artisanal Palm Dark Chocolate
  {
    "id": "karupatti-dark-chocolate",
    "name": "Artisanal Palmyra Karupatti Dark Chocolate (70% Cacao)",
    "subtitle": "Bean-to-Bar Cacao Sweetened Exclusively with Pure Palm Jaggery",
    "category": "foods",
    "categoryLabel": "Traditional Foods & Sweets",
    "palmPart": "Concentrated Inflorescence Sap (Panai Karupatti)",
    "palmPartId": "inflorescence",
    "price": 349,
    "rating": 4.99,
    "reviewsCount": 156,
    "badge": "100% Cane Sugar-Free • Bean-to-Bar",
    "isFeatured": true,
    "isNew": true,
    "image": "images/product-palm-chocolate.jpg",
    "shortDesc": "Single-origin South Indian cacao stone-ground for 48 hours with unrefined wild Palmyra palm jaggery (Karupatti) and micro-flaked palm sugar crystals.",
    "fullDescription": "A transcendent confluence of regenerative agriculture and fine chocolate craftsmanship. Sourced from single-estate Anamalai cacao beans, this 70% dark chocolate bar replaces all refined industrial cane sugars with authentic unbleached Palmyra palm jaggery (Karupatti). Stone-conched over 48 hours, the unrefined palm jaggery infuses deep caramelized molasses undertones, mineral complexity, and subtle sun-dried ginger warmth that balances the fruity brightness of the roasted cacao beans. 100% dairy-free, vegan, and packed in compostable gold-foil packaging.",
    "ingredients": [
      "Single-Origin Cacao Beans (70%)",
      "Pure Unrefined Palmyra Palm Jaggery (Karupatti 27%)",
      "Single-Origin Cocoa Butter (2.5%)",
      "Sun-Dried Sunthi Ginger & Sea Salt (<0.5%)"
    ],
    "nutrition": {
      "servingSize": "25g (approx. 4 squares)",
      "calories": "135 kcal",
      "carbs": "12.5 g",
      "sugars": "7.8 g",
      "protein": "2.4 g",
      "fat": "8.8 g",
      "iron": "2.2 mg (12% DV)",
      "potassium": "160 mg"
    },
    "status": "available",
    "variants": [
      { "name": "Single 100g Artisan Bar", "price": 349 },
      { "name": "Tasting Duo Box (2 x 100g)", "price": 649 },
      { "name": "Connoisseur 4-Bar Flight", "price": 1199 }
    ]
  },

  // 16. FRESH KALLU (Alcohol Product — 21+ ONLY)
  {
    "id": "pathaneer-fresh",
    "name": "FRESH KALLU",
    "subtitle": "Chilled Pure Dawn Palm Sap (Natural Kallu)",
    "category": "beverages",
    "categoryLabel": "Fresh Kallu & Drinks",
    "palmPart": "Cold-Harvested Inflorescence Sap (Natural Kallu)",
    "palmPartId": "inflorescence",
    "price": 149,
    "rating": 4.99,
    "reviewsCount": 420,
    "badge": "21+ ONLY • FRESH KALLU",
    "isFeatured": true,
    "isNew": false,
    "isAlcoholic": true,
    "ageRestricted": true,
    "warningLabel": "21+ ONLY",
    "warningSub": "For Adults Aged 21 and Above",
    "image": "images/product-pathaneer.jpg",
    "shortDesc": "Authentic, crystal-fresh sweet palm sap (Fresh Kallu) tapped at dawn into insulated chill vessels. 100% natural, refreshing, and free of slaked lime.",
    "fullDescription": "FRESH KALLU is the sacred living palm sap of South India's coastal palm groves. Harvested at 5:00 AM before sunrise into vacuum-insulated stainless steel flasks at 3°C, natural fermentation is completely arrested without chemical lime. It is sterile-microfiltered, bottled cold, and represents the purest, unfermented sweet dawn palm sap (Kallu). Refreshing, naturally mineral-rich, and pure.",
    "ingredients": [
      "100% Pure Fresh Palmyra Palm Sap (Borassus flabellifer)"
    ],
    "nutrition": {
      "servingSize": "1 Bottle (300ml)",
      "calories": "65 kcal",
      "carbs": "15 g",
      "sugars": "14 g",
      "potassium": "260 mg",
      "magnesium": "22 mg",
      "alcoholByVolume": "0.0% ABV"
    },
    "status": "available",
    "variants": [
      { "name": "300ml Chilled Bottle", "price": 149 },
      { "name": "Pack of 4 (4 x 300ml)", "price": 499 },
      { "name": "Case of 12 (Refrigerated Express)", "price": 1399 }
    ]
  },

  // 18. Extra Product 1: Karupatti Kadalai Mittai (Palm Jaggery Peanut Chikki)
  {
    "id": "karupatti-kadalai-mittai",
    "name": "Karupatti Kadalai Mittai (Palm Jaggery Peanut Chikki)",
    "subtitle": "Wood-Roasted Peanuts in Pure Palm Jaggery Brittle",
    "category": "foods",
    "categoryLabel": "Traditional Foods & Sweets",
    "palmPart": "Concentrated Inflorescence Sap (Karupatti)",
    "palmPartId": "inflorescence",
    "price": 149,
    "rating": 4.96,
    "reviewsCount": 245,
    "badge": "Heritage Palm Sweet",
    "isFeatured": true,
    "isNew": true,
    "image": "images/product-kadalai-mittai.jpg",
    "shortDesc": "Crunchy wood-roasted peanuts bonded with crisp unrefined palm jaggery (Karupatti). Traditional Kovilpatti recipe, rich in plant protein and iron.",
    "fullDescription": "A revered traditional South Indian confection from Tamil Nadu's heritage sweetmaking belt. High-grade wood-roasted peanuts are folded into hot, aromatic, slow-simmered pure Palmyra palm jaggery (Karupatti) syrup at hard-crack stage, infused with crushed cardamom, and hand-cut on stone slabs into crisp, glossy squares. 100% refined cane sugar-free, preservative-free, and naturally mineral-rich.",
    "ingredients": [
      "Wood-Roasted Peanuts (55%)",
      "Pure Palmyra Palm Jaggery (Karupatti 44%)",
      "Green Cardamom (<1%)"
    ],
    "nutrition": {
      "servingSize": "30g Piece",
      "calories": "145 kcal",
      "protein": "5.1 g",
      "carbs": "15 g",
      "sugars": "12 g",
      "fat": "7.5 g",
      "iron": "1.4 mg (8% DV)"
    },
    "status": "available",
    "variants": [
      { "name": "200g Box (8 Hand-Cut Bars)", "price": 149 },
      { "name": "450g Family Heritage Jar", "price": 299 }
    ]
  },

  // 19. Extra Product 2: Karupatti Natural Juice (Artisan Palm Jaggery Cooler)
  {
    "id": "karupatti-natural-juice",
    "name": "Karupatti Natural Juice (Artisan Palm Jaggery Cooler)",
    "subtitle": "Chilled Pure Palm Jaggery Nectar with Sukku & Mint",
    "category": "beverages",
    "categoryLabel": "Fresh Pathaneer & Drinks",
    "palmPart": "Inflorescence Sap (Liquid Palm Jaggery)",
    "palmPartId": "inflorescence",
    "price": 119,
    "rating": 4.94,
    "reviewsCount": 188,
    "badge": "Natural Non-Alcoholic Cooler",
    "isFeatured": true,
    "isNew": true,
    "isAlcoholic": false,
    "ageRestricted": false,
    "image": "images/product-karupatti-juice.jpg",
    "shortDesc": "Refreshing traditional South Indian beverage made by dissolving pure palm jaggery (Karupatti) with cold spring water, roasted dry ginger (sukku), and fresh green lime.",
    "fullDescription": "An ancient South Indian revitalizer traditionally served to refresh travelers and farmers in coastal Tamil Nadu. Crafted from pure single-grove palm jaggery (Karupatti) dissolved in chilled spring water, harmoniously balanced with sun-dried ginger (sukku), green cardamom, cold-pressed lime juice, and sweet basil seeds. Deep amber-caramel in color, thirst-quenching, 100% non-alcoholic, and free from refined sugars or artificial concentrates.",
    "ingredients": [
      "Spring Water",
      "Pure Palmyra Palm Jaggery (Karupatti 16%)",
      "Fresh Key Lime Juice (4%)",
      "Sun-Dried Ginger (Sukku 1%)",
      "Green Cardamom Pods (<0.5%)",
      "Fresh Garden Mint (<0.5%)"
    ],
    "nutrition": {
      "servingSize": "280ml Bottle",
      "calories": "62 kcal",
      "carbs": "15 g",
      "sugars": "14 g",
      "potassium": "180 mg",
      "iron": "1.1 mg",
      "alcoholByVolume": "0.0% ABV"
    },
    "status": "available",
    "variants": [
      { "name": "280ml Heritage Glass Bottle", "price": 119 },
      { "name": "Pack of 4 (4 x 280ml)", "price": 429 }
    ]
  }
];

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
    q: "What makes Fresh Pathaneer non-alcoholic compared to Kallu?",
    a: "Fresh Pathaneer is harvested into vacuum-insulated chill vessels at 3°C right at dawn before sunrise. Keeping the sap chilled arrests yeast action before fermentation can begin, delivering 100% non-alcoholic sweet sap (0.0% ABV). In contrast, Traditional Kallu is permitted to undergo natural wild yeast fermentation, developing effervescence and ~5.2% ABV."
  }
];
