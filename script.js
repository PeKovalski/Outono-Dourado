// script.js - Sistema de Gerenciamento de Alimentos
// Configuração do Supabase
const SUPABASE_URL = 'https://whxlgangulxkmrrzoygu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoeGxnYW5ndWx4a21ycnpveWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDU3MDcsImV4cCI6MjA3NjI4MTcwN30.j5mnEJN9If4QbB_okYEvWMzH_faQWgWg7B1MlqpuJrI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dados padrão de alimentos (fallback)
const defaultAlimentos = [
    {
        id: 1,
        nome: "Alface Crespa",
        descricao: "Alface orgânica fresca, cultivada sem agrotóxicos",
        preco: 3.50,
        categoria: "verduras",
        imagem: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
        tags: ["orgânico", "fresco", "local"]
    },
    {
        id: 2,
        nome: "Rúcula",
        descricao: "Rúcula fresca com sabor característico",
        preco: 4.00,
        categoria: "verduras", 
        imagem: "https://images.unsplash.com/photo-1594282482151-1c4d8d4e6c7b?w=400",
        tags: ["orgânico", "fresco"]
    },
    {
        id: 3,
        nome: "Tomate",
        descricao: "Tomates vermelhos maduros e suculentos",
        preco: 6.00,
        categoria: "legumes",
        imagem: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        tags: ["orgânico", "maduro"]
    },
    {
        id: 4,
        nome: "Cenoura",
        descricao: "Cenouras crocantes e doces",
        preco: 5.50,
        categoria: "legumes",
        imagem: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
        tags: ["orgânico", "doce"]
    },
    {
        id: 5,
        nome: "Maçã Verde",
        descricao: "Maçãs verdes crocantes e refrescantes",
        preco: 7.00,
        categoria: "frutas",
        imagem: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
        tags: ["orgânico", "crocante"]
    },
    {
        id: 6, 
        nome: "Banana Prata",
        descricao: "Bananas maduras e doces",
        preco: 4.50,
        categoria: "frutas",
        imagem: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
        tags: ["orgânico", "doce"]
    },
    {
        id: 7,
        nome: "Laranja Pera",
        descricao: "Laranjas suculentas e doces",
        preco: 5.00,
        categoria: "frutas", 
        imagem: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
        tags: ["orgânico", "suculenta"]
    },
    {
        id: 8,
        nome: "Morango",
        descricao: "Morangos vermelhos e doces",
        preco: 8.50,
        categoria: "frutas",
        imagem: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400",
        tags: ["orgânico", "doce"]
    }
];

// Variáveis globais
let todosAlimentos = [];
let filtroAtual = 'todos';
let buscaAtual = '';
let carrinho = [];

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', function() {
    carregarAlimentos();
    inicializarEventListeners();
    atualizarBadgeCarrinho();
});

/**
 * Carrega alimentos do Supabase ou usa os padrões
 */
async function carregarAlimentos() {
    try {
        console.log('🥦 Carregando alimentos do Supabase...');
        
        const { data: alimentos, error } = await supabase
            .from('alimentos')
            .select('*')
            .order('nome');

        if (error) throw error;

        if (alimentos && alimentos.length > 0) {
            todosAlimentos = alimentos;
            console.log(`✅ ${alimentos.length} alimentos carregados do Supabase`);
        } else {
            todosAlimentos = defaultAlimentos;
            console.log('⚠️ Usando alimentos padrão');
        }
        
        exibirAlimentos(todosAlimentos);
        
    } catch (erro) {
        console.error('❌ Erro ao carregar alimentos:', erro);
        todosAlimentos = defaultAlimentos;
        exibirAlimentos(todosAlimentos);
    }
}

/**
 * Exibe os alimentos na grade
 */
function exibirAlimentos(alimentos) {
    const gradeAlimentos = document.getElementById('products-grid');
    
    if (!gradeAlimentos) {
        console.error('❌ Elemento products-grid não encontrado');
        return;
    }

    if (alimentos.length === 0) {
        gradeAlimentos.innerHTML = `
            <div class="nenhum-alimento">
                <i data-lucide="search-x"></i>
                <h3>Nenhum alimento encontrado</h3>
                <p>Tente ajustar os filtros ou termos de busca</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    gradeAlimentos.innerHTML = alimentos.map(alimento => `
        <div class="card-alimento" data-categoria="${alimento.categoria}">
            <div class="imagem-alimento">
                <img src="${alimento.imagem}" 
                     alt="${alimento.nome}" 
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400'">
                <button class="btn-visualizacao-rapida" onclick="abrirDetalheAlimento(${alimento.id})">
                    <i data-lucide="eye"></i>
                </button>
            </div>
            <div class="info-alimento">
                <h3 class="nome-alimento">${alimento.nome}</h3>
                <p class="descricao-alimento">${alimento.descricao}</p>
                <div class="preco-alimento">R$ ${alimento.preco.toFixed(2)}</div>
                <div class="badge-categoria">${obterLabelCategoria(alimento.categoria)}</div>
                <button class="btn-adicionar-carrinho" onclick="adicionarAoCarrinho(${alimento.id})">
                    <i data-lucide="shopping-cart"></i>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

/**
 * Filtra alimentos por categoria
 */
function filtrarAlimentos(categoria) {
    filtroAtual = categoria;
    
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(botao => {
        botao.classList.remove('active');
    });
    event.target.classList.add('active');
    
    aplicarFiltros();
}

/**
 * Busca alimentos por termo
 */
function buscarAlimentos() {
    const inputBusca = document.getElementById('product-search');
    if (inputBusca) {
        buscaAtual = inputBusca.value.toLowerCase().trim();
        aplicarFiltros();
    }
}

/**
 * Aplica filtros e busca simultaneamente
 */
function aplicarFiltros() {
    let alimentosFiltrados = todosAlimentos;
    
    // Aplica filtro de categoria
    if (filtroAtual !== 'todos') {
        alimentosFiltrados = alimentosFiltrados.filter(alimento => 
            alimento.categoria === filtroAtual
        );
    }
    
    // Aplica filtro de busca
    if (buscaAtual) {
        alimentosFiltrados = alimentosFiltrados.filter(alimento =>
            alimento.nome.toLowerCase().includes(buscaAtual) ||
            alimento.descricao.toLowerCase().includes(buscaAtual) ||
            (alimento.tags && alimento.tags.some(tag => 
                tag.toLowerCase().includes(buscaAtual)
            ))
        );
    }
    
    exibirAlimentos(alimentosFiltrados);
}

/**
 * Retorna label formatada para categoria
 */
function obterLabelCategoria(categoria) {
    const labels = {
        'verduras': '🥬 Verdura',
        'legumes': '🥕 Legume', 
        'frutas': '🍎 Fruta',
        'alimentos': '🛒 Alimento',
        'bebidas': '🥤 Bebida',
        'laticinios': '🥛 Laticínio'
    };
    return labels[categoria] || categoria;
}

/**
 * Inicializa todos os event listeners
 */
function inicializarEventListeners() {
    // Busca em tempo real
    const inputBusca = document.getElementById('product-search');
    if (inputBusca) {
        inputBusca.addEventListener('input', buscarAlimentos);
    }
    
    // Tecla Enter na busca
    if (inputBusca) {
        inputBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarAlimentos();
            }
        });
    }
    
    // Limpar busca
    const btnLimparBusca = document.getElementById('btn-limpar-busca');
    if (btnLimparBusca) {
        btnLimparBusca.addEventListener('click', function() {
            document.getElementById('product-search').value = '';
            buscaAtual = '';
            aplicarFiltros();
        });
    }
}

// ========== GERENCIAMENTO DO CARRINHO ==========

/**
 * Adiciona alimento ao carrinho
 */
function adicionarAoCarrinho(alimentoId) {
    const alimento = todosAlimentos.find(a => a.id === alimentoId);
    
    if (alimento) {
        const itemExistente = carrinho.find(item => item.id === alimentoId);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                ...alimento,
                quantidade: 1
            });
        }
        
        atualizarBadgeCarrinho();
        exibirToast(`${alimento.nome} adicionado ao carrinho!`, 'success');
        
        console.log(`🛒 ${alimento.nome} adicionado. Total: ${obterTotalItensCarrinho()} itens`);
    }
}

/**
 * Remove item do carrinho
 */
function removerDoCarrinho(alimentoId) {
    carrinho = carrinho.filter(item => item.id !== alimentoId);
    atualizarBadgeCarrinho();
    exibirToast('Item removido do carrinho', 'info');
}

/**
 * Atualiza quantidade no carrinho
 */
function atualizarQuantidadeCarrinho(alimentoId, novaQuantidade) {
    const item = carrinho.find(item => item.id === alimentoId);
    
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(alimentoId);
        } else {
            item.quantidade = novaQuantidade;
            atualizarBadgeCarrinho();
        }
    }
}

/**
 * Calcula total de itens no carrinho
 */
function obterTotalItensCarrinho() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

/**
 * Calcula valor total do carrinho
 */
function obterValorTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

/**
 * Atualiza badge do carrinho
 */
function atualizarBadgeCarrinho() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItens = obterTotalItensCarrinho();
        badge.textContent = totalItens;
        badge.style.display = totalItens > 0 ? 'flex' : 'none';
    }
}

// ========== NOTIFICAÇÕES E MODAIS ==========

/**
 * Exibe notificação toast
 */
function exibirToast(mensagem, tipo = 'success') {
    const toaster = document.getElementById('toaster');
    
    if (!toaster) {
        console.warn('❌ Toaster não encontrado');
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i data-lucide="${tipo === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            <span>${mensagem}</span>
        </div>
    `;
    
    toaster.appendChild(toast);
    lucide.createIcons();
    
    // Remove automaticamente após 3 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

/**
 * Abre modal de detalhes do alimento
 */
function abrirDetalheAlimento(alimentoId) {
    const alimento = todosAlimentos.find(a => a.id === alimentoId);
    
    if (alimento) {
        // Implemente a abertura do modal de detalhes
        exibirToast(`Visualizando ${alimento.nome}`, 'info');
        console.log('🔍 Visualizando alimento:', alimento);
        
        // Aqui você pode implementar um modal mais elaborado
        const modalDetalhes = `
            <div class="modal-detalhes">
                <h2>${alimento.nome}</h2>
                <p>${alimento.descricao}</p>
                <p><strong>Preço:</strong> R$ ${alimento.preco.toFixed(2)}</p>
                <p><strong>Categoria:</strong> ${obterLabelCategoria(alimento.categoria)}</p>
            </div>
        `;
    }
}

/**
 * Limpa todos os filtros
 */
function limparFiltros() {
    filtroAtual = 'todos';
    buscaAtual = '';
    
    document.querySelectorAll('.filter-btn').forEach(botao => {
        botao.classList.remove('active');
    });
    
    const inputBusca = document.getElementById('product-search');
    if (inputBusca) {
        inputBusca.value = '';
    }
    
    // Ativa botão "Todos"
    const btnTodos = document.querySelector('[data-category="all"]');
    if (btnTodos) {
        btnTodos.classList.add('active');
    }
    
    aplicarFiltros();
    exibirToast('Filtros limpos', 'info');
}

// ========== FUNÇÕES DE UTILIDADE ==========

/**
 * Formata valor em Real brasileiro
 */
function formatarMoedaReal(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Valida se um alimento está disponível
 */
function validarDisponibilidadeAlimento(alimento) {
    return alimento && alimento.preco > 0 && alimento.nome;
}

// Exporta funções para uso global (se necessário)
window.gerenciadorAlimentos = {
    carregarAlimentos,
    adicionarAoCarrinho,
    limparFiltros,
    obterTotalItensCarrinho,
    obterValorTotalCarrinho
};