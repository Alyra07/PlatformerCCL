// game.js
import { Player } from './GameObjects/Player.js';
import { platforms } from './GameObjects/Platform.js';
import { BirdEnemy, GroundEnemy } from './GameObjects/Enemy.js';
import { Sprite } from './GameObjects/Sprite.js';
import { gameOver, gameIsOver } from './out-of-canvas/screens.js';

// Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Game Objects

const player = new Player(50, canvas.height - 50, 50, 50, 'blue', {collisionBlocks: platforms});
const birdEnemies = new BirdEnemy();
const carEnemies = new GroundEnemy();

// Contant images
const backgroundImg = new Sprite(0, 0, canvas.width, canvas.height, './img/background.png');

// Keys
const keys = {
  ArrowRight: false,
  ArrowLeft: false };

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

// GAME LOOP -----------------------------------------------------------------
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImg.draw();

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

  // Game Over if player collides with a car
  if (carEnemies.collisionsGameOver === 0 || gameIsOver) {
    // Clear canvas
    carEnemies.enemies = [];
    birdEnemies.enemies = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.draw();
    // Draw player "dead"
    player.dead = true;
    player.draw();
    gameOver(); // show game over screen
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

export { canvas, ctx };
export { birdEnemies };