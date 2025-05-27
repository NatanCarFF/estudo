// Elementos da UI
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginErrorDiv = document.getElementById('login-error');
const registerErrorDiv = document.getElementById('register-error');

const dashboardSection = document.getElementById('dashboard-section');
const transactionsSection = document.getElementById('transactions-section');
const goalsSection = document.getElementById('goals-section');

const navLinks = document.getElementById('nav-links');
const homeLink = document.getElementById('home-link');
const transactionsLink = document.getElementById('transactions-link');
const goalsLink = document.getElementById('goals-link');
const logoutLink = document.getElementById('logout-link');

const currentBalanceSpan = document.getElementById('current-balance');
const currentPointsSpan = document.getElementById('current-points');
const currentLevelSpan = document.getElementById('current-level');
const latestTransactionsList = document.getElementById('latest-transactions-list');
const activeGoalsList = document.getElementById('active-goals-list');

const addTransactionForm = document.getElementById('add-transaction-form');
const transactionDescriptionInput = document.getElementById('transaction-description');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionTypeSelect = document.getElementById('transaction-type');
const transactionCategoryInput = document.getElementById('transaction-category');
const transactionMessageDiv = document.getElementById('transaction-message');
const transactionsList = document.getElementById('transactions-list');

const createGoalForm = document.getElementById('create-goal-form');
const goalNameInput = document.getElementById('goal-name');
const goalTargetAmountInput = document.getElementById('goal-target-amount');
const goalEndDateInput = document.getElementById('goal-end-date');
const goalMessageDiv = document.getElementById('goal-message');
const userGoalsList = document.getElementById('user-goals-list');

// --- Estrutura de Dados Local (Simulando o Banco de Dados) ---
// Armazena todos os dados do "usuário logado" no LocalStorage.
let userData = JSON.parse(localStorage.getItem('financasGamificadasData')) || {
    isLoggedIn: false, // Controla se o usuário está "logado" na sessão atual
    user: { // Dados do usuário
        username: 'Convidado',
        email: '', // O email será usado como "identificador" para o login simulado
        balance: 0,
        points: 0,
        level: 1
    },
    transactions: [], // Array de transações
    goals: [] // Array de metas
};

// --- Funções de Persistência Local ---
// Salva o objeto userData completo no localStorage
function saveData() {
    localStorage.setItem('financasGamificadasData', JSON.stringify(userData));
}

// --- Funções de UI (Display e Navegação) ---

// Esconde todas as seções e mostra apenas a desejada
function showSection(section) {
    const sections = [authSection, dashboardSection, transactionsSection, goalsSection];
    sections.forEach(s => s.style.display = 'none');
    section.style.display = 'block';

    // Atualiza o estado ativo na navegação
    document.querySelectorAll('#nav-links a').forEach(link => link.classList.remove('active'));
    if (section === dashboardSection) homeLink.classList.add('active');
    else if (section === transactionsSection) transactionsLink.classList.add('active');
    else if (section === goalsSection) goalsLink.classList.add('active');
}

// Controla a visibilidade dos elementos de navegação e autenticação
function updateNavVisibility() {
    if (userData.isLoggedIn) {
        authSection.style.display = 'none';
        navLinks.style.display = 'block'; // Mostra a navegação principal
        logoutLink.style.display = 'inline'; // Mostra o botão de sair
        showSection(dashboardSection); // Redireciona para o dashboard se logado
    } else {
        authSection.style.display = 'block'; // Mostra a seção de autenticação
        navLinks.style.display = 'none'; // Esconde a navegação principal
        logoutLink.style.display = 'none'; // Esconde o botão de sair
        loginForm.style.display = 'block'; // Mostra o formulário de login por padrão
        registerForm.style.display = 'none'; // Esconde o formulário de registro
    }
}

// Limpa mensagens de erro ou informação
function clearMessages() {
    loginErrorDiv.textContent = '';
    registerErrorDiv.textContent = '';
    transactionMessageDiv.textContent = '';
    goalMessageDiv.textContent = '';
    transactionMessageDiv.classList.remove('error-message', 'info-message');
    goalMessageDiv.classList.remove('error-message', 'info-message');
}

// Exibe uma mensagem de erro ou informação
function displayMessage(element, message, type = 'info') {
    clearMessages(); // Limpa outras mensagens antes de exibir a nova
    element.textContent = message;
    element.classList.add(`${type}-message`);
}

// --- Funções de "Autenticação" Local (Simuladas) ---
// O login é apenas para fins de simulação de sessão no localStorage
function loginUser(email, password) {
    clearMessages();
    // Em um app real, aqui haveria validação de email/senha com um backend
    // Como é local, qualquer email/senha serve para "logar"
    userData.isLoggedIn = true;
    userData.user.email = email; // Define o email do usuário "logado"
    saveData(); // Salva o estado de login
    updateNavVisibility();
    loadDashboardData();
}

// O registro é para simular a criação de um "novo usuário" no localStorage
function registerUser(username, email, password) {
    clearMessages();
    // Em um app real, aqui haveria validação se o email já existe, etc.
    userData.isLoggedIn = true;
    userData.user.username = username;
    userData.user.email = email;
    userData.user.balance = 0;
    userData.user.points = 0;
    userData.user.level = 1;
    userData.transactions = [];
    userData.goals = [];
    saveData(); // Salva os dados do novo usuário
    updateNavVisibility();
    loadDashboardData();
    displayMessage(registerErrorDiv, 'Registro realizado com sucesso! Faça login para continuar.', 'info');
    // Após registrar, pode-se levar para a tela de login
    showLoginLink.click();
}

// Desconecta o usuário (apenas muda o estado isLoggedIn e salva)
function logoutUser() {
    userData.isLoggedIn = false;
    // Opcional: Você pode optar por limpar todos os dados do usuário ao deslogar
    // ou mantê-los para que voltem quando ele "logar" novamente.
    // Para este exemplo, manteremos os dados persistentes mesmo deslogado,
    // mas o usuário terá que "logar" para vê-los.
    saveData();
    updateNavVisibility();
    showSection(authSection);
    displayMessage(loginErrorDiv, 'Você foi desconectado.', 'info');
}

// --- Funções de Manipulação de Dados (Simulando API Backend) ---

// Retorna os dados do usuário ativo
function getMe() {
    return userData.user;
}

// Retorna todas as transações do usuário, ordenadas pela data (mais recente primeiro)
function getTransactions() {
    return userData.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Adiciona uma nova transação e atualiza o saldo/pontos do usuário
function addTransaction(description, amount, type, category) {
    const newTransaction = {
        id: Date.now().toString(), // ID simples baseado no timestamp atual
        description,
        amount,
        type,
        category,
        date: new Date().toISOString() // Data no formato ISO string
    };
    userData.transactions.push(newTransaction);

    // Atualizar saldo do usuário
    if (type === 'income') {
        userData.user.balance += amount;
    } else if (type === 'expense') {
        userData.user.balance -= amount;
        userData.user.points += 5; // Recompensa por registrar despesa
    }
    checkLevelUp(); // Verifica se o usuário subiu de nível após a transação
    saveData();
    displayMessage(transactionMessageDiv, 'Transação adicionada com sucesso!', 'info');
    loadDashboardData(); // Recarrega os dados do dashboard
    loadTransactions(); // Recarrega a lista completa de transações
    return newTransaction;
}

// Exclui uma transação e reverte o saldo/pontos
function deleteTransaction(id) {
    const transactionIndex = userData.transactions.findIndex(t => t.id === id);
    if (transactionIndex > -1) {
        const transaction = userData.transactions[transactionIndex];
        // Reverter saldo do usuário
        if (transaction.type === 'income') {
            userData.user.balance -= transaction.amount;
        } else if (transaction.type === 'expense') {
            userData.user.balance += transaction.amount;
            userData.user.points = Math.max(0, userData.user.points - 5); // Garante que pontos não fiquem negativos
        }
        userData.transactions.splice(transactionIndex, 1); // Remove a transação do array
        saveData();
        displayMessage(transactionMessageDiv, 'Transação removida com sucesso!', 'info');
        loadDashboardData();
        loadTransactions();
    } else {
        displayMessage(transactionMessageDiv, 'Transação não encontrada.', 'error');
    }
}

// Retorna todas as metas do usuário, ordenadas pela data final
function getGoals() {
    return userData.goals.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
}

// Cria uma nova meta
function createGoal(name, targetAmount, endDate) {
    const newGoal = {
        id: Date.now().toString(),
        name,
        targetAmount,
        currentAmount: 0,
        startDate: new Date().toISOString(),
        endDate,
        isCompleted: false,
        rewardPoints: 50 // Pontos ganhos ao completar a meta
    };
    userData.goals.push(newGoal);
    saveData();
    displayMessage(goalMessageDiv, 'Meta criada com sucesso!', 'info');
    loadDashboardData();
    loadGoals();
    return newGoal;
}

// Atualiza uma meta (ex: adicionar progresso, marcar como completa)
function updateGoal(id, dataToUpdate) {
    const goalIndex = userData.goals.findIndex(g => g.id === id);
    if (goalIndex > -1) {
        const goal = userData.goals[goalIndex];
        const wasCompleted = goal.isCompleted; // Salva o estado anterior de conclusão

        // Atualiza os campos da meta
        Object.assign(goal, dataToUpdate);

        // Lógica de gamificação ao completar meta
        if (goal.isCompleted && !wasCompleted) { // Se a meta acabou de ser marcada como completa
            userData.user.points += goal.rewardPoints;
            checkLevelUp(); // Verifica se o usuário subiu de nível
            displayMessage(goalMessageDiv, `Meta "${goal.name}" concluída! Você ganhou ${goal.rewardPoints} pontos!`, 'info');
        }
        saveData();
        displayMessage(goalMessageDiv, 'Meta atualizada com sucesso!', 'info');
        loadDashboardData();
        loadGoals();
        return goal;
    } else {
        displayMessage(goalMessageDiv, 'Meta não encontrada.', 'error');
    }
}

// Deleta uma meta
function deleteGoal(id) {
    const goalIndex = userData.goals.findIndex(g => g.id === id);
    if (goalIndex > -1) {
        userData.goals.splice(goalIndex, 1); // Remove a meta do array
        saveData();
        displayMessage(goalMessageDiv, 'Meta removida com sucesso!', 'info');
        loadDashboardData();
        loadGoals();
    } else {
        displayMessage(goalMessageDiv, 'Meta não encontrada.', 'error');
    }
}

// --- Lógica de Gamificação ---
// Verifica se o usuário tem pontos suficientes para subir de nível
function checkLevelUp() {
    const currentPoints = userData.user.points;
    const currentLevel = userData.user.level;
    // Ponto de corte para o próximo nível (ex: Nível 1 = 100pts, Nível 2 = 200pts, Nível 3 = 300pts)
    const pointsForNextLevel = currentLevel * 100; 

    if (currentPoints >= pointsForNextLevel) {
        userData.user.level += 1;
        // Opcional: Você pode subtrair os pontos necessários para o nível atual
        // userData.user.points -= pointsForNextLevel; // Para ter que acumular para o próximo nível
        displayMessage(dashboardSection.querySelector('.summary-cards'), `Parabéns! Você subiu para o Nível ${userData.user.level}!`, 'info');
        saveData();
    }
}


// --- Renderização de Dados na UI ---

// Carrega e exibe os dados no dashboard
async function loadDashboardData() {
    if (!userData.isLoggedIn) return;

    const user = getMe();
    currentBalanceSpan.textContent = `R$ ${user.balance.toFixed(2)}`;
    currentPointsSpan.textContent = user.points;
    currentLevelSpan.textContent = user.level;

    const transactions = getTransactions();
    // Exibe apenas as 5 últimas transações no dashboard
    renderTransactions(transactions.slice(0, 5), latestTransactionsList); 

    const goals = getGoals();
    // Exibe apenas as metas ativas no dashboard
    renderGoals(goals.filter(goal => !goal.isCompleted), activeGoalsList); 
}

// Carrega e exibe todas as transações na seção de transações
async function loadTransactions() {
    if (!userData.isLoggedIn) return;

    const transactions = getTransactions();
    renderTransactions(transactions, transactionsList);
}

// Função auxiliar para renderizar transações em uma lista específica
function renderTransactions(transactions, targetList) {
    targetList.innerHTML = ''; // Limpa a lista existente
    if (transactions.length === 0) {
        targetList.innerHTML = '<li>Nenhuma transação encontrada.</li>';
        return;
    }

    transactions.forEach(t => {
        const li = document.createElement('li');
        // Adiciona classe 'income' ou 'expense' para estilização CSS
        li.classList.add(t.type); 
        li.innerHTML = `
            <span class="description">${t.description}</span>
            <span class="category">${t.category || 'Geral'}</span>
            <span class="amount">R$ ${parseFloat(t.amount).toFixed(2)}</span>
            <span class="date">${new Date(t.date).toLocaleDateString('pt-BR')}</span>
            <button class="delete-btn" data-id="${t.id}">Excluir</button>
        `;
        targetList.appendChild(li);
    });

    // Adiciona event listeners para os botões de exclusão
    targetList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const transactionId = e.target.dataset.id;
            if (confirm('Tem certeza que deseja excluir esta transação?')) {
                deleteTransaction(transactionId);
            }
        });
    });
}

// Carrega e exibe todas as metas na seção de metas
async function loadGoals() {
    if (!userData.isLoggedIn) return;

    const goals = getGoals();
    renderGoals(goals, userGoalsList); // Todas as metas do usuário
}

// Função auxiliar para renderizar metas em uma lista específica
function renderGoals(goals, targetList) {
    targetList.innerHTML = '';
    if (goals.length === 0) {
        targetList.innerHTML = '<li>Nenhuma meta ou desafio encontrado.</li>';
        return;
    }

    goals.forEach(g => {
        // Calcula o progresso em porcentagem
        const progress = (g.currentAmount / g.targetAmount) * 100;
        const progressBarWidth = Math.min(100, progress).toFixed(0); // Garante que não ultrapasse 100%
        const remaining = (g.targetAmount - g.currentAmount).toFixed(2);
        const isCompleted = g.isCompleted || (g.currentAmount >= g.targetAmount);

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${g.name}</span>
            <span class="dates">De: ${new Date(g.startDate).toLocaleDateString('pt-BR')} até: ${new Date(g.endDate).toLocaleDateString('pt-BR')}</span>
            <span class="goal-status">Alvo: R$ ${parseFloat(g.targetAmount).toFixed(2)} | Progresso: R$ ${parseFloat(g.currentAmount).toFixed(2)}</span>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressBarWidth}%;">
                    ${progressBarWidth}%
                </div>
            </div>
            <span class="goal-status">Faltam: R$ ${remaining}</span>
            <div class="goal-actions">
                ${!isCompleted ? `<button class="add-progress-btn" data-id="${g.id}">Add Progresso</button>` : ''}
                ${!isCompleted ? `<button class="complete-btn" data-id="${g.id}">Marcar como Concluída</button>` : '<span>Concluída!</span>'}
                <button class="delete-btn" data-id="${g.id}">Excluir</button>
            </div>
        `;
        targetList.appendChild(li);

        // Adiciona event listeners para os botões de ação da meta
        if (!isCompleted) {
            li.querySelector('.add-progress-btn')?.addEventListener('click', () => {
                const amountToAdd = parseFloat(prompt('Quanto você quer adicionar ao progresso desta meta?'));
                if (!isNaN(amountToAdd) && amountToAdd > 0) {
                    updateGoal(g.id, { currentAmount: parseFloat(g.currentAmount) + amountToAdd });
                } else if (amountToAdd <= 0) {
                    alert('Por favor, insira um valor positivo.');
                }
            });

            li.querySelector('.complete-btn')?.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja marcar esta meta como concluída?')) {
                    updateGoal(g.id, { isCompleted: true, currentAmount: g.targetAmount }); // Garante que o valor atual atinja o alvo
                }
            });
        }
        
        li.querySelector('.delete-btn')?.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir esta meta?')) {
                deleteGoal(g.id);
            }
        });
    });
}


// --- Event Listeners Globais ---

// Navegação principal
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(dashboardSection);
    loadDashboardData();
});
transactionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(transactionsSection);
    loadTransactions();
});
goalsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(goalsSection);
    loadGoals();
});
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

// Troca entre formulários de login e registro
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    clearMessages();
});
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearMessages();
});

// Submissão do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value; // Senha não usada, mas mantida para UX
    loginUser(email, password);
});

// Submissão do formulário de registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value; // Senha não usada, mas mantida para UX
    registerUser(username, email, password);
});

// Submissão do formulário de adição de transação
addTransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = transactionDescriptionInput.value.trim();
    const amount = parseFloat(transactionAmountInput.value);
    const type = transactionTypeSelect.value;
    const category = transactionCategoryInput.value.trim();

    if (!description || isNaN(amount) || amount <= 0 || !type) {
        displayMessage(transactionMessageDiv, 'Por favor, preencha todos os campos corretamente (valor > 0).', 'error');
        return;
    }

    addTransaction(description, amount, type, category);
    addTransactionForm.reset(); // Limpa o formulário após adicionar
});

// Submissão do formulário de criação de meta
createGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = goalNameInput.value.trim();
    const targetAmount = parseFloat(goalTargetAmountInput.value);
    const endDate = goalEndDateInput.value; // Formato YYYY-MM-DD

    if (!name || isNaN(targetAmount) || targetAmount <= 0 || !endDate) {
        displayMessage(goalMessageDiv, 'Por favor, preencha todos os campos da meta corretamente.', 'error');
        return;
    }
    // Validação de data: não permitir data passada
    const today = new Date().toISOString().split('T')[0]; // Pega a data de hoje no formato YYYY-MM-DD
    if (endDate < today) {
        displayMessage(goalMessageDiv, 'A data final não pode ser no passado.', 'error');
        return;
    }

    createGoal(name, targetAmount, endDate);
    createGoalForm.reset();
});


// --- Inicialização da Aplicação ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica o estado de login ao carregar a página
    updateNavVisibility();
    if (userData.isLoggedIn) {
        loadDashboardData(); // Carrega os dados se o usuário já estiver "logado"
    }
});