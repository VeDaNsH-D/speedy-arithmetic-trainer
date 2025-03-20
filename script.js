let score = 0;
            endGame();
        }
    }, 1000);
}

function generateProblem() {
    let num1, num2;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

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
        correctSound.play();
        updateScore();
        generateProblem();
        document.getElementById('answer').value = "";
    } else {
        wrongSound.play();
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