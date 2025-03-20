let score = 0;
let timeLeft = 30;
let timer;

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

function generateProblem() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];
    
    if (operator === '/' && num1 % num2 !== 0) {
        operator = '+'; // Avoid decimal answers
    }

    document.getElementById('problem').textContent = `${num1} ${operator} ${num2}`;
    document.getElementById('answer').onkeyup = function(event) {
        if (event.key === 'Enter') checkAnswer(num1, num2, operator);
    };
}

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
        updateScore();
        generateProblem();
        document.getElementById('answer').value = "";
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function endGame() {
    document.getElementById('problem').textContent = "Time's up! Final Score: " + score;
    document.getElementById('answer').disabled = true;
    document.querySelector('button').disabled = false;
}
