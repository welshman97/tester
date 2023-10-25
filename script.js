document.addEventListener("DOMContentLoaded", function () {
    // Sample code to generate a random board
    function generateRandomBoard(size) {
        const numbers = Array.from({ length: size / 2 }, (_, i) => i + 1);
        const shuffledNumbers = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
        return shuffledNumbers;
    }

    // Initial Variables
    const size = 24; // Change this to the desired board size (twice the number of cards)
    const numbers = generateRandomBoard(size);
    let gameArray = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let currentNumberCounter = 1
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
        clickedCard.style.backgroundColor = "lightcoral";
        clickedCard.classList.add('flipped');

        // Add card to flippedCards array
        flippedCards.push(clickedCard);

        // Check for match
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if ((parseInt(firstCard.dataset.number) === currentNumberCounter) && (firstCard.dataset.number === secondCard.dataset.number)) {
                // Cards match
                correctSound.play();
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedPairs++;

                if (currentNumberCounter < (numbers.length / 2)) {
                    //only increase if cards remaining to be found
                    currentNumberCounter++;
                    document.getElementById("currentCard").textContent = currentNumberCounter; // update the current value that has to be matched 
                }

                // Reset flippedCards array
                flippedCards = [];

                // Check for game completion
                if (matchedPairs === (numbers.length / 2)) {
                    winSound.play();
                    setTimeout(() => { alert("You won!"); }, 500); // put in a delay to allow the browser to update the color of last card before displaying success message!!!
                }
            } else {
                // Cards do not match, flip them back after a short delay
                setTimeout(() => {
                    wrongSound.play();
                    firstCard.textContent = "???";
                    secondCard.textContent = "???";
                    firstCard.style.backgroundColor = "lightgrey"
                    secondCard.style.backgroundColor = "lightgrey"
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    // Reset flippedCards array
                    flippedCards = [];
                }, 500);
            }
        }
    }
});