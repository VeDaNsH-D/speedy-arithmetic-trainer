let score = 0;
let timeLeft = 30;
let timer;
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert("Please enter your name to start the game!");
        return;
    }

    score = 0;
    timeLeft = 30;
    document.getElementById('answer').disabled = false;
    document.getElementById('answer').value = "";
    document.getElementById('answer').focus();
    document.querySelector('#name-input button').disabled = true;

    generateProblem();
    updateScore();
    startTimer();
}

// Start countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Generate random problems
function generateProblem() {
    let num1, num2;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === '+') {
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 900) + 100;
    } else if (operator === '-') {
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 900) + 100;
        if (num2 > num1) [num1, num2] = [num2, num1];
    } else if (operator === '*') {
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
    } else if (operator === '/') {
        num2 = Math.floor(Math.random() * 900) + 100;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
    }

    document.getElementById('problem').textContent = `${num1} ${operator} ${num2}`;
    document.getElementById('answer').onkeyup = function(event) {
        if (event.key === 'Enter') checkAnswer(num1, num2, operator);
    };
}

// Check if the answer is correct
function checkAnswer(num1, num2, operator) {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    let correctAnswer;
    switch (operator) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = num1 / num2; break;
    }

    if (userAnswer === correctAnswer) {
        score++;
        correctSound.play();
        updateScore();
        generateProblem();
        document.getElementById('answer').value = "";
    } else {
        wrongSound.play();
    }
}

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// End the game and save scores
function endGame() {
    const playerName = document.getElementById('player-name').value.trim();
    document.getElementById('problem').textContent = "Time's up! Final Score: " + score;
    document.getElementById('answer').disabled = true;
    document.querySelector('#name-input button').disabled = false;

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    const topScores = leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(topScores));

    displayLeaderboard(topScores);
}

// Display leaderboard scores
function displayLeaderboard(scores) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = scores
        .map(entry => `<li>${entry.name} — ${entry.score}</li>`)
        .join('');
}

// Anti-Cheat Measures 🚫
// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Block developer tools shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J') || e.key === 'F12') {
        e.preventDefault();
    }
});

// Detect tab switching or window minimizing
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        alert("Cheating detected! Game Over.");
        clearInterval(timer);
        endGame();
    }
});

// Show leaderboard when the page loads
displayLeaderboard(JSON.parse(localStorage.getItem('leaderboard')) || []);
