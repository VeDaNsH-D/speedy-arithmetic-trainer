let score = 0;
let timeLeft = 30;
let timer;

// Sound effects
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('answer').disabled = false;
    document.getElementById('answer').value = "";
    document.getElementById('answer').focus();
    document.querySelector('button').disabled = true;
    generateProblem();
    updateScore();
    startTimer();
}

// Timer countdown
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

// Generate random math problems
function generateProblem() {
    let num1, num2;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Define the difficulty for each operator
    if (operator === '+') {
        num1 = Math.floor(Math.random() * 900) + 100; // 3-digit addition
        num2 = Math.floor(Math.random() * 900) + 100;
    } else if (operator === '-') {
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 900) + 100;
        if (num2 > num1) [num1, num2] = [num2, num1]; // Ensure no negative answers
    } else if (operator === '*') {
        num1 = Math.floor(Math.random() * 90) + 10; // 2-digit multiplication
        num2 = Math.floor(Math.random() * 90) + 10;
    } else if (operator === '/') {
        num2 = Math.floor(Math.random() * 900) + 100; // 3-digit division
        num1 = num2 * (Math.floor(Math.random() * 10) + 1); // Ensure integer result
    }

    // Display the problem
    document.getElementById('problem').textContent = `${num1} ${operator} ${num2}`;
    document.getElementById('answer').onkeyup = function(event) {
        if (event.key === 'Enter') checkAnswer(num1, num2, operator);
    };
}

// Check if the user's answer is correct
function checkAnswer(num1, num2, operator) {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    let correctAnswer;

    // Calculate the correct answer
    switch (operator) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = num1 / num2; break;
    }

    // Check user's answer and play the corresponding sound
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

// End the game and display final score
function endGame() {
    document.getElementById('problem').textContent = "Time's up! Final Score: " + score;
    document.getElementById('answer').disabled = true;
    document.querySelector('button').disabled = false;
}
