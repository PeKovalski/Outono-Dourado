// script.js — versão completa, corrigida e funcional
// Import módulo Supabase (primeira linha)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// === Supabase (suas credenciais) ===
const SUPABASE_URL = 'https://khzrncdvwawmlmwfhoil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoenJuY2R2d2F3bWxtd2Zob2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTg5ODQsImV4cCI6MjA3NTA3NDk4NH0.aA-ecvCZgllSRD6ANnZN6FetHqPixTXlMgmxow6a2BU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('✅ script.js carregado e Supabase conectado!');

// Teste curto (não falha caso tabela não exista)
(async () => {
  try {
    const { data, error } = await supabase.from('produtos').select('*').limit(1);
    if (error) console.warn('⚠️ Supabase teste: tabela "produtos" não disponível ou erro:', error.message);
    else console.log('🟢 Supabase funcionando! Exemplo de dados:', data);
  } catch (err) {
    console.warn('⚠️ Erro ao testar Supabase (normal em dev):', err?.message ?? err);
  }
})();

// ======================================================
// Produtos (LOCAL) - mantive dados principais (pode adicionar mais itens)
// ======================================================
const PRODUCTS_DATABASE = [
  { id:"Milho", name:"Milho Premium", description:"Milho orgânico cultivado de forma sustentável...", price:24.90, category:"Legumes", image:"milho.jpeg", rating:4.8, reviews:127, inStock:true, tags:["premium","proteína","vegano"] },
  { id:"alface-organica-crespa-002", name:"Alface Orgânica Crespa Verde", description:"Alface crespa fresca cultivada sem pesticidas...", price:4.50, category:"Verduras", image:"alface.jpeg", rating:4.6, reviews:89, inStock:true, tags:["fresco","verduras"] },
  { id:"Tomate", name:"Tomate Orgânico Fresco", description:"Tomates orgânicos da variedade italiana...", price:8.90, category:"Frutas", image:"tomate.jpeg", rating:4.7, reviews:156, inStock:true, tags:["italiano","suculento"] },
  { id:"Abóbora Orgânica Premium", name:"Abóbora Orgânica Premium", description:"Abóboras orgânicas selecionadas...", price:12.90, category:"Legumes", image:"abobora.jpeg", rating:4.5, reviews:203, inStock:true, tags:["tradicional","fibras"] },
  { id:"Castanhas Orgânicas Premium-005", name:"Castanhas Orgânicas Premium", description:"Castanhas doces e saborosas...", price:6.90, category:"Frutas", image:"castanha.jpeg", rating:4.9, reviews:78, inStock:true, tags:["gourmet","antioxidante"] },
  { id:"Cenoura Premium", name:"Cenoura Orgânica Nantes Doce", description:"Cenouras orgânicas da variedade Nantes...", price:5.90, category:"Verduras", image:"cenouras.jpeg", rating:4.6, reviews:142, inStock:true, tags:["doce","crocante"] },
  { id:"Tomate_002", name:"Tomate Cereja Orgânico", description:"Tomate cereja doce e suculento...", price:10.50, category:"Frutas", image:"tomate_cereja.jpeg", rating:4.7, reviews:55, inStock:true, tags:["cereja","suculento"] },
  { id:"Uvas Orgânicas Premium-007", name:"Uvas Orgânicas Premium", description:"Uvas selecionadas de vinhedos orgânicos...", price:9.90, category:"Frutas", image:"uva.jpeg", rating:4.4, reviews:167, inStock:true, tags:["antioxidantes","brasileiro"] },
  { id:"Laranjas Orgânicas Premium-008", name:"Laranjas Orgânicas Premium", description:"Laranjas suculentas e doces...", price:5.50, category:"Frutas", image:"laranja.jpeg", rating:4.7, reviews:92, inStock:true, tags:["vitamina-c"] },
  { id:"Brócolis Orgânico Fresco-009", name:"Brócolis Orgânico Fresco", description:"Brócolis orgânico fresco...", price:7.90, category:"Legumes", image:"brocolis.jpeg", rating:4.5, reviews:118, inStock:true, tags:["versátil","baixo-caloria"] },
  { id:"Batata Orgânicas Premium-010", name:"Batata Orgânicas Premium", description:"Batatas orgânicas frescas...", price:18.90, category:"Legumes", image:"batata.jpeg", rating:4.8, reviews:189, inStock:true, tags:["artesanal"] },
  { id:"Batata Doce Premim-011", name:"Batata Doce Orgânica Premium", description:"Batata doce orgânica naturalmente doce...", price:4.90, category:"Legumes", image:"batatadoce.jpeg", rating:4.6, reviews:134, inStock:true, tags:["tradicional"] },
  { id:"Maçã Orgânica Premium-012", name:"Maçã Orgânica Premium", description:"Maçãs vermelhas selecionadas...", price:6.50, category:"Frutas", image:"maça.jpeg", rating:4.4, reviews:108, inStock:true, tags:["doce","antioxidante"] }
];

// ======================================================
// Estado da app
// ======================================================
let cart = [];
let currentFilter = 'all';
let searchQuery = '';
let selectedProduct = null;
let detailQuantity = 1;

let currentUser = null;
let isLoggedIn = false;
let isAdmin = false;

// Mascote
let mascotMessages = [
  "Olá! Eu sou o Milhito🌽!",
  "Sou primo do verdeco! Nossas empressas são socias! 🥬",
  "NOSSOS PRODUTOS SÃO PREMIUNSSSSSS!!!!JURO!!",
  "E você ainda pensa em comprar do concorrente 🙄",
  "Vou ali pegar um regador🚿, tá? É que seu raciocínio é tão lento que é preciso regar para ver se cresce.🌝",
  "Algumas pessoas me inspiram tanto a nunca ser como elas! Juro!",
  "Grandes batalhas só são dadas a grandes guerreiros.Vulgo os trabalhadores da Outono♻️",
  "Não Deu Valor? Desculpa, Mais Não Sou A Globo, Tenho Certeza Que Nossa História Não Vale A Pena Ver De Novo🌞(ex-socios)"
];
let currentMascotMessage = 0;

// ======================================================
// Funções do mascote (únicas, sem duplicação)
// ======================================================
function toggleMascotMessage() {
  const mascotText = document.getElementById('mascot-text');
  const mascotMessageBox = document.getElementById('mascot-message');
  if (!mascotText || !mascotMessageBox) return;
  mascotText.textContent = mascotMessages[currentMascotMessage] || 'Olá!';
  mascotMessageBox.style.display = 'block';
  currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;
  setTimeout(() => { mascotMessageBox.style.display = 'none'; }, 10000);
}
function closeMascotMessage() {
  const mascotMessageBox = document.getElementById('mascot-message');
  if (!mascotMessageBox) return;
  mascotMessageBox.style.display = 'none';
}
function initializeMascot() {
  setTimeout(() => {
    const mascot = document.getElementById('mascot');
    if (mascot) { mascot.style.opacity = '1'; mascot.style.transform = 'translateY(0)'; }
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

// ======================================================
// Utilitários UI
// ======================================================
function showToast(title, message, type = 'info') {
  const toaster = document.getElementById('toaster');
  if (!toaster) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div style="font-weight:600;margin-bottom:4px;">${title}</div><div style="font-size:14px;color:#6b7280;">${message}</div>`;
  toaster.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 5000);
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

// ======================================================
// Produtos — render e filtros
// ======================================================
function getCategoryName(category) {
  const categoryNames = { alimentos:'Alimentos', verduras:'Verduras', legumes:'Legumes', frutas:'Frutas' };
  return categoryNames[category?.toLowerCase?.()] || category;
}
function generateStars(rating) {
  let stars = '';
  const r = Math.round(rating || 0);
  for (let i = 1; i <= 5; i++) stars += (i <= r) ? '<span class="star">★</span>' : '<span class="star" style="color:#000000ff;">★</span>';
  return stars;
}
function loadProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const filteredProducts = PRODUCTS_DATABASE.filter(product => {
    const matchesFilter = currentFilter === 'all' || (product.category && product.category.toLowerCase() === currentFilter.toLowerCase());
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch = !q || (product.name && product.name.toLowerCase().includes(q)) || (product.description && product.description.toLowerCase().includes(q)) || (product.tags && product.tags.some(t => t.toLowerCase().includes(q)));
    return matchesFilter && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;"><p style="color:rgba(0,0,0,1);font-size:1.125rem;">Nenhum produto encontrado</p><button class="btn-primary" onclick="clearFilters()" style="margin-top:1rem;">Limpar Filtros</button></div>`;
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    return;
  }

  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card fade-in" onclick="openProductDetail('${product.id}')">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badges"><div class="product-badge"><i data-lucide="leaf"></i>Orgânico</div></div>
      </div>
      <div class="product-content">
        <div class="product-category">${getCategoryName(product.category)}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-rating"><div class="stars">${generateStars(product.rating)}</div><span class="rating-count">(${product.reviews})</span></div>
        <div class="product-footer">
          <div class="product-price">R$ ${product.price.toFixed(2)}</div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')"><i data-lucide="shopping-cart"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function filterProducts(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  // tenta ativar botão pelo texto (fallback)
  const normalized = (category === 'all') ? 'todos' : category.toLowerCase();
  const btnToActivate = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.textContent.trim().toLowerCase() === normalized);
  if (btnToActivate) btnToActivate.classList.add('active');
  loadProducts();
}

function searchProducts() {
  const input = document.getElementById('product-search');
  searchQuery = input ? input.value : '';
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

// ======================================================
// Carrinho
// ======================================================
function addToCart(productId) {
  const product = PRODUCTS_DATABASE.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.quantity = (existing.quantity || 1) + 1; showToast('Produto Atualizado!', `${product.name} - Quantidade atualizada no carrinho`, 'success'); }
  else { cart.push({ ...product, quantity: 1 }); showToast('Produto Adicionado!', `${product.name} foi adicionado ao carrinho`, 'success'); }
  updateCartBadge(); saveCartToStorage();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const itemCount = cart.reduce((s,i) => s + (i.quantity || 0), 0);
  badge.textContent = itemCount;
  badge.style.display = itemCount > 0 ? 'flex' : 'none';
}

function saveCartToStorage() { localStorage.setItem('outono-dourado-cart', JSON.stringify(cart)); }

function loadCartItems() {
  const container = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!container) return;
  if (!cart || cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><i data-lucide="shopping-cart"></i><p>Seu carrinho está vazio</p><button class="btn-primary" onclick="closeCart()">Continuar Comprando</button></div>`;
    if (cartTotal) cartTotal.style.display = 'none';
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map(item => `
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

  const total = cart.reduce((s,i) => s + (i.price * i.quantity), 0);
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
  const order = { id: 'ORD-' + Date.now(), date: new Date().toISOString(), items: [...cart], total: cart.reduce((s,i)=>s+(i.price*i.quantity),0), status:'confirmed', userId: (currentUser && currentUser.id) || null };
  const orders = JSON.parse(localStorage.getItem('outono-dourado-orders') || '[]'); orders.push(order); localStorage.setItem('outono-dourado-orders', JSON.stringify(orders));
  showToast('Pedido realizado', `Pedido ${order.id} confirmado!`, 'success');
  setTimeout(() => { cart = []; updateCartBadge(); saveCartToStorage(); closeCart(); }, 1500);
}

// ======================================================
// Modais, produto detalhe e perfil
// ======================================================
function openLoginModal() { const m = document.getElementById('login-modal'); if (m) m.style.display = 'block'; }
function closeLoginModal() { const m = document.getElementById('login-modal'); if (m) m.style.display = 'none'; }

function openProfileModal() { const m = document.getElementById('profile-modal'); if (m) m.style.display = 'block'; }
function closeProfileModal() { const m = document.getElementById('profile-modal'); if (m) m.style.display = 'none'; }

function openProductDetail(productId) {
  selectedProduct = PRODUCTS_DATABASE.find(p => p.id === productId) || null;
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;
  const title = modal.querySelector('.detail-title'); if (title) title.textContent = selectedProduct ? selectedProduct.name : '';
  const desc = modal.querySelector('.detail-description'); if (desc) desc.textContent = selectedProduct ? selectedProduct.description : '';
  const price = modal.querySelector('.detail-price'); if (price && selectedProduct) price.textContent = `R$ ${selectedProduct.price.toFixed(2)}`;
  modal.style.display = 'flex';
}
function closeProductDetail() { const m = document.getElementById('product-detail-modal'); if (m) m.style.display = 'none'; }

// ======================================================
// Inicialização - carregar estado do localStorage e UI
// ======================================================
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  updateCartBadge();
  initializeMascot();

  // load cart
  try {
    const savedCart = localStorage.getItem('outono-dourado-cart');
    if (savedCart) { cart = JSON.parse(savedCart); updateCartBadge(); }
  } catch(e) { cart = []; }

  // load user
  try {
    const savedUser = localStorage.getItem('outono-dourado-user');
    if (savedUser) { currentUser = JSON.parse(savedUser); isLoggedIn = true; isAdmin = currentUser.isAdmin || false; }
  } catch(e) { currentUser = null; }

  setTimeout(() => {
    if (isLoggedIn && currentUser) showToast(`Bem-vindo de volta, ${currentUser.name || 'Usuário'}!`, 'Que bom ter você aqui novamente.', 'success');
    else showToast('Bem-vindo à Outono Dourado!', 'Descubra nossos produtos orgânicos frescos.', 'success');
  }, 1000);
});

// ======================================================
// Compatibilidade extra: handlers de fechar e init lucide
// ======================================================
(function addCompatibilityFixes(){
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  });

  function closeLoginModalFallback() { closeLoginModal(); }
  function closeProfileModalFallback() { closeProfileModal(); }
  function closeProductDetailFallback() { closeProductDetail(); }

  window.closeLoginModal = closeLoginModalFallback;
  window.closeProfileModal = closeProfileModalFallback;
  window.closeProductDetail = closeProductDetailFallback;

  function attachCloseListeners(){
    document.querySelectorAll('[data-close], .modal-close, .close-btn, .mascot-close').forEach(btn => {
      if (btn.__closeAttached) return;
      btn.__closeAttached = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.target || btn.getAttribute('data-target');
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) { targetEl.style.display = 'none'; return; }
        }
        const modal = btn.closest('.modal') || btn.closest('.mascot-message') || btn.closest('[id$="modal"]');
        if (modal) modal.style.display = 'none';
      });
    });
  }
  document.addEventListener('DOMContentLoaded', attachCloseListeners);
  try { attachCloseListeners(); } catch(e){}
  console.log('🔧 Patch de compatibilidade aplicado: close handlers + lucide init');
})();

// ======================================================
// Expõe funções ao escopo global (essencial — script é módulo)
// ======================================================
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openCart = openCart;
window.closeCart = closeCart;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.openProductDetail = openProductDetail;
window.closeProductDetail = closeProductDetail;

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
