document.addEventListener('keydown', startGame);

const buttons = document.querySelectorAll('.btn');
let gameSequence = [];
let playerSequence = [];
let level = 0;

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => handlePlayerInput(e.target.id));
});

function startGame() {
    document.querySelector('.subtitle').textContent = `Level ${level + 1}`;
    nextSequence();
    document.removeEventListener('keydown', startGame);
}

function nextSequence() {
    playerSequence = [];
    level++;
    document.querySelector('.subtitle').textContent = `Level ${level}`;
    const randomBtn = buttons[Math.floor(Math.random() * buttons.length)];
    gameSequence.push(randomBtn.id);
    flashButton(randomBtn);
}

function flashButton(button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 500);
}

function handlePlayerInput(btnId) {
    const button = document.getElementById(btnId);
    flashButton(button);
    playerSequence.push(btnId);

    if (!checkSequence()) {
        document.querySelector('.subtitle').textContent = 'Game Over! Press any key to restart.';
        resetGame();
    } else if (playerSequence.length === gameSequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) return false;
    }
    return true;
}

function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    document.addEventListener('keydown', startGame);
}
