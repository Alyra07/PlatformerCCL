import { Player } from './GameObjects/Player.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Player
const player = new Player(50, canvas.height - 50, 20, 20, '#3498db');

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    player.jump();
  }
  if (event.key === 'ArrowRight') {
    player.v.x = 1; // Assign a value to player.v.x
  }
  if (event.key === 'ArrowLeft') {
    player.v.x = -1; // Assign a value to player.v.x
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  // Update
    player.update();
    player.draw();

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

export { canvas, ctx };  // Export canvas for use in other files