// DOM Elements
const productList = document.getElementById('product-list');
const emptyList = document.getElementById('empty-list');
const addProductBtn = document.getElementById('add-product-btn');
const modalOverlay = document.getElementById('product-modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productCategoryInput = document.getElementById('product-category');
const productImageInput = document.getElementById('product-image');
const saveProductBtn = document.getElementById('save-product');
const snackbar = document.getElementById('snackbar');
const totalPriceElement = document.getElementById('total-price');
const categoryFilters = document.getElementById('category-filters');
const resetFilterBtn = document.getElementById('reset-filter');
const sortPriceBtn = document.getElementById('sort-price');
const sortCreatedBtn = document.getElementById('sort-created');
const sortUpdatedBtn = document.getElementById('sort-updated');
const resetSortBtn = document.getElementById('reset-sort');

// Pure function to generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

 // Pure function to calculate total price
 const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
};

 // Pure function to filter products by category
 const filterProductsByCategory = (products, category) => {
    if (!category) return products;
    return products.filter(product => product.category === category);
};

// Pure function to sort products
const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price':
            return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case 'created':
            return sortedProducts.sort((a, b) => a.createdAt - b.createdAt);
        case 'updated':
            return sortedProducts.sort((a, b) => b.updatedAt - a.updatedAt);
        default:
            return sortedProducts;
    }
};

// Pure function to create product card HTML
const createProductCardHTML = (product) => {
    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-id">ID: ${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${parseFloat(product.price).toFixed(2)} ₴</div>
                <span class="product-category">${product.category}</span>
                <div class="product-actions">
                    <button class="edit-product">Edit</button>
                    <button class="danger delete-product">Delete</button>
                </div>
            </div>
        </div>
    `;
};

// Pure function to get unique categories from products
const getUniqueCategories = (products) => {
    return [...new Set(products.map(product => product.category))];
};

// Pure function to create category button HTML
const createCategoryButtonHTML = (category, activeCategory) => {
    const isActive = category === activeCategory ? 'active' : '';
    return `<button class="category-btn ${isActive}" data-category="${category}">${category}</button>`;
};

// State management
const state = {
    products: [],
    filteredProducts: [],
    activeCategory: null,
    activeSortMethod: null,
    editProductId: null
};

 // Show Snackbar/Toast
 const showSnackbar = (message, type = 'success') => {
    snackbar.textContent = message;
    snackbar.className = `snackbar ${type} show`;
    
    // After 3 seconds, remove the show class
    setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
};

// Open Modal
const openModal = (mode = 'add', productId = null) => {
    modalOverlay.classList.add('active');
    
    if (mode === 'edit' && productId) {
        const product = state.products.find(p => p.id === productId);
        if (product) {
            modalTitle.textContent = 'Edit Product';
            productIdInput.value = product.id;
            productNameInput.value = product.name;
            productPriceInput.value = product.price;
            productCategoryInput.value = product.category;
            productImageInput.value = product.image;
            state.editProductId = productId;
        }
    } else {
        modalTitle.textContent = 'Add New Product';
        productForm.reset();
        productIdInput.value = '';
        state.editProductId = null;
    }
};

// Close Modal
const closeModal = () => {
    modalOverlay.classList.remove('active');
    productForm.reset();
};

 // Render products
 const renderProducts = () => {
    // Update total price
    totalPriceElement.textContent = calculateTotalPrice(state.products);
    
    // Get filtered and sorted products
    let displayProducts = state.activeCategory 
        ? filterProductsByCategory(state.products, state.activeCategory) 
        : state.products;
        
    if (state.activeSortMethod) {
        displayProducts = sortProducts(displayProducts, state.activeSortMethod);
    }
    
    // Check if there are products to display
    if (state.products.length === 0) {
        emptyList.style.display = 'block';
        productList.innerHTML = '';
        productList.appendChild(emptyList);
    } else {
        emptyList.style.display = 'none';
        
        // Create HTML for all products
        const productsHTML = displayProducts.map(product => createProductCardHTML(product)).join('');
        
        // Replace existing content with new products
        productList.innerHTML = productsHTML;
        
        // Add event listeners to the edit and delete buttons
        const editBtns = document.querySelectorAll('.edit-product');
        const deleteBtns = document.querySelectorAll('.delete-product');
        
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.id;
                openModal('edit', productId);
            });
        });
        
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.id;
                const productIndex = state.products.findIndex(p => p.id === productId);
                
                if (productIndex !== -1) {
                    const deletedProduct = state.products[productIndex];
                    state.products.splice(productIndex, 1);
                    renderProducts();
                    renderCategoryFilters();
                    showSnackbar(`Product "${deletedProduct.name}" (ID: ${deletedProduct.id}) has been deleted.`);
                }
            });
        });
    }
};

// Render category filters
const renderCategoryFilters = () => {
    const categories = getUniqueCategories(state.products);
    
    if (categories.length === 0) {
        categoryFilters.innerHTML = '<p>No categories available</p>';
        return;
    }
    
    const categoryButtonsHTML = categories.map(category => 
        createCategoryButtonHTML(category, state.activeCategory)
    ).join('');
    
    categoryFilters.innerHTML = categoryButtonsHTML;
    
    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            
            // Toggle active class
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            state.activeCategory = category;
            renderProducts();
        });
    });
};

// Initialize the application
const init = () => {
    // Event Listeners
    addProductBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productData = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            image: productImageInput.value
        };
        
        if (state.editProductId) {
            // Edit existing product
            const productIndex = state.products.findIndex(p => p.id === state.editProductId);
            
            if (productIndex !== -1) {
                const updatedProduct = {
                    ...state.products[productIndex],
                    ...productData,
                    updatedAt: Date.now()
                };
                
                state.products[productIndex] = updatedProduct;
                showSnackbar(`Product "${updatedProduct.name}" (ID: ${updatedProduct.id}) has been updated.`);
            }
        } else {
            // Add new product
            const newProduct = {
                id: generateId(),
                ...productData,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            
            state.products.push(newProduct);
            showSnackbar(`Product "${newProduct.name}" has been added.`);
        }
        
        closeModal();
        renderProducts();
        renderCategoryFilters();
    });
    
    // Reset filter button
    resetFilterBtn.addEventListener('click', () => {
        state.activeCategory = null;
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        renderProducts();
    });
    
    // Sort buttons
    sortPriceBtn.addEventListener('click', () => {
        state.activeSortMethod = 'price';
        renderProducts();
    });
    
    sortCreatedBtn.addEventListener('click', () => {
        state.activeSortMethod = 'created';
        renderProducts();
    });
    
    sortUpdatedBtn.addEventListener('click', () => {
        state.activeSortMethod = 'updated';
        renderProducts();
    });
    
    resetSortBtn.addEventListener('click', () => {
        state.activeSortMethod = null;
        renderProducts();
    });
    
    // Initial render
    renderProducts();
    renderCategoryFilters();
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);