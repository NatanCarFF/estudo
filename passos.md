Ótima escolha! A ideia de gamificar o controle financeiro é super engajadora e tem um grande potencial para ajudar as pessoas a mudarem seus hábitos.

Para desenvolver um "Organizador de Finanças Pessoais com Gamificação" em formato de site, vamos estruturar a base. Vou te dar uma visão geral dos arquivos e tecnologias que você precisará, com um foco inicial nas tecnologias mais comuns e acessíveis para começar.

**Tecnologias Recomendadas para a Base:**

* **Frontend (o que o usuário vê):**
    * **HTML:** Estrutura da página.
    * **CSS:** Estilo e design.
    * **JavaScript:** Interatividade, lógica do jogo e comunicação com o backend.
    * **Framework/Biblioteca JS (opcional, mas recomendado para sites maiores):** React, Vue.js ou Angular. Para começar, podemos focar em JavaScript puro para simplificar.
* **Backend (o que roda por trás das cenas):**
    * **Node.js com Express.js:** Uma ótima combinação para construir APIs RESTful com JavaScript, permitindo que você use a mesma linguagem no frontend e backend.
    * **Python com Flask/Django:** Outra excelente opção, Python é muito versátil e tem bibliotecas poderosas.
    * **PHP com Laravel/CodeIgniter:** Uma escolha tradicional e ainda muito utilizada.
    * **Para este projeto, vamos focar em Node.js com Express.js, que é leve e moderno.**
* **Banco de Dados:**
    * **MongoDB (NoSQL):** Flexível e bom para prototipagem rápida, especialmente com Node.js.
    * **PostgreSQL ou MySQL (SQL):** Mais estruturado, ideal para dados financeiros que exigem alta integridade.
    * **Para começar, o MongoDB pode ser mais rápido para configurar, mas o PostgreSQL ou MySQL seriam mais robustos a longo prazo para dados financeiros.** Vou sugerir o **MongoDB** para a prototipagem inicial pela facilidade de uso com Node.js.

---

### Estrutura de Pastas e Arquivos (Exemplo para Node.js/Express.js com Frontend Simples)

Vamos organizar o projeto em duas partes principais: `frontend` e `backend`.

```
/nome-do-projeto
├── /frontend
│   ├── /css
│   │   └── style.css
│   ├── /js
│   │   └── app.js
│   ├── /images
│   │   └── logo.png
│   └── index.html
├── /backend
│   ├── /src
│   │   ├── /config
│   │   │   └── db.js         (Configuração do banco de dados)
│   │   ├── /models
│   │   │   ├── User.js       (Modelo de usuário)
│   │   │   ├── Transaction.js (Modelo de transação)
│   │   │   └── Goal.js       (Modelo de meta/desafio)
│   │   ├── /routes
│   │   │   ├── authRoutes.js   (Rotas de autenticação)
│   │   │   ├── userRoutes.js   (Rotas de usuário)
│   │   │   ├── transactionRoutes.js (Rotas de transações)
│   │   │   └── goalRoutes.js   (Rotas de metas/desafios)
│   │   ├── /controllers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── transactionController.js
│   │   │   └── goalController.js
│   │   └── app.js              (Arquivo principal do servidor)
│   ├── package.json          (Dependências do Node.js)
│   └── .env                  (Variáveis de ambiente)
├── .gitignore
└── README.md
```

---

### Detalhamento dos Arquivos (Com Conteúdo Básico)

#### 1. `README.md` (Raiz do Projeto)

```markdown
# Finanças Gamificadas

Um aplicativo web para organizar finanças pessoais com elementos de gamificação, incentivando o usuário a economizar e investir através de metas, recompensas e desafios.

## Estrutura do Projeto

* **`frontend/`**: Contém todos os arquivos do lado do cliente (HTML, CSS, JavaScript).
* **`backend/`**: Contém o servidor Node.js com Express, API e lógica de banco de dados.

## Tecnologias Utilizadas

* **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS ou React/Vue/Angular para futuro).
* **Backend**: Node.js, Express.js.
* **Banco de Dados**: MongoDB.

## Como Rodar

### Pré-requisitos

* Node.js e npm instalados.
* MongoDB instalado e rodando.

### Backend

1.  Navegue até a pasta `backend/`: `cd backend`
2.  Instale as dependências: `npm install`
3.  Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:
    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/financas_gamificadas
    JWT_SECRET=sua_chave_secreta_jwt_aqui
    ```
4.  Inicie o servidor: `npm start` (ou `node src/app.js`)

### Frontend

1.  Abra o arquivo `frontend/index.html` em seu navegador. (Para desenvolvimento, você pode usar uma extensão como "Live Server" no VS Code).

## Funcionalidades (MVP)

* Registro e Login de Usuários.
* Dashboard com resumo financeiro.
* Registro de Receitas e Despesas.
* Criação e acompanhamento de Metas de Economia.
* Sistema de Pontos e Níveis (Gamificação básica).
* Desafios simples.

## Próximas Etapas

* Implementar autenticação JWT.
* Adicionar validação de dados.
* Melhorar a interface do usuário.
* Expandir funcionalidades de gamificação.
* ...
```

#### 2. `.gitignore` (Raiz do Projeto)

```
# Node.js
node_modules/
.env

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
```

---

### Backend (`/backend`)

#### 2.1. `backend/package.json`

```json
{
  "name": "financas-gamificadas-backend",
  "version": "1.0.0",
  "description": "Backend para o app de finanças gamificadas",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "keywords": [],
  "author": "Seu Nome",
  "license": "ISC",
  ""dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.2"
  }
}
```
* **Para instalar as dependências:** Vá para a pasta `/backend` no terminal e execute `npm install`.

#### 2.2. `backend/.env` (Crie este arquivo após instalar o npm e antes de rodar)

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/financas_gamificadas
JWT_SECRET=sua_chave_secreta_muito_forte_e_aleatoria_aqui
```
* **Importante:** Mude `sua_chave_secreta_muito_forte_e_aleatoria_aqui` para uma string longa e complexa. Você pode gerar uma online.

#### 2.3. `backend/src/app.js` (Arquivo principal do servidor)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(cors()); // Permite requisições de diferentes origens (frontend)
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API de Finanças Gamificadas está rodando!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```

#### 2.4. `backend/src/config/db.js` (Configuração do Banco de Dados)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Erro: ${err.message}`);
        process.exit(1); // Sai do processo com falha
    }
};

module.exports = connectDB;
```

#### 2.5. `backend/src/models/User.js` (Modelo de Usuário)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Criptografar senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparar senha
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
```

#### 2.6. `backend/src/models/Transaction.js` (Modelo de Transação)

```javascript
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: { // 'income' ou 'expense'
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false // Pode ser opcional, ou com categorias pré-definidas
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
```

#### 2.7. `backend/src/models/Goal.js` (Modelo de Meta/Desafio)

```javascript
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    targetAmount: { // Valor a ser economizado/atingido
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    rewardPoints: { // Pontos ganhos ao completar a meta
        type: Number,
        default: 50
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
```

#### 2.8. `backend/src/middleware/authMiddleware.js` (Middleware de Autenticação)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Não autorizado, token falhou' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token' });
    }
};

module.exports = { protect };
```

#### 2.9. `backend/src/controllers/authController.js`

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Gerar Token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expira em 1 hora
    });
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Checar se o usuário já existe
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
        return res.status(400).json({ message: 'Usuário ou e-mail já existe' });
    }

    // Criar usuário
    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            balance: user.balance,
            points: user.points,
            level: user.level,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: 'Dados inválidos' });
    }
};

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Checar email do usuário
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            balance: user.balance,
            points: user.points,
            level: user.level,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Email ou senha inválidos' });
    }
};

// @desc    Obter perfil do usuário
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};


module.exports = { registerUser, loginUser, getMe };
```

#### 2.10. `backend/src/controllers/transactionController.js`

```javascript
const Transaction = require('../models/Transaction');
const User = require('../models/User'); // Para atualizar o saldo do usuário

// @desc    Obter todas as transações do usuário
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Adicionar nova transação
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
    const { description, amount, type, category } = req.body;

    if (!description || !amount || !type) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        const newTransaction = new Transaction({
            user: req.user._id,
            description,
            amount,
            type,
            category
        });

        const savedTransaction = await newTransaction.save();

        // Atualizar saldo do usuário
        const user = await User.findById(req.user._id);
        if (user) {
            if (type === 'income') {
                user.balance += amount;
            } else if (type === 'expense') {
                user.balance -= amount;
                // Lógica de gamificação: pontos por registrar despesa (opcional)
                user.points += 5; 
            }
            await user.save();
        }

        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Excluir transação
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }

        // Garante que o usuário é dono da transação
        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        await transaction.deleteOne(); // Use deleteOne() para Mongoose v6+

        // Reverter saldo do usuário
        const user = await User.findById(req.user._id);
        if (user) {
            if (transaction.type === 'income') {
                user.balance -= transaction.amount;
            } else if (transaction.type === 'expense') {
                user.balance += transaction.amount;
                // Reverter pontos se aplicável
                user.points = Math.max(0, user.points - 5);
            }
            await user.save();
        }


        res.json({ message: 'Transação removida' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};
```

#### 2.11. `backend/src/controllers/goalController.js`

```javascript
const Goal = require('../models/Goal');
const User = require('../models/User');

// @desc    Obter todas as metas do usuário
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id }).sort({ endDate: 1 });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Criar nova meta
// @route   POST /api/goals
// @access  Private
const createGoal = async (req, res) => {
    const { name, targetAmount, endDate } = req.body;

    if (!name || !targetAmount || !endDate) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios para a meta.' });
    }

    try {
        const newGoal = new Goal({
            user: req.user._id,
            name,
            targetAmount,
            endDate: new Date(endDate) // Assegura que é um objeto Date
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Atualizar meta (ex: adicionar progresso)
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
    const { currentAmount, isCompleted } = req.body;

    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Meta não encontrada' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        // Atualiza o progresso
        if (currentAmount !== undefined) {
            goal.currentAmount = currentAmount;
        }

        // Marca como completa e concede pontos se aplicável
        if (isCompleted !== undefined) {
            goal.isCompleted = isCompleted;
            if (isCompleted && !goal.isCompleted) { // Se acabou de ser completada
                const user = await User.findById(req.user._id);
                if (user) {
                    user.points += goal.rewardPoints;
                    // Lógica para subir de nível (simplificada)
                    if (user.points >= user.level * 100) { // Ex: 100 pontos para nível 1, 200 para nível 2
                        user.level += 1;
                        console.log(`Usuário ${user.username} subiu para o nível ${user.level}!`);
                    }
                    await user.save();
                }
            }
        }
        
        const updatedGoal = await goal.save();
        res.json(updatedGoal);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Deletar meta
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Meta não encontrada' });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        await goal.deleteOne();
        res.json({ message: 'Meta removida' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
};
```

#### 2.12. `backend/src/routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // Rota protegida

module.exports = router;
```

#### 2.13. `backend/src/routes/transactionRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTransactions).post(protect, addTransaction);
router.route('/:id').delete(protect, deleteTransaction);

module.exports = router;
```

#### 2.14. `backend/src/routes/goalRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
```

#### 2.15. `backend/src/routes/userRoutes.js` (Básico para o usuário, pode ser expandido)

```javascript
const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/authController'); // Reutiliza a função getMe
const { protect } = require('../middleware/authMiddleware');

// Esta rota já está em authRoutes, mas pode ser usada para futuras informações do usuário.
router.get('/profile', protect, getMe);

module.exports = router;
```

---

### Frontend (`/frontend`)

#### 3.1. `frontend/index.html` (Página principal)

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
                    <h3>Login</h3>
                    <input type="email" id="login-email" placeholder="E-mail" required>
                    <input type="password" id="login-password" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                    <p>Não tem conta? <a href="#" id="show-register">Cadastre-se</a></p>
                    <div id="login-error" class="error-message"></div>
                </form>

                <form id="register-form" style="display: none;">
                    <h3>Cadastre-se</h3>
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

#### 3.2. `frontend/css/style.css`

```css
/* Variáveis CSS */
:root {
    --primary-color: #4CAF50; /* Verde */
    --secondary-color: #FFC107; /* Amarelo */
    --dark-color: #333;
    --light-color: #f4f4f4;
    --white-color: #fff;
    --red-color: #f44336; /* Vermelho para despesas/erros */
    --green-color: #28a745; /* Verde para receitas/sucesso */
}

/* Base */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: var(--light-color);
    color: var(--dark-color);
}

.container {
    max-width: 1100px;
    margin: auto;
    overflow: hidden;
    padding: 0 20px;
}

a {
    color: var(--primary-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

ul {
    list-style: none;
}

/* Header */
header {
    background-color: var(--primary-color);
    color: var(--white-color);
    padding: 1rem 0;
    border-bottom: 3px solid var(--secondary-color);
}

header h1 {
    float: left;
    margin-bottom: 0;
}

header nav {
    float: right;
}

header ul {
    margin: 0;
    padding: 0;
}

header li {
    display: inline;
    padding: 0 15px;
}

header a {
    color: var(--white-color);
    text-decoration: none;
}

header a.active, header a:hover {
    color: var(--secondary-color);
    text-decoration: none;
}

/* Main Content */
main {
    padding: 2rem 0;
}

.content-section {
    background-color: var(--white-color);
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.content-section h2, .content-section h3 {
    color: var(--dark-color);
    margin-bottom: 15px;
    text-align: center;
}

/* Forms */
form {
    background-color: var(--white-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

form h3 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--primary-color);
}

form input[type="text"],
form input[type="email"],
form input[type="password"],
form input[type="number"],
form input[type="date"],
form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

form button {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

form button:hover {
    background-color: #45a049;
}

form p {
    text-align: center;
    margin-top: 15px;
}

/* Auth Forms */
.auth-forms {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.auth-forms form {
    flex: 1;
    min-width: 300px;
    max-width: 400px;
}


/* Summary Cards (Dashboard) */
.summary-cards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    text-align: center;
}

.summary-cards .card {
    background-color: var(--white-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    flex: 1;
    min-width: 250px;
    text-align: center;
    border-bottom: 4px solid var(--primary-color);
}

.balance-card { border-bottom-color: var(--primary-color); }
.points-card { border-bottom-color: var(--secondary-color); }
.level-card { border-bottom-color: var(--red-color); /* Pode ser outra cor */ }


.summary-cards h3 {
    margin-bottom: 10px;
    color: var(--dark-color);
}

.summary-cards p {
    font-size: 2em;
    font-weight: bold;
    color: var(--primary-color);
}

/* Transaction List */
.transaction-list, .goal-list {
    background-color: var(--white-color);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    padding: 0;
    margin-top: 20px;
}

.transaction-list li, .goal-list li {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.transaction-list li:last-child, .goal-list li:last-child {
    border-bottom: none;
}

.transaction-list li .description, .goal-list li .name {
    font-weight: bold;
    flex: 2;
}

.transaction-list li .amount {
    font-weight: bold;
    font-size: 1.1em;
    flex: 1;
    text-align: right;
}

.transaction-list li.income .amount {
    color: var(--green-color);
}

.transaction-list li.expense .amount {
    color: var(--red-color);
}

.transaction-list li .date, .goal-list li .dates {
    font-size: 0.9em;
    color: #777;
    flex: 1;
    text-align: center;
}
.transaction-list li .category {
    font-size: 0.9em;
    color: #555;
    flex: 1;
    text-align: left;
}


.transaction-list li .delete-btn, .goal-list li .delete-btn, .goal-list li .complete-btn, .goal-list li .add-progress-btn {
    background-color: var(--red-color);
    color: var(--white-color);
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    margin-left: 10px;
    transition: background-color 0.3s ease;
}

.transaction-list li .delete-btn:hover, .goal-list li .delete-btn:hover {
    background-color: #c9302c;
}

.goal-list li .progress-bar-container {
    width: 100%;
    background-color: #ddd;
    border-radius: 5px;
    margin-top: 5px;
    overflow: hidden;
}

.goal-list li .progress-bar {
    height: 15px;
    background-color: var(--primary-color);
    width: 0%; /* Será preenchido via JS */
    border-radius: 5px;
    text-align: center;
    color: white;
    font-size: 0.8em;
    line-height: 15px;
    transition: width 0.5s ease-in-out;
}
.goal-list li .goal-status {
    font-size: 0.9em;
    color: #555;
    margin-top: 5px;
    width: 100%;
}
.goal-list li .goal-actions {
    display: flex;
    gap: 5px;
    margin-top: 10px; /* Separar ações do texto */
    width: 100%; /* Ocupar a largura total para alinhamento */
    justify-content: flex-end; /* Alinhar botões à direita */
}

.goal-list li .complete-btn {
    background-color: var(--green-color);
}
.goal-list li .complete-btn:hover {
    background-color: #218838;
}
.goal-list li .add-progress-btn {
    background-color: #007bff; /* Azul */
}
.goal-list li .add-progress-btn:hover {
    background-color: #0056b3;
}


/* Messages */
.error-message {
    color: var(--red-color);
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    text-align: center;
}

.info-message {
    color: var(--green-color);
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    text-align: center;
}


/* Footer */
footer {
    background-color: var(--dark-color);
    color: var(--white-color);
    text-align: center;
    padding: 1rem 0;
    margin-top: 30px;
}

/* Utilities */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Responsive Design */
@media (max-width: 768px) {
    header h1, header nav {
        float: none;
        text-align: center;
    }

    header nav ul {
        padding-top: 10px;
    }

    header li {
        display: block;
        padding: 5px 0;
    }

    .summary-cards .card {
        flex: none;
        width: 100%;
    }

    .auth-forms {
        flex-direction: column;
    }
}
```

#### 3.3. `frontend/js/app.js` (Lógica do Frontend)

```javascript
// URLs da API (ajuste conforme o ambiente de desenvolvimento/produção)
const API_BASE_URL = 'http://localhost:3000/api';

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

let userToken = localStorage.getItem('token'); // Tenta pegar o token do localStorage

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
    if (userToken) {
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
    clearMessages(); // Limpa outras mensagens antes
    element.textContent = message;
    element.classList.add(`${type}-message`);
}

// --- Funções de API ---

async function fetchAPI(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
    }

    const options = {
        method,
        headers
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            // Se o token expirou ou é inválido, redireciona para login
            if (response.status === 401) {
                logoutUser();
                throw new Error('Sessão expirada ou não autorizado. Faça login novamente.');
            }
            throw new Error(data.message || 'Ocorreu um erro');
        }
        return data;
    } catch (error) {
        console.error('Erro na requisição da API:', error);
        throw error; // Propaga o erro para ser tratado pela função que chamou
    }
}

async function loginUser(email, password) {
    try {
        clearMessages();
        const data = await fetchAPI('/auth/login', 'POST', { email, password });
        localStorage.setItem('token', data.token);
        userToken = data.token;
        updateNavVisibility();
        await loadDashboardData();
    } catch (error) {
        displayMessage(loginErrorDiv, error.message, 'error');
    }
}

async function registerUser(username, email, password) {
    try {
        clearMessages();
        const data = await fetchAPI('/auth/register', 'POST', { username, email, password });
        localStorage.setItem('token', data.token);
        userToken = data.token;
        updateNavVisibility();
        await loadDashboardData();
        displayMessage(registerErrorDiv, 'Registro realizado com sucesso!', 'info');
    } catch (error) {
        displayMessage(registerErrorDiv, error.message, 'error');
    }
}

function logoutUser() {
    localStorage.removeItem('token');
    userToken = null;
    updateNavVisibility();
    showSection(authSection);
    displayMessage(loginErrorDiv, 'Você foi desconectado.', 'info');
}

async function getMe() {
    try {
        return await fetchAPI('/auth/me');
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        logoutUser(); // Força logout se não conseguir o perfil
    }
}

async function getTransactions() {
    return await fetchAPI('/transactions');
}

async function addTransaction(description, amount, type, category) {
    try {
        const transaction = await fetchAPI('/transactions', 'POST', { description, amount, type, category });
        displayMessage(transactionMessageDiv, 'Transação adicionada com sucesso!', 'info');
        // Recarrega os dados após adicionar a transação
        await loadDashboardData();
        await loadTransactions();
        return transaction;
    } catch (error) {
        displayMessage(transactionMessageDiv, error.message, 'error');
    }
}

async function deleteTransaction(id) {
    try {
        await fetchAPI(`/transactions/${id}`, 'DELETE');
        displayMessage(transactionMessageDiv, 'Transação removida com sucesso!', 'info');
        await loadDashboardData();
        await loadTransactions();
    } catch (error) {
        displayMessage(transactionMessageDiv, error.message, 'error');
    }
}

async function getGoals() {
    return await fetchAPI('/goals');
}

async function createGoal(name, targetAmount, endDate) {
    try {
        const goal = await fetchAPI('/goals', 'POST', { name, targetAmount, endDate });
        displayMessage(goalMessageDiv, 'Meta criada com sucesso!', 'info');
        await loadDashboardData();
        await loadGoals();
        return goal;
    } catch (error) {
        displayMessage(goalMessageDiv, error.message, 'error');
    }
}

async function updateGoal(id, dataToUpdate) {
    try {
        const goal = await fetchAPI(`/goals/${id}`, 'PUT', dataToUpdate);
        displayMessage(goalMessageDiv, 'Meta atualizada com sucesso!', 'info');
        await loadDashboardData();
        await loadGoals();
        return goal;
    } catch (error) {
        displayMessage(goalMessageDiv, error.message, 'error');
    }
}

async function deleteGoal(id) {
    try {
        await fetchAPI(`/goals/${id}`, 'DELETE');
        displayMessage(goalMessageDiv, 'Meta removida com sucesso!', 'info');
        await loadDashboardData();
        await loadGoals();
    } catch (error) {
        displayMessage(goalMessageDiv, error.message, 'error');
    }
}


// --- Renderização de Dados ---

async function loadDashboardData() {
    if (!userToken) return;

    try {
        const user = await getMe();
        if (user) {
            currentBalanceSpan.textContent = `R$ ${user.balance.toFixed(2)}`;
            currentPointsSpan.textContent = user.points;
            currentLevelSpan.textContent = user.level;
        }

        const transactions = await getTransactions();
        renderTransactions(transactions.slice(0, 5), latestTransactionsList); // Apenas as 5 últimas

        const goals = await getGoals();
        renderGoals(goals.filter(goal => !goal.isCompleted), activeGoalsList); // Apenas metas ativas
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
    }
}

async function loadTransactions() {
    if (!userToken) return;

    try {
        const transactions = await getTransactions();
        renderTransactions(transactions, transactionsList);
    } catch (error) {
        console.error('Erro ao carregar transações:', error);
    }
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
            <button class="delete-btn" data-id="${t._id}">Excluir</button>
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
    if (!userToken) return;

    try {
        const goals = await getGoals();
        renderGoals(goals, userGoalsList); // Todas as metas do usuário
    } catch (error) {
        console.error('Erro ao carregar metas:', error);
    }
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
                ${!isCompleted ? `<button class="add-progress-btn" data-id="${g._id}">Add Progresso</button>` : ''}
                ${!isCompleted ? `<button class="complete-btn" data-id="${g._id}">Completar</button>` : '<span>Concluída!</span>'}
                <button class="delete-btn" data-id="${g._id}">Excluir</button>
            </div>
        `;
        targetList.appendChild(li);

        // Adiciona event listeners
        if (!isCompleted) {
            li.querySelector('.add-progress-btn')?.addEventListener('click', async () => {
                const amountToAdd = parseFloat(prompt('Quanto você quer adicionar ao progresso desta meta?'));
                if (!isNaN(amountToAdd) && amountToAdd > 0) {
                    await updateGoal(g._id, { currentAmount: g.currentAmount + amountToAdd });
                } else if (amountToAdd <= 0) {
                    alert('Por favor, insira um valor positivo.');
                }
            });

            li.querySelector('.complete-btn')?.addEventListener('click', async () => {
                if (confirm('Marcar esta meta como concluída?')) {
                    await updateGoal(g._id, { isCompleted: true, currentAmount: g.targetAmount }); // Garante que o valor atual atinge o alvo
                }
            });
        }
        
        li.querySelector('.delete-btn')?.addEventListener('click', async () => {
            if (confirm('Tem certeza que deseja excluir esta meta?')) {
                await deleteGoal(g._id);
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

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    await loginUser(email, password);
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    await registerUser(username, email, password);
});

// Formulário de Transação
addTransactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = transactionDescriptionInput.value;
    const amount = parseFloat(transactionAmountInput.value);
    const type = transactionTypeSelect.value;
    const category = transactionCategoryInput.value;

    if (!description || !amount || !type) {
        displayMessage(transactionMessageDiv, 'Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        displayMessage(transactionMessageDiv, 'O valor deve ser um número positivo.', 'error');
        return;
    }

    await addTransaction(description, amount, type, category);
    addTransactionForm.reset(); // Limpa o formulário
});

// Formulário de Criação de Meta
createGoalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = goalNameInput.value;
    const targetAmount = parseFloat(goalTargetAmountInput.value);
    const endDate = goalEndDateInput.value; // Formato YYYY-MM-DD

    if (!name || !targetAmount || !endDate) {
        displayMessage(goalMessageDiv, 'Por favor, preencha todos os campos da meta.', 'error');
        return;
    }
    if (isNaN(targetAmount) || targetAmount <= 0) {
        displayMessage(goalMessageDiv, 'O valor alvo deve ser um número positivo.', 'error');
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (endDate < today) {
        displayMessage(goalMessageDiv, 'A data final não pode ser no passado.', 'error');
        return;
    }

    await createGoal(name, targetAmount, endDate);
    createGoalForm.reset();
});


// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    updateNavVisibility();
    if (userToken) {
        loadDashboardData();
    }
});
```

---

### Próximos Passos para Você:

1.  **Instale Node.js e MongoDB:** Se você não os tem, instale-os.
    * Node.js: [https://nodejs.org/](https://nodejs.org/)
    * MongoDB: [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/) (você pode usar o MongoDB Community Server ou o MongoDB Atlas para uma solução na nuvem).
2.  **Crie as Pastas e Arquivos:** Siga a estrutura de pastas e crie todos os arquivos com o conteúdo fornecido.
3.  **Instale Dependências do Backend:**
    * Abra o terminal e navegue até a pasta `nome-do-projeto/backend`.
    * Execute `npm install`.
4.  **Configure o `.env`:** Crie o arquivo `.env` dentro da pasta `backend` e preencha com suas variáveis.
5.  **Inicie o Servidor Backend:**
    * No terminal, na pasta `backend`, execute `npm start` (ou `nodemon src/app.js` se você instalou `nodemon` para desenvolvimento).
    * Você deve ver as mensagens "MongoDB Conectado" e "Servidor rodando na porta 3000".
6.  **Abra o Frontend:**
    * Abra o arquivo `nome-do-projeto/frontend/index.html` em seu navegador.
    * Para um desenvolvimento mais fácil, você pode usar uma extensão como "Live Server" no VS Code, que atualiza a página automaticamente quando você salva alterações.

**Observações Importantes:**

* **Segurança:** Este é um MVP (Produto Mínimo Viável). Em um ambiente de produção, você precisaria de muito mais segurança, como validação robusta de entradas, tratamento de erros mais detalhado, criptografia de ponta a ponta, HTTPS, etc.
* **Gamificação:** A gamificação aqui é básica (pontos e níveis). Você pode expandir para conquistas, rankings, avatares, desafios mais complexos, recompensas visuais, etc.
* **Melhorias na UI/UX:** O CSS é bem básico. Invista em um design mais atraente e responsivo.
* **Frameworks Frontend:** Para um projeto maior, o uso de React, Vue.js ou Angular simplificaria muito o gerenciamento do estado e a construção de componentes no frontend.

Este é um excelente ponto de partida! Boa sorte com o desenvolvimento!