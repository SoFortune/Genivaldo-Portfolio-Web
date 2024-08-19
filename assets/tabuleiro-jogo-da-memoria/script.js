const gameBoard = document.getElementById('gameBoard');
const levelButtons = document.querySelectorAll('.level-button');

const levels = {
    easy: { gridSize: 4, cardPairs: 8 },
    medium: { gridSize: 6, cardPairs: 18 },
    hard: { gridSize: 8, cardPairs: 32 },
    insane: { gridSize: 8, cardPairs: 32, resetOnMiss: true }
};

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matches = 0;
let currentLevel = levels.easy;
let matchedCards = [];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function generateCards(cardPairs) {
    const cards = [];
    for (let i = 1; i <= cardPairs; i++) {
        cards.push(i);
        cards.push(i);
    }
    shuffle(cards);
    return cards;
}

function createBoard(level) {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${level.gridSize}, 1fr)`;

    const cards = generateCards(level.cardPairs);

    cards.forEach(number => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.number = number;
        cardElement.innerHTML = number;  
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    matchedCards = []; 
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === currentLevel.cardPairs) {
            setTimeout(() => alert('Parabéns! Você completou o nível!'), 500);
        }
    } else {
        if (currentLevel.resetOnMiss) {
            
            resetMatchedCards();
        }
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedCards.push(firstCard, secondCard); 

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetMatchedCards() {
    matchedCards.forEach(card => {
        card.classList.remove('flipped', 'matched');
        card.addEventListener('click', flipCard);
    });
    matchedCards = [];
}

levelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const levelName = button.getAttribute('data-level');
        currentLevel = levels[levelName];
        matches = 0;
        createBoard(currentLevel);
    });
});
