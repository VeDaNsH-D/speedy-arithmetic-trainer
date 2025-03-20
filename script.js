function checkAnswer(num1, num2, operator) {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    let correctAnswer;
    switch (operator) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = num1 / num2; break;
    }

    const problemElement = document.getElementById('problem');

    if (userAnswer === correctAnswer) {
        score++;
        correctSound.play();
        problemElement.classList.add('correct-answer');
    } else {
        wrongSound.play();
        problemElement.classList.add('wrong-answer');
    }

    setTimeout(() => {
        problemElement.classList.remove('correct-answer', 'wrong-answer');
        updateScore();
        generateProblem();
        document.getElementById('answer').value = "";
    }, 500);
}

function endGame() {
    const playerName = document.getElementById('player-name').value.trim();
    document.getElementById('problem').textContent = `Time's up! Final Score: ${score}`;
    document.getElementById('answer').disabled = true;
    document.querySelector('#name-input button').disabled = false;

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    const topScores = leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(topScores));

    displayLeaderboard(topScores);
}

function displayLeaderboard(scores) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = scores
        .map(entry => `<li>🏅 ${entry.name} — ${entry.score}</li>`)
        .join('');
}
