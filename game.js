// game.js
import { Player } from './GameObjects/Player.js';
import { Platform } from './GameObjects/Platform.js';
import { BirdEnemy, GroundEnemy } from './GameObjects/Enemy.js';
import { Sprite } from './GameObjects/Sprite.js';

// Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Array for all platforms
let platforms = [];

// Player Figure
const player = new Player(50, canvas.height - 50, 50, 50, 'blue', {collisionBlocks: platforms});

// Create BirdEnemy and GroundEnemy
const birdEnemies = new BirdEnemy();
const carEnemies = new GroundEnemy();

// Create backgroundImg using Sprite
const backgroundImg = new Sprite(0, 0, './img/backgroundclouds.png');

// Spawn a new platform every 2 seconds (setInterval)
function spawnPlatform() {
  const y = Math.random() * canvas.height;  // Random y position
  const platform = new Platform(canvas.width, y, 96, 32, "red", 2);
  // Add the new platform to the array
  platforms.push(platform);
}
setInterval(spawnPlatform, 1000);

// Keys & Player movement Events
const keys = {
  ArrowRight: false,
  ArrowLeft: false
};

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
  carEnemies.handleCars(2);
  carEnemies.update();
  carEnemies.checkCollision(player);
  carEnemies.deleteEnemy();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

export { canvas, ctx };