import { Player } from '/GameObjects/Player.js';
import { platforms } from '/GameObjects/Platform.js';
import { BirdEnemy, GroundEnemy } from '/GameObjects/Enemy.js';
import { Sprite } from '/GameObjects/Sprite.js';
import { gameOver, gameIsOver } from '/out-of-canvas/screens.js';

// Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Game Objects
const backgroundImg = new Sprite(0, 0, canvas.width, canvas.height, 'img/background.png');
const player = new Player(50, canvas.height - 50, 50, 50, 'blue', { collisionBlocks: platforms });
const birdEnemies = new BirdEnemy();
const carEnemies = new GroundEnemy();

// Keys
const keys = {
  ArrowRight: false,
  ArrowLeft: false
};

// Event Listeners for player movement
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
  if (event.key === 'ArrowRight') {
    player.moveRight();
  }
  if (event.key === 'ArrowLeft') {
    player.moveLeft();
  }
});
document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
  if (!keys.ArrowRight && !keys.ArrowLeft) {
    player.stopHorizontalMovement();
  }
});

// Game Over Loop -------------------
function gameOverLoop() {
  if (gameIsOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.draw();
    // Draw player "dead"
    player.draw();
    player.update();
    requestAnimationFrame(gameOverLoop);
  } else if (!gameIsOver) {
    player.dead = false; // enable player movement
    gameLoop();
  }
}
gameOverLoop(); // Start loop for gameIsOver = true (default)

// GAME LOOP -----------------------------------------------------------------
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImg.draw();

  // Game Over if player collides with a car
  if (carEnemies.collisionsGameOver === 0 || gameIsOver) {
    gameOver(); // show game over screen
    player.dead = true; // stop player movement
    // Clear Game Objects
    platforms.length = 0;
    birdEnemies.enemies = [];
    carEnemies.enemies = [];
    carEnemies.collisionsGameOver = 1;
    // Stop gameLoop
    gameOverLoop();
    return;
  }
  // Ingame Loop ----------------------
  else {
    // Update and draw platforms
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].update();
      platforms[i].draw();
    }

    // Update and draw player
    player.update();
    player.draw();

    // Draw & Update Bird Enemies
    birdEnemies.handleBirds(2);
    birdEnemies.update();
    birdEnemies.checkCollision(player);
    birdEnemies.deleteEnemy();

    // Draw & Update Car Enemies
    carEnemies.handleCars(3);
    carEnemies.update();
    carEnemies.checkCollision(player);
    carEnemies.deleteEnemy();
  }

  requestAnimationFrame(gameLoop);
}

export { canvas, ctx };
export { birdEnemies };