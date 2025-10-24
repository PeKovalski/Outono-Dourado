

// Base de dados dos produtos
const PRODUCTS_DATABASE = [
    {



        id: "Milho",
        name: "Milho Premium",
        description: "Milho orgânico cultivado de forma sustentável, sem pesticidas, colhido fresquinho, Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico",
        price: 24.90,
        category: "Legumes",
        image: "milho.jpeg",
        rating: 4.8,
        reviews: 127,
        inStock: true,
        tags: ["premium", "proteína", "vegano", "sem-glúten", "superfood",]
    },
    {
        id: "alface-organica-crespa-002",
        name: "Alface Orgânica Crespa Verde",
        description: "Alface crespa fresca cultivada sem pesticidas em estufa climatizada, colhida diariamente para garantir máximo frescor e crocância. Rica em vitaminas A e K.",
        price: 4.50,
        category: "Verduras",
        image: "alface.jpeg",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        tags: ["fresco", "verduras", "hidropônico", "vitaminas", "baixa-caloria", "crocante", "Verduras"]
    },
    {
        id: "Tomate",
        name: "Tomate Orgânico Fresco",
        description: "Tomates orgânicos da variedade italiana cultivados ao ar livre, suculentos e aromáticos. Perfeitos para saladas, molhos e conservas caseiras.",
        price: 8.90,
        category: "Frutas",
        image: "tomate.jpeg",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        tags: ["italiano", "suculento", "molhos", "antioxidante", "licopeno"]
    },
    {
        id: "Abóbora Orgânica Premium",
        name: "Abóbora Orgânica Premium",
        description: "Abóboras orgânicas selecionadas, cultivadas sem agrotóxicos, ideais para receitas saudáveis. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 12.90,
        category: "Legumes",
        image: "abobora.jpeg",
        rating: 4.5,
        reviews: 203,
        inStock: true,
        tags: ["tradicional", "fibras", "complexo-b", "energético", "versátil"]
    },
    {
        id: "Castanhas Orgânicas Premium-005",
        name: "Castanhas Orgânicas Premium",
        description: "Castanhas doces e saborosas, colhidas no outono, ricas em nutrientes e energia. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico. ",
        price: 6.90,
        category: "Frutas",
        image: "castanha.jpeg",
        rating: 4.9,
        reviews: 78,
        inStock: true,
        tags: ["baby-leaves", "ferro", "ácido-fólico", "gourmet", "antioxidante"]
    },
    {
        id: "Cenoura Premium",
        name: "Cenoura Orgânica Nantes Doce",
        description: "Cenouras orgânicas da variedade Nantes, doces e crocantes com formato cilíndrico perfeito. Ricas em betacaroteno e fibras. Ideais para sucos e pratos infantis.",
        price: 5.90,
        category: "Verduras",
        image: "cenouras.jpeg",
        rating: 4.6,
        reviews: 142,
        inStock: true,
        tags: ["doce", "verduras", "betacaroteno", "crocante", "infantil", "sucos"]
    },
    {
        id: "Uvas Orgânicas Premium-007",
        name: "Uvas Orgânicas Premium",
        description: " Uvas selecionadas de vinhedos orgânicos, doces e suculentas, ricas em antioxidantes. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico",
        price: 9.90,
        category: "Frutas",
        image: "uva.jpeg",
        rating: 4.4,
        reviews: 167,
        inStock: true,
        tags: ["tradicional", "proteína-vegetal", "antioxidantes", "brasileiro", "nutritivo"]
    },
    {
        id: "Laranjas Orgânicas Premium-008",
        name: "Laranjas Orgânicas Premium",
        description: "Laranjas suculentas e doces, cultivadas organicamente, ricas em vitamina C. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico. ",
        price: 5.50,
        category: "frutas",
        image: "laranja.jpeg",
        rating: 4.7,
        reviews: 92,
        inStock: true,
        tags: ["picante", "aromática", "gourmet", "pizza", "sofisticada"]
    },
    {
        id: "Brócolis Orgânico Fresco-009",
        name: "Brócolis Orgânico Fresco",
        description: "Brócolis orgânico fresco, rico em vitaminas e minerais, cultivado sem agrotóxicos. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico. ",
        price: 7.90,
        category: "legumes",
        image: "brocolis.jpeg",
        rating: 4.5,
        reviews: 118,
        inStock: true,
        tags: ["italiana", "baixa-caloria", "versátil", "casca-comestível", "tenra"]
    },
    {
        id: "Batata Orgânicas Premium-010",
        name: "Batata Orgânicas Premium",
        description: "Batatas orgânicas frescas, cultivadas naturalmente sem agrotóxicos, ideais para diversos pratos. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico. ",
        price: 18.90,
        category: "legumes",
        image: "batata.jpeg",
        rating: 4.8,
        reviews: 189,
        inStock: true,
        tags: ["artesanal", "crocante", "energia", "mel", "café-da-manhã"]
    },
    {
        id: "Batata Doce Premim-011",
        name: "Batata Doce Orgânica Premium",
        description: "Batata doce orgânica naturalmente doce, rica em vitaminas e fibras, cultivada sem pesticidas. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 4.90,
        category: "Legumes",
        image: "batatadoce.jpeg",
        rating: 4.6,
        reviews: 134,
        inStock: true,
        tags: ["tradicional", "folhas-grandes", "refogado", "cálcio", "ferro"]
    },
    {
        id: "Maçã Orgânica Premium-012",
        name: "Maçã Orgânica Premium",
        description: "Maçãs vermelhas selecionadas, cultivadas organicamente, doces e crocantes. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico. ",
        price: 6.50,
        category: "Frutas",
        image: "maça.jpeg",
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
let isAdmin = false;

// Credenciais de administrador (em um sistema real, isso seria validado no servidor)
const ADMIN_CREDENTIALS = {
    email: 'admin@outonodourado.com.br',
    password: 'admin123'
};

// Estado do mascote
let mascotMessages = [
  "Olá! Eu sou o Milhito🌽!",
  "Sou primo do verdeco! Nossas empressas são socias! 🥬",
  "NOSSOS PRODUTOS SÃO PREMIUNSSSSSS!!!!JURO!!",
  "E você ainda pensa em comprar do concorrente 🙄",
  "Vou ali pegar um regador🚿, tá? É que seu raciocínio é tão lento que é preciso regar para ver se cresce.🌝",
  "Algumas pessoas me inspiram tanto a nunca ser como elas! Juro!",
  "Grandes batalhas só são dadas a grandes guerreiros.Vulgo os trabalhadores da Outono♻️",
  "Não Deu Valor? Desculpa, Mais Não Sou A Globo, Tenho Certeza Que Nossa História Não Vale A Pena Ver De Novo🌞(ex-socios)",
];

let currentMascotMessage = 0;
let mascotText = document.getElementById("mascot-text");
let mascotMessageBox = document.getElementById("mascot-message");

function toggleMascotMessage() {
  mascotText.textContent = mascotMessages[currentMascotMessage];
  mascotMessageBox.style.display = "block"; // abre balão

  // prepara próxima mensagem
  currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;

  // fecha depois de 10 segundos
  setTimeout(() => {
    mascotMessageBox.style.display = "none";
  }, 10000);
}

function closeMascotMessage() {
  mascotMessageBox.style.display = "none"; // fecha no X
}
// Banco de dados de pedidos simulado
let userOrders = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartBadge();
    initializeMascot();

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
        isAdmin = currentUser.isAdmin || false;
        updateAuthUI();
        loadUserOrders();
    }

    // Load user orders from localStorage
    const savedOrders = localStorage.getItem('outono-dourado-orders');
    if (savedOrders) {
        userOrders = JSON.parse(savedOrders);
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

// ========================
// MASCOT FUNCTIONALITY
// ========================

function initializeMascot() {
    // Mascot appears with animation after page load
    setTimeout(() => {
        const mascot = document.getElementById('mascot');
        mascot.style.opacity = '1';
        mascot.style.transform = 'translateY(0)';
    }, 2000);

    // Auto show mascot message periodically
    setInterval(() => {
        if (!document.getElementById('mascot-message').style.display || 
            document.getElementById('mascot-message').style.display === 'none') {
            showRandomMascotMessage();
        }
    }, 30000); // Show message every 30 seconds
}

function toggleMascotMessage() {
    const messageDiv = document.getElementById('mascot-message');
    if (messageDiv.style.display === 'none' || !messageDiv.style.display) {
        showRandomMascotMessage();
    } else {
        closeMascotMessage();
    }
}

function showRandomMascotMessage() {
    const messageDiv = document.getElementById('mascot-message');
    const textElement = document.getElementById('mascot-text');

    // Cycle through messages
    textElement.textContent = mascotMessages[currentMascotMessage];
    currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;

    messageDiv.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
        closeMascotMessage();
    }, 5000);
}

function closeMascotMessage() {
    const messageDiv = document.getElementById('mascot-message');
    messageDiv.style.display = 'none';
}

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
        const matchesFilter = currentFilter === 'all' || 
            product.category.toLowerCase() === currentFilter.toLowerCase();
        const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesFilter && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: rgba(0, 0, 0, 1); font-size: 1.125rem;">Nenhum produto encontrado</p>
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
        'legumes': 'Legumes',
        'frutas': 'Frutas'
    };
    return categoryNames[category.toLowerCase()] || category;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star" style="color: #000000ff;">★</span>';
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

    if (!isLoggedIn) {
        showToast('Login necessário', 'Faça login para finalizar seu pedido', 'error');
        openLoginModal();
        return;
    }

    // Create order
    const order = {
        id: 'ORD-' + Date