// Global state
let cartItems = [];
let products = [];
let currentCategory = 'all';
let mascotClicked = false;

// DOM elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartCount = document.getElementById('cart-count');
const cartContent = document.getElementById('cart-content');
const cartEmpty = document.getElementById('cart-empty');
const cartItemsContainer = document.getElementById('cart-items');
const cartFooter = document.getElementById('cart-footer');
const cartTotal = document.getElementById('cart-total');
const productsGrid = document.getElementById('products-grid');
const contactForm = document.getElementById('contact-form');
const mascot = document.getElementById('mascot');
const mascotImg = document.getElementById('mascot-img');

// Products data
const productsData = [
    {
        id: '1',
        name: 'Quinoa Orgânica Premium',
        description: 'Quinoa orgânica de alta qualidade, rica em proteínas e nutrientes essenciais.',
        price: 24.90,
        category: 'alimentos',
        image: 'banner.png'
    },
    {
        id: '2',
        name: 'Alface Orgânica',
        description: 'Alface fresca cultivada sem pesticidas, direto da horta para sua mesa.',
        price: 4.50,
        category: 'verduras',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=200&fit=crop'
    },
    {
        id: '3',
        name: 'Tomate Orgânico',
        description: 'Tomates orgânicos suculentos, cultivados com amor e cuidado.',
        price: 8.90,
        category: 'legumes',
        image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&h=200&fit=crop'
    },
    {
        id: '4',
        name: 'Arroz Integral Orgânico',
        description: 'Arroz integral orgânico, fonte de fibras e vitaminas do complexo B.',
        price: 12.90,
        category: 'alimentos',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop'
    },
    {
        id: '5',
        name: 'Espinafre Orgânico',
        description: 'Espinafre fresco e nutritivo, rico em ferro e vitaminas.',
        price: 6.90,
        category: 'verduras',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop'
    },
    {
        id: '6',
        name: 'Cenoura Orgânica',
        description: 'Cenouras orgânicas doces e crocantes, perfeitas para qualquer refeição.',
        price: 5.90,
        category: 'legumes',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=200&fit=crop'
    },
    {
        id: '7',
        name: 'Feijão Preto Orgânico',
        description: 'Feijão preto orgânico de alta qualidade, rico em proteínas.',
        price: 9.90,
        category: 'alimentos',
        image: 'https://images.unsplash.com/photo-1552944150-6dd1180e5999?w=300&h=200&fit=crop'
    },
    {
        id: '8',
        name: 'Rúcula Orgânica',
        description: 'Rúcula fresca com sabor levemente picante, ideal para saladas.',
        price: 5.50,
        category: 'verduras',
        image: 'https://images.unsplash.com/photo-1622207215967-82d3a2027f8c?w=300&h=200&fit=crop'
    },
    {
        id: '9',
        name: 'Abobrinha Orgânica',
        description: 'Abobrinhas orgânicas tenras e saborosas, versáteis na cozinha.',
        price: 7.90,
        category: 'legumes',
        image: 'https://images.unsplash.com/photo-1601316894833-dc8a1ddf95a8?w=300&h=200&fit=crop'
    },
    {
        id: '10',
        name: 'Granola Orgânica',
        description: 'Granola caseira com ingredientes orgânicos selecionados.',
        price: 18.90,
        category: 'alimentos',
        image: 'https://images.unsplash.com/photo-1571167907900-46525e4ad2c5?w=300&h=200&fit=crop'
    },
    {
        id: '11',
        name: 'Couve Orgânica',
        description: 'Couve orgânica nutritiva, excelente fonte de vitaminas A, C e K.',
        price: 4.90,
        category: 'verduras',
        image: 'https://images.unsplash.com/photo-1600450036275-34d0f60e48de?w=300&h=200&fit=crop'
    },
    {
        id: '12',
        name: 'Beterraba Orgânica',
        description: 'Beterrabas orgânicas doces e nutritivas, ricas em antioxidantes.',
        price: 6.50,
        category: 'legumes',
        image: 'https://images.unsplash.com/photo-1574623926978-fbe2f0bfb6f8?w=300&h=200&fit=crop'
    }
];

// Toast notification system
function showToast(message, type = 'success', description = '') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-header">
            <h4 class="toast-title">${message}</h4>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        ${description ? `<p class="toast-description">${description}</p>` : ''}
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Format price to Brazilian currency
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

// Update cart total
function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Render cart items
function renderCartItems() {
    if (cartItems.length === 0) {
        cartEmpty.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        cartFooter.style.display = 'block';
        
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m18 6-12 0"/>
                            <path d="m6 6 0 14c0 1 1 2 2 2h8c1 0 2-1 2-2l0-14"/>
                            <path d="m10 6 0-2c0-1 1-2 2-2h0c1 0 2 1 2 2l0 2"/>
                        </svg>
                    </button>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
            </div>
        `).join('');
        
        updateCartTotal();
    }
}

// Add to cart
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`${product.name} - Quantidade atualizada no carrinho!`);
    } else {
        cartItems.push({ ...product, quantity: 1 });
        showToast(`${product.name} adicionado ao carrinho!`);
    }
    
    updateCartCount();
    renderCartItems();
}

// Update quantity
function updateQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCartCount();
        renderCartItems();
    }
}

// Remove from cart
function removeFromCart(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        cartItems = cartItems.filter(item => item.id !== productId);
        showToast(`${item.name} removido do carrinho`);
        updateCartCount();
        renderCartItems();
    }
}

// Toggle cart sidebar
function toggleCart() {
    const isOpen = cartSidebar.classList.contains('open');
    
    if (isOpen) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Checkout function
function checkout() {
    showToast('Redirecionando para o pagamento...', 'success', 'Você será direcionado para nossa página de pagamento seguro.');
    
    // Simulate checkout process
    setTimeout(() => {
        cartItems = [];
        toggleCart();
        updateCartCount();
        renderCartItems();
        showToast('Pedido realizado com sucesso!', 'success', 'Você receberá um e-mail de confirmação em breve.');
    }, 2000);
}

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    renderProducts();
}

// Render products
function renderProducts() {
    const filteredProducts = currentCategory === 'all' 
        ? productsData 
        : productsData.filter(product => product.category === currentCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart" onclick="addToCart('${product.id}')">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'alimentos': 'Alimentos',
        'verduras': 'Verduras',
        'legumes': 'Legumes'
    };
    return categoryNames[category] || category;
}

// Map functions
function openMap(store) {
    const mapUrls = {
        'ectares': 'https://www.google.com/maps/place/R.+Eng.+Ant%C3%B4nio+Claret+Karas+-+Arauc%C3%A1ria,+PR/@-25.6848772,-49.4186732,17z/data=!3m1!4b1!4m6!3m5!1s0x94dd008571a186a1:0x24ea509cd0a7da44!8m2!3d-25.6848821!4d-49.4160983!16s%2Fg%2F11krpdcmx7?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D',
        'seed': 'https://maps.app.goo.gl/62FrNUfhoJcqwNjGA'
    };
    
    if (mapUrls[store]) {
        window.open(mapUrls[store], '_blank');
    }
}

// WhatsApp function
function openWhatsApp() {
    window.open('https://wa.me/5541999991234', '_blank');
}

// Mascot interaction
function initMascot() {
    mascot.addEventListener('click', () => {
        if (!mascotClicked) {
            mascotClicked = true;
            mascotImg.src = 'https://images.unsplash.com/photo-1440133197387-5a6020d5ace2?w=100&h=100&fit=crop&crop=face';
            mascotImg.alt = 'Milhito abraçando o Verdeco';
            showToast('Olá! Eu sou o Milhito!', 'success', 'Obrigado por clicar em mim! Agora estou abraçando meu amigo Verdeco! 🤗');
            
            // Reset after 5 seconds
            setTimeout(() => {
                mascotClicked = false;
                mascotImg.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face';
                mascotImg.alt = 'Milhito - Mascote da Outono Dourado';
            }, 5000);
        }
    });
}

// Contact form handling
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showToast('Mensagem enviada com sucesso!', 'success', 'Entraremos em contato em breve. Obrigado!');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize category filter buttons
function initCategoryFilters() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize intersection observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .product-card, .store-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    renderProducts();
    renderCartItems();
    updateCartCount();
    initMascot();
    initContactForm();
    initSmoothScrolling();
    initCategoryFilters();
    initHeaderScroll();
    initScrollAnimations();
    
    console.log('Outono Dourado website initialized successfully! 🍂');
});

// Handle escape key to close cart
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
});

// Handle window resize for responsive cart
window.addEventListener('resize', () => {
    if (window.innerWidth > 400 && cartSidebar.style.width === '100vw') {
        cartSidebar.style.width = '400px';
    } else if (window.innerWidth <= 400) {
        cartSidebar.style.width = '100vw';
    }
});