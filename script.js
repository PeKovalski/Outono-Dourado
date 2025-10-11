//sistema de login
/**
 * =================================================================================
 * Módulo Universal de Autenticação com Supabase
 *
 * Este arquivo centraliza toda a lógica de interação com o serviço de
 * autenticação do Supabase. Ele é "universal" porque não manipula o HTML
 * diretamente, apenas exporta funções que podem ser usadas em qualquer
 * ambiente JavaScript.
 *
 * COMO USAR:
 * 1. Salve este arquivo (ex: supabaseAuth.js).
 * 2. Substitua os placeholders 'SUA_URL_DO_SUPABASE' e 'SUA_CHAVE_ANON_DO_SUPABASE'.
 * 3. Em outro arquivo JS, importe as funções que precisar.
 * Exemplo em HTML: import { authService } from './supabaseAuth.js';
 * =================================================================================
 */

// Bloco 1: Inicialização e Conexão
// ---------------------------------------------------------------------------------
// Importamos a função `createClient` da biblioteca do Supabase via CDN.
// Em um ambiente Node.js, você faria: import { createClient } from '@supabase/supabase-js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ATENÇÃO: Substitua pelas suas credenciais do projeto Supabase.
const supabaseUrl = 'https://pbezojcpticcyywxzxaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZXpvamNwdGljY3l5d3h6eGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTE0MDgsImV4cCI6MjA3Mzg2NzQwOH0.bn_i_V-e-fUMQ22zF5VHQ0azfhyFE0cdSXFJRxNB_Ik';

// Validação para garantir que as chaves foram inseridas.
if (!supabaseUrl || supabaseUrl.includes('SUA_URL')) {
    console.error("Erro: A URL do Supabase não foi definida. Verifique o arquivo de configuração.");
}
if (!supabaseAnonKey || supabaseAnonKey.includes('SUA_CHAVE')) {
    console.error("Erro: A Chave Anon do Supabase não foi definida. Verifique o arquivo de configuração.");
}

// Criamos a instância única do cliente Supabase que será usada em toda a aplicação.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Bloco 2: Funções de Autenticação
// ---------------------------------------------------------------------------------
// Agrupamos todas as funções de autenticação em um objeto `authService`
// para manter o código organizado.

export const authService = {
    /**
     * Realiza o cadastro de um novo usuário com email e senha.
     * @param {string} email - O email do novo usuário.
     * @param {string} password - A senha do novo usuário (mínimo de 6 caracteres).
     * @returns {Promise<{user: object, session: object, error: object}>} - Retorna o usuário e a sessão em caso de sucesso, ou um erro.
     */
    async signUp(email, password) {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            console.log("Cadastro bem-sucedido! Verifique seu email para confirmação.");
            return { user: data.user, session: data.session, error: null };
        } catch (error) {
            console.error("Erro no cadastro:", error.message);
            return { user: null, session: null, error };
        }
    },

    /**
     * Realiza o login de um usuário com email e senha.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<{user: object, session: object, error: object}>} - Retorna o usuário e a sessão em caso de sucesso, ou um erro.
     */
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            console.log("Login realizado com sucesso!");
            return { user: data.user, session: data.session, error: null };
        } catch (error) {
            console.error("Erro no login:", error.message);
            return { user: null, session: null, error };
        }
    },

    /**
     * Inicia o fluxo de login com um provedor OAuth (ex: 'github', 'google').
     * @param {'github' | 'google' | 'facebook' | 'twitter'} provider - O nome do provedor OAuth.
     */
    async signInWithProvider(provider) {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider });
            if (error) throw error;
        } catch (error) {
            console.error(`Erro ao tentar login com ${provider}:`, error.message);
        }
    },

    /**
     * Realiza o logout do usuário atualmente logado.
     * @returns {Promise<{error: object | null}>} - Retorna um objeto de erro se a operação falhar.
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            console.log("Logout realizado com sucesso!");
            return { error: null };
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
            return { error };
        }
    },
};

// Bloco 3: Gerenciamento de Sessão e Usuário
// ---------------------------------------------------------------------------------

/**
 * Obtém os dados do usuário logado no momento.
 * É útil para verificar se existe uma sessão ativa ao carregar a página.
 * @returns {Promise<object | null>} - Retorna o objeto do usuário ou nulo se não estiver logado.
 */
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Obtém a sessão completa do usuário logado (inclui o token de acesso).
 * @returns {Promise<object | null>} - Retorna o objeto da sessão ou nulo.
 */
export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Escuta e reage a mudanças no estado de autenticação (LOGIN, LOGOUT, etc).
 * Esta é a função mais importante para manter sua interface sincronizada.
 * @param {function(string, object): void} callback - Uma função que será chamada sempre que o estado de autenticação mudar.
 * Ela recebe o 'evento' (ex: 'SIGNED_IN') e a 'sessão'.
 * @returns {object} - Retorna a subscrição, com um método .unsubscribe() para parar de escutar.
 */
export function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(`Evento de autenticação: ${event}`, session);
        callback(event, session);
    });
    return subscription;
}










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
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'confirmed',
        userId: currentUser.id
    };
    
    // Add to orders
    userOrders.push(order);
    localStorage.setItem('outono-dourado-orders', JSON.stringify(userOrders));
    
    showToast('Redirecionando...', 'Você será direcionado para o pagamento seguro', 'info');
    
    setTimeout(() => {
        cart = [];
        updateCartBadge();
        saveCartToStorage();
        closeCart();
        showToast('Pedido Realizado!', `Pedido ${order.id} confirmado com sucesso!`, 'success');
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
        
        // Show admin panel option if user is admin
        updateAdminUI();
    } else {
        authButtons.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Update admin UI elements
function updateAdminUI() {
    const dropdown = document.getElementById('user-dropdown');
    let adminOption = dropdown.querySelector('.admin-panel-item');
    
    if (isAdmin && !adminOption) {
        // Add admin panel option
        const adminItem = document.createElement('div');
        adminItem.className = 'dropdown-item admin-panel-item';
        adminItem.onclick = () => openAdminPanel();
        adminItem.innerHTML = `
            <i data-lucide="settings"></i>
            <span>Painel Admin</span>
        `;
        
        // Insert before "Meus Pedidos"
        const pedidosItem = dropdown.querySelector('[onclick*="showOrderHistory"]');
        dropdown.insertBefore(adminItem, pedidosItem);
        lucide.createIcons();
    } else if (!isAdmin && adminOption) {
        // Remove admin panel option
        adminOption.remove();
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
    switchProfileTab('profile-info');
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
        let user;
        let isAdminLogin = false;
        
        // Check if admin credentials
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            user = {
                id: 'admin_001',
                name: 'Administrador',
                email: email,
                phone: '',
                address: '',
                isAdmin: true,
                registeredAt: new Date().toISOString()
            };
            isAdminLogin = true;
        } else {
            // Regular user login
            user = {
                id: 'user_' + Date.now(),
                name: 'João Silva', // In a real app, this would come from the server
                email: email,
                phone: '',
                address: '',
                isAdmin: false,
                registeredAt: new Date().toISOString()
            };
        }
        
        currentUser = user;
        isLoggedIn = true;
        isAdmin = user.isAdmin || false;
        
       
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
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showToast('Erro', 'As senhas não coincidem', 'error');
        return;
    }
    
    // Validate password strength
    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength.strength === 'weak') {
        showToast('Senha muito fraca', 'Use uma senha mais forte', 'error');
        return;
    }
    
    // Simulate registration process
    showToast('Criando conta...', 'Processando suas informações', 'info');
    
    setTimeout(() => {
        // Simulate successful registration
        const user = {
            id: 'user_' + Date.now(),
            name: name,
            email: email,
            phone: phone || '',
            address: '',
            registeredAt: new Date().toISOString()
        };
        
        currentUser = user;
        isLoggedIn = true;
        
        // Save to localStorage
        localStorage.setItem('outono-dourado-user', JSON.stringify(user));
        
        updateAuthUI();
        closeRegisterModal();
        loadUserOrders();
        
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
    
    // Simulate forgot password process
    showToast('Enviando e-mail...', 'Aguarde um momento', 'info');
    
    setTimeout(() => {
        showToast('E-mail enviado!', 'Verifique sua caixa de entrada', 'success');
        closeForgotPasswordModal();
        event.target.reset();
    }, 2000);
}

// Handle change password
function handleChangePassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');
    
    // Validate passwords match
    if (newPassword !== confirmNewPassword) {
        showToast('Erro', 'As senhas não coincidem', 'error');
        return;
    }
    
    // Validate password strength
    const passwordStrength = checkPasswordStrength(newPassword);
    if (passwordStrength.strength === 'weak') {
        showToast('Senha muito fraca', 'Use uma senha mais forte', 'error');
        return;
    }
    
    // Simulate password change
    showToast('Alterando senha...', 'Processando alteração', 'info');
    
    setTimeout(() => {
        showToast('Senha alterada!', 'Sua senha foi atualizada com sucesso', 'success');
        closeChangePasswordModal();
        event.target.reset();
    }, 1500);
}

// Profile functions
function loadUserProfile() {
    if (!currentUser) return;
    
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-email').value = currentUser.email || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
    
    // Load address fields
    if (currentUser.address) {
        if (typeof currentUser.address === 'string') {
            // Old format - just a string
            document.getElementById('profile-street').value = currentUser.address;
        } else {
            // New format - object with detailed fields
            document.getElementById('profile-street').value = currentUser.address.street || '';
            document.getElementById('profile-number').value = currentUser.address.number || '';
            document.getElementById('profile-complement').value = currentUser.address.complement || '';
            document.getElementById('profile-neighborhood').value = currentUser.address.neighborhood || '';
            document.getElementById('profile-city').value = currentUser.address.city || '';
            document.getElementById('profile-state').value = currentUser.address.state || '';
            document.getElementById('profile-zipcode').value = currentUser.address.zipcode || '';
        }
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Build complete address
    const street = formData.get('street') || '';
    const number = formData.get('number') || '';
    const complement = formData.get('complement') || '';
    const neighborhood = formData.get('neighborhood') || '';
    const city = formData.get('city') || '';
    const state = formData.get('state') || '';
    const zipcode = formData.get('zipcode') || '';
    
    // Create formatted address
    let addressParts = [];
    if (street) addressParts.push(street);
    if (number) addressParts.push(number);
    if (complement) addressParts.push(complement);
    
    const fullAddress = {
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
        zipcode: zipcode,
        formatted: `${street}${number ? ', ' + number : ''}${complement ? ' - ' + complement : ''}${neighborhood ? ' - ' + neighborhood : ''}, ${city} - ${state}${zipcode ? ', CEP: ' + zipcode : ''}`
    };
    
    // Update user data
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = fullAddress;
    
    // Save to localStorage
    localStorage.setItem('outono-dourado-user', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthUI();
    
    showToast('Perfil atualizado!', 'Suas informações foram salvas', 'success');
}

// Profile tabs
function switchProfileTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load content based on selected tab
    if (tabName === 'order-history') {
        loadOrderHistory();
    } else if (tabName === 'order-tracking') {
        loadOrderTracking();
    }
}

// Order history functions
function loadUserOrders() {
    // Load orders from localStorage for current user
    const savedOrders = localStorage.getItem('outono-dourado-orders');
    if (savedOrders) {
        const allOrders = JSON.parse(savedOrders);
        userOrders = allOrders.filter(order => order.userId === currentUser.id);
    }
}

function loadOrderHistory() {
    const container = document.getElementById('orders-container');
    
    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">
                    <i data-lucide="package"></i>
                </div>
                <h4>Nenhum pedido encontrado</h4>
                <p>Você ainda não fez nenhum pedido. Que tal começar agora?</p>
                <button class="btn-primary" onclick="closeProfileModal(); scrollToSection('products')">
                    Ver Produtos
                </button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Sort orders by date (newest first)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <h4>Pedido ${order.id}</h4>
                    <p class="order-date">${formatDate(order.date)}</p>
                </div>
                <div class="order-status ${order.status}">
                    <span class="status-text">${getStatusText(order.status)}</span>
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="order-item-image">
                        <div class="order-item-info">
                            <span class="item-name">${item.name}</span>
                            <span class="item-quantity">Qty: ${item.quantity}</span>
                            <span class="item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">
                    <strong>Total: R$ ${order.total.toFixed(2)}</strong>
                </div>
                <button class="btn-secondary order-details-btn" onclick="viewOrderDetails('${order.id}')">
                    Ver Detalhes
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusText(status) {
    const statusMap = {
        'confirmed': 'Confirmado',
        'preparing': 'Preparando',
        'shipped': 'Enviado',
        'delivered': 'Entregue',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}

function viewOrderDetails(orderId) {
    const order = userOrders.find(o => o.id === orderId);
    if (!order) return;
    
    showToast('Detalhes do Pedido', `Pedido ${orderId} - ${getStatusText(order.status)}`, 'info');
}

function showOrderHistory() {
    openProfileModal();
    setTimeout(() => {
        const orderHistoryBtn = document.querySelector('.tab-btn[onclick*="order-history"]');
        if (orderHistoryBtn) {
            orderHistoryBtn.click();
        }
    }, 100);
}

// Logout function
function logout() {
    currentUser = null;
    isLoggedIn = false;
    isAdmin = false;
    userOrders = [];
    
    // Clear localStorage
    localStorage.removeItem('outono-dourado-user');
    localStorage.removeItem('outono-dourado-remember');
    localStorage.removeItem('outono-dourado-orders');
    
    updateAuthUI();
    closeAdminPanel(); // Close admin panel if open
    
    showToast('Logout realizado', 'Até logo! Volte sempre.', 'success');
}

// Close modals on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCart();
        closeProductDetail();
        closeMobileMenu();
        closeAllModals();
        closeMascotMessage();
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

// Initialize Lucide icons when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// ========================
// CHECKOUT & PAYMENT FUNCTIONALITY
// ========================

let selectedPaymentMethod = 'pix';

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Carrinho vazio', 'Adicione produtos antes de finalizar', 'error');
        return;
    }
    
    if (!isLoggedIn) {
        showToast('Login necessário', 'Faça login para finalizar seu pedido', 'error');
        openLoginModal();
        return;
    }
    
    // Load checkout summary
    loadCheckoutSummary();
    
    // Show modal
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'flex';
        lucide.createIcons();
    }
    
    closeCart();
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Load checkout summary
function loadCheckoutSummary() {
    const summaryContainer = document.getElementById('checkout-items-summary');
    const totalElement = document.getElementById('checkout-total-amount');
    
    if (!summaryContainer || !totalElement) return;
    
    // Display items
    summaryContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">${item.quantity}x R$ ${item.price.toFixed(2)}</span>
            </div>
            <span class="item-total">R$ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Select payment method
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Update tabs
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.payment-tab').classList.add('active');
    
    // Update content
    document.querySelectorAll('.payment-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const contentId = method + '-payment';
    const content = document.getElementById(contentId);
    if (content) {
        content.classList.add('active');
    }
    
    lucide.createIcons();
}

// Copy PIX code
function copyPixCode() {
    const pixInput = document.getElementById('pix-code-input');
    if (!pixInput) return;
    
    pixInput.select();
    document.execCommand('copy');
    
    showToast('Código copiado!', 'Cole no app do seu banco', 'success');
}

// Copy boleto code
function copyBoletoCode() {
    const boletoCode = '23793.38128 60047.947309 99877.661022 8 99560000015000';
    
    // Create temporary input
    const tempInput = document.createElement('input');
    tempInput.value = boletoCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showToast('Código copiado!', 'Use para pagar o boleto', 'success');
}

// Confirm payment
function confirmPayment(method) {
    event.preventDefault();
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: method === 'pix' ? 'pending' : method === 'card' ? 'confirmed' : 'pending',
        paymentMethod: method,
        userId: currentUser.id
    };
    
    // Add to orders
    userOrders.push(order);
    localStorage.setItem('outono-dourado-orders', JSON.stringify(userOrders));
    
    // Show success message based on payment method
    let successMessage = '';
    let successDescription = '';
    
    switch(method) {
        case 'pix':
            successMessage = 'Aguardando Pagamento PIX';
            successDescription = 'Assim que confirmarmos o pagamento, você receberá um e-mail';
            break;
        case 'card':
            successMessage = 'Pagamento Aprovado!';
            successDescription = `Pedido ${order.id} confirmado. Você receberá um e-mail em breve`;
            break;
        case 'boleto':
            successMessage = 'Boleto Gerado!';
            successDescription = 'O boleto foi enviado para seu e-mail';
            break;
    }
    
    showToast(successMessage, successDescription, 'success');
    
    // Clear cart
    setTimeout(() => {
        cart = [];
        updateCartBadge();
        saveCartToStorage();
        closeCheckoutModal();
    }, 2000);
}

// Legacy checkout function - now redirects to checkout modal
function checkout() {
    openCheckoutModal();
}

// ========================
// ADMIN PANEL FUNCTIONALITY
// ========================

let editingProduct = null;

// Open admin panel
function openAdminPanel() {
    if (!isAdmin) {
        showToast('Acesso negado', 'Você não tem permissão para acessar o painel administrativo', 'error');
        return;
    }
    
    closeAllModals();
    loadAdminProducts();
    document.getElementById('admin-panel').style.display = 'flex';
}

// Close admin panel
function closeAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    editingProduct = null;
}

// Load products for admin management
function loadAdminProducts() {
    const container = document.getElementById('admin-products-list');
    if (!container) return;
    
    container.innerHTML = PRODUCTS_DATABASE.map(product => `
        <div class="admin-product-card" data-product-id="${product.id}">
            <div class="admin-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <p class="product-stock ${product.inStock ? 'in-stock' : 'out-stock'}">
                    ${product.inStock ? 'Em estoque' : 'Fora de estoque'}
                </p>
            </div>
            <div class="admin-product-actions">
                <button class="btn-admin-edit" onclick="editProduct('${product.id}')">
                    <i data-lucide="edit"></i>
                    Editar
                </button>
                <button class="btn-admin-delete" onclick="deleteProduct('${product.id}')">
                    <i data-lucide="trash-2"></i>
                    Excluir
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Open add product modal
function openAddProductModal() {
    editingProduct = null;
    clearProductForm();
    document.getElementById('product-form-title').textContent = 'Adicionar Novo Produto';
    document.getElementById('product-form-modal').style.display = 'flex';
}

// Open edit product modal
function editProduct(productId) {
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;
    
    editingProduct = product;
    populateProductForm(product);
    document.getElementById('product-form-title').textContent = 'Editar Produto';
    document.getElementById('product-form-modal').style.display = 'flex';
}

// Close product form modal
function closeProductFormModal() {
    document.getElementById('product-form-modal').style.display = 'none';
    editingProduct = null;
}

// Clear product form
function clearProductForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-category').value = 'alimentos';
    document.getElementById('product-image').value = '';
    document.getElementById('product-tags').value = '';
    document.getElementById('product-stock').checked = true;
}

// Populate product form with existing product data
function populateProductForm(product) {
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-tags').value = product.tags.join(', ');
    document.getElementById('product-stock').checked = product.inStock;
}

// Handle product form submission
function handleProductForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        image: formData.get('image'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
        inStock: formData.get('stock') === 'on',
        rating: editingProduct ? editingProduct.rating : 4.5,
        reviews: editingProduct ? editingProduct.reviews : 0
    };
    
    // Validation
    if (!productData.name || !productData.description || !productData.price || !productData.image) {
        showToast('Erro', 'Preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    if (editingProduct) {
        // Update existing product
        const index = PRODUCTS_DATABASE.findIndex(p => p.id === editingProduct.id);
        if (index !== -1) {
            PRODUCTS_DATABASE[index] = { ...PRODUCTS_DATABASE[index], ...productData };
            showToast('Produto Atualizado', `${productData.name} foi atualizado com sucesso`, 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: 'custom-product-' + Date.now(),
            ...productData
        };
        PRODUCTS_DATABASE.push(newProduct);
        showToast('Produto Adicionado', `${productData.name} foi adicionado com sucesso`, 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('outono-dourado-products', JSON.stringify(PRODUCTS_DATABASE));
    
    // Refresh displays
    loadProducts();
    loadAdminProducts();
    closeProductFormModal();
}

// Delete product
function deleteProduct(productId) {
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
        const index = PRODUCTS_DATABASE.findIndex(p => p.id === productId);
        if (index !== -1) {
            PRODUCTS_DATABASE.splice(index, 1);
            localStorage.setItem('outono-dourado-products', JSON.stringify(PRODUCTS_DATABASE));
            
            showToast('Produto Excluído', `${product.name} foi removido com sucesso`, 'success');
            
            // Refresh displays
            loadProducts();
            loadAdminProducts();
        }
    }
}
const productList = document.getElementById('product-list'); // Supondo que você tenha uma div com id 'product-list'

verduraProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>Preço: R$${product.price}</span>
        <span>Avaliação: ${product.rating} ★</span>
        <span>Estoque: ${product.inStock ? 'Disponível' : 'Indisponível'}</span>
    `;

    productList.appendChild(productElement);
});

// Load products from localStorage on page load (if any custom products exist)
function loadCustomProducts() {
    const savedProducts = localStorage.getItem('outono-dourado-products');
    if (savedProducts) {
        const customProducts = JSON.parse(savedProducts);
        // Merge with default products, prioritizing saved versions
        const mergedProducts = [...PRODUCTS_DATABASE];
        customProducts.forEach(customProduct => {
            const existingIndex = mergedProducts.findIndex(p => p.id === customProduct.id);
            if (existingIndex !== -1) {
                mergedProducts[existingIndex] = customProduct;
            } else {
                mergedProducts.push(customProduct);
            }
        });
        // Replace the products database
        PRODUCTS_DATABASE.length = 0;
        PRODUCTS_DATABASE.push(...mergedProducts);
    }
}
const verduraProducts = PRODUCTS_DATABASE.filter(product => product.category === "Verduras");
console.log(verduraProducts);


// Initialize custom products loading
document.addEventListener('DOMContentLoaded', function() {
    loadCustomProducts();
    const filteredProducts = PRODUCTS_DATABASE.filter(product => {
    const matchesFilter = currentFilter === 'all' || 
        product.category.toLowerCase() === currentFilter.toLowerCase();
    
    const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
});

});

// ========================
// ORDER TRACKING FUNCTIONALITY
// ========================

function loadOrderTracking() {
    const container = document.getElementById('tracking-container');
    
    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-tracking">
                <div class="empty-tracking-icon">
                    <i data-lucide="map-pin"></i>
                </div>
                <h4>Nenhum pedido para rastrear</h4>
                <p>Você ainda não possui pedidos em andamento.</p>
                <button class="btn-primary" onclick="closeProfileModal(); scrollToSection('products')">
                    Fazer um Pedido
                </button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Filter only active orders (not delivered or cancelled)
    const activeOrders = userOrders.filter(o => 
        o.status !== 'delivered' && o.status !== 'cancelled'
    );
    
    if (activeOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-tracking">
                <div class="empty-tracking-icon">
                    <i data-lucide="check-circle"></i>
                </div>
                <h4>Todos os pedidos foram entregues!</h4>
                <p>Não há pedidos em andamento no momento.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Sort by date (newest first)
    activeOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = activeOrders.map(order => {
        const trackingSteps = getTrackingSteps(order);
        const destinationAddress = getUserDeliveryAddress();
        
        return `
            <div class="tracking-card">
                <div class="tracking-header">
                    <h4>Pedido ${order.id}</h4>
                    <span class="tracking-date">${formatDate(order.date)}</span>
                </div>
                
                <div class="tracking-route">
                    <div class="route-point origin">
                        <div class="route-icon">
                            <i data-lucide="home"></i>
                        </div>
                        <div class="route-info">
                            <h5>Origem</h5>
                            <p>R. Jacob Haiduk - Araucária, PR</p>
                            <span class="route-status">Centro de Distribuição Outono Dourado</span>
                        </div>
                    </div>
                    
                    <div class="route-arrow">
                        <i data-lucide="arrow-down"></i>
                    </div>
                    
                    <div class="route-point destination">
                        <div class="route-icon">
                            <i data-lucide="map-pin"></i>
                        </div>
                        <div class="route-info">
                            <h5>Destino</h5>
                            <p>${destinationAddress}</p>
                            <span class="route-status">Endereço de Entrega</span>
                        </div>
                    </div>
                </div>
                
                <div class="tracking-timeline">
                    ${trackingSteps.map((step, index) => `
                        <div class="timeline-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}">
                            <div class="step-marker">
                                <div class="step-circle">
                                    ${step.completed ? '<i data-lucide="check"></i>' : '<i data-lucide="circle"></i>'}
                                </div>
                                ${index < trackingSteps.length - 1 ? '<div class="step-line"></div>' : ''}
                            </div>
                            <div class="step-content">
                                <h5>${step.title}</h5>
                                <p>${step.description}</p>
                                ${step.timestamp ? `<span class="step-time">${formatDate(step.timestamp)}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="tracking-actions">
                    <button class="btn-secondary" onclick="downloadReceipt('${order.id}')">
                        <i data-lucide="download"></i>
                        Baixar Comprovante
                    </button>
                    <button class="btn-secondary" onclick="emailReceipt('${order.id}')">
                        <i data-lucide="mail"></i>
                        Enviar por E-mail
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

function getTrackingSteps(order) {
    const steps = [
        {
            title: 'Pedido Confirmado',
            description: 'Seu pedido foi recebido e confirmado',
            completed: true,
            current: order.status === 'confirmed',
            timestamp: order.date
        },
        {
            title: 'Preparando Pedido',
            description: 'Estamos separando seus produtos',
            completed: ['preparing', 'shipped', 'delivered'].includes(order.status),
            current: order.status === 'preparing',
            timestamp: order.status !== 'confirmed' ? order.date : null
        },
        {
            title: 'Pedido Enviado',
            description: 'Seu pedido saiu para entrega',
            completed: ['shipped', 'delivered'].includes(order.status),
            current: order.status === 'shipped',
            timestamp: order.status === 'shipped' || order.status === 'delivered' ? order.date : null
        },
        {
            title: 'Pedido Entregue',
            description: 'Produto entregue com sucesso!',
            completed: order.status === 'delivered',
            current: order.status === 'delivered',
            timestamp: order.status === 'delivered' ? order.date : null
        }
    ];
    
    return steps;
}

function getUserDeliveryAddress() {
    if (!currentUser || !currentUser.address) {
        return 'Endereço não cadastrado';
    }
    
    if (typeof currentUser.address === 'string') {
        return currentUser.address;
    }
    
    return currentUser.address.formatted || 'Endereço não cadastrado';
}

// ========================
// RECEIPT/COMPROVANTE FUNCTIONALITY
// ========================

function downloadReceipt(orderId) {
    const order = userOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const receiptHTML = generateReceiptHTML(order);
    
    // Create a temporary element to trigger download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Comprovante_Pedido_${orderId}_OutonoDourado.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Comprovante baixado!', 'O arquivo foi salvo em seus downloads', 'success');
}

function emailReceipt(orderId) {
    const order = userOrders.find(o => o.id === orderId);
    if (!order) return;
    
    // In a real application, this would send an email via backend
    // For now, we'll simulate it
    showToast('E-mail enviado!', `Comprovante do pedido ${orderId} enviado para ${currentUser.email}`, 'success');
}

// Simular atualização de status do pedido (para demonstração)
function simulateOrderStatusUpdate(orderId, newStatus) {
    const order = userOrders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('outono-dourado-orders', JSON.stringify(userOrders));
        loadOrderHistory();
        loadOrderTracking();
        showToast('Status atualizado!', `Pedido ${orderId} agora está: ${getStatusText(newStatus)}`, 'success');
    }
}

function generateReceiptHTML(order) {
    const destinationAddress = getUserDeliveryAddress();
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprovante de Pedido - ${order.id}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .receipt { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #DF760B; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #DF760B; margin: 0; font-size: 32px; }
        .header p { color: #666; margin: 5px 0; }
        .section { margin: 20px 0; }
        .section h2 { color: #333; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .info-label { font-weight: bold; color: #555; }
        .info-value { color: #333; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th { background: #DF760B; color: white; padding: 12px; text-align: left; }
        .items-table td { padding: 12px; border-bottom: 1px solid #ddd; }
        .total { text-align: right; font-size: 24px; font-weight: bold; color: #DF760B; margin-top: 20px; padding-top: 20px; border-top: 2px solid #DF760B; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; background: #22c55e; color: white; font-size: 14px; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>🍂 Outono Dourado</h1>
            <p>Produtos Orgânicos e Sustentáveis</p>
            <p>R. Jacob Haiduk - Araucária, PR</p>
            <p>Telefone: (41) 3372-1234</p>
        </div>
        <div class="section">
            <h2>📋 Informações do Pedido</h2>
            <div class="info-row"><span class="info-label">Número do Pedido:</span><span class="info-value">${order.id}</span></div>
            <div class="info-row"><span class="info-label">Data do Pedido:</span><span class="info-value">${formatDate(order.date)}</span></div>
            <div class="info-row"><span class="info-label">Status:</span><span class="status-badge">${getStatusText(order.status)}</span></div>
            <div class="info-row"><span class="info-label">Método de Pagamento:</span><span class="info-value">${order.paymentMethod || 'PIX'}</span></div>
        </div>
        <div class="section">
            <h2>👤 Dados do Cliente</h2>
            <div class="info-row"><span class="info-label">Nome:</span><span class="info-value">${currentUser.name}</span></div>
            <div class="info-row"><span class="info-label">E-mail:</span><span class="info-value">${currentUser.email}</span></div>
            <div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${currentUser.phone || 'Não informado'}</span></div>
        </div>
        <div class="section">
            <h2>📍 Endereço de Entrega</h2>
            <div class="info-row"><span class="info-label">Origem:</span><span class="info-value">R. Jacob Haiduk - Araucária, PR</span></div>
            <div class="info-row"><span class="info-label">Destino:</span><span class="info-value">${destinationAddress}</span></div>
        </div>
        <div class="section">
            <h2>🛒 Itens do Pedido</h2>
            <table class="items-table">
                <thead><tr><th>Produto</th><th>Quantidade</th><th>Preço Unit.</th><th>Subtotal</th></tr></thead>
                <tbody>
                    ${order.items.map(item => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>R$ ${item.price.toFixed(2)}</td><td>R$ ${(item.price * item.quantity).toFixed(2)}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
        <div class="total">Total: R$ ${order.total.toFixed(2)}</div>
        <div class="footer">
            <p><strong>Outono Dourado - Produtos Orgânicos e Sustentáveis</strong></p>
            <p>Este é um documento gerado eletronicamente e não necessita de assinatura.</p>
            <p>Obrigado por escolher produtos sustentáveis! 🌱</p>
            <p>Data de emissão: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
    </div>
</body>
</html>`;
}