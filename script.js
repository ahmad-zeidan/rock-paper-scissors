// Moves and DOM elements
const moves = ['rock', 'paper', 'scissors'];
const buttons = document.querySelectorAll('.move-button');
const resetButton = document.getElementById('reset-button');

// Add event listeners to the move buttons dynamically
buttons.forEach((button, index) => {
    button.addEventListener('click', () => playGame(moves[index]));
});

// Reset button event listener
resetButton.addEventListener('click', resetScore);

// Load score from localStorage or initialize it
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// Update the score element initially
updateScoreElement();

// Function to play the game
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    // Determine the result using an outcome map
    const outcomeMap = {
        rock: { rock: 'Tie!', paper: 'You lose!', scissors: 'You win!' },
        paper: { rock: 'You win!', paper: 'Tie!', scissors: 'You lose!' },
        scissors: { rock: 'You lose!', paper: 'You win!', scissors: 'Tie!' }
    };

    const result = outcomeMap[playerMove][computerMove];

    // Update score
    updateScore(result);

    // Display result, moves, and updated score
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
        You: <img src="images/${playerMove}.png" class="move-icon"> 
        Computer: <img src="images/${computerMove}.png" class="move-icon">
    `;
}

// Function to update the score and save it to localStorage
function updateScore(result) {
    if (result === 'You win!') score.wins++;
    else if (result === 'You lose!') score.losses++;
    else if (result === 'Tie!') score.ties++;

    // Save the updated score in localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update the score element in the DOM
    updateScoreElement();
}

// Function to update the score display in the DOM
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `
        Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}
    `;
}

// Function to reset the score
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}

// Function to pick a random move for the computer
function pickComputerMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}


// Function to auto play
let isAutoPlaying = false
let intervalId;


function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
    isAutoPlaying = true;
    } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    }
};
