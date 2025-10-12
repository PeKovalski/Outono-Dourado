// Inicialização do Supabase (chaves seguras para client-side)
const SUPABASE_URL = 'https://khzrncdvwawmlmwfhoil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoenJuY2R2d2F3bWxtd2Zob2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTg5ODQsImV4cCI6MjA3NTA3NDk4NH0.aA-ecvCZgllSRD6ANnZN6FetHqPixTXlMgmxow6a2BU';

// Fallback para produtos (array original)
const PRODUCTS_DATABASE = [
    {
        id: "Milho",
        name: "Milho Premium",
        description: "Milho orgânico cultivado de forma sustentável, sem pesticidas, colhido fresquinho. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 24.90,
        category: "Legumes",
        image: "milho.jpeg",
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
        description: "Castanhas doces e saborosas, colhidas no outono, ricas em nutrientes e energia. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
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
        description: "Uvas selecionadas de vinhedos orgânicos, doces e suculentas, ricas em antioxidantes. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
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
        description: "Laranjas suculentas e doces, cultivadas organicamente, ricas em vitamina C. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 5.50,
        category: "Frutas",
        image: "laranja.jpeg",
        rating: 4.7,
        reviews: 92,
        inStock: true,
        tags: ["picante", "aromática", "gourmet", "pizza", "sofisticada"]
    },
    {
        id: "Brócolis Orgânico Fresco-009",
        name: "Brócolis Orgânico Fresco",
        description: "Brócolis orgânico fresco, rico em vitaminas e minerais, cultivado sem agrotóxicos. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 7.90,
        category: "Legumes",
        image: "brocolis.jpeg",
        rating: 4.5,
        reviews: 118,
        inStock: true,
        tags: ["italiana", "baixa-caloria", "versátil", "casca-comestível", "tenra"]
    },
    {
        id: "Batata Orgânicas Premium-010",
        name: "Batata Orgânicas Premium",
        description: "Batatas orgânicas frescas, cultivadas naturalmente sem agrotóxicos, ideais para diversos pratos. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
        price: 18.90,
        category: "Legumes",
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
        description: "Maçãs vermelhas selecionadas, cultivadas organicamente, doces e crocantes. Nossos produtos são cultivados com técnicas sustentáveis e orgânicas, garantindo a máxima qualidade nutricional e sabor autêntico.",
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
let currentUser = null;
let isLoggedIn = false;
let isAdmin = false;
let userOrders = [];

// Estado do mascote
const mascotMessages = [
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

// Inicialização principal
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM carregado. Iniciando app...');

    // Inicializa Supabase
    let supabase = null;
    if (window.supabase) {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('Supabase inicializado com sucesso.');
        } catch (error) {
            console.error('Erro ao inicializar Supabase:', error);
            showToast('Aviso', 'Supabase não disponível. Usando dados locais.', 'warning');
        }
    } else {
        console.error('CDN do Supabase não carregou. Verifique a conexão.');
        showToast('Erro', 'Falha ao carregar Supabase. Usando dados locais.', 'error');
    }

    // Inicializa elementos do DOM
    const mascotText = document.getElementById('mascot-text');
    const mascotMessageBox = document.getElementById('mascot-message');
    const toaster = document.getElementById('toaster');
    const cartBadge = document.getElementById('cart-badge');
    const authSection = document.getElementById('auth-section');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const userDropdown = document.getElementById('user-dropdown');
    const productsGrid = document.getElementById('products-grid');
    const adminProductsList = document.getElementById('admin-products-list');
    const checkoutItemsSummary = document.getElementById('checkout-items-summary');
    const checkoutTotalAmount = document.getElementById('checkout-total-amount');
    const pixQrImage = document.getElementById('pix-qr-image');
    const pixCodeInput = document.getElementById('pix-code-input');

    if (!mascotText || !mascotMessageBox || !toaster || !cartBadge || !authSection || !userMenu || !userName || !userDropdown || !productsGrid || !adminProductsList || !checkoutItemsSummary || !checkoutTotalAmount || !pixQrImage || !pixCodeInput) {
        console.error('Algum elemento do DOM não foi encontrado. Verifique o HTML.');
        // Continua sem crash, mas sem algumas funcionalidades
    }

    // Funções do mascote
    function toggleMascotMessage() {
        if (!mascotText || !mascotMessageBox) return;
        mascotText.textContent = mascotMessages[currentMascotMessage];
        mascotMessageBox.style.display = 'block';
        currentMascotMessage = (currentMascotMessage + 1) % mascotMessages.length;
        setTimeout(() => {
            mascotMessageBox.style.display = 'none';
        }, 10000);
    }

    function closeMascotMessage() {
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
            if (mascotMessageBox && (!mascotMessageBox.style.display || mascotMessageBox.style.display === 'none')) {
                toggleMascotMessage();
            }
        }, 30000);
    }

    // Carrega produtos
    async function loadProducts() {
        if (supabase) {
            try {
                const { data: products, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('name', { ascending: true });
                if (error) throw error;
                renderProducts(products || []);
            } catch (error) {
                console.error('Erro no Supabase. Usando fallback:', error);
                renderProducts(PRODUCTS_DATABASE);
            }
        } else {
            renderProducts(PRODUCTS_DATABASE);
        }
    }

    function renderProducts(products) {
        if (!productsGrid) return;
        const filteredProducts = products.filter(product => {
            const matchesFilter = currentFilter === 'all' || product.category.toLowerCase() === currentFilter.toLowerCase();
            const matchesSearch = searchQuery === '' || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesFilter && matchesSearch;
        });

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">Nenhum produto encontrado</div>';
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-content">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <span class="stars">${'★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span class="reviews">(${product.reviews} avaliações)</span>
                    </div>
                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                    <button class="btn-primary add-to-cart" onclick="addToCart('${product.id}')">Adicionar ao Carrinho</button>
                    <button class="btn-secondary view-details" onclick="openProductDetail('${product.id}')">Ver Detalhes</button>
                </div>
            </div>
        `).join('');
    }

    function updateCartBadge() {
        if (cartBadge) cartBadge.textContent = cart.length;
    }

    function updateAuthUI() {
        if (!authSection || !userMenu || !userName || !userDropdown) return;
        if (isLoggedIn) {
            authSection.querySelector('#auth-buttons').style.display = 'none';
            userMenu.style.display = 'flex';
            userName.textContent = currentUser.user_metadata?.name || 'Usuário';
        } else {
            authSection.querySelector('#auth-buttons').style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }

    function addToCart(productId) {
        const product = (supabase ? PRODUCTS_DATABASE : PRODUCTS_DATABASE).find(p => p.id === productId);
        if (product && product.inStock) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
            }
            localStorage.setItem('outono-dourado-cart', JSON.stringify(cart));
            updateCartBadge();
            showToast('Sucesso', `${product.name} adicionado ao carrinho!`, 'success');
        } else {
            showToast('Erro', 'Produto fora de estoque ou não encontrado.', 'error');
        }
    }

    function openProductDetail(productId) {
        selectedProduct = (supabase ? PRODUCTS_DATABASE : PRODUCTS_DATABASE).find(p => p.id === productId);
        if (selectedProduct) {
            document.getElementById('product-detail-name').textContent = selectedProduct.name;
            document.getElementById('product-detail-description').textContent = selectedProduct.description;
            document.getElementById('product-detail-price').textContent = `R$ ${selectedProduct.price.toFixed(2)}`;
            document.getElementById('product-detail-image').src = selectedProduct.image;
            document.getElementById('product-detail-rating').innerHTML = `${'★'.repeat(Math.floor(selectedProduct.rating)) + '☆'.repeat(5 - Math.floor(selectedProduct.rating))} (${selectedProduct.reviews} avaliações)`;
            document.getElementById('detail-quantity').value = detailQuantity;
            document.getElementById('product-detail-modal').style.display = 'block';
        }
    }

    function closeProductDetail() {
        document.getElementById('product-detail-modal').style.display = 'none';
    }

    function updateQuantity(change) {
        detailQuantity = Math.max(1, detailQuantity + change);
        document.getElementById('detail-quantity').value = detailQuantity;
    }

    function addToCartFromDetail() {
        for (let i = 0; i < detailQuantity; i++) addToCart(selectedProduct.id);
        closeProductDetail();
    }

    function openCart() {
        if (!isLoggedIn) {
            showToast('Aviso', 'Faça login para ver o carrinho.', 'warning');
            openLoginModal();
            return;
        }
        const cartModal = document.getElementById('cart-modal');
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = cart.map(item => {
                const product = (supabase ? PRODUCTS_DATABASE : PRODUCTS_DATABASE).find(p => p.id === item.id);
                return product ? `
                    <div class="cart-item">
                        <span>${product.name} x${item.quantity}</span>
                        <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="btn-remove" onclick="removeFromCart('${item.id}')">Remover</button>
                    </div>
                ` : '';
            }).join('');
            document.getElementById('cart-total').textContent = `R$ ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
            cartModal.style.display = 'block';
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('outono-dourado-cart', JSON.stringify(cart));
        updateCartBadge();
        openCart();
        showToast('Removido', 'Item removido do carrinho.', 'success');
    }

    function closeCart() {
        document.getElementById('cart-modal').style.display = 'none';
    }

    function openLoginModal() {
        document.getElementById('login-modal').style.display = 'block';
    }

    function closeLoginModal() {
        document.getElementById('login-modal').style.display = 'none';
    }

    function openRegisterModal() {
        document.getElementById('register-modal').style.display = 'block';
    }

    function closeRegisterModal() {
        document.getElementById('register-modal').style.display = 'none';
    }

    function openProfileModal() {
        if (!isLoggedIn) {
            showToast('Aviso', 'Faça login para ver o perfil.', 'warning');
            openLoginModal();
            return;
        }
        document.getElementById('profile-modal').style.display = 'block';
    }

    function closeProfileModal() {
        document.getElementById('profile-modal').style.display = 'none';
    }

    function toggleUserDropdown() {
        if (!userDropdown) return;
        userDropdown.classList.toggle('open');
    }

    function showOrderHistory() {
        if (!isLoggedIn) {
            showToast('Aviso', 'Faça login para ver seus pedidos.', 'warning');
            openLoginModal();
            return;
        }
        loadOrderHistory();
        document.getElementById('order-history-modal').style.display = 'block';
    }

    function closeOrderHistory() {
        document.getElementById('order-history-modal').style.display = 'none';
    }

    function loadOrderHistory() {
        if (!adminProductsList) return;
        adminProductsList.innerHTML = userOrders.map(order => `
            <div class="tracking-card">
                <div class="tracking-date">${formatDate(order.date)}</div>
                <div class="tracking-route">
                    <!-- Simples para agora -->
                </div>
                <div class="tracking-timeline">
                    <!-- Simples para agora -->
                </div>
                <div class="tracking-actions">
                    <button class="btn-secondary" onclick="downloadReceipt('${order.id}')">Baixar Comprovante</button>
                    <button class="btn-secondary" onclick="emailReceipt('${order.id}')">Enviar por E-mail</button>
                </div>
            </div>
        `).join('');
    }

    function loadOrderTracking() {
        // Implemente conforme sua lógica original
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString('pt-BR');
    }

    function downloadReceipt(orderId) {
        const order = userOrders.find(o => o.id === orderId);
        if (!order) return;
        const receiptHTML = generateReceiptHTML(order);
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Comprovante_Pedido_${orderId}_OutonoDourado.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Sucesso', 'Comprovante baixado!', 'success');
    }

    function emailReceipt(orderId) {
        showToast('Simulação', 'E-mail enviado (funcionalidade simulada).', 'success');
    }

    function generateReceiptHTML(order) {
        return `<!DOCTYPE html><html><head><title>Comprovante</title></head><body><h1>Comprovante ${order.id}</h1></body></html>`;
    }

    function openCheckoutModal() {
        if (!isLoggedIn) {
            showToast('Aviso', 'Faça login para finalizar o pedido.', 'warning');
            openLoginModal();
            return;
        }
        if (cart.length === 0) {
            showToast('Aviso', 'Seu carrinho está vazio.', 'warning');
            return;
        }
        const modal = document.getElementById('checkout-modal');
        if (checkoutItemsSummary && checkoutTotalAmount) {
            checkoutItemsSummary.innerHTML = cart.map(item => {
                const product = (supabase ? PRODUCTS_DATABASE : PRODUCTS_DATABASE).find(p => p.id === item.id);
                return product ? `<div>${product.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</div>` : '';
            }).join('');
            checkoutTotalAmount.textContent = `R$ ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
            modal.style.display = 'block';
        }
    }

    function closeCheckoutModal() {
        document.getElementById('checkout-modal').style.display = 'none';
    }

    function selectPaymentMethod(method) {
        document.querySelectorAll('.payment-content').forEach(el => el.classList.remove('active'));
        document.getElementById(`${method}-payment`).classList.add('active');
        document.querySelectorAll('.payment-tab').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }

    function copyPixCode() {
        if (pixCodeInput) {
            pixCodeInput.select();
            document.execCommand('copy');
            showToast('Copiado', 'Código PIX copiado!', 'success');
        }
    }

    function confirmPayment(method) {
        const order = {
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            paymentMethod: method,
            date: new Date().toISOString()
        };
        saveOrderToSupabase(order);
        cart = [];
        localStorage.setItem('outono-dourado-cart', JSON.stringify(cart));
        updateCartBadge();
        closeCheckoutModal();
        showToast('Sucesso', 'Pagamento confirmado! Pedido salvo.', 'success');
    }

    async function login(email, password) {
        if (!supabase) {
            showToast('Erro', 'Autenticação não disponível.', 'error');
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            showToast('Erro no Login', error.message, 'error');
            return;
        }
        currentUser = data.user;
        isLoggedIn = true;
        isAdmin = data.user.user_metadata?.isAdmin || false;
        updateAuthUI();
        await loadUserOrders();
        showToast('Sucesso', `Bem-vindo, ${data.user.user_metadata.name}!`, 'success');
        closeLoginModal();
    }

    async function register(name, email, password) {
        if (!supabase) {
            showToast('Erro', 'Registro não disponível.', 'error');
            return;
        }
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } }
        });
        if (error) {
            showToast('Erro no Registro', error.message, 'error');
            return;
        }
        showToast('Sucesso', 'Registro realizado! Verifique seu e-mail.', 'success');
        closeRegisterModal();
    }

    async function logout() {
        if (!supabase) {
            showToast('Erro', 'Logout não disponível.', 'error');
            return;
        }
        const { error } = await supabase.auth.signOut();
        if (error) {
            showToast('Erro', error.message, 'error');
            return;
        }
        currentUser = null;
        isLoggedIn = false;
        isAdmin = false;
        userOrders = [];
        updateAuthUI();
        showToast('Sucesso', 'Logout realizado!', 'success');
    }

    async function loadUserOrders() {
        if (!supabase || !currentUser) return;
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('date', { ascending: false });
        if (error) {
            console.error('Erro ao carregar pedidos:', error);
            return;
        }
        userOrders = orders;
        loadOrderHistory();
    }

    async function saveOrderToSupabase(order) {
        if (!supabase || !currentUser) {
            showToast('Erro', 'Falha ao salvar pedido. Faça login.', 'error');
            return;
        }
        const { data, error } = await supabase
            .from('orders')
            .insert({
                user_id: currentUser.id,
                items: order.items,
                total: order.total,
                status: 'confirmed',
                date: order.date,
                paymentMethod: order.paymentMethod
            })
            .select();
        if (error) {
            showToast('Erro', error.message, 'error');
            return;
        }
        userOrders.push(data[0]);
    }

    function showToast(title, message, type = 'info') {
        if (!toaster) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<div style="font-weight: 600; margin-bottom: 4px;">${title}</div><div style="font-size: 14px; color: #6b7280;">${message}</div>`;
        toaster.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    // Inicializa app
    initializeMascot();
    await loadProducts();

    // Carrega carrinho
    const savedCart = localStorage.getItem('outono-dourado-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }

    // Verifica sessão
    if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUser = session.user;
            isLoggedIn = true;
            isAdmin = currentUser.user_metadata?.isAdmin || false;
            updateAuthUI();
            await loadUserOrders();
        }
    }

    // Welcome message
    setTimeout(() => {
        if (isLoggedIn) {
            showToast(`Bem-vindo de volta, ${currentUser.user_metadata.name}!`, 'Que bom ter você aqui novamente.', 'success');
        } else {
            showToast('Bem-vindo à Outono Dourado!', 'Descubra nossos produtos orgânicos frescos.', 'success');
        }
    }, 1000);

    // Expõe funções globais
    window.toggleMascotMessage = toggleMascotMessage;
    window.closeMascotMessage = closeMascotMessage;
    window.addToCart = addToCart;
    window.openProductDetail = openProductDetail;
    window.closeProductDetail = closeProductDetail;
    window.updateQuantity = updateQuantity;
    window.addToCartFromDetail = addToCartFromDetail;
    window.openCart = openCart;
    window.closeCart = closeCart;
    window.removeFromCart = removeFromCart;
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.openRegisterModal = openRegisterModal;
    window.closeRegisterModal = closeRegisterModal;
    window.login = login;
    window.register = register;
    window.logout = logout;
    window.openProfileModal = openProfileModal;
    window.closeProfileModal = closeProfileModal;
    window.toggleUserDropdown = toggleUserDropdown;
    window.showOrderHistory = showOrderHistory;
    window.closeOrderHistory = closeOrderHistory;
    window.openCheckoutModal = openCheckoutModal;
    window.closeCheckoutModal = closeCheckoutModal;
    window.selectPaymentMethod = selectPaymentMethod;
    window.copyPixCode = copyPixCode;
    window.confirmPayment = confirmPayment;
});