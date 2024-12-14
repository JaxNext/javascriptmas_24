const emojis = ['🎄', '🎁', '🎅', '☃️']; // Your set of emojis


/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair 
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */
  
// Create a doubled array of emojis for pairs
const gameEmojis = [...emojis, ...emojis];

// Game state variables
let firstCard = null;
let secondCard = null;
let canFlip = true;

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game board
function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    const shuffledEmojis = shuffleArray([...gameEmojis]);
    
    gameBoard.innerHTML = '';
    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Handle card clicks
function handleCardClick(event) {
    const card = event.target;
    
    // Prevent clicking if waiting for cards to flip back or clicking same card
    if (!canFlip || card.classList.contains('revealed') || 
        (firstCard && card.dataset.index === firstCard.dataset.index)) {
        return;
    }

    // Reveal the card
    revealCard(card);

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

// Reveal a card
function revealCard(card) {
    card.classList.add('revealed');
    card.textContent = card.dataset.emoji;
}

// Check if the two revealed cards match
function checkMatch() {
    canFlip = false;
    
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        // Cards match
        firstCard = null;
        secondCard = null;
        canFlip = true;
        
        // Check if game is complete
        checkGameComplete();
    } else {
        // Cards don't match, hide them after a delay
        setTimeout(() => {
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard = null;
            secondCard = null;
            canFlip = true;
        }, 1000);
    }
}

// Check if all pairs have been found
function checkGameComplete() {
    const allCards = document.querySelectorAll('.card');
    const revealedCards = document.querySelectorAll('.card.revealed');
    
    if (allCards.length === revealedCards.length) {
        setTimeout(() => {
            alert('Congratulations! You won! 🎄');
        }, 500);
    }
}

// Start the game when the page loads
window.addEventListener('load', initializeGame);
  