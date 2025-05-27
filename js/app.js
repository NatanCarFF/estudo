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
// Usaremos um único "usuário" armazenado no LocalStorage para simplificar.
// Em um app real, cada usuário teria seus próprios dados.
let userData = JSON.parse(localStorage.getItem('financasGamificadasData')) || {
    isLoggedIn: false,
    user: {
        username: 'Convidado',
        email: '', // O email não é usado para autenticação real, apenas para simular
        balance: 0,
        points: 0,
        level: 1
    },
    transactions: [],
    goals: []
};

// --- Funções de Persistência Local ---
function saveData() {
    localStorage.setItem('financasGamificadasData', JSON.stringify(userData));
}

// --- Funções de UI ---

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

function updateNavVisibility() {
    if (userData.isLoggedIn) {
        authSection.style.display = 'none';
        navLinks.style.display = 'block';
        logoutLink.style.display = 'inline';
        showSection(dashboardSection); // Vai para o dashboard após login
    } else {
        authSection.style.display = 'block';
        navLinks.style.display = 'none';
        logoutLink.style.display = 'none';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

function clearMessages() {
    loginErrorDiv.textContent = '';
    registerErrorDiv.textContent = '';
    transactionMessageDiv.textContent = '';
    goalMessageDiv.textContent = '';
    transactionMessageDiv.classList.remove('error-message', 'info-message');
    goalMessageDiv.classList.remove('error-message', 'info-message');
}

function displayMessage(element, message, type = 'info') {
    clearMessages();
    element.textContent = message;
    element.classList.add(`${type}-message`);
}

// --- Funções de "Autenticação" Local (Simulação) ---
function loginUser(email, password) {
    clearMessages();
    // Para simplificar, qualquer login/senha será aceito, simulando um login de sucesso.
    // Em um app real, você teria uma validação de credenciais aqui.
    userData.isLoggedIn = true;
    userData.user.email = email; // Atribui o email inserido para fins de exibição
    saveData();
    updateNavVisibility();
    loadDashboardData();
}

function registerUser(username, email, password) {
    clearMessages();
    // Para simplificar, qualquer registro cria um "novo" usuário local.
    // Em um app real, você verificaria se o email já existe, etc.
    userData.isLoggedIn = true;
    userData.user.username = username;
    userData.user.email = email;
    userData.user.balance = 0;
    userData.user.points = 0;
    userData.user.level = 1;
    userData.transactions = []; // Novo usuário, transações vazias
    userData.goals = [];       // Novo usuário, metas vazias
    saveData();
    updateNavVisibility();
    loadDashboardData();
    displayMessage(registerErrorDiv, 'Registro realizado com sucesso! Faça login.', 'info');
    // Após registrar, geralmente se volta para a tela de login
    showLoginLink.click(); 
}

function logoutUser() {
    userData.isLoggedIn = false;
    // Opcional: resetar dados do usuário para "zero" ao deslogar
    // Para manter o progresso do usuário no mesmo navegador, não resetamos tudo.
    // Se você quiser que o logout limpe tudo para o próximo "login", descomente as linhas abaixo.
    /*
    userData.user = { username: 'Convidado', email: '', balance: 0, points: 0, level: 1 };
    userData.transactions = [];
    userData.goals = [];
    */
    saveData(); // Salva o estado de logout
    updateNavVisibility();
    showSection(authSection);
    displayMessage(loginErrorDiv, 'Você foi desconectado.', 'info');
}

// --- Funções de Manipulação de Dados (Substituem as chamadas de API) ---

function getMe() {
    return userData.user;
}

function getTransactions() {
    return userData.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordena por data
}

function addTransaction(description, amount, type, category) {
    const newTransaction = {
        id: Date.now().toString(), // ID simples baseado no timestamp para unicidade local
        description,
        amount,
        type,
        category,
        date: new Date().toISOString()
    };
    userData.transactions.push(newTransaction);

    // Atualizar saldo do usuário
    if (type === 'income') {
        userData.user.balance += amount;
    } else if (type === 'expense') {
        userData.user.balance -= amount;
        userData.user.points += 5; // Ponto por registrar despesa
    }
    checkLevelUp(); // Verifica se o usuário subiu de nível
    saveData();
    displayMessage(transactionMessageDiv, 'Transação adicionada com sucesso!', 'info');
    loadDashboardData();
    loadTransactions();
    return newTransaction;
}

function deleteTransaction(id) {
    const transactionIndex = userData.transactions.findIndex(t => t.id === id);
    if (transactionIndex > -1) {
        const transaction = userData.transactions[transactionIndex];
        // Reverter saldo do usuário
        if (transaction.type === 'income') {
            userData.user.balance -= transaction.amount;
        } else if (transaction.type === 'expense') {
            userData.user.balance += transaction.amount;
            userData.user.points = Math.max(0, userData.user.points - 5); // Reverte pontos
        }
        userData.transactions.splice(transactionIndex, 1);
        saveData();
        displayMessage(transactionMessageDiv, 'Transação removida com sucesso!', 'info');
        loadDashboardData();
        loadTransactions();
    } else {
        displayMessage(transactionMessageDiv, 'Transação não encontrada.', 'error');
    }
}

function getGoals() {
    return userData.goals.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
}

function createGoal(name, targetAmount, endDate) {
    const newGoal = {
        id: Date.now().toString(), // ID simples baseado no timestamp
        name,
        targetAmount,
        currentAmount: 0,
        startDate: new Date().toISOString(),
        endDate,
        isCompleted: false,
        rewardPoints: 50 // Pontos por meta concluída
    };
    userData.goals.push(newGoal);
    saveData();
    displayMessage(goalMessageDiv, 'Meta criada com sucesso!', 'info');
    loadDashboardData();
    loadGoals();
    return newGoal;
}

function updateGoal(id, dataToUpdate) {
    const goalIndex = userData.goals.findIndex(g => g.id === id);
    if (goalIndex > -1) {
        const goal = userData.goals[goalIndex];
        const wasCompleted = goal.isCompleted;

        // Atualiza campos
        Object.assign(goal, dataToUpdate);

        // Lógica de gamificação ao completar meta
        if (goal.isCompleted && !wasCompleted) { // Se acabou de ser completada
            userData.user.points += goal.rewardPoints;
            checkLevelUp();
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

function deleteGoal(id) {
    const goalIndex = userData.goals.findIndex(g => g.id === id);
    if (goalIndex > -1) {
        userData.goals.splice(goalIndex, 1);
        saveData();
        displayMessage(goalMessageDiv, 'Meta removida com sucesso!', 'info');
        loadDashboardData();
        loadGoals();
    } else {
        displayMessage(goalMessageDiv, 'Meta não encontrada.', 'error');
    }
}

// --- Lógica de Gamificação ---
function checkLevelUp() {
    const currentPoints = userData.user.points;
    const currentLevel = userData.user.level;
    const pointsForNextLevel = currentLevel * 100; // Exemplo: 100 para nível 1, 200 para nível 2, etc.

    if (currentPoints >= pointsForNextLevel) {
        userData.user.level += 1;
        // Opcional: resetar pontos para o próximo nível ou acumular
        // userData.user.points -= pointsForNextLevel; // Se quiser que os pontos "gastem" para subir de nível
        displayMessage(dashboardSection.querySelector('.summary-cards'), `Parabéns! Você subiu para o Nível ${userData.user.level}!`, 'info');
        saveData(); // Salva o novo nível
    }
}


// --- Renderização de Dados na UI ---

function loadDashboardData() {
    if (!userData.isLoggedIn) return;

    const user = getMe();
    currentBalanceSpan.textContent = `R$ ${user.balance.toFixed(2)}`;
    currentPointsSpan.textContent = user.points;
    currentLevelSpan.textContent = user.level;

    const transactions = getTransactions();
    renderTransactions(transactions.slice(0, 5), latestTransactionsList); // Apenas as 5 últimas no dashboard

    const goals = getGoals();
    renderGoals(goals.filter(goal => !goal.isCompleted), activeGoalsList); // Apenas metas ativas no dashboard
}

function loadTransactions() {
    if (!userData.isLoggedIn) return;

    const transactions = getTransactions();
    renderTransactions(transactions, transactionsList); // Todas as transações na seção de transações
}

function renderTransactions(transactions, targetList) {
    targetList.innerHTML = ''; // Limpa a lista antes de renderizar
    if (transactions.length === 0) {
        targetList.innerHTML = '<li>Nenhuma transação encontrada.</li>';
        return;
    }

    transactions.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.type); // Adiciona classe 'income' ou 'expense' para estilização
        li.innerHTML = `
            <span class="description">${t.description}</span>
            <span class="category">${t.category || 'Geral'}</span>
            <span class="amount">R$ ${t.amount.toFixed(2)}</span>
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

function loadGoals() {
    if (!userData.isLoggedIn) return;

    const goals = getGoals();
    renderGoals(goals, userGoalsList); // Todas as metas do usuário na seção de metas
}

function renderGoals(goals, targetList) {
    targetList.innerHTML = '';
    if (goals.length === 0) {
        targetList.innerHTML = '<li>Nenhuma meta ou desafio encontrado.</li>';
        return;
    }

    goals.forEach(g => {
        const progress = (g.currentAmount / g.targetAmount) * 100;
        const progressBarWidth = Math.min(100, progress).toFixed(0);
        const remaining = (g.targetAmount - g.currentAmount).toFixed(2);
        const isCompleted = g.isCompleted || (g.currentAmount >= g.targetAmount);

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${g.name}</span>
            <span class="dates">De: ${new Date(g.startDate).toLocaleDateString('pt-BR')} até: ${new Date(g.endDate).toLocaleDateString('pt-BR')}</span>
            <span class="goal-status">Alvo: R$ ${g.targetAmount.toFixed(2)} | Progresso: R$ ${g.currentAmount.toFixed(2)}</span>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressBarWidth}%;">
                    ${progressBarWidth}%
                </div>
            </div>
            <span class="goal-status">Faltam: R$ ${remaining}</span>
            <div class="goal-actions">
                ${!isCompleted ? `<button class="add-progress-btn" data-id="${g.id}">Add Progresso</button>` : ''}
                ${!isCompleted ? `<button class="complete-btn" data-id="${g.id}">Completar</button>` : '<span>Concluída!</span>'}
                <button class="delete-btn" data-id="${g.id}">Excluir</button>
            </div>
        `;
        targetList.appendChild(li);

        // Adiciona event listeners para os botões de meta
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
                if (confirm('Marcar esta meta como concluída?')) {
                    updateGoal(g.id, { isCompleted: true, currentAmount: g.targetAmount }); // Garante que o valor atual atinge o alvo
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

// Navegação
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

// Formulários de Autenticação
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

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // O email e a senha são apenas para simulação, não são validados ou armazenados de forma segura
    loginUser(email, password);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    // O email e a senha são apenas para simulação
    registerUser(username, email, password);
});

// Formulário de Transação
addTransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = transactionDescriptionInput.value;
    const amount = parseFloat(transactionAmountInput.value);
    const type = transactionTypeSelect.value;
    const category = transactionCategoryInput.value;

    if (!description || isNaN(amount) || amount <= 0 || !type) {
        displayMessage(transactionMessageDiv, 'Por favor, preencha todos os campos corretamente (valor > 0).', 'error');
        return;
    }

    addTransaction(description, amount, type, category);
    addTransactionForm.reset(); // Limpa o formulário após adicionar
});

// Formulário de Criação de Meta
createGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = goalNameInput.value;
    const targetAmount = parseFloat(goalTargetAmountInput.value);
    const endDate = goalEndDateInput.value; // Formato YYYY-MM-DD

    if (!name || isNaN(targetAmount) || targetAmount <= 0 || !endDate) {
        displayMessage(goalMessageDiv, 'Por favor, preencha todos os campos da meta corretamente.', 'error');
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (endDate < today) {
        displayMessage(goalMessageDiv, 'A data final não pode ser no passado.', 'error');
        return;
    }

    createGoal(name, targetAmount, endDate);
    createGoalForm.reset();
});


// --- Inicialização do Aplicativo ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário já estava logado (estado salvo no localStorage)
    if (userData.isLoggedIn) {
        updateNavVisibility(); // Mostra as seções logadas
        loadDashboardData();   // Carrega os dados do dashboard
    } else {
        showSection(authSection); // Mostra a seção de login/registro
    }
});