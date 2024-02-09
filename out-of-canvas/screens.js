import { birdEnemies } from "../game.js";
import { startTimer } from "./scoreboard.js";

// Start Screen
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const helpBtn = document.getElementById('help-btn');
// Help Screen
const helpScreen = document.getElementById('help-screen');
const backBtnHelp = document.getElementById('back-btn-help');
// Scoreboard
const scoreBoard = document.getElementById('score-board');
const score = document.getElementById('score');
const time = document.getElementById('timer');
// Game Over Screen
const gameOverScreen = document.getElementById('game-over-screen');
let finalScore = document.getElementById('final-score');
let finalTime = document.getElementById('final-time');
const restartBtn = document.getElementById('restart-btn');
const backBtnGameOver = document.getElementById('back-btn-end');
let gameIsOver = true; // enables gameOverLoop in game.js

// START GAME ---------------------------------------------------------------
startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    startGame();
});

function startGame() {
    gameIsOver = false;
    birdEnemies.playerScore = 0;
    score.innerText = '0';
    time.innerText = '00:00';
    scoreBoard.style.display = 'flex';
    startTimer();
}

// GAME OVER ----------------------------------------------------------------
function gameOver() {
    gameIsOver = true; // clear timer in scoreboard.js & change gameLoop
    scoreBoard.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    finalTime.innerText = time.innerText; // show time
    finalScore.innerText = birdEnemies.playerScore; // show score
}

restartBtn.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    startGame();
});
backBtnGameOver.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'flex';
});

export { gameOver, gameIsOver };