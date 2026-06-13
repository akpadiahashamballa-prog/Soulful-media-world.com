// ============================================
// SOULFUL MEDIA WORLD - MAIN APPLICATION
// ============================================

const CONFIG = {
    apiBase: '',
    dataPath: '/data/',
    assetsPath: '/public/assets/',
};

const state = {
    products: [],
    signals: [],
    creators: [],
    cart: [],
};

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    loadData();
});

// ============================================
// DATA MANAGEMENT
// ============================================

async function loadData() {
    try {
        const [productsRes, signalsRes, creatorsRes] = await Promise.all([
            fetch(CONFIG.dataPath + 'products.json'),
            fetch(CONFIG.dataPath + 'signals.json'),
            fetch(CONFIG.dataPath + 'creators.json'),
        ]);

        state.products = await productsRes.json();
        state.signals = await signalsRes.json();
        state.creators = await creatorsRes.json();

        if (document.getElementById('featured-products')) {
            renderFeaturedProducts();
        }

        if (document.getElementById('featured-signals')) {
            renderFeaturedSignals();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ============================================
// NAVBAR COMPONENT
// ============================================

function renderNavbar() {
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    const navHTML = `
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="navbar-brand">Soulful Media</a>
                <ul class="navbar-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="marketplace.html">Marketplace</a></li>
                    <li><a href="about.html">About</a></li>
                </ul>
                <div class="navbar-actions">
                    <a href="marketplace.html" class="btn btn-sm">Browse</a>
                    <span id="cart-count" class="badge">0</span>
                </div>
            </nav>
        </div>
    `;
    navContainer.innerHTML = navHTML;
}

// ============================================
// FOOTER COMPONENT
// ============================================

function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About</h3>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Products</h3>
                    <ul>
                        <li><a href="marketplace.html">Marketplace</a></li>
                        <li><a href="#">Courses</a></li>
                        <li><a href="#">Templates</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Creators</h3>
                    <ul>
                        <li><a href="#">Join as Creator</a></li>
                        <li><a href="#">Resources</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect</h3>
                    <ul>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Discord</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Soulful Media World. All rights reserved.</p>
            </div>
        </div>
    `;
    footerContainer.innerHTML = footerHTML;
}

// ============================================
// FEATURED PRODUCTS
// ============================================

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = state.products.slice(0, 4);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// ============================================
// FEATURED SIGNALS
// ============================================

function renderFeaturedSignals() {
    const container = document.getElementById('featured-signals');
    if (!container) return;

    const featured = state.signals.slice(0, 3);
    container.innerHTML = featured.map(signal => createSignalCard(signal)).join('');
}

// ============================================
// PRODUCT CARD COMPONENT
// ============================================

function createProductCard(product) {
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image || CONFIG.assetsPath + 'placeholder.png'}" alt="${product.title}" />
            </div>
            <div class="product-body">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-footer">
                    <span class="product-rating">⭐ ${product.rating || 4.5}</span>
                    <a href="product.html?id=${product.id}" class="btn btn-sm">View</a>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// SIGNAL CARD COMPONENT
// ============================================

function createSignalCard(signal) {
    return `
        <div class="signal-card" onclick="viewSignal(${signal.id})">
            <h3 class="signal-title">${signal.title}</h3>
            <p class="signal-timestamp">${new Date(signal.timestamp).toLocaleDateString()}</p>
            <p class="signal-content">${signal.content.substring(0, 100)}...</p>
            <a href="signal.html?id=${signal.id}" class="btn btn-sm">Read More</a>
        </div>
    `;
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function viewSignal(signalId) {
    window.location.href = `signal.html?id=${signalId}`;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function findById(array, id) {
    return array.find(item => item.id == id);
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = state.cart.length;
    }
}