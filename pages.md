Para criar o seu aplicativo de finanças gamificadas usando apenas o GitHub Pages, precisamos entender uma limitação fundamental: **o GitHub Pages serve apenas arquivos estáticos (HTML, CSS, JavaScript) e não suporta a execução de código de backend (como Node.js, Python, PHP) ou bancos de dados diretos.**

Isso significa que a arquitetura que eu apresentei anteriormente, com um backend Node.js e um banco de dados MongoDB, não funcionaria diretamente com o GitHub Pages.

---

## Opções para o GitHub Pages

Você tem duas abordagens principais para contornar essa limitação e ainda usar o GitHub Pages:

### 1. Aplicativo Puramente Frontend (Sem Banco de Dados)

Nessa abordagem, todas as funcionalidades de armazenamento e persistência de dados seriam feitas no próprio navegador do usuário, utilizando tecnologias como:

* **LocalStorage/SessionStorage:** Para guardar dados simples e pequenas quantidades de informação. Os dados persistem no navegador (no caso do LocalStorage), mas não são sincronizados entre diferentes dispositivos ou navegadores do mesmo usuário. **É a opção mais simples para começar e testar a gamificação.**
* **IndexedDB:** Um banco de dados no navegador mais robusto, capaz de armazenar maiores volumes de dados e com mais recursos de consulta. Ainda assim, os dados ficam restritos ao navegador do usuário.

**Vantagens:**

* **Extremamente simples de hospedar:** Basta fazer o *upload* dos arquivos HTML, CSS e JavaScript para o GitHub Pages.
* **Custo zero:** Sem custos de servidor ou banco de dados.

**Desvantagens:**

* **Dados não persistentes entre dispositivos:** Se o usuário acessar o site em outro computador ou navegador, os dados financeiros e o progresso da gamificação não estarão lá.
* **Limitações de armazenamento:** Embora o IndexedDB seja razoável, não é um banco de dados de larga escala.
* **Segurança dos dados:** Os dados ficam no navegador do usuário, o que pode não ser ideal para informações financeiras sensíveis em um cenário de produção. Para um projeto de aprendizado, é aceitável.

---

### 2. Frontend no GitHub Pages + Backend em Outro Serviço (Recomendado para um App Mais Completo)

Essa é a abordagem mais comum e robusta para ter um aplicativo funcional com um backend e banco de dados, enquanto ainda aproveita a gratuidade e facilidade do GitHub Pages para o frontend.

O seu **frontend (HTML, CSS, JavaScript)** ficaria hospedado no GitHub Pages, e ele faria requisições a uma **API (seu backend)** que estaria hospedada em um serviço diferente, como:

* **Render:** (Gratuito para *tiers* básicos) Suporta Node.js, Python, Ruby, Go, etc. e pode hospedar bancos de dados.
* **Vercel/Netlify:** Ótimos para hospedar funções *serverless* (Lambda Functions, Cloud Functions) que podem atuar como um backend leve e se conectar a um banco de dados na nuvem. Também hospedam o frontend estático.
* **Heroku:** (Possui um *free tier* limitado e pode exigir cartão de crédito para *deploy*)
* **DigitalOcean/AWS/Google Cloud:** Opções mais complexas, mas com muito mais controle e escalabilidade (e potenciais custos).
* **MongoDB Atlas:** (Gratuito para *tier* básico) Um serviço de banco de dados MongoDB na nuvem. Você pode ter seu backend hospedado em outro lugar e ele se conecta ao MongoDB Atlas.

**Vantagens:**

* **Dados persistentes e sincronizados:** As informações do usuário e o progresso da gamificação são armazenados centralmente e acessíveis de qualquer dispositivo.
* **Funcionalidades complexas:** Você pode implementar lógica de negócio mais sofisticada no backend.
* **Escalabilidade (com as opções pagas):** Capacidade de crescer junto com seu aplicativo.

**Desvantagens:**

* **Mais complexidade:** Você precisará configurar e gerenciar dois ambientes: o GitHub Pages para o frontend e outro serviço para o backend/banco de dados.
* **Potenciais custos:** Embora existam *free tiers*, dependendo do uso, pode haver custos.

---

## Base Estrutural para o GitHub Pages (Opção 1: Puramente Frontend)

Vamos focar na **Opção 1 (puramente frontend)** para te dar uma base que funcione *apenas* com GitHub Pages. Esta é a maneira mais direta de começar a ver algo no ar.

Vamos simplificar a estrutura de pastas, pois não teremos um `backend` local.

```
/nome-do-projeto
├── /css
│   └── style.css
├── /js
│   └── app.js
├── /images  (Opcional, para logo ou ícones)
│   └── logo.png
├── index.html
└── README.md
```

### 1. `README.md` (Raiz do Projeto)

```markdown
# Finanças Gamificadas (Frontend Pura)

Um aplicativo web para organizar finanças pessoais com elementos de gamificação, incentivando o usuário a economizar e investir através de metas, recompensas e desafios.

**Nota:** Este é um aplicativo puramente frontend, projetado para ser hospedado via GitHub Pages. Todos os dados são armazenados localmente no navegador do usuário (LocalStorage), **não sendo persistentes entre diferentes dispositivos ou navegadores.**

## Funcionalidades (MVP)

* Dashboard com resumo financeiro (saldo, pontos, nível).
* Registro de Receitas e Despesas.
* Criação e acompanhamento de Metas de Economia.
* Sistema de Pontos e Níveis (Gamificação básica).
* Desafios simples.
* Autenticação básica (apenas para simular um login/registro localmente).

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage do navegador para persistência de dados.

## Como Rodar

1.  Clone este repositório: `git clone https://github.com/SEU_USUARIO/nome-do-projeto.git`
2.  Navegue até a pasta do projeto: `cd nome-do-projeto`
3.  Abra o arquivo `index.html` em seu navegador.
4.  Para hospedar no GitHub Pages:
    * Crie um novo repositório no GitHub com o nome do seu projeto.
    * Faça o *push* deste código para o repositório.
    * Vá nas configurações do seu repositório no GitHub, selecione "Pages" na barra lateral esquerda.
    * Em "Build and deployment", escolha a branch `main` (ou `master`) e a pasta `/(root)`.
    * Salve. Seu site estará disponível em alguns minutos no endereço `https://SEU_USUARIO.github.io/nome-do-projeto/`.

## Próximas Etapas (Possíveis Melhorias)

* Melhorar a interface do usuário e o design.
* Expandir funcionalidades de gamificação (conquistas, *badges*, rankings locais).
* Implementar visualizações gráficas de dados (gráficos de gastos, evolução do saldo).
* Considerar a integração com um backend real no futuro para persistência de dados.
```

---

### 2. `index.html` (Permanece quase o mesmo)

O arquivo `index.html` seria praticamente idêntico ao que foi fornecido anteriormente, pois ele apenas define a estrutura visual da página. A única alteração seria remover referências a API ou autenticação JWT no *script* inicial e focar na lógica *frontend*.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finanças Gamificadas</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Finanças Gamificadas</h1>
            <nav>
                <ul id="nav-links">
                    <li><a href="#" id="home-link" class="active">Dashboard</a></li>
                    <li><a href="#" id="transactions-link">Transações</a></li>
                    <li><a href="#" id="goals-link">Metas e Desafios</a></li>
                    <li><a href="#" id="logout-link" style="display: none;">Sair</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container">
        <section id="auth-section">
            <h2>Bem-vindo!</h2>
            <div class="auth-forms">
                <form id="login-form">
                    <h3>Login (Apenas para simulação local)</h3>
                    <input type="email" id="login-email" placeholder="E-mail (qualquer um serve)" required>
                    <input type="password" id="login-password" placeholder="Senha (qualquer uma serve)" required>
                    <button type="submit">Entrar</button>
                    <p>Não tem conta? <a href="#" id="show-register">Cadastre-se</a></p>
                    <div id="login-error" class="error-message"></div>
                </form>

                <form id="register-form" style="display: none;">
                    <h3>Cadastre-se (Apenas para simulação local)</h3>
                    <input type="text" id="register-username" placeholder="Nome de Usuário" required>
                    <input type="email" id="register-email" placeholder="E-mail" required>
                    <input type="password" id="register-password" placeholder="Senha" required>
                    <button type="submit">Registrar</button>
                    <p>Já tem conta? <a href="#" id="show-login">Fazer Login</a></p>
                    <div id="register-error" class="error-message"></div>
                </form>
            </div>
        </section>

        <section id="dashboard-section" class="content-section" style="display: none;">
            <h2>Dashboard</h2>
            <div class="summary-cards">
                <div class="card balance-card">
                    <h3>Saldo Atual</h3>
                    <p id="current-balance">R$ 0,00</p>
                </div>
                <div class="card points-card">
                    <h3>Pontos</h3>
                    <p id="current-points">0</p>
                </div>
                <div class="card level-card">
                    <h3>Nível</h3>
                    <p id="current-level">1</p>
                </div>
            </div>

            <h3>Últimas Transações</h3>
            <ul id="latest-transactions-list" class="transaction-list">
                </ul>

            <h3>Metas Ativas</h3>
            <ul id="active-goals-list" class="goal-list">
                </ul>
        </section>

        <section id="transactions-section" class="content-section" style="display: none;">
            <h2>Minhas Transações</h2>

            <form id="add-transaction-form">
                <h3>Adicionar Nova Transação</h3>
                <input type="text" id="transaction-description" placeholder="Descrição" required>
                <input type="number" id="transaction-amount" placeholder="Valor" step="0.01" required>
                <select id="transaction-type" required>
                    <option value="">Selecione o Tipo</option>
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                </select>
                <input type="text" id="transaction-category" placeholder="Categoria (Opcional)">
                <button type="submit">Adicionar Transação</button>
                <div id="transaction-message" class="info-message"></div>
            </form>

            <h3>Histórico de Transações</h3>
            <ul id="transactions-list" class="transaction-list">
                </ul>
        </section>

        <section id="goals-section" class="content-section" style="display: none;">
            <h2>Minhas Metas e Desafios</h2>

            <form id="create-goal-form">
                <h3>Criar Nova Meta</h3>
                <input type="text" id="goal-name" placeholder="Nome da Meta" required>
                <input type="number" id="goal-target-amount" placeholder="Valor Alvo" step="0.01" required>
                <input type="date" id="goal-end-date" required>
                <button type="submit">Criar Meta</button>
                <div id="goal-message" class="info-message"></div>
            </form>

            <h3>Metas Ativas</h3>
            <ul id="user-goals-list" class="goal-list">
                </ul>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 Finanças Gamificadas. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
```

---

### 3. `css/style.css` (Permanece o mesmo)

O arquivo `style.css` é puramente para estilo visual e não tem dependência de backend, então o código fornecido anteriormente pode ser reutilizado.

---

### 4. `js/app.js` (Lógica do Frontend com LocalStorage)

Este é o arquivo que terá as maiores mudanças. Precisaremos adaptar a lógica para usar o `localStorage` do navegador para persistir os dados, em vez de fazer chamadas para uma API.

```javascript
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
        email: '',
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

// --- Funções de "Autenticação" Local ---
function loginUser(email, password) {
    clearMessages();
    // Para simplificar, qualquer login/senha será aceito, mas você pode adicionar validação básica
    userData.isLoggedIn = true;
    userData.user.email = email; // Define o email do usuário logado
    saveData();
    updateNavVisibility();
    loadDashboardData();
}

function registerUser(username, email, password) {
    clearMessages();
    // Para simplificar, apenas registra o novo username/email.
    // Em um app real, você verificaria se o email já existe, etc.
    userData.isLoggedIn = true;
    userData.user.username = username;
    userData.user.email = email;
    userData.user.balance = 0;
    userData.user.points = 0;
    userData.user.level = 1;
    saveData();
    updateNavVisibility();
    loadDashboardData();
    displayMessage(registerErrorDiv, 'Registro realizado com sucesso!', 'info');
}

function logoutUser() {
    userData.isLoggedIn = false;
    // Opcional: resetar dados do usuário para "zero" ao deslogar
    // userData.user = { username: 'Convidado', email: '', balance: 0, points: 0, level: 1 };
    // userData.transactions = [];
    // userData.goals = [];
    saveData(); // Salva o estado de logout
    updateNavVisibility();
    showSection(authSection);
    displayMessage(loginErrorDiv, 'Você foi desconectado.', 'info');
}

// --- Funções de "API" Local (Manipulação de Dados) ---

function getMe() {
    return userData.user;
}

function getTransactions() {
    return userData.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordena por data
}

function addTransaction(description, amount, type, category) {
    const newTransaction = {
        id: Date.now().toString(), // ID simples baseado no timestamp
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
        id: Date.now().toString(),
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
        // userData.user.points -= pointsForNextLevel;
        displayMessage(dashboardSection.querySelector('.summary-cards'), `Parabéns! Você subiu para o Nível ${userData.user.level}!`, 'info');
        saveData();
    }
}


// --- Renderização de Dados ---

async function loadDashboardData() {
    if (!userData.isLoggedIn) return;

    const user = getMe();
    currentBalanceSpan.textContent = `R$ ${user.balance.toFixed(2)}`;
    currentPointsSpan.textContent = user.points;
    currentLevelSpan.textContent = user.level;

    const transactions = getTransactions();
    renderTransactions(transactions.slice(0, 5), latestTransactionsList); // Apenas as 5 últimas

    const goals = getGoals();
    renderGoals(goals.filter(goal => !goal.isCompleted), activeGoalsList); // Apenas metas ativas
}

async function loadTransactions() {
    if (!userData.isLoggedIn) return;

    const transactions = getTransactions();
    renderTransactions(transactions, transactionsList);
}

function renderTransactions(transactions, targetList) {
    targetList.innerHTML = ''; // Limpa a lista
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

async function loadGoals() {
    if (!userData.isLoggedIn) return;

    const goals = getGoals();
    renderGoals(goals, userGoalsList); // Todas as metas do usuário
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

        // Adiciona event listeners
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


// --- Event Listeners ---

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
    loginUser(email, password);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
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
    addTransactionForm.reset(); // Limpa o formulário
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


// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    updateNavVisibility();
    if (userData.isLoggedIn) {
        loadDashboardData();
    }
});
```

---

### Como Publicar no GitHub Pages:

1.  **Crie um Repositório no GitHub:** Vá para o GitHub e crie um **novo repositório público**. Dê um nome significativo, como `financas-gamificadas-frontend`.
2.  **Clone o Repositório:** Em seu computador, clone o repositório para a sua máquina local.
3.  **Adicione os Arquivos:** Coloque os arquivos `index.html`, a pasta `css` e a pasta `js` (com `style.css` e `app.js` dentro) na raiz do seu repositório local.
4.  **Commit e Push:**
    * Abra o terminal na pasta do seu projeto.
    * `git add .`
    * `git commit -m "Initial commit for frontend finances app"`
    * `git push origin main` (ou `master`, dependendo da sua *branch* padrão).
5.  **Configure o GitHub Pages:**
    * No GitHub, vá para o seu repositório.
    * Clique em **"Settings"** (Configurações) na barra superior.
    * Na barra lateral esquerda, clique em **"Pages"**.
    * Em "Build and deployment", na seção "Source", selecione a branch `main` (ou `master`) e a pasta `/(root)`.
    * Clique em **"Save"**.
6.  **Aguarde:** Leva alguns minutos para o GitHub Pages construir e *deployar* seu site. Você verá um link (geralmente `https://SEU_USUARIO.github.io/nome-do-repositorio/`) quando estiver pronto.

Com essa configuração, você terá um aplicativo de finanças gamificadas totalmente funcional diretamente no seu navegador, armazenando os dados localmente. É uma ótima maneira de começar e validar a ideia de gamificação sem a complexidade de um backend completo!