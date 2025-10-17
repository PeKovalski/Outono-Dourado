// ATENÇÃO: Se estiver usando módulos (Next.js, Vite, etc.), mantenha esta linha:
// import { createClient } from '@supabase/supabase-js' 

// ===================================
// CONFIGURAÇÃO DO SUPABASE (CORRIGIDO)
// ===================================

const supabaseUrl = 'https://khzrncdvwawmlmwfhoil.supabase.co'
// SUBSTITUA PELA SUA CHAVE ANON PÚBLICA REAL
const supabaseKey = 'SUA_CHAVE_PUBLIC_AQUI' 

// CORREÇÃO: Chama createClient da função importada (ou global)
// Se você está usando módulos (import):
const supabase = createClient(supabaseUrl, supabaseKey); 
// Se você está usando CDN (script tag sem módulos), use (e remova o import):
// const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// Base de dados dos produtos
// O array de mock foi removido. Esta variável agora armazena os dados do Supabase.
let PRODUCTS_DATABASE = []; 

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
// CORREÇÃO: Função loadProducts agora é assíncrona e busca dados do Supabase
async function loadProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    // 1. Busca os dados no Supabase se ainda não tiver carregado
    if (PRODUCTS_DATABASE.length === 0) {
        console.log("Buscando produtos no Supabase...");

        const { data, error } = await supabase
            .from('produtos') // <-- VERIFIQUE SE O NOME DA TABELA É 'produtos'
            .select('*');

        if (error) {
            console.error('Erro ao buscar produtos:', error);
            // Mostrar erro para o usuário
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <p style="color: red; font-size: 1.125rem;">Erro ao carregar produtos. Verifique sua chave e as Políticas RLS no Supabase.</p>
                    <p style="color: #6b7280; font-size: 0.9rem;">Detalhe do Erro: ${error.message}</p>
                </div>
            `;
            return;
        }

        // Popula o array global com os dados do Supabase
        PRODUCTS_DATABASE = data || [];
        console.log(`Produtos carregados: Array(${PRODUCTS_DATABASE.length})`);
    }

    // 2. Lógica de Filtragem (agora usando o PRODUCTS_DATABASE preenchido)
    const filteredProducts = PRODUCTS_DATABASE.filter(product => {
        const matchesFilter = currentFilter === 'all' || 
            (product.category && product.category.toLowerCase() === currentFilter.toLowerCase());
        const matchesSearch = searchQuery === '' || 
            (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        
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
                    <div class="product-price">R$ ${product.price ? product.price.toFixed(2) : '0.00'}</div>
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
    // Agora busca o produto do PRODUCTS_DATABASE preenchido pelo Supabase
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

// ... (O restante do seu código permanece igual)
// Todas as outras funções que usam PRODUCTS_DATABASE agora usarão o array preenchido pelo Supabase.
// ... (O restante do seu código continua aqui)