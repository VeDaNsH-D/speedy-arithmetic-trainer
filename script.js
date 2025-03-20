let score = 0;
let timeLeft = 30;
let timer;
let playerName = "";
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// Ask player for their name at the start
function startGame() {
    playerName = prompt("Enter your name:");

    if (!playerName) {
        alert("Name is required to start the game!");
        return;
    }

    score = 0;
    timeLeft = 30;
    document.getElementById("answer").disabled = false;
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
    document.querySelector("button").disabled = true;
    updateScore();
    generateProblem();
    startTimer();
}

// Start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Generate random arithmetic problems based on difficulty
function generateProblem() {
    let num1, num2;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === '+') {
        num1 = Math.floor(Math.random() * 50) + 1;  // Smaller numbers for faster addition
        num2 = Math.floor(Math.random() * 50) + 1;
    } else if (operator === '-') {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        if (num2 > num1) [num1, num2] = [num2, num1];  // Still avoid negative results
    } else if (operator === '*') {
        num1 = Math.floor(Math.random() * 10) + 1;  // Smaller multiplication numbers
        num2 = Math.floor(Math.random() * 10) + 1;
    } else if (operator === '/') {
        num2 = Math.floor(Math.random() * 10) + 1;  // Smaller division numbers
        num1 = num2 * (Math.floor(Math.random() * 5) + 1);  // Ensure whole numbers
    }

    document.getElementById('problem').textContent = `${num1} ${operator} ${num2}`;
    document.getElementById('answer').onkeyup = function (event) {
        if (event.key === 'Enter') checkAnswer(num1, num2, operator);
    };
}


// Check user input against the correct answer
function checkAnswer(num1, num2, operator) {
    const userAnswer = parseFloat(document.getElementById("answer").value);
    let correctAnswer;

    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = num1 / num2;
            break;
    }

    if (userAnswer === correctAnswer) {
        score++;
        correctSound.play();
        animateFeedback("correct");
    } else {
        wrongSound.play();
        animateFeedback("wrong");
    }

    updateScore();
    generateProblem();
    document.getElementById("answer").value = "";
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

// End the game, store high scores, and show leaderboard
function endGame() {
    document.getElementById("problem").textContent = `Time's up! Final Score: ${score}`;
    document.getElementById("answer").disabled = true;
    document.querySelector("button").disabled = false;

    saveScore(playerName, score);
    displayLeaderboard();
}

// Save the score to localStorage
function saveScore(name, score) {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 10)));
}

// Display the top 10 scores
function displayLeaderboard() {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardHTML = "<h2>Top 10 Scores</h2><ol>";
    scores.forEach((entry) => {
        leaderboardHTML += `<li>${entry.name}: ${entry.score}</li>`;
    });
    leaderboardHTML += "</ol>";

    document.getElementById("game-container").innerHTML += leaderboardHTML;
}

// Add animations for feedback
function animateFeedback(type) {
    const problemElement = document.getElementById("problem");
    problemElement.classList.remove("correct", "wrong");

    if (type === "correct") {
        problemElement.classList.add("correct");
    } else {
        problemElement.classList.add("wrong");
    }
}

// Prevent calculator use (Ctrl+C, Ctrl+V, right-click, etc.)
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
    if (
        e.ctrlKey &&
        (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "u")
    ) {
        e.preventDefault();
    }
});
