// Base de dados dos produtos
const PRODUCTS_DATABASE = [
    {
        id: "quinoa-organica-premium-001",
        name: "Quinoa Orgânica Premium Andina",
        description: "Quinoa orgânica de alta qualidade importada dos Andes, rica em proteínas completas, aminoácidos essenciais e minerais. Ideal para dietas veganas e vegetarianas.",
        price: 24.90,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.8,
        reviews: 127,
        inStock: true,
        tags: ["premium", "proteína", "vegano", "sem-glúten", "superfood"]
    },
    {
        id: "alface-organica-crespa-002",
        name: "Alface Orgânica Crespa Verde",
        description: "Alface crespa fresca cultivada sem pesticidas em estufa climatizada, colhida diariamente para garantir máximo frescor e crocância. Rica em vitaminas A e K.",
        price: 4.50,
        category: "verduras",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        tags: ["fresco", "hidropônico", "vitaminas", "baixa-caloria", "crocante"]
    },
    {
        id: "tomate-organico-italiano-003",
        name: "Tomate Orgânico Italiano Rasteiro",
        description: "Tomates orgânicos da variedade italiana cultivados ao ar livre, suculentos e aromáticos. Perfeitos para saladas, molhos e conservas caseiras.",
        price: 8.90,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        tags: ["italiano", "suculento", "molhos", "antioxidante", "licopeno"]
    },
    {
        id: "arroz-integral-cateto-004",
        name: "Arroz Integral Cateto Paranaense",
        description: "Arroz integral da variedade cateto cultivado tradicionalmente no Paraná. Grãos longos e aromáticos, fonte de fibras, vitaminas do complexo B e minerais essenciais.",
        price: 12.90,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.5,
        reviews: 203,
        inStock: true,
        tags: ["tradicional", "fibras", "complexo-b", "energético", "versátil"]
    },
    {
        id: "espinafre-organico-baby-005",
        name: "Espinafre Orgânico Baby Leaves",
        description: "Espinafre baby leaves orgânico, folhas tenras e saborosas colhidas jovens. Rico em ferro, ácido fólico e antioxidantes. Ideal para saladas gourmet.",
        price: 6.90,
        category: "verduras",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.9,
        reviews: 78,
        inStock: true,
        tags: ["baby-leaves", "ferro", "ácido-fólico", "gourmet", "antioxidante"]
    },
    {
        id: "cenoura-organica-nantes-006",
        name: "Cenoura Orgânica Nantes Doce",
        description: "Cenouras orgânicas da variedade Nantes, doces e crocantes com formato cilíndrico perfeito. Ricas em betacaroteno e fibras. Ideais para sucos e pratos infantis.",
        price: 5.90,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.6,
        reviews: 142,
        inStock: true,
        tags: ["doce", "betacaroteno", "crocante", "infantil", "sucos"]
    },
    {
        id: "feijao-preto-organico-007",
        name: "Feijão Preto Orgânico Premium",
        description: "Feijão preto orgânico selecionado, grãos uniformes e de alta qualidade. Rico em proteínas vegetais, fibras e antioxidantes. Tradicional da culinária brasileira.",
        price: 9.90,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.4,
        reviews: 167,
        inStock: true,
        tags: ["tradicional", "proteína-vegetal", "antioxidantes", "brasileiro", "nutritivo"]
    },
    {
        id: "rucula-organica-selvagem-008",
        name: "Rúcula Orgânica Selvagem Picante",
        description: "Rúcula orgânica selvagem com sabor intenso e levemente picante. Folhas pequenas e aromáticas, perfeitas para saladas sofisticadas e pizzas gourmet.",
        price: 5.50,
        category: "verduras",
        image: "https://images.unsplash.com/photo-1616484474306-5d29da8f5b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.7,
        reviews: 92,
        inStock: true,
        tags: ["picante", "aromática", "gourmet", "pizza", "sofisticada"]
    },
    {
        id: "abobrinha-organica-italiana-009",
        name: "Abobrinha Orgânica Italiana Verde",
        description: "Abobrinhas orgânicas da variedade italiana, tenras e saborosas com casca comestível. Baixas em calorias e versáteis na cozinha. Colhidas no ponto ideal.",
        price: 7.90,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.5,
        reviews: 118,
        inStock: true,
        tags: ["italiana", "baixa-caloria", "versátil", "casca-comestível", "tenra"]
    },
    {
        id: "granola-organica-artesanal-010",
        name: "Granola Orgânica Artesanal Crocante",
        description: "Granola artesanal com aveia, castanhas, frutas secas e mel orgânico. Assada lentamente para máxima crocância. Rica em fibras e energia natural.",
        price: 18.90,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.8,
        reviews: 189,
        inStock: true,
        tags: ["artesanal", "crocante", "energia", "mel", "café-da-manhã"]
    },
    {
        id: "couve-organica-manteiga-011",
        name: "Couve Orgânica Manteiga Gigante",
        description: "Couve manteiga orgânica de folhas grandes e tenras, cultivada tradicionalmente. Excelente fonte de vitaminas A, C e K, cálcio e ferro. Ideal para refogados.",
        price: 4.90,
        category: "verduras",
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.6,
        reviews: 134,
        inStock: true,
        tags: ["tradicional", "folhas-grandes", "refogado", "cálcio", "ferro"]
    },
    {
        id: "beterraba-organica-detroit-012",
        name: "Beterraba Orgânica Detroit Doce",
        description: "Beterrabas orgânicas da variedade Detroit, formato redondo perfeito e cor vermelha intensa. Doces e nutritivas, ricas em antioxidantes e nitrato natural.",
        price: 6.50,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1568584711271-98a1c95eaa1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        rating: 4.4,
        reviews: 108,
        inStock: true,
        tags: ["detroit", "antioxidantes", "nitrato", "doce", "redonda"]
    }
];

// Estado da aplicação
let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let selectedProduct = null;
let detailQuantity = 1;

// Estado de autenticação
let currentUser = null;
let isLoggedIn = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartBadge();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('outono-dourado-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }
    
    // Load user from localStorage
    const savedUser = localStorage.getItem('outono-dourado-user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateAuthUI();
    }
    
    // Welcome message
    setTimeout(() => {
        if (isLoggedIn) {
            showToast(`Bem-vindo de volta, ${currentUser.name}!`, 'Que bom ter você aqui novamente.', 'success');
        } else {
            showToast('Bem-vindo à Outono Dourado!', 'Descubra nossos produtos orgânicos frescos.', 'success');
        }
    }, 1000);
});

// Utility functions
function showToast(title, message, type = 'info') {
    const toaster = document.getElementById('toaster');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
        <div style="font-size: 14px; color: #6b7280;">${message}</div>
    `;
    
    toaster.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('open');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.remove('open');
}

// Product functions
function loadProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filteredProducts = PRODUCTS_DATABASE.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: #6b7280; font-size: 1.125rem;">Nenhum produto encontrado</p>
                <button class="btn-primary" onclick="clearFilters()" style="margin-top: 1rem;">
                    Limpar Filtros
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card fade-in" onclick="openProductDetail('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    <div class="product-badge">
                        <i data-lucide="leaf"></i>
                        Orgânico
                    </div>
                </div>
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                        <i data-lucide="shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for new content
    lucide.createIcons();
}

function getCategoryName(category) {
    const categoryNames = {
        'alimentos': 'Alimentos',
        'verduras': 'Verduras',
        'legumes': 'Legumes'
    };
    return categoryNames[category] || category;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star" style="color: #d1d5db;">★</span>';
        }
    }
    return stars;
}

function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    loadProducts();
}

function searchProducts() {
    const searchInput = document.getElementById('product-search');
    searchQuery = searchInput.value;
    loadProducts();
}

function clearFilters() {
    currentFilter = 'all';
    searchQuery = '';
    
    document.getElementById('product-search').value = '';
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn').classList.add('active');
    
    loadProducts();
}

// Cart functions
function addToCart(productId) {
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showToast('Produto Atualizado!', `${product.name} - Quantidade atualizada no carrinho`, 'success');
    } else {
        cart.push({ ...product, quantity: 1 });
        showToast('Produto Adicionado!', `${product.name} foi adicionado ao carrinho`, 'success');
    }
    
    updateCartBadge();
    saveCartToStorage();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = itemCount;
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
}

function saveCartToStorage() {
    localStorage.setItem('outono-dourado-cart', JSON.stringify(cart));
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'flex';
    loadCartItems();
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i data-lucide="shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
                <button class="btn-primary" onclick="closeCart()">
                    Continuar Comprando
                </button>
            </div>
        `;
        cartTotal.style.display = 'none';
        lucide.createIcons();
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remover</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-amount').textContent = `R$ ${total.toFixed(2)}`;
    cartTotal.style.display = 'block';
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartBadge();
        saveCartToStorage();
        loadCartItems();
    }
}

function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        showToast('Produto Removido', `${item.name} foi removido do carrinho`, 'success');
        updateCartBadge();
        saveCartToStorage();
        loadCartItems();
    }
}

function checkout() {
    if (cart.length === 0) return;
    
    showToast('Redirecionando...', 'Você será direcionado para o pagamento seguro', 'info');
    
    setTimeout(() => {
        cart = [];
        updateCartBadge();
        saveCartToStorage();
        closeCart();
        showToast('Pedido Realizado!', 'Você receberá um e-mail de confirmação em breve', 'success');
    }, 2000);
}

// Product detail modal
function openProductDetail(productId) {
    selectedProduct = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!selectedProduct) return;
    
    const modal = document.getElementById('product-detail-modal');
    const title = document.getElementById('product-detail-title');
    const img = document.getElementById('product-detail-img');
    const description = document.getElementById('product-detail-description');
    const price = document.getElementById('product-detail-price-value');
    
    title.textContent = selectedProduct.name;
    img.src = selectedProduct.image;
    img.alt = selectedProduct.name;
    description.textContent = selectedProduct.description;
    price.textContent = `R$ ${selectedProduct.price.toFixed(2)}`;
    
    detailQuantity = 1;
    document.getElementById('detail-quantity').textContent = detailQuantity;
    
    modal.style.display = 'flex';
}

function closeProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    modal.style.display = 'none';
    selectedProduct = null;
}

function increaseQuantity() {
    detailQuantity++;
    document.getElementById('detail-quantity').textContent = detailQuantity;
}

function decreaseQuantity() {
    if (detailQuantity > 1) {
        detailQuantity--;
        document.getElementById('detail-quantity').textContent = detailQuantity;
    }
}

function addToCartFromDetail() {
    if (!selectedProduct) return;
    
    for (let i = 0; i < detailQuantity; i++) {
        addToCart(selectedProduct.id);
    }
    
    closeProductDetail();
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate form submission
    showToast('Mensagem Enviada!', 'Entraremos em contato em breve.', 'success');
    
    // Reset form
    event.target.reset();
}

// Close modals on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCart();
        closeProductDetail();
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// ========================
// AUTHENTICATION SYSTEM
// ========================

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    
    if (isLoggedIn && currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = currentUser.name.split(' ')[0]; // First name only
    } else {
        authButtons.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Modal functions
function openLoginModal() {
    closeAllModals();
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function openRegisterModal() {
    closeAllModals();
    document.getElementById('register-modal').style.display = 'flex';
}

function closeRegisterModal() {
    document.getElementById('register-modal').style.display = 'none';
}

function openForgotPasswordModal() {
    closeAllModals();
    document.getElementById('forgot-password-modal').style.display = 'flex';
}

function closeForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

function openProfileModal() {
    closeAllModals();
    loadUserProfile();
    document.getElementById('profile-modal').style.display = 'flex';
}

function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
}

function openChangePasswordModal() {
    closeProfileModal();
    document.getElementById('change-password-modal').style.display = 'flex';
}

function closeChangePasswordModal() {
    document.getElementById('change-password-modal').style.display = 'none';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// User dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('user-menu');
    const dropdown = document.getElementById('user-dropdown');
    
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('open');
    }
});

// Password visibility toggle
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 3) {
        feedback = 'Senha fraca - Use mais caracteres';
        return { strength: 'weak', feedback };
    } else if (strength < 4) {
        feedback = 'Senha média - Adicione números ou símbolos';
        return { strength: 'medium', feedback };
    } else {
        feedback = 'Senha forte';
        return { strength: 'strong', feedback };
    }
}

// Update password strength indicator
function updatePasswordStrength(inputId, strengthId) {
    const input = document.getElementById(inputId);
    const strengthDiv = document.getElementById(strengthId);
    
    if (!input || !strengthDiv) return;
    
    const password = input.value;
    if (password.length === 0) {
        strengthDiv.textContent = '';
        strengthDiv.className = 'password-strength';
        return;
    }
    
    const result = checkPasswordStrength(password);
    strengthDiv.textContent = result.feedback;
    strengthDiv.className = `password-strength ${result.strength}`;
}

// Add event listeners for password strength
document.addEventListener('DOMContentLoaded', function() {
    const registerPassword = document.getElementById('register-password');
    const newPassword = document.getElementById('new-password');
    
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            updatePasswordStrength('register-password', 'password-strength');
        });
    }
    
    if (newPassword) {
        newPassword.addEventListener('input', function() {
            updatePasswordStrength('new-password', 'new-password-strength');
        });
    }
});

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Simulate login process
    showToast('Fazendo login...', 'Verificando suas credenciais', 'info');
    
    setTimeout(() => {
        // Simulate successful login
        const user = {
            id: 'user_' + Date.now(),
            name: 'João Silva', // In a real app, this would come from the server
            email: email,
            phone: '',
            address: '',
            registeredAt: new Date().toISOString()
        };
        
        currentUser = user;
        isLoggedIn = true;
        
        // Save to localStorage
        localStorage.setItem('outono-dourado-user', JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem('outono-dourado-remember', 'true');
        }
        
        updateAuthUI();
        closeLoginModal();
        
        showToast('Login realizado!', `Bem-vindo, ${user.name}!`, 'success');
        
        // Reset form
        event.target.reset();
    }, 1500);
}

// Handle register
function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const acceptTerms = document.getElementById('accept-terms').checked;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validation
    if (password !== confirmPassword) {
        showToast('Erro', 'As senhas não coincidem', 'error');
        return;
    }
    
    if (!acceptTerms) {
        showToast('Erro', 'Você deve aceitar os termos de uso', 'error');
        return;
    }
    
    // Simulate registration process
    showToast('Criando conta...', 'Processando seus dados', 'info');
    
    setTimeout(() => {
        const user = {
            id: 'user_' + Date.now(),
            name: name,
            email: email,
            phone: phone,
            address: '',
            newsletter: newsletter,
            registeredAt: new Date().toISOString()
        };
        
        currentUser = user;
        isLoggedIn = true;
        
        // Save to localStorage
        localStorage.setItem('outono-dourado-user', JSON.stringify(user));
        
        updateAuthUI();
        closeRegisterModal();
        
        showToast('Conta criada!', `Bem-vindo à Outono Dourado, ${user.name}!`, 'success');
        
        // Reset form
        event.target.reset();
    }, 2000);
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    showToast('Enviando e-mail...', 'Aguarde um momento', 'info');
    
    setTimeout(() => {
        showToast('E-mail enviado!', 'Verifique sua caixa de entrada para redefinir sua senha', 'success');
        closeForgotPasswordModal();
        event.target.reset();
    }, 1500);
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-email').value = currentUser.email || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
    document.getElementById('profile-address').value = currentUser.address || '';
}

// Handle profile update
function handleProfileUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    
    // Update user data
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    
    // Save to localStorage
    localStorage.setItem('outono-dourado-user', JSON.stringify(currentUser));
    
    updateAuthUI();
    showToast('Perfil atualizado!', 'Suas informações foram salvas', 'success');
}

// Handle change password
function handleChangePassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');
    
    // Validation
    if (newPassword !== confirmNewPassword) {
        showToast('Erro', 'As novas senhas não coincidem', 'error');
        return;
    }
    
    // Simulate password change
    showToast('Alterando senha...', 'Processando solicitação', 'info');
    
    setTimeout(() => {
        showToast('Senha alterada!', 'Sua senha foi atualizada com sucesso', 'success');
        closeChangePasswordModal();
        event.target.reset();
    }, 1500);
}

// Show order history
function showOrderHistory() {
    showToast('Meus Pedidos', 'Funcionalidade em desenvolvimento', 'info');
}

// Logout
function logout() {
    showToast('Saindo...', 'Até logo!', 'info');
    
    setTimeout(() => {
        currentUser = null;
        isLoggedIn = false;
        
        // Clear localStorage
        localStorage.removeItem('outono-dourado-user');
        localStorage.removeItem('outono-dourado-remember');
        
        updateAuthUI();
        showToast('Logout realizado!', 'Volte sempre!', 'success');
    }, 1000);
}

// Enhanced add to cart with login check
function addToCartEnhanced(productId) {
    if (!isLoggedIn) {
        showToast('Login necessário', 'Faça login para adicionar produtos ao carrinho', 'warning');
        setTimeout(() => {
            openLoginModal();
        }, 1000);
        return;
    }
    
    addToCart(productId);
}

// Enhanced checkout with login check
function checkoutEnhanced() {
    if (!isLoggedIn) {
        showToast('Login necessário', 'Faça login para finalizar sua compra', 'warning');
        setTimeout(() => {
            openLoginModal();
        }, 1000);
        return;
    }
    
    checkout();
}
