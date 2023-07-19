const board = document.querySelector('.board');
const buttons = document.querySelectorAll('.board button');
const replayButton = document.querySelector('.replay');
const message = document.querySelector('.message');
let currentPlayer = 'X';
let mode = 'computer';
let gameOver = false;

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
            buttons[a].textContent === currentPlayer &&
            buttons[b].textContent === currentPlayer &&
            buttons[c].textContent === currentPlayer
        ) {
            buttons[a].classList.add('win');
            buttons[b].classList.add('win');
            buttons[c].classList.add('win');
            gameOver = true;
            message.textContent = `${currentPlayer} wins!`;
            break;
        }
    }

    if (!gameOver && Array.from(buttons).every(button => button.textContent !== '')) {
        gameOver = true;
        message.textContent = "It's a tie!";
    }
}

function handleClick(event) {
    if (gameOver) return;
    const button = event.target;
    if (button.textContent !== '') return;
    button.textContent = currentPlayer;
    checkWin();
    if (gameOver) return;
    switchPlayer();
    if (mode === 'computer' && currentPlayer === 'O') {
        playComputer();
    }
}

function playComputer() {
    const availableButtons = Array.from(buttons).filter(button => button.textContent === '');
    if (availableButtons.length > 0) {
        let countdown = 5;
        message.textContent = `Computer is thinking... ${countdown}s`;
        const timer = setInterval(() => {
            countdown--;
            message.textContent = `Computer is thinking... ${countdown}s`;
            if (countdown === 0) {
                clearInterval(timer);
                const randomButton = availableButtons[Math.floor(Math.random() * availableButtons.length)];
                randomButton.textContent = currentPlayer;
                checkWin();
                if (!gameOver) switchPlayer();
                message.textContent = `${currentPlayer}'s turn`;
            }
        }, 700);
    }
}

function resetBoard() {
    buttons.forEach(button => {
        button.textContent = '';
        button.classList.remove('win');
    });
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = `${currentPlayer}'s turn`;
}

function handleModeChange(event) {
    mode = event.target.id === 'play-computer' ? 'computer' : '2player';
    resetBoard();
}

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

replayButton.addEventListener('click', resetBoard);

document.querySelectorAll('input[name="play-mode"]').forEach(input => {
    input.addEventListener('change', handleModeChange);
});

resetBoard();
