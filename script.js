const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let isGameOver = false;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== null || isGameOver) return;

    board[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} Wins! 🎉`;
        isGameOver = true;
    } else if (board.every(cell => cell !== null)) {
        gameStatus.textContent = 'It\'s a Draw! 😐';
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    isGameOver = false;
    board = Array(9).fill(null);
    gameStatus.textContent = `Player X's Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);
