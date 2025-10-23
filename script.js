// script.js - Adicione este arquivo ou inclua no final do HTML

// Configuração do Supabase
const SUPABASE_URL = 'https://whxlgangulxkmrrzoygu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoeGxnYW5ndWx4a21ycnpveWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDU3MDcsImV4cCI6MjA3NjI4MTcwN30.j5mnEJN9If4QbB_okYEvWMzH_faQWgWg7B1MlqpuJrI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dados de produtos (fallback caso o Supabase não funcione)
const defaultProducts = [
    {
        id: 1,
        name: "Alface Crespa",
        description: "Alface orgânica fresca, cultivada sem agrotóxicos",
        price: 3.50,
        category: "verduras",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
        tags: ["orgânico", "fresco", "local"]
    },
    {
        id: 2,
        name: "Rúcula",
        description: "Rúcula fresca com sabor característico",
        price: 4.00,
        category: "verduras", 
        image: "https://images.unsplash.com/photo-1594282482151-1c4d8d4e6c7b?w=400",
        tags: ["orgânico", "fresco"]
    },
    {
        id: 3,
        name: "Tomate",
        description: "Tomates vermelhos maduros e suculentos",
        price: 6.00,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        tags: ["orgânico", "maduro"]
    },
    {
        id: 4,
        name: "Cenoura",
        description: "Cenouras crocantes e doces",
        price: 5.50,
        category: "legumes",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
        tags: ["orgânico", "doce"]
    },
    {
        id: 5,
        name: "Maçã Verde",
        description: "Maçãs verdes crocantes e refrescantes",
        price: 7.00,
        category: "frutas",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
        tags: ["orgânico", "crocante"]
    },
    {
        id: 6, 
        name: "Banana Prata",
        description: "Bananas maduras e doces",
        price: 4.50,
        category: "frutas",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
        tags: ["orgânico", "doce"]
    },
    {
        id: 7,
        name: "Laranja Pera",
        description: "Laranjas suculentas e doces",
        price: 5.00,
        category: "frutas", 
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
        tags: ["orgânico", "suculenta"]
    },
    {
        id: 8,
        name: "Morango",
        description: "Morangos vermelhos e doces",
        price: 8.50,
        category: "frutas",
        image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400",
        tags: ["orgânico", "doce"]
    }
];

// Variáveis globais
let allProducts = [];
let currentFilter = 'all';
let currentSearch = '';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeEventListeners();
});

// Carrega produtos do Supabase ou usa os padrões
async function loadProducts() {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('name');

        if (error) throw error;

        if (products && products.length > 0) {
            allProducts = products;
        } else {
            allProducts = defaultProducts;
        }
        
        displayProducts(allProducts);
        
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        allProducts = defaultProducts;
        displayProducts(allProducts);
    }
}

// Exibe os produtos na grade
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.error('Elemento products-grid não encontrado');
        return;
    }

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i data-lucide="search-x"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou termos de busca</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400'">
                <button class="quick-view-btn" onclick="openProductDetail(${product.id})">
                    <i data-lucide="eye"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-category-badge">${getCategoryLabel(product.category)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i data-lucide="shopping-cart"></i>
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Filtra produtos por categoria
function filterProducts(category) {
    currentFilter = category;
    
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    applyFilters();
}

// Busca produtos
function searchProducts() {
    currentSearch = document.getElementById('product-search').value.toLowerCase();
    applyFilters();
}

// Aplica filtros e busca
function applyFilters() {
    let filteredProducts = allProducts;
    
    // Aplica filtro de categoria
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilter
        );
    }
    
    // Aplica busca
    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch) ||
            product.tags.some(tag => tag.toLowerCase().includes(currentSearch))
        );
    }
    
    displayProducts(filteredProducts);
}

// Retorna label da categoria
function getCategoryLabel(category) {
    const labels = {
        'verduras': '🥬 Verdura',
        'legumes': '🥕 Legume', 
        'frutas': '🍎 Fruta',
        'alimentos': '🛒 Alimento'
    };
    return labels[category] || category;
}

// Inicializa event listeners
function initializeEventListeners() {
    // Busca em tempo real
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
}

// Funções do carrinho (simplificadas)
let cart = [];

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartBadge();
        showToast(`${product.name} adicionado ao carrinho!`, 'success');
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
    }
}

function showToast(message, type = 'success') {
    const toaster = document.getElementById('toaster');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toaster.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Modal do produto (simplificado)
function openProductDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // Implemente a abertura do modal de detalhes
        showToast(`Visualizando ${product.name}`, 'success');
    }
}