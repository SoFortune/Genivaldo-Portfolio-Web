// Pegando os elementos principais
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Quando clicar no botão de criar conta, ativa o container com a classe 'active'
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// Quando clicar no botão de login, remove a classe 'active' do container
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
