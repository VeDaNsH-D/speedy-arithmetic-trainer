let score = 0;
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