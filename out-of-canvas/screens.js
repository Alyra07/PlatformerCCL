import { birdEnemies } from "../game.js";
import { startTimer } from "./scoreboard.js";

// Start Screen
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const helpBtn = document.getElementById('help-btn');
// Help Screen
const helpScreen = document.getElementById('help-screen');
const backBtnHelp = document.getElementById('back-btn-help');
const birdImgHelp = document.getElementById('bird-example-img');
birdImgHelp.src = '../img/bird-help.png';
const carImgHelp = document.getElementById('car-example-img');
carImgHelp.src = '../img/car-help.png';
// Scoreboard
const scoreBoard = document.getElementById('score-board');
const score = document.getElementById('score');
const time = document.getElementById('timer');
// Game Over Screen
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const finalTime = document.getElementById('final-time');
const restartBtn = document.getElementById('restart-btn');
const backBtnGameOver = document.getElementById('back-btn-end');
let gameIsOver = true; // enables gameOverLoop in game.js
// Soundtrack + Sound Effects
document.addEventListener("DOMContentLoaded", function() {
const soundtrack = document.getElementById('soundtrack');
soundtrack.volume = 0.7;
soundtrack.play();
});
const gameOverSound = document.getElementById('game-over-sound');
gameOverSound.volume = 0.4;

// START GAME ---------------------------------------------------------------
startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    startGame();
});

function startGame() {
    gameIsOver = false; // enables gameLoop in game.js
    // Reset scoreboard (score & time)
    birdEnemies.playerScore = 0;
    score.innerText = '0';
    time.innerText = '00:00';
    scoreBoard.style.display = 'flex';
    startTimer();
}

// GAME OVER ----------------------------------------------------------------
function gameOver() {
    gameIsOver = true; // Clear timer in scoreboard.js & switch loop in game.js
    gameOverSound.play();
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

// HELP --------------------------------------------------------------
helpBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    helpScreen.style.display = 'flex';
});

backBtnHelp.addEventListener('click', () => {
    helpScreen.style.display = 'none';
    startScreen.style.display = 'flex';
});

export { gameOver, gameIsOver };