import { birdEnemies } from "../game.js";

// Scoreboard
const scoreBoard = document.getElementById('score-board');
const time = document.getElementById('timer');
// Game Over Screen
const gameOverScreen = document.getElementById('game-over-screen');
let finalScore = document.getElementById('final-score');
let finalTime = document.getElementById('final-time');
const restartBtn = document.getElementById('restart-btn');
const backBtnGameOver = document.getElementById('back-btn-end');
let gameIsOver = null;

// GAME OVER ----------------------------------------------------------------
function gameOver() {
    gameIsOver = true; // clear Timer in scoreboard.js
    scoreBoard.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    finalTime.innerText = time.innerText; // show time
    finalScore.innerText = birdEnemies.playerScore; // show score
}

export { gameOver, gameIsOver };