// Preços dos hambúrgueres
const prices = {
  burguer1: 19.90,
  burguer2: 23.30,
  burguer3: 24.50,
  burguer4: 21.90
};

// Modal e botões
const cartModal = document.getElementById("cart-modal");
const btnOpenCart = document.getElementById("open-cart-btn");
const btnCloseCart = document.querySelector(".close");
const subtotalElement = document.getElementById("subtotal");
const buyBtn = document.getElementById("buy-btn");

// Quantidades iniciais dos hambúrgueres
let qtyBurguer1 = 0, qtyBurguer2 = 0, qtyBurguer3 = 0, qtyBurguer4 = 0;

// Função para abrir o modal
btnOpenCart.addEventListener("click", () => {
  cartModal.style.display = "block";
});

// Função para fechar o modal
btnCloseCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Função para calcular o subtotal
function calculateSubtotal() {
  const subtotal = (qtyBurguer1 * prices.burguer1) +
                   (qtyBurguer2 * prices.burguer2) +
                   (qtyBurguer3 * prices.burguer3) +
                   (qtyBurguer4 * prices.burguer4);
  
  subtotalElement.textContent = subtotal.toFixed(2);
}

// Função para quantidade
function updateQuantity(burguer, operation) {
  if (operation === "plus") {
    if (burguer === 1) qtyBurguer1++;
    if (burguer === 2) qtyBurguer2++;
    if (burguer === 3) qtyBurguer3++;
    if (burguer === 4) qtyBurguer4++;
  } else if (operation === "minus") {
    if (burguer === 1 && qtyBurguer1 > 0) qtyBurguer1--;
    if (burguer === 2 && qtyBurguer2 > 0) qtyBurguer2--;
    if (burguer === 3 && qtyBurguer3 > 0) qtyBurguer3--;
    if (burguer === 4 && qtyBurguer4 > 0) qtyBurguer4--;
  }

  document.getElementById(`qty-burguer${burguer}`).textContent = eval(`qtyBurguer${burguer}`);
  calculateSubtotal();
}

// clique nos botões "+" e "-"
document.getElementById("plus-burguer1").addEventListener("click", () => updateQuantity(1, "plus"));
document.getElementById("minus-burguer1").addEventListener("click", () => updateQuantity(1, "minus"));
document.getElementById("plus-burguer2").addEventListener("click", () => updateQuantity(2, "plus"));
document.getElementById("minus-burguer2").addEventListener("click", () => updateQuantity(2, "minus"));
document.getElementById("plus-burguer3").addEventListener("click", () => updateQuantity(3, "plus"));
document.getElementById("minus-burguer3").addEventListener("click", () => updateQuantity(3, "minus"));
document.getElementById("plus-burguer4").addEventListener("click", () => updateQuantity(4, "plus"));
document.getElementById("minus-burguer4").addEventListener("click", () => updateQuantity(4, "minus"));

// Evento de compra
buyBtn.addEventListener("click", () => {
  alert("Obrigado pela compra!");
  cartModal.style.display = "none";
});

// Fechar modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
});

// --- Código para rotação dos hambúrgueres ---
const burgerArray = document.querySelectorAll(".burger-wrapper");
const title = document.querySelector("h1");
const description = document.querySelector(".burger-info");
const burgerWheel = document.querySelector(".burger-wheel");
const ingredientsWheel = document.querySelector(".ingredients-wheel");

let currentBurgerIndex = 0;
let deg = -45;

const burgerData = [
  {
    name: "Alfa Burguer",
    description: "Carne Bovina, Bacon, Queijo Cheddar, Cebola Caramelizada,<br/>Tomate.",
    backgroundColor: "linear-gradient(90deg, rgba(167,162,244,1) 0%, rgba(112,112,143,1) 35%, rgba(166,149,13,1) 100%, rgba(0,212,255,1) 100%)",
  },
  {
    name: "Gama Burguer",
    description: "Carne Bovina, Bacon, Queijo Cheddar, Maionese temperada<br/>Ovo, Alface, Tomate.",
    backgroundColor: "linear-gradient(90deg, rgba(2,19,45,1) 4%, rgba(120,109,181,1) 49%, rgba(230,132,132,1) 100%, rgba(0,212,255,1) 100%)",
  },
  {
    name: "Omega Burguer",
    description: "Carne Bovina, Bacon, Queijo Cheddar, Cebola Caramelizada<br/>Ovo, Alface, Tomate, Molho Apimentado.",
    backgroundColor: "linear-gradient(90deg, rgba(9,111,55,1) 0%, rgba(39,196,129,1) 49%, rgba(47,209,232,1) 100%, rgba(0,212,255,1) 100%)",
  },
  {
    name: "Beta Burguer",
    description: "Carne Bovina, Queijo Cheddar, Cebola Caramelizada<br/>Alface, Tomate.",
    backgroundColor: "linear-gradient(90deg, rgba(101,18,18,1) 0%, rgba(186,44,44,1) 49%, rgba(235,134,80,1) 100%, rgba(0,212,255,1) 100%)",
  },
];

burgerArray.forEach((element, index) => {
  element.addEventListener("click", () => {
    // Calcular o ângulo necessário para o hambúrguer selecionado
    let rotationDifference = (index - currentBurgerIndex) * 90;
    
    // Atualizar o estado atual para o índice do hambúrguer clicado
    currentBurgerIndex = index;
    
    // Aplicar a rotação correta na roda dos hambúrgueres e dos ingredientes
    deg += rotationDifference;
    burgerWheel.style.transform = `rotate(${deg}deg)`;
    ingredientsWheel.style.transform = `rotate(${deg}deg)`;

    // Atualizar o conteúdo de acordo com o hambúrguer selecionado
    document.querySelector("main").style.background = burgerData[index].backgroundColor;
    title.innerHTML = burgerData[index].name;
    description.innerHTML = burgerData[index].description;
  });
});
