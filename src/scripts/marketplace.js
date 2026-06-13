// ============================================
// MARKETPLACE PAGE SCRIPT
// ============================================

let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12;

if (document.body.contains(document.getElementById('products-container'))) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initMarketplace();
        }, 500);
    });
}

// ============================================
// MARKETPLACE INITIALIZATION
// ============================================

function initMarketplace() {
    filteredProducts = [...state.products];
    renderProducts();
    attachEventListeners();
}

// ============================================
// RENDER PRODUCTS
// ============================================

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No products found</h2>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        renderPagination();
        return;
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIdx, endIdx);

    container.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
    renderPagination();
}

// ============================================
// PAGINATION
// ============================================

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    let paginationHTML = '';

    if (currentPage > 1) {
        paginationHTML += `<button onclick="prevPage()">← Previous</button>`;
    } else {
        paginationHTML += `<button onclick="prevPage()" disabled>← Previous</button>`;
    }

    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    startPage = Math.max(1, endPage - maxButtons + 1);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="active" onclick="goToPage(${i})">${i}</button>`;
        } else {
            paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
        }
    }

    if (currentPage < totalPages) {
        paginationHTML += `<button onclick="nextPage()">Next →</button>`;
    } else {
        paginationHTML += `<button onclick="nextPage()" disabled>Next →</button>`;
    }

    paginationContainer.innerHTML = paginationHTML;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        window.scrollTo(0, 0);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        window.scrollTo(0, 0);
    }
}

function goToPage(page) {
    currentPage = page;
    renderProducts();
    window.scrollTo(0, 0);
}

// ============================================
// FILTERING & SEARCH
// ============================================

function attachEventListeners() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (searchInput) searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applySorting);
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase();

    filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    currentPage = 1;
    renderProducts();
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;

    filteredProducts = state.products.filter(product => {
        if (categoryFilter && product.category !== categoryFilter) return false;
        return true;
    });

    currentPage = 1;
    renderProducts();
}

function applySorting() {
    const sortFilter = document.getElementById('sort-filter').value;

    switch (sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'latest':
        default:
            filteredProducts.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    currentPage = 1;
    renderProducts();
}