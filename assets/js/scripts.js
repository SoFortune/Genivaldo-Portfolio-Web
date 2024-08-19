// Controle de tema (modo claro/escuro)
const themeToggle = document.getElementById('sw-checkbox');

// Função para alternar o tema
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Aplicar o tema salvo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.checked = false;
    }
});

// Função para navegação suave entre seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Função para mostrar o botão "voltar ao topo"
const backToTopButton = document.getElementById('backToTopButton');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Navegação suave ao clicar no botão de voltar ao topo
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Função para controlar o menu de navegação (abrir/fechar)
const openMenuButton = document.querySelector('.open-menu');
const closeMenuButton = document.querySelector('.close-menu');
const navigation = document.getElementById('navigation');

openMenuButton.addEventListener('click', () => {
    document.body.classList.add('menu-expanded');
    openMenuButton.setAttribute('aria-expanded', 'true');
    closeMenuButton.setAttribute('aria-expanded', 'false');
});

closeMenuButton.addEventListener('click', () => {
    document.body.classList.remove('menu-expanded');
    openMenuButton.setAttribute('aria-expanded', 'false');
    closeMenuButton.setAttribute('aria-expanded', 'true');
});

// Animação de entrada usando ScrollReveal
ScrollReveal().reveal('.col-a, .col-b', {
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    easing: 'ease-out',
    reset: true
});
