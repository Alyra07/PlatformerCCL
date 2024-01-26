import {Player} from "./GameObjects/Player.js";
import {Sprite} from "./GameObjects/Sprite.js";
import { collisionBlocks} from "./map/collisionUtils.js";
import {BirdEnemy, GroundEnemy} from "./GameObjects/Enemy.js";

// Game Setup & Variables -----------------
// Canvas Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;

// Player Figure (x, y, width, height, {collisionBlocks})
const player = new Player(canvas.width/2, 0, 50, 50, {collisionBlocks: collisionBlocks});

player.draw();
player.update();

// Enemy Figures
const birdEnemies = new BirdEnemy();
const carEnemies = new GroundEnemy();

// Background Sprite
const backgroundImg = new Sprite(0, 0, "../img/background1.png");

// Keys pressed?
const keys = {
    w: false,
    a: false,
    d: false
};

// Timer ------------------------
let timeLeft = 60;
let timerP = document.getElementById('countdown');
let timerInterval;

function updateTimer() {
    timerP.innerText = timeLeft;
    if (timeLeft === 0) {
      // Time is up, reset the timer and stop the game
      clearInterval(timerInterval);
      gameOver();
    } else {
      timeLeft--;
    }
  }

// Start Game Screen ---------------
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);
let gameStarted = false;

function startGame() {
        document.getElementById("startScreen").style.display = "none";
        gameStarted = true;
        // Start Gameloop
        requestAnimationFrame(gameLoop);
        timerInterval = setInterval(updateTimer, 1000);
}

// Game Loop ----------------------
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.draw();

    // Draw Platform Collision Blocks
    collisionBlocks.forEach((block) => {
        block.draw();
    });

    // Player Controls a & d
    player.v.x = 0;
    if (keys.a) player.v.x = -5;
    else if (keys.d) player.v.x = 5;

    // Update and Draw Player
    player.draw();
    player.update();

    if (gameStarted) {
        // Draw & Update Bird Enemies
        birdEnemies.handleBirds(2);
        birdEnemies.update();
        birdEnemies.checkCollision(player);
        birdEnemies.deleteEnemy();  
        // Draw & Update Car Enemies
        carEnemies.handleCars(2);
        carEnemies.update();
        carEnemies.checkCollision(player);
        carEnemies.deleteEnemy();
    }
    // Game Over if Player Collides with Car or time runs out
    if (carEnemies.collisionsGameOver === 0) gameOver();
    if (timeLeft === 0) gameOver();

    player.gameFrame++;
    requestAnimationFrame(gameLoop);
};


// Event Listeners for Player Controls
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        // Player States: idle, run, jump, fall, dizzy - not drawn yet :)
        case "w":
            if (player.v.y === 0) {
                player.v.y = -16;
                player.playerState = "jump";
            }
            break;
        case "a":
            keys.a = true;
            player.v.x = -5;
            player.playerState = "run";
            break;
        case "d":
            keys.d = true;
            player.v.x = 5;
            player.playerState = "run";
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            keys.a = false;
            player.v.x = 0;
            player.playerState = "idle";
            break;
        case "d":
            keys.d = false;
            player.v.x = 0;
            player.playerState = "idle";
            break;
    }
});

// Game Over Screen ----------------
const gameOverScreen = document.getElementById("gameOverScreen");
function gameOver () {
    gameStarted = false;
    gameOverScreen.style.display = "flex";
    document.getElementById("score").innerHTML = `Mr. Fluffington ate ${birdEnemies.score} Birds! Purrfect!`;
    player.playerState = "dizzy";
};

// Help Screen ---------------------
const helpButton = document.getElementsByClassName("helpButton");
const helpScreen = document.getElementById("helpScreen");
function showHelp() {
    helpScreen.style.display = "flex";
}
function hideHelp() {
    helpButton.style.display = "none";
}

export {canvas, ctx};
