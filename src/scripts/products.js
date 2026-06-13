// ============================================
// PRODUCT PAGE SCRIPT
// ============================================

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initProductPage();
    }, 500);
});

function initProductPage() {
    const productId = getQueryParam('id');
    if (!productId) {
        console.error('No product ID provided');
        return;
    }

    currentProduct = findById(state.products, productId);
    if (!currentProduct) {
        console.error('Product not found');
        document.getElementById('product-title').textContent = 'Product not found';
        return;
    }

    renderProductDetails();
    renderCreatorInfo();
    renderRelatedProducts();
    attachProductActions();
}

// ============================================
// RENDER PRODUCT DETAILS
// ============================================

function renderProductDetails() {
    const breadcrumb = document.getElementById('breadcrumb-title');
    if (breadcrumb) breadcrumb.textContent = currentProduct.title;

    document.getElementById('product-image').src = currentProduct.image || '/public/assets/placeholder.png';
    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('product-description').textContent = currentProduct.description;
    document.getElementById('product-price').textContent = formatCurrency(currentProduct.price);
    document.getElementById('product-category').textContent = currentProduct.category;
    document.getElementById('product-rating').textContent = currentProduct.rating || 4.5;

    document.title = `${currentProduct.title} - Soulful Media World`;

    const includesList = document.getElementById('includes-list');
    if (currentProduct.includes && Array.isArray(currentProduct.includes)) {
        includesList.innerHTML = currentProduct.includes
            .map(item => `<li>${item}</li>`)
            .join('');
    }
}

// ============================================
// RENDER CREATOR INFO
// ============================================

function renderCreatorInfo() {
    const creatorContainer = document.getElementById('creator-info');
    if (!creatorContainer || !currentProduct.creatorId) return;

    const creator = findById(state.creators, currentProduct.creatorId);
    if (!creator) return;

    creatorContainer.innerHTML = `
        <div class="creator-avatar">
            <img src="${creator.avatar || '/public/assets/avatar-placeholder.png'}" alt="${creator.name}" />
        </div>
        <div class="creator-info">
            <h3>${creator.name}</h3>
            <p>${creator.bio}</p>
            <div class="creator-links">
                ${creator.website ? `<a href="${creator.website}" target="_blank" class="btn btn-sm">Website</a>` : ''}
                ${creator.twitter ? `<a href="${creator.twitter}" target="_blank" class="btn btn-sm">Twitter</a>` : ''}
            </div>
        </div>
    `;
}

// ============================================
// RENDER RELATED PRODUCTS
// ============================================

function renderRelatedProducts() {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;

    const related = state.products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found</p>';
        return;
    }

    relatedContainer.innerHTML = related.map(product => createProductCard(product)).join('');
}

// ============================================
// PRODUCT ACTIONS
// ============================================

function attachProductActions() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const wishlistBtn = document.getElementById('wishlist-btn');

    if (addToCartBtn) addToCartBtn.addEventListener('click', addToCart);
    if (buyNowBtn) buyNowBtn.addEventListener('click', proceedToCheckout);
    if (wishlistBtn) wishlistBtn.addEventListener('click', toggleWishlist);
}

function addToCart() {
    if (!state.cart.find(item => item.id === currentProduct.id)) {
        state.cart.push(currentProduct);
        updateCartCount();
        alert(`${currentProduct.title} added to cart!`);
    } else {
        alert('Item already in cart');
    }
}

function proceedToCheckout() {
    if (!state.cart.find(item => item.id === currentProduct.id)) {
        state.cart.push(currentProduct);
    }
    window.location.href = 'checkout.html';
}

function toggleWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn.classList.contains('active')) {
        wishlistBtn.classList.remove('active');
        wishlistBtn.textContent = '♡ Wishlist';
    } else {
        wishlistBtn.classList.add('active');
        wishlistBtn.textContent = '♥ Wishlist';
    }
}