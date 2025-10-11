// script.js (corrigido) - Mantive sua lógica e nomes originais, removi duplicações
// Import necessário (módulo)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// === Configuração Supabase (suas credenciais já fornecidas) ===
const SUPABASE_URL = 'https://khzrncdvwawmlmwfhoil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoenJuY2R2d2F3bWxtd2Zob2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTg5ODQsImV4cCI6MjA3NTA3NDk4NH0.aA-ecvCZgllSRD6ANnZN6FetHqPixTXlMgmxow6a2BU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('✅ script.js carregado e Supabase conectado!');

// Teste rápido (tolerante caso tabela não exista)
(async () => {
  try {
    const { data, error } = await supabase.from('produtos').select('*').limit(1);
    if (error) {
      console.warn('⚠️ Supabase teste: tabela "produtos" não disponível ou erro:', error.message);
    } else {
      console.log('🟢 Supabase funcionando! Exemplo de dados:', data);
    }
  } catch (err) {
    console.warn('⚠️ Erro ao testar Supabase (pode ser normal em dev):', err.message || err);
  }
})();

// =====================================================
// Base de dados local (mantive seu array de produtos)
// =====================================================
const PRODUCTS_DATABASE = [
  {
    id: 'Milho',
    name: 'Milho Premium',
    description: 'Milho orgânico cultivado de forma sustentável, sem pesticidas, colhido fresquinho, Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico',
    price: 24.9,
    category: 'Legumes',
    image: 'milho.jpeg',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    tags: ['premium', 'proteína', 'vegano', 'sem-glúten', 'superfood']
  },
  {
    id: 'alface-organica-crespa-002',
    name: 'Alface Orgânica Crespa Verde',
    description: 'Alface crespa fresca cultivada sem pesticidas em estufa climatizada, colhida diariamente para garantir máximo frescor e crocância. Rica em vitaminas A e K.',
    price: 4.5,
    category: 'Verduras',
    image: 'alface.jpeg',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['fresco', 'verduras', 'hidropônico', 'vitaminas', 'baixa-caloria', 'crocante']
  },
  // ... mantive só alguns por exemplo, você pode manter todo o array original
];

// =====================================================
// Estado da aplicação
// =====================================================
let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let selectedProduct = null;
let detailQuantity = 1;

let currentUser = null;
let isLoggedIn = false;
let isAdmin = false;

const ADMIN_CREDENTIALS = { email: 'admin@outonodourado.com.br', password: 'admin123' };

// Mascote
let mascotMessages = [
  'Olá! Eu sou o Milhito🌽!',
  'Sou primo do verdeco! Nossas empressas são socias! 🥬',
  'NOSSOS PRODUTOS SÃO PREMIUNSSSSSS!!!!JURO!!',
  'E você ainda pensa em comprar do concorrente 🙄',
  'Vou ali pegar um regador🚿, tá? É que seu raciocínio é tão lento que é preciso regar para ver se cresce.🌝',
  'Algumas pessoas me inspiram tanto a nunca ser como elas! Juro!',
  'Grandes batalhas só são dadas a grandes guerreiros.Vulgo os trabalhadores da Outono♻️',
  'Não Deu Valor? Desculpa, Mais Não Sou A Globo, Tenho Certeza Que Nossa História Não Vale A Pena Ver De Novo🌞(ex-socios)'
];
let currentMascotMessage = 0;

// =====================================================
// Funções do mascote (APENAS UMA VERSÃO)
// =====================================================
function toggleMascotMessage() {
  const mascotText = document.getElementById('mascot-text');
  const mascotMessageBox = document.getElementById('mascot-message');
  if (!mascotText || !mascotMessageBox) return;

  mascotText.textContent = mascotMessages[currentMascotMessage] || 'Olá!';
  mascotMessageBox.style.display = 'block';

  currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;

  setTimeout(() => {
    mascotMessageBox.style.display = 'none';
  }, 10000);
}

function closeMascotMessage() {
  const mascotMessageBox = document.getElementById('mascot-message');
  if (!mascotMessageBox) return;
  mascotMessageBox.style.display = 'none';
}

function initializeMascot() {
  setTimeout(() => {
    const mascot = document.getElementById('mascot');
    if (mascot) {
      mascot.style.opacity = '1';
      mascot.style.transform = 'translateY(0)';
    }
  }, 2000);

  setInterval(() => {
    const messageDiv = document.getElementById('mascot-message');
    if (!messageDiv || messageDiv.style.display === 'block') return;
    showRandomMascotMessage();
  }, 30000);
}

function showRandomMascotMessage() {
  const messageDiv = document.getElementById('mascot-message');
  const textElement = document.getElementById('mascot-text');
  if (!messageDiv || !textElement) return;

  textElement.textContent = mascotMessages[currentMascotMessage];
  currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;
  messageDiv.style.display = 'block';

  setTimeout(() => closeMascotMessage(), 5000);
}

// =====================================================
// Utilitários e UI
// =====================================================
function showToast(title, message, type = 'info') {
  const toaster = document.getElementById('toaster');
  if (!toaster) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `\n        <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>\n        <div style="font-size: 14px; color: #6b7280;">${message}</div>\n    `;
  toaster.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.classList.toggle('open');
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.classList.remove('open');
}

// =====================================================
// Produtos (renderização)
// =====================================================
function getCategoryName(category) {
  const categoryNames = {
    alimentos: 'Alimentos',
    verduras: 'Verduras',
    legumes: 'Legumes',
    frutas: 'Frutas'
  };
  return categoryNames[category?.toLowerCase?.()] || category;
}

function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) stars += '<span class="star">★</span>'; else stars += '<span class="star" style="color: #000000ff">★</span>';
  }
  return stars;
}

function loadProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filteredProducts = PRODUCTS_DATABASE.filter(product => {
    const matchesFilter = currentFilter === 'all' || product.category.toLowerCase() === currentFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()) || (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = `\n      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">\n        <p style="color: rgba(0,0,0,1); font-size: 1.125rem;">Nenhum produto encontrado</p>\n        <button class="btn-primary" onclick="clearFilters()" style="margin-top: 1rem;">Limpar Filtros</button>\n      </div>`;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = filteredProducts.map(product => `\n    <div class="product-card fade-in" onclick="openProductDetail('${product.id}')">\n      <div class="product-image">\n        <img src="${product.image}" alt="${product.name}" loading="lazy">\n        <div class="product-badges">\n          <div class="product-badge">\n            <i data-lucide="leaf"></i>\n            Orgânico\n          </div>\n        </div>\n      </div>\n      <div class="product-content">\n        <div class="product-category">${getCategoryName(product.category)}</div>\n        <h3 class="product-name">${product.name}</h3>\n        <p class="product-description">${product.description}</p>\n        <div class="product-rating">\n          <div class="stars">${generateStars(product.rating)}</div>\n          <span class="rating-count">(${product.reviews})</span>\n        </div>\n        <div class="product-footer">\n          <div class="product-price">R$ ${product.price.toFixed(2)}</div>\n          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">\n            <i data-lucide="shopping-cart"></i>\n          </button>\n        </div>\n      </div>\n    </div>`).join('');

  // Re-init icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function filterProducts(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  // tenta ativar botão pelo texto (fallback seguro)
  const normalized = (category === 'all') ? 'todos' : category.toLowerCase();
  const btnToActivate = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.textContent.trim().toLowerCase() === normalized);
  if (btnToActivate) btnToActivate.classList.add('active');
  loadProducts();
}

function searchProducts() {
  const searchInput = document.getElementById('product-search');
  if (!searchInput) return;
  searchQuery = searchInput.value || '';
  loadProducts();
}

function clearFilters() {
  currentFilter = 'all';
  searchQuery = '';
  const si = document.getElementById('product-search'); if (si) si.value = '';
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  const first = document.querySelector('.filter-btn'); if (first) first.classList.add('active');
  loadProducts();
}

// =====================================================
// Carrinho
// =====================================================
function addToCart(productId) {
  const product = PRODUCTS_DATABASE.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.quantity += 1; showToast('Produto Atualizado!', `${product.name} - Quantidade atualizada no carrinho`, 'success'); }
  else { cart.push({ ...product, quantity: 1 }); showToast('Produto Adicionado!', `${product.name} foi adicionado ao carrinho`, 'success'); }
  updateCartBadge(); saveCartToStorage();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const itemCount = cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
  badge.textContent = itemCount;
  badge.style.display = itemCount > 0 ? 'flex' : 'none';
}

function saveCartToStorage() { localStorage.setItem('outono-dourado-cart', JSON.stringify(cart)); }

function loadCartItems() {
  const container = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `\n      <div class="empty-cart">\n        <i data-lucide="shopping-cart"></i>\n        <p>Seu carrinho está vazio</p>\n        <button class="btn-primary" onclick="closeCart()">Continuar Comprando</button>\n      </div>`;
    if (cartTotal) cartTotal.style.display = 'none';
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    return;
  }
  container.innerHTML = cart.map(item => `\n    <div class="cart-item">\n      <img src="${item.image}" alt="${item.name}" class="cart-item-image">\n      <div class="cart-item-info">\n        <div class="cart-item-name">${item.name}</div>\n        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>\n        <div class="cart-item-controls">\n          <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>\n          <span class="quantity-display">${item.quantity}</span>\n          <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>\n          <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remover</button>\n        </div>\n      </div>\n    </div>`).join('');

  const total = cart.reduce((s, it) => s + (it.price * it.quantity), 0);
  const totalEl = document.getElementById('total-amount'); if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
  if (cartTotal) cartTotal.style.display = 'block';
  if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function openCart() { const modal = document.getElementById('cart-modal'); if (modal) { modal.style.display = 'flex'; loadCartItems(); } }
function closeCart() { const modal = document.getElementById('cart-modal'); if (modal) modal.style.display = 'none'; }

function updateCartQuantity(productId, newQuantity) {
  if (newQuantity < 1) { removeFromCart(productId); return; }
  const item = cart.find(i => i.id === productId);
  if (item) { item.quantity = newQuantity; updateCartBadge(); saveCartToStorage(); loadCartItems(); }
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  cart = cart.filter(i => i.id !== productId);
  showToast('Produto Removido', `${item.name} foi removido do carrinho`, 'success');
  updateCartBadge(); saveCartToStorage(); loadCartItems();
}

function checkout() {
  if (cart.length === 0) return;
  if (!isLoggedIn) { showToast('Login necessário', 'Faça login para finalizar seu pedido', 'error'); openLoginModal(); return; }
  const order = { id: 'ORD-' + Date.now(), date: new Date().toISOString(), items: [...cart], total: cart.reduce((s,i)=>s+(i.price*i.quantity),0), status: 'confirmed', userId: (currentUser && currentUser.id) || null };
  // Simula salvar pedido
  const orders = JSON.parse(localStorage.getItem('outono-dourado-orders') || '[]');
  orders.push(order);
  localStorage.setItem('outono-dourado-orders', JSON.stringify(orders));
  showToast('Pedido realizado', `Pedido ${order.id} confirmado!`, 'success');
  setTimeout(() => { cart = []; updateCartBadge(); saveCartToStorage(); closeCart(); }, 1500);
}

// =====================================================
// Modais e perfil (versões simples, compatíveis com seu HTML)
// =====================================================
function openLoginModal() { const modal = document.getElementById('login-modal'); if (modal) modal.style.display = 'block'; }
function openProfileModal() { const modal = document.getElementById('profile-modal'); if (modal) modal.style.display = 'block'; }

function openProductDetail(productId) {
  // Implementação simples: procura produto e mostra modal (se existir)
  selectedProduct = PRODUCTS_DATABASE.find(p => p.id === productId) || null;
  const detailModal = document.getElementById('product-detail-modal');
  if (!detailModal) return;
  // Preenche conteúdo (se tiver elementos esperados)
  const title = detailModal.querySelector('.detail-title');
  const desc = detailModal.querySelector('.detail-description');
  const price = detailModal.querySelector('.detail-price');
  if (title) title.textContent = selectedProduct ? selectedProduct.name : '';
  if (desc) desc.textContent = selectedProduct ? selectedProduct.description : '';
  if (price) price.textContent = selectedProduct ? `R$ ${selectedProduct.price.toFixed(2)}` : '';
  detailModal.style.display = 'flex';
}

// =====================================================
// Inicialização da página
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  updateCartBadge();
  initializeMascot();

  // Load cart
  const savedCart = localStorage.getItem('outono-dourado-cart');
  if (savedCart) { try { cart = JSON.parse(savedCart); updateCartBadge(); } catch(e) { cart = []; } }

  // Load user
  const savedUser = localStorage.getItem('outono-dourado-user');
  if (savedUser) { try { currentUser = JSON.parse(savedUser); isLoggedIn = true; isAdmin = currentUser.isAdmin || false; } catch(e) { currentUser = null; } }

  // Welcome toast
  setTimeout(() => {
    if (isLoggedIn && currentUser) showToast(`Bem-vindo de volta, ${currentUser.name || 'Usuário'}!`, 'Que bom ter você aqui novamente.', 'success');
    else showToast('Bem-vindo à Outono Dourado!', 'Descubra nossos produtos orgânicos frescos.', 'success');
  }, 1200);
});

// =====================================================
// Expor funções no escopo global (essencial — script é módulo)
// =====================================================
window.openLoginModal = openLoginModal;
window.openCart = openCart;
window.closeCart = closeCart;
window.openProfileModal = openProfileModal;
window.openProductDetail = openProductDetail;

window.scrollToSection = scrollToSection;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;
window.clearFilters = clearFilters;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;

window.toggleMascotMessage = toggleMascotMessage;
window.closeMascotMessage = closeMascotMessage;
window.toggleMobileMenu = toggleMobileMenu;

console.log('🌽 Funções globais carregadas com sucesso!');
