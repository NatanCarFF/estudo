# Finanças Gamificadas

Este é um aplicativo web simples para organizar finanças pessoais com elementos de gamificação, incentivando o usuário a economizar e investir através de metas, recompensas e desafios.

**Importante:** Este aplicativo é puramente frontend e projetado para ser hospedado via GitHub Pages. Todos os dados são armazenados localmente no navegador do usuário (utilizando `localStorage`), o que significa que **os dados não são sincronizados entre diferentes dispositivos ou navegadores.**

## Funcionalidades Principais

* **Autenticação Simples:** Sistema de login/registro básico para simular a experiência do usuário (os dados de login não são persistentes ou seguros como em um backend real, servem apenas para gerenciar o estado local).
* **Dashboard:** Visão geral do saldo atual, pontos e nível do usuário.
* **Transações:** Adição e exclusão de receitas e despesas.
* **Metas e Desafios:** Criação, acompanhamento do progresso e conclusão de metas de economia, com pontos de recompensa.
* **Gamificação:** Ganhos de pontos por registrar transações e completar metas, com um sistema de níveis.

## Tecnologias Utilizadas

* **HTML5:** Para a estrutura da página.
* **CSS3:** Para a estilização e design.
* **JavaScript (ES6+):** Para a lógica do aplicativo, interatividade e gerenciamento de dados via `localStorage`.

## Como Rodar Localmente

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```
    (Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados do GitHub).
2.  **Abra no Navegador:**
    Simplesmente abra o arquivo `index.html` no seu navegador web preferido.

## Como Publicar no GitHub Pages

1.  **Crie um Repositório GitHub:**
    * Crie um novo repositório **público** no GitHub.
    * Faça o *upload* (ou *push*) de todos os arquivos deste projeto para a branch principal (`main` ou `master`) do seu novo repositório.
2.  **Configure o GitHub Pages:**
    * No seu repositório GitHub, vá em **`Settings`** (Configurações).
    * No menu lateral esquerdo, clique em **`Pages`**.
    * Na seção "Build and deployment", para "Source", selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
    * Clique em **`Save`**.
3.  **Acesse o Site:**
    O GitHub Pages irá construir e implantar seu site. Levará alguns minutos. O URL do seu site será algo como: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

## Limitações

* **Persistência de Dados:** Os dados são armazenados apenas no navegador local do usuário. Se o usuário limpar o cache do navegador, usar um navegador diferente ou outro dispositivo, os dados não estarão disponíveis.
* **Segurança:** Não é adequado para dados financeiros sensíveis ou uso em produção, pois não há backend para validação ou segurança de dados.
* **Funcionalidades de Servidor:** Não há funcionalidades que exijam um servidor (como notificações push, envio de e-mails, processamento de pagamentos, integração com outras APIs externas que exijam chaves secretas).

---

#### 2. `index.html` (Arquivo na raiz do projeto)

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
                    <h3>Login (Simulação Local)</h3>
                    <input type="email" id="login-email" placeholder="E-mail (qualquer um)" required>
                    <input type="password" id="login-password" placeholder="Senha (qualquer uma)" required>
                    <button type="submit">Entrar</button>
                    <p>Não tem conta? <a href="#" id="show-register">Cadastre-se</a></p>
                    <div id="login-error" class="error-message"></div>
                </form>

                <form id="register-form" style="display: none;">
                    <h3>Cadastre-se (Simulação Local)</h3>
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