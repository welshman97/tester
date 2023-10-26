document.addEventListener("DOMContentLoaded", function () {

    //Background Audio
    const audio = document.querySelector("audio");
    audio.volume = 0.1;
    audio.play();

    // Sample code to generate a random board
    function generateRandomBoard(size) {
        const numbers = Array.from({ length: size / 2 }, (_, i) => i + 1);
        const shuffledNumbers = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
        return shuffledNumbers;
    }

    //Timer
    const timerElement = document.getElementById('timer');
    let elapsedTime;

    let startTime;
    function startTimer() {
        startTime = new Date();
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentTime = Date.now();
        elapsedTime = Math.floor((currentTime - startTime) / 1000);
        timerElement.textContent = `You have been playing for ${elapsedTime} seconds`;
    }

    bestTime = document.getElementById('bestTime');

    // Initial Variables
    var size = 12; // Change this to the desired board size (twice the number of cards)
    const numbers = generateRandomBoard(size);
    let gameArray = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let currentNumberCounter = 1
    document.getElementById("currentCard").textContent = `You are looking for the ${currentNumberCounter}s`;
    let wrongSound = new Audio("sounds/answer-wrong.mp3");
    let correctSound = new Audio('sounds/correct-ans-sound.mp3');
    let winSound = new Audio('sounds/all-i-do-is-win.mp3');
    let cardFlipSound = new Audio('sounds/card-flip.mp3');

    // Create Game Board
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < numbers.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = numbers[i];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
        startTimer();
    }
    alert("Please make sure your screen size is larger than 422px");
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
        cardFlipSound.play();

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
                    document.getElementById("currentCard").textContent = `You are looking for the ${currentNumberCounter}s`; // update the current value that has to be matched 
                }

                // Reset flippedCards array
                flippedCards = [];

                // Check for game completion
                if (matchedPairs === (numbers.length / 2)) {
                    winSound.play();
                    setTimeout(() => { alert("You won!"); }, 500); // put in a delay to allow the browser to update the color of last card before displaying success message!!!
                    bestTime.textContent = `Your best time is ${elapsedTime} seconds`
                }
            } else {
                // Cards do not match, flip them back after a short delay
                setTimeout(() => {
                    wrongSound.play();
                    firstCard.textContent = "";
                    secondCard.textContent = "";
                    firstCard.style.backgroundColor = "yellow"
                    secondCard.style.backgroundColor = "yellow"
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    // Reset flippedCards array
                    flippedCards = [];
                }, 700);
            }
        }
    }

    //Easy Mode Button event listener
    const easyModeButton = document.getElementById('easyMode');
    easyModeButton.addEventListener('click', function (event) {
        size = 12;
        resetGame();
        startTimer();
    });

    //Medium Mode Button event listener
    const mediumModeButton = document.getElementById('mediumMode');
    mediumModeButton.addEventListener('click', function (event) {
        size = 16;
        resetGame();
        startTimer();
    });

    //Hard Mode Button event listener
    const hardModeButton = document.getElementById('hardMode');
    hardModeButton.addEventListener('click', function (event) {
        size = 20;
        resetGame();
        startTimer();
    });

    //Game Reset function
    function resetGame() {
        gameBoard.innerHTML = ''; // Clear the existing game board
        currentNumberCounter = 1;
        document.getElementById("currentCard").textContent = `You are looking for the ${currentNumberCounter}s`;
        numbers.length = 0; // Clear the numbers array
        numbers.push(...generateRandomBoard(size)); // Generate new numbers
        matchedPairs = 0;
        flippedCards = [];
        gameArray = [];

        // Create a new game board with the updated size
        for (let i = 0; i < numbers.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.number = numbers[i];
            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
        }
    }
});