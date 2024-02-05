// game.js
import { Player } from './GameObjects/Player.js';
import { Platform } from './GameObjects/Platform.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Player
const player = new Player(50, canvas.height - 50, 20, 20, '#3498db');

// Platforms
const platforms = [];

function spawnPlatform() {
  const y = Math.random() * canvas.height;  // Random y position

  const platform = new Platform(canvas.width, y, 96, 32, "red", 2);

  // Add the new platform to the game's list of platforms
  platforms.push(platform);
}

// Spawn a new platform every 2 seconds
setInterval(spawnPlatform, 2000);

// Keep track of pressed keys
const keys = {
  ArrowRight: false,
  ArrowLeft: false
};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;

  if (event.key === 'ArrowUp') {
    player.jump();
  }
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

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw player
  player.update();
  player.draw();

  // Update and draw platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].update();
    platforms[i].draw();
  }

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

export { canvas, ctx };  // Export canvas for use in other files