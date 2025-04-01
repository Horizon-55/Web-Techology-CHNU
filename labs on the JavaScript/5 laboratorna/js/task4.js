// Реалізація сховища з використанням Map, Set, WeakMap та WeakSet
class ECommerceStore {
    constructor() {
        // Карта для зберігання товарів з ідентифікатором як ключем і даними про товар як значенням
        this.products = new Map();
        
        // Установлено для зберігання ідентифікаторів товарів, які наразі продаються
        this.featuredProducts = new Set();
        
        // WeakMap для зберігання додаткових метаданих продукту, які мають бути вилучені
        // коли продукт видалений
        this.productMetadata = new WeakMap();
        
        // WeakSet tдля слідкування продуктів та які були перегляди від користувачів
        this.viewedProducts = new WeakSet();
        
        // Map для зберігання замовлень
        this.orders = new Map();
        
        // Розрахунок здя кількості збережаних продуктів
        this.nextProductId = 1;
        this.nextOrderId = 1;
    }
    
    // Продукт менеджемент методи
    
    addProduct(name, price, quantity) {
        const id = `P${this.nextProductId++}`;
        const product = { id, name, price, quantity };
        
        // Збереження продуктів в Map
        this.products.set(id, product);
        
        // Збереження метаданих додаткових в WeakMap
        this.productMetadata.set(product, {
            createdAt: new Date(),
            lastUpdated: new Date(),
            views: 0,
            orders: 0
        });
        
        return product;
    }
    
    getProduct(id) {
        const product = this.products.get(id);
        
        if (product) {
            // Підчеркнено в перегнянуті а саме WeakSet
            this.viewedProducts.add(product);
            
            // Оновлених кількість перегнянуті в metadata
            const metadata = this.productMetadata.get(product);
            if (metadata) {
                metadata.views++;
            }
        }
        
        return product;
    }
    
    updateProduct(id, updates) {
        const product = this.products.get(id);
        
        if (!product) {
            return null;
        }
        
        // Оновлення властовості продуктів
        Object.assign(product, updates);
        
        // Оновлення метаданих!
        const metadata = this.productMetadata.get(product);
        if (metadata) {
            metadata.lastUpdated = new Date();
        }
        
        return product;
    }
    
    deleteProduct(id) {
        return this.products.delete(id);
    }
    
    searchProducts(query) {
        const results = [];
        
        for (const [id, product] of this.products) {
            if (product.name.toLowerCase().includes(query.toLowerCase())) {
                // Перевірено в перегнянутих!
                this.viewedProducts.add(product);
                
                results.push(product);
            }
        }
        
        return results;
    }
    
    getAllProducts() {
        return Array.from(this.products.values());
    }
    
    // Інші методи для менеджменту!
    
    createOrder(items) {
        const id = `O${this.nextOrderId++}`;
        const date = new Date();
        let total = 0;
        const orderItems = [];
        
        // Процес кожного речі в секції замовлення!
        for (const { productId, quantity } of items) {
            const product = this.products.get(productId);
            
            if (!product || product.quantity < quantity) {
                throw new Error(`Insufficient stock for product: ${product ? product.name : productId}`);
            }
            
            // Розрахування загальної вартості!
            const itemTotal = product.price * quantity;
            total += itemTotal;
            
            // Додавання до списку замовлень!
            orderItems.push({
                productId,
                productName: product.name,
                price: product.price,
                quantity,
                total: itemTotal
            });
            
            // Оновлення кількість замовлень!
            product.quantity -= quantity;
            
            // Оновлення замовлення кількості в metadata
            const metadata = this.productMetadata.get(product);
            if (metadata) {
                metadata.orders++;
            }
        }
        
        // Створення обєкта замовлення!
        const order = {
            id,
            date,
            items: orderItems,
            total
        };
        
        // Зберігання в замовлення Map
        this.orders.set(id, order);
        
        return order;
    }
    
    getOrder(id) {
        return this.orders.get(id);
    }
    
    getAllOrders() {
        return Array.from(this.orders.values());
    }
    
    // Аналітичні методи
    
    getAnalytics() {
        const totalProducts = this.products.size;
        const totalOrders = this.orders.size;
        
        let totalRevenue = 0;
        for (const order of this.orders.values()) {
            totalRevenue += order.total;
        }
        
        let lowStockItems = 0;
        for (const product of this.products.values()) {
            if (product.quantity < 5) {
                lowStockItems++;
            }
        }
        
        return {
            totalProducts,
            totalOrders,
            totalRevenue,
            lowStockItems
        };
    }
    
    // Основні товарні Методи
    
    addToFeatured(id) {
        this.featuredProducts.add(id);
    }
    
    removeFromFeatured(id) {
        this.featuredProducts.delete(id);
    }
    
    getFeaturedProducts() {
        const featured = [];
        
        for (const id of this.featuredProducts) {
            const product = this.products.get(id);
            if (product) {
                featured.push(product);
            }
        }
        
        return featured;
    }
    
    // Метадані
    
    getProductMetadata(product) {
        return this.productMetadata.get(product);
    }
    
    isProductViewed(product) {
        return this.viewedProducts.has(product);
    }
}

// Інціалізаця магазину
const store = new ECommerceStore();

// додавання продуктів екземплярів  (для прикладу)
store.addProduct("Smartphone XS", 899.99, 25);
store.addProduct("Wireless Earbuds", 129.99, 50);
store.addProduct("Laptop Pro", 1499.99, 15);
store.addProduct("Smart Watch", 249.99, 30);
store.addProduct("Tablet Air", 599.99, 20);

// UI Елементи
const productTableBody = document.getElementById('productTableBody');
const orderTableBody = document.getElementById('orderTableBody');
const orderItemsContainer = document.getElementById('orderItems');
const notification = document.getElementById('notification');

// Add Продуктових форм
const addProductForm = {
    nameInput: document.getElementById('productName'),
    priceInput: document.getElementById('productPrice'),
    quantityInput: document.getElementById('productQuantity'),
    addButton: document.getElementById('addProductBtn')
};

// Оновлення продуктових форм
const updateProductForm = {
    idInput: document.getElementById('updateProductId'),
    nameInput: document.getElementById('updateProductName'),
    priceInput: document.getElementById('updateProductPrice'),
    quantityInput: document.getElementById('updateProductQuantity'),
    updateButton: document.getElementById('updateProductBtn'),
    deleteButton: document.getElementById('deleteProductBtn')
};

// Пошук продуктових форм
const searchForm = {
    input: document.getElementById('searchInput'),
    button: document.getElementById('searchBtn')
};

// Замовлення форма
const orderForm = {
    itemsContainer: document.getElementById('orderItems'),
    addItemButton: document.getElementById('addOrderItemBtn'),
    createOrderButton: document.getElementById('createOrderBtn')
};

// Аналітичні Eлементи
const analytics = {
    totalProducts: document.getElementById('totalProducts'),
    totalOrders: document.getElementById('totalOrders'),
    totalRevenue: document.getElementById('totalRevenue'),
    lowStockItems: document.getElementById('lowStockItems')
};

// Помічникові Функції
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.classList.toggle('error', isError);
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function renderProductTable(products = store.getAllProducts()) {
    productTableBody.innerHTML = '';
    
    if (products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" style="text-align: center;">No products found</td>';
        productTableBody.appendChild(row);
        return;
    }
    
    for (const product of products) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${product.id}">Edit</button>
                </div>
            </td>
        `;
        
        const editBtn = row.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            selectProductForEditing(product.id);
        });
        
        productTableBody.appendChild(row);
    }
}

function renderOrderTable() {
    orderTableBody.innerHTML = '';
    const orders = store.getAllOrders();
    
    if (orders.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center;">No orders found</td>';
        orderTableBody.appendChild(row);
        return;
    }
    
    for (const order of orders) {
        const row = document.createElement('tr');
        
        // Форматування дати!
        const dateOptions = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = new Date(order.date).toLocaleDateString(undefined, dateOptions);
        
        // Формат списків продуктів
        const productsList = order.items.map(item => 
            `${item.productName} (${item.quantity})`
        ).join(', ');
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${formattedDate}</td>
            <td>${productsList}</td>
            <td>$${order.total.toFixed(2)}</td>
        `;
        
        orderTableBody.appendChild(row);
    }
}

function updateAnalytics() {
    const stats = store.getAnalytics();
    
    analytics.totalProducts.textContent = stats.totalProducts;
    analytics.totalOrders.textContent = stats.totalOrders;
    analytics.totalRevenue.textContent = `$${stats.totalRevenue.toFixed(2)}`;
    analytics.lowStockItems.textContent = stats.lowStockItems;
}

function addOrderItemRow() {
    const products = store.getAllProducts();
    
    const itemRow = document.createElement('div');
    itemRow.className = 'order-item';
    
    const select = document.createElement('select');
    select.className = 'product-select';
    
    // Add додавання різних опцій
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a product';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    // Додавання в наявності
    for (const product of products) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price.toFixed(2)} (${product.quantity} in stock)`;
        option.disabled = product.quantity === 0;
        select.appendChild(option);
    }
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1;
    quantityInput.className = 'quantity-input';
    
    const removeButton = document.createElement('button');
    removeButton.textContent = '×';
    removeButton.className = 'danger';
    removeButton.addEventListener('click', () => {
        itemRow.remove();
    });
    
    itemRow.appendChild(select);
    itemRow.appendChild(quantityInput);
    itemRow.appendChild(removeButton);
    
    orderItemsContainer.appendChild(itemRow);
}

function selectProductForEditing(id) {
    const product = store.getProduct(id);
    
    if (!product) {
        showNotification('Product not found', true);
        return;
    }
    
    updateProductForm.idInput.value = product.id;
    updateProductForm.nameInput.value = product.name;
    updateProductForm.priceInput.value = product.price;
    updateProductForm.quantityInput.value = product.quantity;
}

// Обробники подій!

// Додавання продуктів
addProductForm.addButton.addEventListener('click', () => {
    const name = addProductForm.nameInput.value.trim();
    const price = parseFloat(addProductForm.priceInput.value);
    const quantity = parseInt(addProductForm.quantityInput.value);
    
    if (!name) {
        showNotification('Product name is required', true);
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showNotification('Valid price is required', true);
        return;
    }
    
    if (isNaN(quantity) || quantity < 0) {
        showNotification('Valid quantity is required', true);
        return;
    }
    
    try {
        store.addProduct(name, price, quantity);
        showNotification('Product added successfully');
        
        // Скидання форми
        addProductForm.nameInput.value = '';
        addProductForm.priceInput.value = '';
        addProductForm.quantityInput.value = '';
        
        // Оновлення UI UI
        renderProductTable();
        updateAnalytics();
        
    } catch (error) {
        showNotification(error.message, true);
    }
});

// Оновлення продукту
updateProductForm.updateButton.addEventListener('click', () => {
    const id = updateProductForm.idInput.value;
    const price = parseFloat(updateProductForm.priceInput.value);
    const quantity = parseInt(updateProductForm.quantityInput.value);
    
    if (!id) {
        showNotification('No product selected for update', true);
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showNotification('Valid price is required', true);
        return;
    }
    
    if (isNaN(quantity) || quantity < 0) {
        showNotification('Valid quantity is required', true);
        return;
    }
    
    try {
        store.updateProduct(id, { price, quantity });
        showNotification('Product updated successfully');
        
        // Скидання форми
        updateProductForm.idInput.value = '';
        updateProductForm.nameInput.value = '';
        updateProductForm.priceInput.value = '';
        updateProductForm.quantityInput.value = '';
        
        // Оновлення UI
        renderProductTable();
        updateAnalytics();
        
    } catch (error) {
        showNotification(error.message, true);
    }
});

// Видалення продукту
updateProductForm.deleteButton.addEventListener('click', () => {
    const id = updateProductForm.idInput.value;
    
    if (!id) {
        showNotification('No product selected for deletion', true);
        return;
    }
    
    try {
        store.deleteProduct(id);
        showNotification('Product deleted successfully');
        
        // Скидання форми
        updateProductForm.idInput.value = '';
        updateProductForm.nameInput.value = '';
        updateProductForm.priceInput.value = '';
        updateProductForm.quantityInput.value = '';
        
        // Оновлення UI
        renderProductTable();
        updateAnalytics();
        
    } catch (error) {
        showNotification(error.message, true);
    }
});

// Пошук продукту
searchForm.button.addEventListener('click', () => {
    const query = searchForm.input.value.trim();
    
    if (!query) {
        renderProductTable();
        return;
    }
    
    const results = store.searchProducts(query);
    renderProductTable(results);
});

searchForm.input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchForm.button.click();
    }
    
    if (searchForm.input.value.trim() === '') {
        renderProductTable();
    }
});

// Додавання ордерів замовлень
orderForm.addItemButton.addEventListener('click', addOrderItemRow);

// Створення замовлень
orderForm.createOrderButton.addEventListener('click', () => {
    const orderItems = [];
    const productSelects = document.querySelectorAll('.product-select');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    for (let i = 0; i < productSelects.length; i++) {
        const productId = productSelects[i].value;
        const quantity = parseInt(quantityInputs[i].value);
        
        if (!productId || productId === '') {
            continue; // пропущення пустої вибірковості
        }
        
        if (isNaN(quantity) || quantity <= 0) {
            showNotification('Please enter valid quantities for all items', true);
            return;
        }
        
        orderItems.push({
            productId,
            quantity
        });
    }
    
    if (orderItems.length === 0) {
        showNotification('Please add at least one item to the order', true);
        return;
    }
    
    try {
        store.createOrder(orderItems);
        showNotification('Order created successfully');
        
        // Очищення вибіркової речей
        orderItemsContainer.innerHTML = '';
        
        // Додавання рядка
        addOrderItemRow();
        
        // Оновлення UI
        renderProductTable();
        renderOrderTable();
        updateAnalytics();
        
    } catch (error) {
        showNotification(error.message, true);
    }
});

// Інціалізація UI
function initializeUI() {
    renderProductTable();
    renderOrderTable();
    updateAnalytics();
    addOrderItemRow();
}

// Запуск інціалізації
initializeUI();