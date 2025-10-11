// ======================
// Signup / Auth helpers
// ======================
async function createAccount(event) {
  if (event && event.preventDefault) event.preventDefault();

  // tenta pegar valores de campos comuns (id's que o HTML geralmente tem)
  const emailEl = document.getElementById('signup-email') || document.querySelector('[name="signup-email"]');
  const passwordEl = document.getElementById('signup-password') || document.querySelector('[name="signup-password"]');
  const nameEl = document.getElementById('signup-name') || document.querySelector('[name="signup-name"]');

  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  const name = nameEl ? nameEl.value.trim() : '';

  // validação simples
  if (!email || !password) {
    showToast('Erro', 'Email e senha são obrigatórios.', 'error');
    return;
  }
  if (password.length < 6) {
    showToast('Erro', 'A senha precisa ter pelo menos 6 caracteres.', 'error');
    return;
  }

  try {
    showToast('Criando conta', 'Aguarde...', 'info');

    // Supabase v2 API - tenta criar usuário
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    }, {
      // opcional: dados adicionais no perfil
      data: { name }
    });

    if (error) {
      // mensagem amigável
      console.error('Supabase signUp error:', error);
      showToast('Erro ao criar conta', error.message || 'Tente novamente', 'error');
      return;
    }

    // Caso a política de e-mail do seu projeto exija confirmação:
    // data.user pode existir mas sem sessão. Avise o usuário.
    if (data?.user && !data?.session) {
      showToast('Conta criada', 'Verifique seu e-mail para confirmar a conta.', 'success');

      // salva um rascunho de usuário para UI (não sensível)
      currentUser = { id: data.user.id, email, name };
      isLoggedIn = false; // não está logado até confirmar (em muitos projetos)
      // atualiza UI básica
      updateAuthUIAfterSignup();
      return;
    }

    // Se a resposta já trouxe sessão (registro + login automático)
    if (data?.session) {
      currentUser = { id: data.user.id, email, name, ...data.user.user_metadata };
      isLoggedIn = true;
      localStorage.setItem('outono-dourado-user', JSON.stringify(currentUser));
      showToast('Bem-vindo!', 'Conta criada e você já está logado.', 'success');
      updateAuthUIAfterSignup();
    }
  } catch (err) {
    console.error('Erro createAccount:', err);
    showToast('Erro', err.message || 'Algo deu errado', 'error');
  }
}

// versão simples de login (útil para teste)
async function loginUser(event) {
  if (event && event.preventDefault) event.preventDefault();
  const emailEl = document.getElementById('login-email') || document.querySelector('[name="login-email"]');
  const passwordEl = document.getElementById('login-password') || document.querySelector('[name="login-password"]');
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';

  if (!email || !password) { showToast('Erro', 'Email e senha são obrigatórios.', 'error'); return; }

  try {
    showToast('Entrando...', 'Aguarde...', 'info');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { console.error('login error', error); showToast('Erro ao entrar', error.message || 'Tente novamente', 'error'); return; }

    // sucesso
    currentUser = { id: data.user.id, email, ...data.user.user_metadata };
    isLoggedIn = true;
    localStorage.setItem('outono-dourado-user', JSON.stringify(currentUser));
    showToast('Entrou!', `Bem-vindo, ${currentUser.name || currentUser.email}!`, 'success');
    updateAuthUIAfterSignup();
  } catch (err) {
    console.error('Erro loginUser:', err);
    showToast('Erro', 'Não foi possível entrar', 'error');
  }
}

function logoutUser() {
  // opcional: também chamar supabase.auth.signOut()
  try {
    supabase.auth.signOut().catch(e => console.warn('signOut error', e));
  } catch(e){}

  currentUser = null;
  isLoggedIn = false;
  localStorage.removeItem('outono-dourado-user');
  // atualiza UI simples
  const authButtons = document.getElementById('auth-buttons');
  const userMenu = document.getElementById('user-menu');
  if (authButtons) authButtons.style.display = 'block';
  if (userMenu) userMenu.style.display = 'none';
  showToast('Saída', 'Você foi desconectado.', 'info');
}

// atualiza UI básica após signup/login
function updateAuthUIAfterSignup() {
  const authButtons = document.getElementById('auth-buttons');
  const userMenu = document.getElementById('user-menu');
  const userNameEl = document.getElementById('user-name');

  if (authButtons) authButtons.style.display = 'none';
  if (userMenu) userMenu.style.display = 'block';
  if (userNameEl) userNameEl.textContent = currentUser?.name || currentUser?.email || 'Usuário';
}

// conecta automaticamente a forms no DOM (se existirem)
document.addEventListener('DOMContentLoaded', () => {
  // formulário de signup
  const signupForm = document.getElementById('signup-form') || document.querySelector('form[data-role="signup"]');
  if (signupForm) {
    signupForm.addEventListener('submit', createAccount);
  }

  // botão de criar conta inline (onclick)
  const signupBtn = document.getElementById('signup-btn') || document.querySelector('[data-action="signup"]');
  if (signupBtn) signupBtn.addEventListener('click', createAccount);

  // formulário de login
  const loginForm = document.getElementById('login-form') || document.querySelector('form[data-role="login"]');
  if (loginForm) loginForm.addEventListener('submit', loginUser);
  const loginBtn = document.getElementById('login-btn') || document.querySelector('[data-action="login"]');
  if (loginBtn) loginBtn.addEventListener('click', loginUser);
});

// expõe ao window para compatibilidade com onclick inline
window.createAccount = createAccount;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.updateAuthUIAfterSignup = updateAuthUIAfterSignup;
