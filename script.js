document.addEventListener("DOMContentLoaded", function () {
    // Sample code to generate a random board
    function generateRandomBoard(size) {
        const numbers = Array.from({ length: size / 2 }, (_, i) => i + 1);
        const shuffledNumbers = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
        return shuffledNumbers;
    }

    // Initial Variables
    const size = 20; // Change this to the desired board size (twice the number of cards)
    const numbers = generateRandomBoard(size);
    let gameArray = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let wrongSound = new Audio('wrong.mp3');
    let correctSound = new Audio('correct.mp3');
    let winSound = new Audio('sweet.mp3');

    // Create Game Board
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < numbers.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = numbers[i];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    }

    // Handle Card Clicks
    function handleCardClick(event) {
        const clickedCard = event.target;

        // Ignore click if the card is already flipped or matched
        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        // Show the card's number
        const cardNumber = clickedCard.dataset.number;
        clickedCard.textContent = cardNumber;
        clickedCard.classList.add('flipped');

        // Add card to flippedCards array
        flippedCards.push(clickedCard);

        // Check for match
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.number === secondCard.dataset.number) {
                // Cards match
                correctSound.play();
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedPairs++;

                // Reset flippedCards array
                flippedCards = [];

                // Check for game completion
                if (matchedPairs === numbers.length / 2) {
                    alert('You won!');
                    winSound.play();
                }
            } else {
                // Cards do not match, flip them back after a short delay
                setTimeout(() => {
                    wrongSound.play();
                    firstCard.textContent = '';
                    secondCard.textContent = '';
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    // Reset flippedCards array
                    flippedCards = [];
                }, 100);
            }
        }
    }
});
