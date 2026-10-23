/**
 * LUMIÈRE BEAUTY — LUXURY COSMETICS STORE
 * Pure Vanilla JavaScript Client Application
 * Zero Framework Dependencies, Zero Backend Requirement
 */

// ==========================================================================
// IMAGE UTILITIES & GITHUB PAGES PATH COMPATIBILITY
// ==========================================================================
function resolveImagePath(path) {
  if (!path) return './src/assets/images/fallback_product_placeholder.svg';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Convert root-absolute paths (/src/assets/...) to relative (./src/assets/...)
  // This ensures images load correctly both on GitHub Pages project subdirectories
  // (e.g. /lumiere-beauty-cosmetics/) and in local/preview environments.
  if (path.startsWith('/src/')) {
    return '.' + path;
  }
  if (path.startsWith('src/')) {
    return './' + path;
  }
  return path;
}

// Global Image Error Handler (logs 404 for inspection and provides attractive fallback)
if (!window.handleImageError) {
  window.handleImageError = function(imgEl, context) {
    console.error('[Lumière Image Error] 404/Failed to load image:', imgEl.src, context ? `(context: ${context})` : '');
    imgEl.setAttribute('data-image-error', '404');
    if (!imgEl.dataset.fallbackApplied) {
      imgEl.dataset.fallbackApplied = 'true';
      imgEl.src = './src/assets/images/fallback_product_placeholder.svg';
    }
  };
}

// ==========================================================================
// 1. PRODUCT CATALOG DATA
// ==========================================================================
const PRODUCTS = [
  {
    id: "LUM-01",
    name: "The Golden Glow Botanical Serum",
    category: "Skincare",
    price: 4200,
    originalPrice: 4950,
    rating: 4.9,
    reviewsCount: 128,
    isPopular: true,
    isNew: false,
    image: "./src/assets/images/product_glow_serum_1792767009961.jpg",
    shortDesc: "A transformative nectar infused with rare Himalayan sea buckthorn oil, squalane, and wild rosehip to restore luminous youthful radiance.",
    fullDesc: "Crafted in small artisanal batches, The Golden Glow Botanical Serum is our award-winning elixir formulated to nourish deeply and illuminate your complexion. Rich in essential omega fatty acids, bio-retinol, and pure gold flakes, this fast-absorbing serum penetrates skin layers to boost collagen synthesis, smooth fine lines, and impart a dewy, candlelit luminosity from within.",
    ingredients: "Organic Cold-Pressed Himalayan Sea Buckthorn Oil, Rosa Canina (Rosehip) Seed Oil, Pure Squalane (Olive Derived), 24K Cosmetic Gold Leaf, Jojoba Esters, Tocopherol (Vitamin E), Frankincense Essential Oil.",
    howToUse: "Dispense 3 to 4 drops onto cleansed palms. Gently press into face, neck, and décolletage with upward smoothing motions every morning and evening before moisturizing.",
    variants: ["30ml Dropper", "50ml Luxury Dropper"],
    stock: 14
  },
  {
    id: "LUM-02",
    name: "Velvet Satin Cashmere Lipstick",
    category: "Makeup",
    price: 2450,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: 94,
    isPopular: true,
    isNew: false,
    image: "./src/assets/images/product_velvet_lipstick_1792767010381.jpg",
    shortDesc: "Weightless couture matte color enriched with wild orchid butter and hyaluronic microspheres for 12-hour plush hydration.",
    fullDesc: "An icon of modern luxury. Our Velvet Satin Cashmere Lipstick glides effortlessly across the lips, depositing rich, saturated pigment in a single stroke. Encased in our signature fluted rose-gold case with magnetic closure, this non-drying formula envelops lips in a cushion-soft, blurring veil of pure color.",
    ingredients: "Ricinus Communis (Castor) Seed Oil, Octyldodecanol, Wild Orchid Extract, Candelilla Wax, Hyaluronic Acid Spheres, Shea Butter, Mica, Iron Oxides, Rose Gold Luster.",
    howToUse: "Apply straight from the sculpted bullet beginning at the center of the upper lip and tracing natural lip contours outward.",
    variants: ["01 Rose Petal", "02 Cashmere Nude", "03 Berry Nectar", "04 Warm Truffle"],
    stock: 22
  },
  {
    id: "LUM-03",
    name: "Rose Wild Whipped Hydration Crème",
    category: "Skincare",
    price: 3850,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 156,
    isPopular: true,
    isNew: false,
    image: "./src/assets/images/product_hydra_cream_1792767011234.jpg",
    shortDesc: "An ultra-nourishing cloud of multi-molecular hyaluronic acid, wild rose distillate, and ceramides that locks in 48-hour moisture.",
    fullDesc: "Indulge in velvety hydration that melts into skin. The Rose Wild Whipped Hydration Crème reinforces your lipid moisture barrier while calming environmental redness. Formulated with freshly harvested organic damask roses and plant-based ceramides, skin looks plumper, firmer, and visibly rested.",
    ingredients: "Aqua, Organic Rosa Damascena Flower Water, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Sodium Hyaluronate, Centella Asiatica Extract, Niacinamide (Vitamin B3), Camellia Seed Oil.",
    howToUse: "Smooth a hazelnut-sized amount over clean face and neck every morning and night after serums.",
    variants: ["50ml Jar", "100ml Value Jar"],
    stock: 19
  },
  {
    id: "LUM-04",
    name: "Aude Rose Eau de Parfum",
    category: "Fragrance",
    price: 7900,
    originalPrice: 9200,
    rating: 4.9,
    reviewsCount: 78,
    isPopular: true,
    isNew: true,
    image: "./src/assets/images/product_perfume_elixir_1792767052586.jpg",
    shortDesc: "A hypnotic blend of Himalayan centifolia rose, warm amber crystals, sparkling bergamot, and velvet musk.",
    fullDesc: "Aude Rose captures the magic of dawn over misty mountain rose valleys. Opening with sparkling Calabrian bergamot and pink pepper, it unfolds into a sensual heart of rare centifolia rose and peony, grounded by warm sandalwood and amber crystals.",
    ingredients: "Alcohol Denat., Fragrance (Parfum), Aqua, Rosa Damascena Flower Extract, Amber Resin, Cedarwood Oil, Limonene, Linalool, Citronellol.",
    howToUse: "Mist lightly onto pulse points: wrists, inner elbows, base of the neck, and behind the ears. Do not rub wrists together.",
    variants: ["50ml Flacon", "100ml Grand Flacon"],
    stock: 9
  },
  {
    id: "LUM-05",
    name: "Botanical Cleansing Oil & Makeup Melt",
    category: "Skincare",
    price: 2900,
    originalPrice: 3400,
    rating: 4.7,
    reviewsCount: 62,
    isPopular: false,
    isNew: false,
    image: "./src/assets/images/product_cleansing_oil_1792767052731.jpg",
    shortDesc: "Silky oil-to-milk cleanser that dissolves stubborn waterproof makeup and pollutants without stripping your natural barrier.",
    fullDesc: "Transform daily cleansing into a restorative ritual. This lightweight golden cleansing oil gently emulsifies upon contact with warm water, dissolving impurities and waterproof makeup while leaving skin supple, balanced, and soft.",
    ingredients: "Sunflower Seed Oil, Sweet Almond Oil, Chamomile Flower Extract, Rosa Canina Fruit Extract, Polyglyceryl-4 Oleate, Vitamin E, Lavender Oil.",
    howToUse: "Massage 2-3 pumps onto dry skin in circular motions. Add warm water to emulsify into a milky veil, then rinse clean.",
    variants: ["150ml Pump", "250ml Eco Refill"],
    stock: 25
  },
  {
    id: "LUM-06",
    name: "Organic Rosewater Dew Toner Mist",
    category: "Skincare",
    price: 2200,
    originalPrice: 2600,
    rating: 4.8,
    reviewsCount: 89,
    isPopular: false,
    isNew: false,
    image: "./src/assets/images/product_rose_toner_1792767053612.jpg",
    shortDesc: "Steam-distilled pure organic rosewater mist infused with hyaluronic acid and wild aloe vera for immediate refresh.",
    fullDesc: "Harvested at peak sunrise fragrance, our 100% steam-distilled rose hydrosol instantly balances skin pH, tightens pores, and revitalizes tired skin throughout the day. Perfect for prepping skin before makeup or setting powder.",
    ingredients: "100% Steam-Distilled Rosa Damascena Hydrosol, Hyaluronic Acid, Aloe Barbadensis Leaf Juice, Vegetable Glycerin, Radish Root Ferment Filtrate.",
    howToUse: "Hold 8 inches away and spritz mist generously over face and neck whenever skin feels parched or after cleansing.",
    variants: ["100ml Spray", "200ml Family Spray"],
    stock: 31
  },
  {
    id: "LUM-07",
    name: "Floral Velvet Blush Powder Compact",
    category: "Makeup",
    price: 2750,
    originalPrice: 3200,
    rating: 4.9,
    reviewsCount: 112,
    isPopular: true,
    isNew: false,
    image: "./src/assets/images/product_blush_compact_1792767054140.jpg",
    shortDesc: "Sculpted floral embossed powder blush with ultra-fine baked pigments for a natural, luminous flush.",
    fullDesc: "Infused with micronized mineral pigments and silky squalane, our Floral Velvet Blush delivers an ethereal, soft-focus wash of rosy color. The buildable formula blends seamlessly into bare skin or foundation without emphasizing pores or texture.",
    ingredients: "Talc-Free Mica, Silica, Dimethicone, Zinc Stearate, Squalane, Rose Extract, Phenoxyethanol, [+/- Iron Oxides CI 77491, CI 77492, Red 7 Lake].",
    howToUse: "Swirl a soft blush brush across the floral embossing and sweep onto the apples of the cheeks blending upward toward temples.",
    variants: ["01 Champagne Rose", "02 Peach Blossom", "03 Soft Amber"],
    stock: 18
  },
  {
    id: "LUM-08",
    name: "The Royal Himalayan Radiance Ritual Set",
    category: "Sets",
    price: 11500,
    originalPrice: 13800,
    rating: 5.0,
    reviewsCount: 45,
    isPopular: true,
    isNew: true,
    image: "./src/assets/images/product_ritual_set_1792768888748.jpg",
    shortDesc: "Complete 4-piece ritual featuring our Serum, Whipped Crème, Cleansing Oil, and Rosewater Mist in a luxury gift box.",
    fullDesc: "The ultimate expression of Lumière Beauty. This curated 4-piece botanical ritual brings together our signature skincare formulations to cleanse, hydrate, illuminate, and protect. Beautifully packaged in an embossed rose-gold keepsake vanity box.",
    ingredients: "Contains full-size Golden Glow Botanical Serum (30ml), Rose Wild Whipped Crème (50ml), Cleansing Oil (150ml), and Rosewater Dew Mist (100ml).",
    howToUse: "Follow the 4-step ritual morning and evening: 1. Cleanse with Oil, 2. Tone with Rose Mist, 3. Nourish with Glow Serum, 4. Seal with Whipped Crème.",
    variants: ["Full Luxury 4-Piece Set", "Travel Collector Edition"],
    stock: 7
  }
];

// ==========================================================================
// 2. STATE MANAGEMENT (localStorage with Memory Fallback)
// ==========================================================================
const STORAGE_KEYS = {
  CART: 'lumiere_cart_v1',
  WISHLIST: 'lumiere_wishlist_v1',
  ORDERS: 'lumiere_orders_v1',
  COUPON: 'lumiere_coupon_v1',
  USER: 'lumiere_user_v1'
};

const DEFAULT_USER = {
  name: "Aayushma Shrestha",
  email: "aayushma.s@example.np",
  phone: "9841234567",
  address: "House 14, Ward 2, Lazimpat",
  city: "Kathmandu",
  province: "Bagmati",
  zip: "44600"
};

const INITIAL_DEMO_ORDERS = [
  {
    id: "LUM-84920",
    date: "2026-10-18",
    items: [
      { id: "LUM-01", name: "The Golden Glow Botanical Serum", variant: "30ml Dropper", quantity: 1, price: 4200, image: "./src/assets/images/product_glow_serum_1792767009961.jpg" },
      { id: "LUM-02", name: "Velvet Satin Cashmere Lipstick", variant: "01 Rose Petal", quantity: 1, price: 2450, image: "./src/assets/images/product_velvet_lipstick_1792767010381.jpg" }
    ],
    subtotal: 6650,
    shipping: 0,
    discount: 997,
    total: 5653,
    status: "Delivered",
    paymentMethod: "Cash on Delivery (COD)",
    address: "Lazimpat Ward 2, Kathmandu, Nepal"
  },
  {
    id: "LUM-79102",
    date: "2026-09-24",
    items: [
      { id: "LUM-03", name: "Rose Wild Whipped Hydration Crème", variant: "50ml Jar", quantity: 1, price: 3850, image: "./src/assets/images/product_hydra_cream_1792767011234.jpg" }
    ],
    subtotal: 3850,
    shipping: 0,
    discount: 0,
    total: 3850,
    status: "Delivered",
    paymentMethod: "eSewa Digital Wallet",
    address: "Lazimpat Ward 2, Kathmandu, Nepal"
  }
];

const VALID_COUPONS = {
  'LUMIERE15': { percent: 15, desc: "15% Welcome Boutique Discount" },
  'GLOW20': { percent: 20, desc: "20% Festive Glow Promotion" },
  'FESTIVE10': { percent: 10, desc: "10% Himalayan Celebration Discount" }
};

class StateStore {
  constructor() {
    this.cart = this.cleanStoredItems(this.load(STORAGE_KEYS.CART, []));
    this.wishlist = this.load(STORAGE_KEYS.WISHLIST, ["LUM-01", "LUM-04"]);
    this.orders = this.cleanStoredOrders(this.load(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS));
    this.coupon = this.load(STORAGE_KEYS.COUPON, null);
    this.user = this.load(STORAGE_KEYS.USER, DEFAULT_USER);
  }

  // Normalize any older stored items (e.g. from previous sessions with /src/ paths)
  cleanStoredItems(items) {
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
      ...item,
      image: resolveImagePath(item.image)
    }));
  }

  cleanStoredOrders(orders) {
    if (!Array.isArray(orders)) return [];
    return orders.map(order => ({
      ...order,
      items: (order.items || []).map(item => ({
        ...item,
        image: resolveImagePath(item.image)
      }))
    }));
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  // Cart operations
  addToCart(productId, variantName, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variant = variantName || product.variants[0];
    const existingIndex = this.cart.findIndex(item => item.id === productId && item.variant === variant);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: resolveImagePath(product.image),
        variant: variant,
        quantity: qty
      });
    }

    this.save(STORAGE_KEYS.CART, this.cart);
    window.dispatchEvent(new CustomEvent('cart-updated'));
    showToast(`Added ${qty} × "${product.name}" to cart`);
  }

  updateQuantity(productId, variant, delta) {
    const item = this.cart.find(i => i.id === productId && i.variant === variant);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId, variant);
      return;
    }

    this.save(STORAGE_KEYS.CART, this.cart);
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  removeFromCart(productId, variant) {
    this.cart = this.cart.filter(i => !(i.id === productId && i.variant === variant));
    this.save(STORAGE_KEYS.CART, this.cart);
    window.dispatchEvent(new CustomEvent('cart-updated'));
    showToast("Product removed from bag");
  }

  clearCart() {
    this.cart = [];
    this.coupon = null;
    this.save(STORAGE_KEYS.CART, this.cart);
    this.save(STORAGE_KEYS.COUPON, this.coupon);
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  // Wishlist operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const prod = PRODUCTS.find(p => p.id === productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      showToast(`Removed from wishlist`);
    } else {
      this.wishlist.push(productId);
      showToast(`Added "${prod ? prod.name : 'Product'}" to wishlist`);
    }
    this.save(STORAGE_KEYS.WISHLIST, this.wishlist);
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  // Coupon operations
  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      this.coupon = { code: cleanCode, ...VALID_COUPONS[cleanCode] };
      this.save(STORAGE_KEYS.COUPON, this.coupon);
      window.dispatchEvent(new CustomEvent('cart-updated'));
      showToast(`Coupon "${cleanCode}" applied: ${this.coupon.percent}% Off!`);
      return { success: true };
    }
    return { success: false, message: "Invalid promo code. Try LUMIERE15 or GLOW20" };
  }

  removeCoupon() {
    this.coupon = null;
    this.save(STORAGE_KEYS.COUPON, null);
    window.dispatchEvent(new CustomEvent('cart-updated'));
    showToast("Promo discount removed");
  }

  // Cart Calculations
  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getShippingFee(subtotal, isOutsideValley = false) {
    if (subtotal >= 3000 || subtotal === 0) return 0;
    return isOutsideValley ? 250 : 150;
  }

  getDiscountAmount(subtotal) {
    if (!this.coupon) return 0;
    return Math.round(subtotal * (this.coupon.percent / 100));
  }

  getCartTotal(isOutsideValley = false) {
    const subtotal = this.getCartSubtotal();
    const discount = this.getDiscountAmount(subtotal);
    const shipping = this.getShippingFee(subtotal, isOutsideValley);
    return Math.max(0, subtotal - discount + shipping);
  }

  // Order submission
  createOrder(orderDetails) {
    const newOrder = {
      id: "LUM-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0],
      items: [...this.cart],
      subtotal: this.getCartSubtotal(),
      shipping: orderDetails.shippingFee,
      discount: this.getDiscountAmount(this.getCartSubtotal()),
      total: orderDetails.total,
      status: "Processing (Demo)",
      paymentMethod: orderDetails.paymentMethod,
      customerName: orderDetails.fullName,
      phone: orderDetails.phone,
      address: `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.province}`
    };

    this.orders.unshift(newOrder);
    this.save(STORAGE_KEYS.ORDERS, this.orders);
    this.clearCart();
    return newOrder;
  }

  resetDemoData() {
    this.cart = [];
    this.wishlist = ["LUM-01", "LUM-04"];
    this.orders = INITIAL_DEMO_ORDERS;
    this.coupon = null;
    this.user = DEFAULT_USER;
    this.save(STORAGE_KEYS.CART, this.cart);
    this.save(STORAGE_KEYS.WISHLIST, this.wishlist);
    this.save(STORAGE_KEYS.ORDERS, this.orders);
    this.save(STORAGE_KEYS.COUPON, this.coupon);
    this.save(STORAGE_KEYS.USER, this.user);
    window.dispatchEvent(new CustomEvent('cart-updated'));
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
    showToast("Reset demo data to initial state");
  }
}

const store = new StateStore();

// ==========================================================================
// 3. UTILITY HELPERS
// ==========================================================================
function formatNPR(num) {
  if (num === null || num === undefined) return "Rs. 0";
  return "Rs. " + Number(num).toLocaleString('en-IN');
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ==========================================================================
// 4. SCREEN ROUTING (SPA Architecture with URL Hash)
// ==========================================================================
function parseRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const [route, queryStr] = hash.split('?');
  const params = new URLSearchParams(queryStr || '');
  return { route, params };
}

function navigateTo(hash) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleRouting() {
  const { route, params } = parseRoute();

  // Hide all screens
  document.querySelectorAll('.screen-view').forEach(screen => {
    screen.classList.remove('active');
  });

  // Update navigation link visual active state
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === `#${route}` || (route === 'home' && href === '#home')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Render appropriate screen
  switch (route) {
    case 'home':
      renderHomeScreen();
      break;
    case 'shop':
      renderShopScreen(params);
      break;
    case 'product-detail':
      renderProductDetailScreen(params.get('id'));
      break;
    case 'cart':
      renderCartScreen();
      break;
    case 'checkout':
      renderCheckoutScreen();
      break;
    case 'confirmation':
      renderConfirmationScreen(params.get('id'));
      break;
    case 'wishlist':
      renderWishlistScreen();
      break;
    case 'about':
      renderAboutScreen();
      break;
    case 'contact':
      renderContactScreen();
      break;
    case 'faq':
      renderFaqScreen();
      break;
    case 'account':
      renderAccountScreen();
      break;
    default:
      renderHomeScreen();
      break;
  }
}

// ==========================================================================
// 5. SCREEN RENDERERS
// ==========================================================================

// --- A. HOME SCREEN ---
function renderHomeScreen() {
  const screen = document.getElementById('screen-home');
  if (!screen) return;
  screen.classList.add('active');

  // Featured 4 products
  const featured = PRODUCTS.filter(p => p.isPopular).slice(0, 4);
  const featuredGrid = document.getElementById('home-featured-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = featured.map(p => createProductCardMarkup(p)).join('');
  }
}

// --- B. SHOP CATALOG SCREEN ---
let activeShopCategory = 'all';
let activeShopSort = 'popular';
let activeShopSearch = '';
let activeShopMaxPrice = 14000;

function renderShopScreen(params) {
  const screen = document.getElementById('screen-shop');
  if (!screen) return;
  screen.classList.add('active');

  if (params && params.get('category')) {
    activeShopCategory = params.get('category');
  }

  // Update category buttons active state
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (cat === activeShopCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  applyShopFilters();
}

function applyShopFilters() {
  let list = [...PRODUCTS];

  // Category filter
  if (activeShopCategory !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === activeShopCategory.toLowerCase());
  }

  // Search filter
  if (activeShopSearch.trim()) {
    const q = activeShopSearch.toLowerCase().trim();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  // Price filter
  list = list.filter(p => p.price <= activeShopMaxPrice);

  // Sorting
  if (activeShopSort === 'popular') {
    list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviewsCount - a.reviewsCount);
  } else if (activeShopSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (activeShopSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (activeShopSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  const grid = document.getElementById('shop-product-grid');
  const countEl = document.getElementById('shop-results-count');
  if (countEl) countEl.textContent = `${list.length} Products Available`;

  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No Products Found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try adjusting your filters or search keywords.</p>
        <button class="btn-primary" onclick="resetShopFilters()">Reset All Filters</button>
      </div>
    `;
  } else {
    grid.innerHTML = list.map(p => createProductCardMarkup(p)).join('');
  }
}

function resetShopFilters() {
  activeShopCategory = 'all';
  activeShopSearch = '';
  activeShopMaxPrice = 14000;
  activeShopSort = 'popular';

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) sortSelect.value = 'popular';

  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
  });

  applyShopFilters();
}

// --- PRODUCT CARD HELPER ---
function createProductCardMarkup(p) {
  const wishlisted = store.isWishlisted(p.id);
  const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-media" onclick="navigateTo('#product-detail?id=${p.id}')">
        <img src="${resolveImagePath(p.image)}" alt="${p.name}" loading="lazy" onerror="handleImageError(this, 'product-card')" />
        ${discountPercent > 0 ? `<div class="card-badge-top">Save ${discountPercent}%</div>` : ''}
        <button class="card-wishlist-btn ${wishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); store.toggleWishlist('${p.id}');"
                title="${wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${wishlisted ? '#E63946' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
        <div class="card-quick-actions">
          <button class="btn-quick-view" onclick="event.stopPropagation(); openQuickView('${p.id}')">Quick View</button>
        </div>
      </div>
      <div class="card-content">
        <div class="card-meta-line">
          <span>${p.category}</span>
          <span class="sep">/</span>
          <div class="card-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span class="tabular-nums">${p.rating}</span>
            <span style="color: var(--text-muted); font-size: 0.72rem;">(${p.reviewsCount})</span>
          </div>
        </div>
        <h3 class="card-title" onclick="navigateTo('#product-detail?id=${p.id}')">${p.name}</h3>
        <p class="card-desc-brief">${p.shortDesc}</p>
        <div class="card-footer">
          <div class="price-wrap">
            <span class="card-price tabular-nums">${formatNPR(p.price)}</span>
            ${p.originalPrice ? `<span class="card-price-original tabular-nums">${formatNPR(p.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-card-add" onclick="store.addToCart('${p.id}', '${p.variants[0]}', 1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- C. PRODUCT DETAIL SCREEN (PDP) ---
let currentPdpProduct = null;
let currentPdpVariant = "";
let currentPdpQty = 1;

function renderProductDetailScreen(productId) {
  const screen = document.getElementById('screen-product-detail');
  if (!screen) return;
  screen.classList.add('active');

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  currentPdpProduct = product;
  currentPdpVariant = product.variants[0];
  currentPdpQty = 1;

  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const wishlisted = store.isWishlisted(product.id);

  screen.innerHTML = `
    <div class="container pdp-section">
      <nav class="breadcrumb-nav">
        <a href="#home">Home</a>
        <span>/</span>
        <a href="#shop">Shop</a>
        <span>/</span>
        <a href="#shop?category=${product.category.toLowerCase()}">${product.category}</a>
        <span>/</span>
        <span style="color: var(--text-primary);">${product.name}</span>
      </nav>

      <div class="pdp-grid">
        <!-- Gallery Left -->
        <div class="pdp-gallery">
          <div class="pdp-main-img">
            <img id="pdp-main-image" src="${resolveImagePath(product.image)}" alt="${product.name}" onerror="handleImageError(this, 'pdp-main')" />
          </div>
          <div class="pdp-thumbs">
            <div class="pdp-thumb active" onclick="switchPdpImage('${resolveImagePath(product.image)}', this)">
              <img src="${resolveImagePath(product.image)}" alt="View 1" onerror="handleImageError(this, 'pdp-thumb')" />
            </div>
            <div class="pdp-thumb" onclick="switchPdpImage('./src/assets/images/hero_lumiere_cosmetics_1792767009991.jpg', this)">
              <img src="./src/assets/images/hero_lumiere_cosmetics_1792767009991.jpg" alt="View 2" onerror="handleImageError(this, 'pdp-thumb')" />
            </div>
          </div>
        </div>

        <!-- Purchase Module Right -->
        <div class="pdp-purchase-module">
          <div class="pdp-category-kicker">${product.category} · Authentic Himalayan Formula</div>
          <h1 class="pdp-title">${product.name}</h1>
          
          <div class="pdp-rating-row">
            <div class="pdp-stars">
              ${renderStarRating(product.rating)}
            </div>
            <span class="pdp-review-count"><strong>${product.rating}</strong> (${product.reviewsCount} verified reviews)</span>
            <span>·</span>
            <span class="pdp-stock-status">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              In Stock (${product.stock} units left)
            </span>
          </div>

          <div class="pdp-price-row">
            <span class="pdp-price-current tabular-nums">${formatNPR(product.price)}</span>
            ${product.originalPrice ? `<span class="pdp-price-old tabular-nums">${formatNPR(product.originalPrice)}</span>` : ''}
            ${discountPercent > 0 ? `<span class="pdp-discount-badge">Save ${discountPercent}%</span>` : ''}
          </div>

          <p class="pdp-short-desc">${product.shortDesc}</p>

          <!-- Variant Selector -->
          <div class="pdp-variant-block">
            <div class="pdp-variant-label">
              <span>Select Option: <strong id="selected-variant-label" style="color: var(--accent-rose);">${currentPdpVariant}</strong></span>
              <span style="font-weight: 400; font-size: 0.75rem; color: var(--text-muted); text-transform: none;">Free Nepal Delivery &gt; Rs. 3,000</span>
            </div>
            <div class="variant-options-list">
              ${product.variants.map((v, idx) => `
                <button type="button" class="variant-btn ${idx === 0 ? 'active' : ''}" onclick="selectPdpVariant('${v}', this)">
                  ${v}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity & Purchase Actions -->
          <div class="pdp-actions-row">
            <div class="quantity-stepper">
              <button type="button" class="qty-btn" onclick="adjustPdpQty(-1)">−</button>
              <div class="qty-display tabular-nums" id="pdp-qty-val">1</div>
              <button type="button" class="qty-btn" onclick="adjustPdpQty(1)">+</button>
            </div>
            <button type="button" class="btn-primary btn-add-pdp" onclick="addCurrentPdpToCart()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Bag
            </button>
            <button type="button" class="btn-buy-now" onclick="buyNowPdp()">
              Buy Now
            </button>
            <button type="button" class="btn-pdp-wishlist ${wishlisted ? 'active' : ''}" onclick="store.toggleWishlist('${product.id}'); this.classList.toggle('active');" title="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${wishlisted ? '#E63946' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="pdp-trust-grid">
            <div class="pdp-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
              <span>100% Authentic Botanical Origin</span>
            </div>
            <div class="pdp-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><rect width="16" height="8" x="2" y="14" rx="1"/><path d="M18 8h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
              <span>Cash on Delivery across Nepal</span>
            </div>
            <div class="pdp-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              <span>Cruelty Free & Dermatologist Tested</span>
            </div>
            <div class="pdp-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Kathmandu Flagship Showroom</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PDP Tabs (Description, Ingredients, How to Use, Reviews) -->
      <div class="pdp-tabs-container">
        <div class="pdp-tab-headers">
          <button class="pdp-tab-btn active" onclick="switchPdpTab('desc', this)">Description</button>
          <button class="pdp-tab-btn" onclick="switchPdpTab('ingredients', this)">Ingredients</button>
          <button class="pdp-tab-btn" onclick="switchPdpTab('usage', this)">How to Use</button>
          <button class="pdp-tab-btn" onclick="switchPdpTab('reviews', this)">Customer Reviews (${product.reviewsCount})</button>
        </div>

        <div id="pdp-tab-desc" class="pdp-tab-content-panel active">
          <p>${product.fullDesc}</p>
        </div>

        <div id="pdp-tab-ingredients" class="pdp-tab-content-panel">
          <p style="margin-bottom: 1rem;"><strong>Complete Ingredient Transparency:</strong></p>
          <p style="background: var(--bg-surface); padding: 1.25rem; border: 1px solid var(--border-light); border-radius: var(--radius-sm); font-size: 0.9rem;">
            ${product.ingredients}
          </p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.75rem;">
            *Free from parabens, synthetic sulfates (SLS/SLES), phthalates, mineral oil, and artificial dyes.
          </p>
        </div>

        <div id="pdp-tab-usage" class="pdp-tab-content-panel">
          <p style="margin-bottom: 1rem;"><strong>Recommended Ritual:</strong></p>
          <p>${product.howToUse}</p>
        </div>

        <div id="pdp-tab-reviews" class="pdp-tab-content-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: gap;">
            <div>
              <h4 style="font-family: var(--font-serif); font-size: 1.4rem;">Customer Feedback</h4>
              <p style="color: var(--text-muted); font-size: 0.85rem;">Average Rating: <strong>${product.rating} / 5.0</strong> based on ${product.reviewsCount} reviews</p>
            </div>
            <button class="btn-outline" onclick="openReviewModal()">Write a Review</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="background: var(--bg-surface); padding: 1.5rem; border: 1px solid var(--border-light); border-radius: var(--radius-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Prerana Karki (Verified Buyer, Kathmandu)</strong>
                <span class="pdp-stars">${renderStarRating(5)}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                "Hands down the best cosmetics product I've purchased in Nepal. The texture is divine, does not feel greasy at all, and smells like fresh roses without being overpowering. Will repurchase!"
              </p>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.5rem;">Reviewed on October 14, 2026 · Option: ${product.variants[0]}</span>
            </div>

            <div style="background: var(--bg-surface); padding: 1.5rem; border: 1px solid var(--border-light); border-radius: var(--radius-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Sushant B. (Verified Buyer, Lalitpur)</strong>
                <span class="pdp-stars">${renderStarRating(5)}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                "Bought this for my wife as an anniversary gift. The packaging is gorgeous, truly luxury tier, and delivery in Patan arrived within 24 hours via Cash on Delivery!"
              </p>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.5rem;">Reviewed on September 28, 2026</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div style="margin-top: 5rem;">
        <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
          <span class="section-kicker">You May Also Cherish</span>
          <h2 class="section-title">Complete Your Daily Routine</h2>
        </div>
        <div class="product-grid">
          ${PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => createProductCardMarkup(p)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderStarRating(rating) {
  const fullStars = Math.floor(rating);
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += `<svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else {
      stars += `<svg width="14" height="14" viewBox="0 0 24 24" fill="#E0D7D8" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }
  return stars;
}

function switchPdpImage(src, thumbEl) {
  const mainImg = document.getElementById('pdp-main-image');
  if (mainImg) mainImg.src = resolveImagePath(src);
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

function selectPdpVariant(variant, btnEl) {
  currentPdpVariant = variant;
  const label = document.getElementById('selected-variant-label');
  if (label) label.textContent = variant;
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

function adjustPdpQty(delta) {
  currentPdpQty = Math.max(1, currentPdpQty + delta);
  const display = document.getElementById('pdp-qty-val');
  if (display) display.textContent = currentPdpQty;
}

function addCurrentPdpToCart() {
  if (!currentPdpProduct) return;
  store.addToCart(currentPdpProduct.id, currentPdpVariant, currentPdpQty);
}

function buyNowPdp() {
  if (!currentPdpProduct) return;
  store.addToCart(currentPdpProduct.id, currentPdpVariant, currentPdpQty);
  navigateTo('#checkout');
}

function switchPdpTab(tabKey, btnEl) {
  document.querySelectorAll('.pdp-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pdp-tab-content-panel').forEach(p => p.classList.remove('active'));

  if (btnEl) btnEl.classList.add('active');
  const panel = document.getElementById(`pdp-tab-${tabKey}`);
  if (panel) panel.classList.add('active');
}

// --- D. SHOPPING CART SCREEN ---
let cartOutsideValley = false;

function renderCartScreen() {
  const screen = document.getElementById('screen-cart');
  if (!screen) return;
  screen.classList.add('active');

  const items = store.cart;
  const subtotal = store.getCartSubtotal();
  const discount = store.getDiscountAmount(subtotal);
  const shipping = store.getShippingFee(subtotal, cartOutsideValley);
  const total = store.getCartTotal(cartOutsideValley);

  if (items.length === 0) {
    screen.innerHTML = `
      <div class="container cart-section">
        <div class="empty-state-card">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h2 style="font-family: var(--font-serif); font-size: 1.85rem; margin-bottom: 0.5rem;">Your Shopping Bag is Empty</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Discover our Himalayan botanical formulations and build your radiance ritual.</p>
          <button class="btn-primary" onclick="navigateTo('#shop')">Explore Shop Collection</button>
        </div>
      </div>
    `;
    return;
  }

  screen.innerHTML = `
    <div class="container cart-section">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
        <div>
          <h1 style="font-family: var(--font-serif); font-size: 2.25rem;">Shopping Bag</h1>
          <p style="color: var(--text-muted); font-size: 0.88rem;">${store.getCartCount()} Items in your bag</p>
        </div>
        <button onclick="store.clearCart()" style="font-size: 0.8rem; color: #C0392B; text-decoration: underline;">
          Clear All Items
        </button>
      </div>

      <div class="cart-layout-grid">
        <!-- Left: Cart Items Table -->
        <div class="cart-items-table">
          <div class="cart-table-head">
            <div>Product</div>
            <div>Quantity</div>
            <div>Price</div>
            <div></div>
          </div>
          <div>
            ${items.map(item => `
              <div class="cart-item-row">
                <div class="cart-product-cell">
                  <div class="cart-thumb">
                    <img src="${resolveImagePath(item.image)}" alt="${item.name}" onerror="handleImageError(this, 'cart-item')" />
                  </div>
                  <div class="cart-prod-info">
                    <h4>${item.name}</h4>
                    <span class="cart-prod-variant">Variant: ${item.variant}</span>
                    <div style="color: var(--accent-rose); font-weight: 600; font-size: 0.9rem; margin-top: 0.25rem;" class="tabular-nums">
                      ${formatNPR(item.price)}
                    </div>
                  </div>
                </div>

                <div>
                  <div class="quantity-stepper" style="height: 2.4rem;">
                    <button class="qty-btn" style="width: 2rem;" onclick="store.updateQuantity('${item.id}', '${item.variant}', -1)">−</button>
                    <div class="qty-display tabular-nums" style="width: 2.5rem; font-size: 0.88rem;">${item.quantity}</div>
                    <button class="qty-btn" style="width: 2rem;" onclick="store.updateQuantity('${item.id}', '${item.variant}', 1)">+</button>
                  </div>
                </div>

                <div style="font-weight: 700; color: var(--text-primary);" class="tabular-nums">
                  ${formatNPR(item.price * item.quantity)}
                </div>

                <div style="text-align: right;">
                  <button onclick="store.removeFromCart('${item.id}', '${item.variant}')" style="color: var(--text-muted); padding: 0.35rem;" title="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Order Summary Card -->
        <div class="cart-summary-card">
          <h3 class="cart-summary-title">Order Summary</h3>

          <div class="summary-line">
            <span>Bag Subtotal</span>
            <span class="tabular-nums">${formatNPR(subtotal)}</span>
          </div>

          <!-- Shipping Region Toggle -->
          <div style="margin: 1rem 0; padding: 0.85rem; background: var(--bg-subtle); border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
            <label style="font-size: 0.78rem; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">
              Destination in Nepal:
            </label>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="variant-btn ${!cartOutsideValley ? 'active' : ''}" style="flex: 1; font-size: 0.78rem;" onclick="setCartDestination(false)">
                Kathmandu Valley
              </button>
              <button type="button" class="variant-btn ${cartOutsideValley ? 'active' : ''}" style="flex: 1; font-size: 0.78rem;" onclick="setCartDestination(true)">
                Outside Valley
              </button>
            </div>
          </div>

          <div class="summary-line">
            <span>Shipping Fee</span>
            <span class="tabular-nums" style="color: ${shipping === 0 ? '#2E7D32' : 'inherit'};">
              ${shipping === 0 ? 'FREE (Orders &gt; Rs. 3,000)' : formatNPR(shipping)}
            </span>
          </div>

          ${discount > 0 ? `
            <div class="summary-line" style="color: #C0392B;">
              <span>Promo Discount (${store.coupon.code})</span>
              <span class="tabular-nums">− ${formatNPR(discount)}</span>
            </div>
          ` : ''}

          <!-- Coupon Code Input -->
          <div class="coupon-box">
            <input type="text" id="cart-coupon-input" placeholder="Coupon Code (e.g. LUMIERE15)" value="${store.coupon ? store.coupon.code : ''}" />
            <button type="button" class="btn-apply-coupon" onclick="handleApplyCartCoupon()">Apply</button>
          </div>

          ${store.coupon ? `
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: #2E7D32; margin-top: -0.5rem; margin-bottom: 1rem;">
              <span>${store.coupon.desc} applied</span>
              <button onclick="store.removeCoupon()" style="color: #C0392B; text-decoration: underline;">Remove</button>
            </div>
          ` : ''}

          <div class="summary-line total-line">
            <span>Estimated Total (NPR)</span>
            <span class="tabular-nums" style="color: var(--accent-rose);">${formatNPR(total)}</span>
          </div>

          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            *Inclusive of all applicable VAT & Luxury Care Packaging.
          </div>

          <button class="btn-primary" style="width: 100%; height: 3.25rem; font-size: 0.95rem;" onclick="navigateTo('#checkout')">
            Proceed to Checkout
          </button>

          <a href="#shop" style="display: block; text-align: center; margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary); text-decoration: underline;">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  `;
}

function setCartDestination(isOutside) {
  cartOutsideValley = isOutside;
  renderCartScreen();
}

function handleApplyCartCoupon() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const res = store.applyCoupon(input.value);
  if (!res.success) {
    showToast(res.message);
  }
}

// --- E. CHECKOUT SCREEN ---
let selectedPaymentMethod = "cod";
let checkoutOutsideValley = false;

function renderCheckoutScreen() {
  const screen = document.getElementById('screen-checkout');
  if (!screen) return;
  screen.classList.add('active');

  const items = store.cart;
  if (items.length === 0) {
    navigateTo('#cart');
    return;
  }

  const subtotal = store.getCartSubtotal();
  const discount = store.getDiscountAmount(subtotal);
  const shipping = store.getShippingFee(subtotal, checkoutOutsideValley);
  const total = store.getCartTotal(checkoutOutsideValley);
  const user = store.user;

  screen.innerHTML = `
    <div class="container checkout-section">
      <div style="margin-bottom: 2rem;">
        <span class="section-kicker">Secure Demonstration Checkout</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.25rem;">Finalize Your Order</h1>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Complete delivery information and choose your preferred payment method.</p>
      </div>

      <div class="checkout-grid">
        <!-- Left: Delivery Form & Payment -->
        <div>
          <!-- Step 1: Shipping Address -->
          <div class="checkout-card">
            <h2 class="checkout-step-title">
              <span class="step-num-circle">1</span>
              <span>Delivery Details (Nepal)</span>
            </h2>

            <form id="checkout-form" onsubmit="handlePlaceOrder(event)">
              <div class="form-grid-2">
                <div class="form-group" id="group-fullname">
                  <label>Full Name <span class="req">*</span></label>
                  <input type="text" id="chk-fullname" value="${user.name}" placeholder="e.g. Aayushma Shrestha" />
                  <div class="form-error-msg">Please enter your full name.</div>
                </div>

                <div class="form-group" id="group-phone">
                  <label>Nepal Mobile Number <span class="req">*</span></label>
                  <input type="tel" id="chk-phone" value="${user.phone}" placeholder="98XXXXXXXX (10 digits)" />
                  <div class="form-error-msg">Please enter a valid 10-digit mobile number.</div>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group" id="group-email">
                  <label>Email Address for Receipt <span class="req">*</span></label>
                  <input type="email" id="chk-email" value="${user.email}" placeholder="your.name@example.np" />
                  <div class="form-error-msg">Please enter a valid email address.</div>
                </div>

                <div class="form-group" id="group-province">
                  <label>Province <span class="req">*</span></label>
                  <select id="chk-province" onchange="handleProvinceChange(this.value)">
                    <option value="Bagmati" ${user.province === 'Bagmati' ? 'selected' : ''}>Bagmati Province</option>
                    <option value="Gandaki" ${user.province === 'Gandaki' ? 'selected' : ''}>Gandaki Province</option>
                    <option value="Koshi" ${user.province === 'Koshi' ? 'selected' : ''}>Koshi Province</option>
                    <option value="Madhesh" ${user.province === 'Madhesh' ? 'selected' : ''}>Madhesh Province</option>
                    <option value="Lumbini" ${user.province === 'Lumbini' ? 'selected' : ''}>Lumbini Province</option>
                    <option value="Karnali" ${user.province === 'Karnali' ? 'selected' : ''}>Karnali Province</option>
                    <option value="Sudurpashchim" ${user.province === 'Sudurpashchim' ? 'selected' : ''}>Sudurpashchim Province</option>
                  </select>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group" id="group-city">
                  <label>City / Municipality <span class="req">*</span></label>
                  <input type="text" id="chk-city" value="${user.city}" placeholder="e.g. Kathmandu, Lalitpur, Pokhara" />
                  <div class="form-error-msg">Please specify your delivery city.</div>
                </div>

                <div class="form-group">
                  <label>Postal / Landmark Code</label>
                  <input type="text" id="chk-zip" value="${user.zip}" placeholder="e.g. 44600" />
                </div>
              </div>

              <div class="form-group" id="group-address">
                <label>Exact Street Address / Landmark <span class="req">*</span></label>
                <textarea id="chk-address" rows="2" placeholder="e.g. House No. 14, Ward 2, Near Radisson Hotel, Lazimpat">${user.address}</textarea>
                <div class="form-error-msg">Please provide your street address and nearest landmark.</div>
              </div>

              <div class="form-group">
                <label>Order Notes / Delivery Instructions (Optional)</label>
                <input type="text" id="chk-notes" placeholder="e.g. Please call before arriving or deliver after 2 PM" />
              </div>
            </form>
          </div>

          <!-- Step 2: Payment Method Selection -->
          <div class="checkout-card">
            <h2 class="checkout-step-title">
              <span class="step-num-circle">2</span>
              <span>Payment Option</span>
            </h2>

            <div class="payment-methods-list">
              <!-- Cash on Delivery -->
              <div class="payment-method-option ${selectedPaymentMethod === 'cod' ? 'selected' : ''}" onclick="selectPaymentMethod('cod')">
                <div class="payment-opt-left">
                  <div class="radio-dot"></div>
                  <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">Cash on Delivery (COD)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Pay in cash or Fonepay QR upon receipt at your doorstep</div>
                  </div>
                </div>
                <span class="payment-tag">Most Popular in Nepal</span>
              </div>

              <!-- eSewa Digital Wallet -->
              <div class="payment-method-option ${selectedPaymentMethod === 'esewa' ? 'selected' : ''}" onclick="selectPaymentMethod('esewa')">
                <div class="payment-opt-left">
                  <div class="radio-dot"></div>
                  <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">eSewa Mobile Wallet (Simulated Demo)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Instant simulated verification via eSewa portal</div>
                  </div>
                </div>
                <span class="payment-tag" style="color: #60BB46;">eSewa Demo</span>
              </div>

              <!-- Khalti Digital Wallet -->
              <div class="payment-method-option ${selectedPaymentMethod === 'khalti' ? 'selected' : ''}" onclick="selectPaymentMethod('khalti')">
                <div class="payment-opt-left">
                  <div class="radio-dot"></div>
                  <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">Khalti Digital Wallet (Simulated Demo)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Instant digital wallet checkout simulation</div>
                  </div>
                </div>
                <span class="payment-tag" style="color: #5C2D91;">Khalti Demo</span>
              </div>

              <!-- Fonepay / Bank QR -->
              <div class="payment-method-option ${selectedPaymentMethod === 'fonepay' ? 'selected' : ''}" onclick="selectPaymentMethod('fonepay')">
                <div class="payment-opt-left">
                  <div class="radio-dot"></div>
                  <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">Fonepay QR / Mobile Banking (Demo)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Interbank payment QR scan demonstration</div>
                  </div>
                </div>
                <span class="payment-tag">Instant QR</span>
              </div>

              <!-- Card Payment Simulation -->
              <div class="payment-method-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}" onclick="selectPaymentMethod('card')">
                <div class="payment-opt-left">
                  <div class="radio-dot"></div>
                  <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">Visa / Mastercard / SCT (Demo Sandbox)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Simulated card processing for testing</div>
                  </div>
                </div>
                <span class="payment-tag">Sandbox</span>
              </div>
            </div>

            <!-- Card Demo Inputs (if card selected) -->
            ${selectedPaymentMethod === 'card' ? `
              <div style="margin-top: 1.25rem; padding: 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-sm); border: 1px dashed var(--accent-rose);">
                <p style="font-size: 0.78rem; color: #874650; margin-bottom: 0.75rem; font-weight: 600;">
                  ⚠️ DEMO MODE: Do not enter real credit card numbers. Any test digits work.
                </p>
                <div class="form-grid-2">
                  <div class="form-group" style="margin-bottom: 0.75rem;">
                    <label>Test Card Number</label>
                    <input type="text" placeholder="4111 2222 3333 4444" value="4111 2222 3333 4444" />
                  </div>
                  <div class="form-group" style="margin-bottom: 0.75rem;">
                    <label>Expiry / CVV</label>
                    <input type="text" placeholder="12/28 · 123" value="12/28 · 123" />
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div>
          <div class="cart-summary-card">
            <h3 class="cart-summary-title">Items in Order (${store.getCartCount()})</h3>

            <div style="max-height: 280px; overflow-y: auto; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
              ${items.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${resolveImagePath(item.image)}" style="width: 2.75rem; height: 2.75rem; object-fit: cover; border-radius: 4px;" alt="${item.name}" onerror="handleImageError(this, 'checkout-item')" />
                    <div>
                      <div style="font-weight: 600; color: var(--text-primary); max-width: 170px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.name}
                      </div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">
                        ${item.quantity} × ${item.variant}
                      </div>
                    </div>
                  </div>
                  <span class="tabular-nums" style="font-weight: 600;">${formatNPR(item.price * item.quantity)}</span>
                </div>
              `).join('')}
            </div>

            <div class="summary-line">
              <span>Subtotal</span>
              <span class="tabular-nums">${formatNPR(subtotal)}</span>
            </div>

            <div class="summary-line">
              <span>Shipping Charge</span>
              <span class="tabular-nums" style="color: ${shipping === 0 ? '#2E7D32' : 'inherit'};">
                ${shipping === 0 ? 'FREE' : formatNPR(shipping)}
              </span>
            </div>

            ${discount > 0 ? `
              <div class="summary-line" style="color: #C0392B;">
                <span>Discount (${store.coupon.code})</span>
                <span class="tabular-nums">− ${formatNPR(discount)}</span>
              </div>
            ` : ''}

            <div class="summary-line total-line">
              <span>Final Total (NPR)</span>
              <span class="tabular-nums" style="color: var(--accent-rose); font-size: 1.4rem;">
                ${formatNPR(total)}
              </span>
            </div>

            <button type="button" class="btn-primary" style="width: 100%; height: 3.25rem; font-size: 0.95rem; margin-top: 1rem;" onclick="triggerCheckoutSubmit()">
              Confirm & Place Order (Demo)
            </button>

            <div style="margin-top: 1rem; text-align: center; font-size: 0.75rem; color: var(--text-muted);">
              🛡️ Demo purchase demonstration. No real charges are made.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleProvinceChange(province) {
  checkoutOutsideValley = (province !== 'Bagmati');
  renderCheckoutScreen();
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  renderCheckoutScreen();
}

function triggerCheckoutSubmit() {
  const form = document.getElementById('checkout-form');
  if (form) {
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }
}

function handlePlaceOrder(e) {
  e.preventDefault();

  const fullNameInput = document.getElementById('chk-fullname');
  const phoneInput = document.getElementById('chk-phone');
  const emailInput = document.getElementById('chk-email');
  const cityInput = document.getElementById('chk-city');
  const addressInput = document.getElementById('chk-address');
  const provinceSelect = document.getElementById('chk-province');

  let hasError = false;

  // Validate Full Name
  if (!fullNameInput.value.trim()) {
    document.getElementById('group-fullname').classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-fullname').classList.remove('has-error');
  }

  // Validate Phone
  const phoneVal = phoneInput.value.replace(/\D/g, '');
  if (phoneVal.length < 9) {
    document.getElementById('group-phone').classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-phone').classList.remove('has-error');
  }

  // Validate Email
  if (!emailInput.value.includes('@')) {
    document.getElementById('group-email').classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-email').classList.remove('has-error');
  }

  // Validate City
  if (!cityInput.value.trim()) {
    document.getElementById('group-city').classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-city').classList.remove('has-error');
  }

  // Validate Address
  if (!addressInput.value.trim()) {
    document.getElementById('group-address').classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-address').classList.remove('has-error');
  }

  if (hasError) {
    showToast("Please fill in all required shipping fields.");
    return;
  }

  const subtotal = store.getCartSubtotal();
  const shippingFee = store.getShippingFee(subtotal, checkoutOutsideValley);
  const total = store.getCartTotal(checkoutOutsideValley);

  let paymentLabel = "Cash on Delivery (COD)";
  if (selectedPaymentMethod === 'esewa') paymentLabel = "eSewa Mobile Wallet";
  else if (selectedPaymentMethod === 'khalti') paymentLabel = "Khalti Digital Wallet";
  else if (selectedPaymentMethod === 'fonepay') paymentLabel = "Fonepay QR Banking";
  else if (selectedPaymentMethod === 'card') paymentLabel = "Credit/Debit Card (Demo)";

  const newOrder = store.createOrder({
    fullName: fullNameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
    city: cityInput.value.trim(),
    province: provinceSelect ? provinceSelect.value : 'Bagmati',
    address: addressInput.value.trim(),
    paymentMethod: paymentLabel,
    shippingFee: shippingFee,
    total: total
  });

  navigateTo(`#confirmation?id=${newOrder.id}`);
}

// --- F. ORDER CONFIRMATION SCREEN ---
function renderConfirmationScreen(orderId) {
  const screen = document.getElementById('screen-confirmation');
  if (!screen) return;
  screen.classList.add('active');

  const order = store.orders.find(o => o.id === orderId) || store.orders[0];

  screen.innerHTML = `
    <div class="container confirmation-section">
      <div class="confirmation-card">
        <div class="conf-check-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>

        <h1 class="conf-title">Thank You for Your Order</h1>
        <p class="conf-order-id">
          Order Reference: <strong style="color: var(--accent-rose);">${order.id}</strong> · Placed on ${order.date}
        </p>

        <!-- Stepper Tracker -->
        <div class="order-timeline-stepper">
          <div class="timeline-step active">
            <div class="step-node">✓</div>
            <span class="step-name">Placed</span>
          </div>
          <div class="timeline-step active">
            <div class="step-node">2</div>
            <span class="step-name">Confirmed</span>
          </div>
          <div class="timeline-step">
            <div class="step-node">3</div>
            <span class="step-name">Packaging</span>
          </div>
          <div class="timeline-step">
            <div class="step-node">4</div>
            <span class="step-name">Out for Delivery</span>
          </div>
        </div>

        <!-- Receipt Box -->
        <div class="conf-receipt-box">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <strong style="font-family: var(--font-serif); font-size: 1.15rem;">Itemized Receipt</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${order.items.length} Product(s)</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
            ${order.items.map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
                <div>
                  <strong>${item.name}</strong>
                  <div style="font-size: 0.76rem; color: var(--text-muted);">${item.quantity} × ${item.variant}</div>
                </div>
                <span class="tabular-nums">${formatNPR(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 0.75rem; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Subtotal</span>
              <span class="tabular-nums">${formatNPR(order.subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Shipping Fee</span>
              <span class="tabular-nums">${order.shipping === 0 ? 'FREE' : formatNPR(order.shipping)}</span>
            </div>
            ${order.discount ? `
              <div style="display: flex; justify-content: space-between; color: #C0392B;">
                <span>Discount</span>
                <span class="tabular-nums">− ${formatNPR(order.discount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; color: var(--text-primary); border-top: 1px solid var(--border-light); padding-top: 0.5rem; margin-top: 0.25rem;">
              <span>Total Paid / Payable</span>
              <span class="tabular-nums" style="color: var(--accent-rose);">${formatNPR(order.total)}</span>
            </div>
          </div>

          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-light); font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6;">
            <div><strong>Recipient:</strong> ${order.customerName || 'Aayushma Shrestha'} (${order.phone || '+977-9841234567'})</div>
            <div><strong>Delivery Destination:</strong> ${order.address}</div>
            <div><strong>Payment Method:</strong> ${order.paymentMethod}</div>
            <div><strong>Estimated Delivery:</strong> 1–2 Business Days within Kathmandu Valley, 2–3 Days outside.</div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-primary" onclick="navigateTo('#account')">View in Order History</button>
          <button class="btn-outline" onclick="window.print()">Print Order Receipt</button>
          <button class="btn-outline" onclick="navigateTo('#shop')">Continue Shopping</button>
        </div>
      </div>
    </div>
  `;
}

// --- G. WISHLIST SCREEN ---
function renderWishlistScreen() {
  const screen = document.getElementById('screen-wishlist');
  if (!screen) return;
  screen.classList.add('active');

  const wishlistedIds = store.wishlist;
  const wishlistedProducts = PRODUCTS.filter(p => wishlistedIds.includes(p.id));

  if (wishlistedProducts.length === 0) {
    screen.innerHTML = `
      <div class="container wishlist-section">
        <div class="empty-state-card">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <h2 style="font-family: var(--font-serif); font-size: 1.85rem; margin-bottom: 0.5rem;">Your Wishlist is Empty</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Save your favorite luxury cosmetics to review or purchase anytime.</p>
          <button class="btn-primary" onclick="navigateTo('#shop')">Discover Boutique Favorites</button>
        </div>
      </div>
    `;
    return;
  }

  screen.innerHTML = `
    <div class="container wishlist-section">
      <div class="wishlist-header-row">
        <div>
          <h1 style="font-family: var(--font-serif); font-size: 2.25rem;">My Wishlist</h1>
          <p style="color: var(--text-muted); font-size: 0.88rem;">${wishlistedProducts.length} Saved Formulation(s)</p>
        </div>
        <button class="btn-outline" onclick="addAllWishlistToCart()">
          Add All to Bag
        </button>
      </div>

      <div class="product-grid">
        ${wishlistedProducts.map(p => createProductCardMarkup(p)).join('')}
      </div>
    </div>
  `;
}

function addAllWishlistToCart() {
  const wishlistedProducts = PRODUCTS.filter(p => store.wishlist.includes(p.id));
  wishlistedProducts.forEach(p => {
    store.addToCart(p.id, p.variants[0], 1);
  });
  showToast(`Added ${wishlistedProducts.length} wishlist items to bag`);
}

// --- H. ABOUT US SCREEN ---
function renderAboutScreen() {
  const screen = document.getElementById('screen-about');
  if (!screen) return;
  screen.classList.add('active');

  screen.innerHTML = `
    <div>
      <section class="about-hero">
        <div class="container">
          <span class="section-kicker">Our Heritage & Craftsmanship</span>
          <h1 class="section-title">The Essence of Himalayan Botanical Luxury</h1>
          <p class="section-desc" style="max-width: 680px; margin: 0 auto;">
            Born at the foothills of the Himalayas, Lumière Beauty bridges centuries-old Nepalese herbal alchemy with cutting-edge clean cosmetic science.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="story-grid">
            <div class="story-image-wrap">
              <img src="./src/assets/images/botanical_ingredients_1792768902453.jpg" alt="Lumière Beauty Philosophy" onerror="handleImageError(this, 'about-story')" />
            </div>
            <div class="story-copy">
              <span class="hero-kicker">Pure, Potent, Principled</span>
              <h3>Formulated in Kathmandu for the Discerning Individual</h3>
              <p>
                Founded in 2022, Lumière Beauty was envisioned as a response to mass-produced, chemically laden cosmetics. We set out to celebrate Nepal's extraordinarily biodiverse botanicals—from wild sea buckthorn harvested at 3,500 meters altitude to organic wild damask roses handpicked at first dawn.
              </p>
              <p>
                Every formulation is meticulously balanced by our team of biochemists and traditional Ayurvedic herbologists. We ensure zero compromise between sublime skin sensory textures and clean, non-toxic effectiveness.
              </p>

              <div class="story-metrics-grid">
                <div>
                  <div class="metric-num tabular-nums">100%</div>
                  <div class="metric-label">Cruelty-Free</div>
                </div>
                <div>
                  <div class="metric-num tabular-nums">24+</div>
                  <div class="metric-label">Himalayan Botanicals</div>
                </div>
                <div>
                  <div class="metric-num tabular-nums">15k+</div>
                  <div class="metric-label">Happy Clients in Nepal</div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-values-grid">
            <div class="value-card">
              <h4>Ethical Sourcing</h4>
              <p>We work directly with women-led farming cooperatives in Mustang, Dolpa, and Nuwakot, paying premium fair wages for organic botanical harvests.</p>
            </div>
            <div class="value-card">
              <h4>Zero Compromise Safety</h4>
              <p>100% free from parabens, synthetic sulfates, mineral oil, and artificial fragrances. Formulated for high-altitude UV resilience and sensitive skin.</p>
            </div>
            <div class="value-card">
              <h4>Sustainable Luxury</h4>
              <p>Our bottles are crafted from recyclable Italian cosmetic glass and recycled rose-gold accents, encased in FSC-certified biodegradeable paper.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// --- I. CONTACT US SCREEN ---
function renderContactScreen() {
  const screen = document.getElementById('screen-contact');
  if (!screen) return;
  screen.classList.add('active');

  screen.innerHTML = `
    <div class="container contact-section">
      <div class="section-header">
        <span class="section-kicker">We'd Love to Hear From You</span>
        <h1 class="section-title">Visit Our Kathmandu Boutique</h1>
        <p class="section-desc">Experience our full collection, enjoy a bespoke skincare consultation, or speak with our beauty concierge.</p>
      </div>

      <div class="contact-grid">
        <!-- Showroom Information -->
        <div class="contact-info-card">
          <h3>Boutique Concierge</h3>
          
          <div class="contact-detail-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">Flagship Showroom</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Level 2, Heritage Plaza, Durbar Marg<br>Kathmandu 44600, Nepal
              </p>
            </div>
          </div>

          <div class="contact-detail-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">Direct Phone & WhatsApp</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                +977 1-4228900 · +977 9801234567
              </p>
            </div>
          </div>

          <div class="contact-detail-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">Email Support</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                care@lumierebeauty.com.np
              </p>
            </div>
          </div>

          <div class="contact-detail-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">Operating Hours</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Sunday – Friday: 10:00 AM – 7:30 PM<br>Saturday: 11:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-card">
          <h3 style="font-family: var(--font-serif); font-size: 1.75rem; margin-bottom: 0.5rem;">Send a Message</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">Our customer care team typically responds within 2 hours during boutique operating hours.</p>

          <form id="contact-form" onsubmit="handleContactSubmit(event)">
            <div class="form-grid-2">
              <div class="form-group" id="cnt-group-name">
                <label>Your Name <span class="req">*</span></label>
                <input type="text" id="cnt-name" placeholder="e.g. Nikita Shrestha" />
                <div class="form-error-msg">Please enter your name.</div>
              </div>
              <div class="form-group" id="cnt-group-phone">
                <label>Phone Number <span class="req">*</span></label>
                <input type="tel" id="cnt-phone" placeholder="98XXXXXXXX" />
                <div class="form-error-msg">Please enter your contact number.</div>
              </div>
            </div>

            <div class="form-group" id="cnt-group-email">
              <label>Email Address <span class="req">*</span></label>
              <input type="email" id="cnt-email" placeholder="you@domain.com" />
              <div class="form-error-msg">Please enter a valid email.</div>
            </div>

            <div class="form-group">
              <label>Inquiry Subject</label>
              <select id="cnt-subject">
                <option value="skincare">Skincare Consultation / Routine Help</option>
                <option value="order">Order Tracking & Delivery Status</option>
                <option value="corporate">Bespoke Gift Boxes & Corporate Orders</option>
                <option value="feedback">Product Feedback & General Inquiry</option>
              </select>
            </div>

            <div class="form-group" id="cnt-group-msg">
              <label>Your Message <span class="req">*</span></label>
              <textarea id="cnt-message" rows="4" placeholder="How may our beauty concierge assist you today?"></textarea>
              <div class="form-error-msg">Please provide your message details.</div>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; height: 3.25rem;">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cnt-name');
  const phone = document.getElementById('cnt-phone');
  const email = document.getElementById('cnt-email');
  const msg = document.getElementById('cnt-message');

  let hasError = false;
  if (!name.value.trim()) { document.getElementById('cnt-group-name').classList.add('has-error'); hasError = true; }
  else document.getElementById('cnt-group-name').classList.remove('has-error');

  if (!phone.value.trim()) { document.getElementById('cnt-group-phone').classList.add('has-error'); hasError = true; }
  else document.getElementById('cnt-group-phone').classList.remove('has-error');

  if (!email.value.includes('@')) { document.getElementById('cnt-group-email').classList.add('has-error'); hasError = true; }
  else document.getElementById('cnt-group-email').classList.remove('has-error');

  if (!msg.value.trim()) { document.getElementById('cnt-group-msg').classList.add('has-error'); hasError = true; }
  else document.getElementById('cnt-group-msg').classList.remove('has-error');

  if (hasError) return;

  showToast(`Thank you ${name.value.trim()}! Your message has been received.`);
  e.target.reset();
}

// --- J. FAQ SCREEN (Interactive Accordion) ---
const FAQ_ITEMS = [
  {
    category: "orders",
    q: "How does delivery work across Nepal?",
    a: "We offer express doorstep delivery across all 7 provinces of Nepal. Inside Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur), orders are typically delivered within 24 to 48 hours. For cities outside Kathmandu Valley (Pokhara, Biratnagar, Chitwan, Butwal, Dharan, Nepalgunj, etc.), delivery takes 2 to 4 business days via reliable courier partners."
  },
  {
    category: "orders",
    q: "What is the delivery fee and is shipping free?",
    a: "Orders with a subtotal of Rs. 3,000 or more qualify for 100% FREE delivery anywhere in Nepal! For orders under Rs. 3,000, flat delivery fees apply: Rs. 150 inside Kathmandu Valley, and Rs. 250 for all locations outside the Valley."
  },
  {
    category: "payments",
    q: "Do you support Cash on Delivery (COD)?",
    a: "Yes! Cash on Delivery (COD) is available nationwide for all our cosmetics and skincare products. You can inspect the sealed luxury package and pay directly to the delivery rider in cash or by scanning their Fonepay QR code upon delivery."
  },
  {
    category: "payments",
    q: "What digital payment methods do you accept?",
    a: "In addition to Cash on Delivery, we accept eSewa, Khalti, Fonepay Interbank QR transfers, as well as Visa and Mastercard debit and credit cards issued by Nepalese and international banks."
  },
  {
    category: "products",
    q: "Are Lumière Beauty products cruelty-free and dermatologically tested?",
    a: "Yes, 100%. We never test on animals at any stage of development, and we do not source from suppliers who do. All products undergo clinical patch testing under certified dermatological supervision to ensure gentle tolerance on sensitive skin."
  },
  {
    category: "products",
    q: "Where are your key botanical ingredients harvested?",
    a: "Our hero botanicals are ethically sourced from indigenous high-altitude cooperatives in the Himalayas of Nepal. For example, our organic sea buckthorn comes from Mustang, chamomile from Chitwan, and wild rose hydrosol from pristine mid-hill valleys."
  },
  {
    category: "returns",
    q: "What is your return and exchange policy?",
    a: "We maintain a 7-day hassle-free replacement policy for any items that arrive damaged, defective, or incorrect. Because these are personal cosmetic products, opened or used bottles cannot be returned for hygiene and safety reasons unless defective."
  }
];

let activeFaqCategory = 'all';

function renderFaqScreen() {
  const screen = document.getElementById('screen-faq');
  if (!screen) return;
  screen.classList.add('active');

  screen.innerHTML = `
    <div class="container faq-section">
      <div class="section-header">
        <span class="section-kicker">Frequently Asked Questions</span>
        <h1 class="section-title">Help & Customer Guidance</h1>
        <p class="section-desc">Find answers to common questions about our products, Nepal delivery, payment options, and returns.</p>
      </div>

      <div class="faq-categories-tabs">
        <button class="filter-tab-btn ${activeFaqCategory === 'all' ? 'active' : ''}" onclick="setFaqCategory('all')">All Questions</button>
        <button class="filter-tab-btn ${activeFaqCategory === 'orders' ? 'active' : ''}" onclick="setFaqCategory('orders')">Delivery & Shipping</button>
        <button class="filter-tab-btn ${activeFaqCategory === 'payments' ? 'active' : ''}" onclick="setFaqCategory('payments')">Payments & COD</button>
        <button class="filter-tab-btn ${activeFaqCategory === 'products' ? 'active' : ''}" onclick="setFaqCategory('products')">Ingredients & Safety</button>
        <button class="filter-tab-btn ${activeFaqCategory === 'returns' ? 'active' : ''}" onclick="setFaqCategory('returns')">Returns & Exchanges</button>
      </div>

      <div class="faq-container" id="faq-accordion-list">
        ${renderFaqList()}
      </div>

      <div style="text-align: center; margin-top: 3.5rem; padding: 2.5rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md);">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">Still Need Assistance?</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.25rem;">Our customer concierge team is available 7 days a week to help with your orders or skin consultation.</p>
        <button class="btn-primary" onclick="navigateTo('#contact')">Contact Concierge</button>
      </div>
    </div>
  `;
}

function setFaqCategory(cat) {
  activeFaqCategory = cat;
  renderFaqScreen();
}

function renderFaqList() {
  const list = activeFaqCategory === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter(f => f.category === activeFaqCategory);
  return list.map((item, index) => `
    <div class="faq-item ${index === 0 ? 'open' : ''}">
      <button type="button" class="faq-question-btn" onclick="toggleFaqItem(this)">
        <span>${item.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-answer-pane">
        <p>${item.a}</p>
      </div>
    </div>
  `).join('');
}

function toggleFaqItem(btn) {
  const item = btn.closest('.faq-item');
  if (item) item.classList.toggle('open');
}

// --- K. DEMO ACCOUNT & ORDER HISTORY SCREEN ---
let activeAccountTab = 'orders';

function renderAccountScreen() {
  const screen = document.getElementById('screen-account');
  if (!screen) return;
  screen.classList.add('active');

  const user = store.user;
  const orders = store.orders;

  screen.innerHTML = `
    <div class="container account-section">
      <div style="margin-bottom: 2rem;">
        <span class="section-kicker">Client Demonstration Portal</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.25rem;">My Account & Orders</h1>
      </div>

      <div class="account-grid">
        <!-- Sidebar Navigation -->
        <div class="account-sidebar-card">
          <div class="account-user-badge">
            <div class="user-avatar-circle">AS</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 600;">${user.name}</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${user.email}</span>
            <div style="margin-top: 0.5rem;">
              <span class="payment-tag">Demo Member</span>
            </div>
          </div>

          <ul class="account-nav-list">
            <li>
              <button class="account-nav-btn ${activeAccountTab === 'orders' ? 'active' : ''}" onclick="switchAccountTab('orders')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                Order History (${orders.length})
              </button>
            </li>
            <li>
              <button class="account-nav-btn ${activeAccountTab === 'address' ? 'active' : ''}" onclick="switchAccountTab('address')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Saved Addresses
              </button>
            </li>
            <li>
              <button class="account-nav-btn" onclick="navigateTo('#wishlist')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                My Wishlist (${store.wishlist.length})
              </button>
            </li>
            <li>
              <button class="account-nav-btn ${activeAccountTab === 'settings' ? 'active' : ''}" onclick="switchAccountTab('settings')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Demo Settings
              </button>
            </li>
          </ul>
        </div>

        <!-- Content Area -->
        <div class="account-content-card">
          ${activeAccountTab === 'orders' ? renderOrdersTab(orders) : ''}
          ${activeAccountTab === 'address' ? renderAddressTab(user) : ''}
          ${activeAccountTab === 'settings' ? renderSettingsTab() : ''}
        </div>
      </div>
    </div>
  `;
}

function switchAccountTab(tab) {
  activeAccountTab = tab;
  renderAccountScreen();
}

function renderOrdersTab(orders) {
  if (orders.length === 0) {
    return `
      <div style="text-align: center; padding: 3rem 1rem;">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No Orders Found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">You haven't placed any demo orders yet.</p>
        <button class="btn-primary" onclick="navigateTo('#shop')">Start Shopping</button>
      </div>
    `;
  }

  return `
    <div>
      <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1.5rem;">Order History</h3>
      ${orders.map(order => `
        <div class="order-history-card">
          <div class="order-history-header">
            <div>
              <strong style="color: var(--accent-rose);">${order.id}</strong>
              <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.75rem;">Placed on ${order.date}</span>
            </div>
            <div>
              <span class="payment-tag" style="background: #E8F5E9; color: #2E7D32;">${order.status}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
            ${order.items.map(item => `
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <img src="${resolveImagePath(item.image)}" alt="${item.name}" style="width: 2.75rem; height: 2.75rem; object-fit: cover; border-radius: 4px;" onerror="handleImageError(this, 'order-history-item')" />
                  <div>
                    <strong style="color: var(--text-primary);">${item.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${item.quantity} × ${item.variant}</div>
                  </div>
                </div>
                <span class="tabular-nums font-weight: 600;">${formatNPR(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem; font-size: 0.85rem;">
            <div>
              <span style="color: var(--text-muted);">Method:</span> <strong>${order.paymentMethod}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Total:</span> <strong style="color: var(--accent-rose); font-size: 1.1rem;" class="tabular-nums">${formatNPR(order.total)}</strong>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAddressTab(user) {
  return `
    <div>
      <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1.5rem;">Saved Delivery Addresses</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-focus); border-radius: var(--radius-sm); padding: 1.5rem; position: relative;">
          <span class="payment-tag" style="position: absolute; top: 1rem; right: 1rem;">Default</span>
          <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Home / Kathmandu Residence</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            ${user.name}<br>
            ${user.address}<br>
            ${user.city}, ${user.province} Province<br>
            Postal Code: ${user.zip}<br>
            Phone: ${user.phone}
          </p>
        </div>

        <div style="background: var(--bg-surface); border: 1px dashed var(--border-light); border-radius: var(--radius-sm); padding: 1.5rem;">
          <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-muted);">Vacation / Pokhara Residence</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
            Lakeside Ward 6, Pokhara<br>
            Gandaki Province, Nepal
          </p>
          <span style="font-size: 0.75rem; color: var(--accent-rose); margin-top: 1rem; display: inline-block;">(Demo Alternate Address)</span>
        </div>
      </div>
    </div>
  `;
}

function renderSettingsTab() {
  return `
    <div>
      <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1rem;">Demo Controls</h3>
      <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 2rem;">
        Manage your client-side demonstration storage, active coupons, and reset initial test datasets.
      </p>

      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 440px;">
        <button class="btn-outline" onclick="store.resetDemoData()">
          Reset Demo to Default Seed Data
        </button>
        <button class="btn-outline" style="color: #C0392B; border-color: #E6B8B8;" onclick="store.clearCart(); showToast('Cart cleared');">
          Empty Active Shopping Bag
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBackdrop = document.getElementById('quick-view-modal');
  const modalBody = document.getElementById('quick-view-content');
  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center;">
      <div style="border-radius: var(--radius-md); overflow: hidden; background: var(--bg-subtle);">
        <img src="${resolveImagePath(product.image)}" alt="${product.name}" style="width: 100%; aspect-ratio: 4/3; object-fit: cover;" onerror="handleImageError(this, 'quick-view')" />
      </div>
      <div>
        <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--accent-rose); letter-spacing: 0.1em;">
          ${product.category}
        </span>
        <h2 style="font-family: var(--font-serif); font-size: 1.75rem; font-weight: 600; margin: 0.25rem 0 0.75rem 0;">
          ${product.name}
        </h2>
        <div style="font-size: 1.4rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 1rem;" class="tabular-nums">
          ${formatNPR(product.price)}
          ${product.originalPrice ? `<span style="font-size: 0.9rem; color: var(--text-muted); text-decoration: line-through; margin-left: 0.5rem;">${formatNPR(product.originalPrice)}</span>` : ''}
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          ${product.shortDesc}
        </p>

        <div style="display: flex; gap: 1rem;">
          <button class="btn-primary" style="flex: 1;" onclick="store.addToCart('${product.id}', '${product.variants[0]}', 1); closeQuickView();">
            Add to Bag (${formatNPR(product.price)})
          </button>
          <button class="btn-outline" onclick="closeQuickView(); navigateTo('#product-detail?id=${product.id}');">
            Full Details
          </button>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('open');
}

function closeQuickView() {
  const modalBackdrop = document.getElementById('quick-view-modal');
  if (modalBackdrop) modalBackdrop.classList.remove('open');
}

// ==========================================================================
// 7. CART DRAWER (SLIDE-OVER)
// ==========================================================================
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  if (open === undefined) {
    drawer.classList.toggle('open');
  } else if (open) {
    drawer.classList.add('open');
  } else {
    drawer.classList.remove('open');
  }

  if (drawer.classList.contains('open')) {
    updateCartDrawerContent();
  }
}

function updateCartDrawerContent() {
  const items = store.cart;
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;

  if (items.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--accent-rose); opacity: 0.5; margin-bottom: 1rem;">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.5rem;">Your Bag is Empty</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Add some luxury skincare to begin.</p>
        <button class="btn-primary" onclick="toggleCartDrawer(false); navigateTo('#shop');">Shop Now</button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  body.innerHTML = items.map(item => `
    <div style="display: flex; gap: 1rem; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
      <img src="${resolveImagePath(item.image)}" alt="${item.name}" style="width: 4rem; height: 4rem; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-light);" onerror="handleImageError(this, 'cart-drawer-item')" />
      <div style="flex: 1;">
        <h5 style="font-size: 0.88rem; font-weight: 600; margin-bottom: 0.2rem;">${item.name}</h5>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">${item.variant}</div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: 700; color: var(--accent-rose); font-size: 0.92rem;" class="tabular-nums">${formatNPR(item.price * item.quantity)}</span>
          <div class="quantity-stepper" style="height: 1.85rem;">
            <button class="qty-btn" style="width: 1.5rem; font-size: 0.9rem;" onclick="store.updateQuantity('${item.id}', '${item.variant}', -1)">−</button>
            <div class="qty-display tabular-nums" style="width: 1.85rem; font-size: 0.78rem;">${item.quantity}</div>
            <button class="qty-btn" style="width: 1.5rem; font-size: 0.9rem;" onclick="store.updateQuantity('${item.id}', '${item.variant}', 1)">+</button>
          </div>
        </div>
      </div>
      <button onclick="store.removeFromCart('${item.id}', '${item.variant}')" style="color: var(--text-muted); padding: 0.25rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  `).join('');

  const subtotal = store.getCartSubtotal();
  const subtotalDisplay = document.getElementById('drawer-subtotal-val');
  if (subtotalDisplay) subtotalDisplay.textContent = formatNPR(subtotal);
}

// ==========================================================================
// 8. HEADER BADGES & EVENT LISTENERS
// ==========================================================================
function updateHeaderBadges() {
  const cartCount = store.getCartCount();
  const wishlistCount = store.wishlist.length;

  const cartBadge = document.getElementById('header-cart-count');
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  }

  const wishBadge = document.getElementById('header-wishlist-count');
  if (wishBadge) {
    wishBadge.textContent = wishlistCount;
    wishBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  }
}

function toggleMobileMenu(open) {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!drawer) return;
  if (open === undefined) drawer.classList.toggle('open');
  else if (open) drawer.classList.add('open');
  else drawer.classList.remove('open');
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  // Update header badges
  updateHeaderBadges();

  // Listen to state events
  window.addEventListener('cart-updated', () => {
    updateHeaderBadges();
    updateCartDrawerContent();
    const { route } = parseRoute();
    if (route === 'cart') renderCartScreen();
    if (route === 'checkout') renderCheckoutScreen();
  });

  window.addEventListener('wishlist-updated', () => {
    updateHeaderBadges();
    const { route } = parseRoute();
    if (route === 'wishlist') renderWishlistScreen();
    if (route === 'home') renderHomeScreen();
    if (route === 'shop') applyShopFilters();
  });

  // Listen to hash router
  window.addEventListener('hashchange', handleRouting);

  // Initialize router
  handleRouting();

  // Global search input listener
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeShopSearch = e.target.value;
      applyShopFilters();
    });
  }

  // Global sort select listener
  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeShopSort = e.target.value;
      applyShopFilters();
    });
  }
});

// Expose state and functions to window for inline onclick handlers
window.store = store;
window.navigateTo = navigateTo;
window.toggleCartDrawer = toggleCartDrawer;
window.toggleMobileMenu = toggleMobileMenu;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.selectPdpVariant = selectPdpVariant;
window.adjustPdpQty = adjustPdpQty;
window.addCurrentPdpToCart = addCurrentPdpToCart;
window.buyNowPdp = buyNowPdp;
window.switchPdpTab = switchPdpTab;
window.switchPdpImage = switchPdpImage;
window.setCartDestination = setCartDestination;
window.handleApplyCartCoupon = handleApplyCartCoupon;
window.selectPaymentMethod = selectPaymentMethod;
window.handleProvinceChange = handleProvinceChange;
window.triggerCheckoutSubmit = triggerCheckoutSubmit;
window.handlePlaceOrder = handlePlaceOrder;
window.setFaqCategory = setFaqCategory;
window.toggleFaqItem = toggleFaqItem;
window.switchAccountTab = switchAccountTab;
window.handleContactSubmit = handleContactSubmit;
window.addAllWishlistToCart = addAllWishlistToCart;
window.resetShopFilters = resetShopFilters;
window.openReviewModal = function() {
  showToast("Thank you! Review submission portal will open for verified buyers.");
};
