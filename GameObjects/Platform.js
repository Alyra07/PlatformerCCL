import { GameObject } from "./GameObject.js";
import { canvas, ctx } from '../game.js';
import { counter } from '../out-of-canvas/scoreboard.js';

let platforms = []; // Array to store all platforms
let lastPlatformY = null;
let spawnInterval = 1000;
let spawnId = null;

class Platform extends GameObject {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.lastPlatformY = null;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // Increase speed exponentially based on the current time
    const timeFactor = Math.pow(1.05, counter / 5); // Increase speed exponentially every 5 seconds
    this.x -= this.speed * timeFactor;
  }
}

function spawnPlatform() {
  let y;
  let x = canvas.width;
  if (platforms.length > 0) {
    const lastPlatform = platforms[platforms.length - 1];
    x = lastPlatform.x + lastPlatform.width + 50; // 50 px spacing on x-axis
  }
  do {
    // Random y position between canvas.height - 120 and y = 180
    y = Math.random() * (canvas.height - 300) + 180;
    // New platform every 50 pixels on y-axis
  } while (lastPlatformY !== null && Math.abs(lastPlatformY - y) < 50);

  // Add the new platform to the array
  const platform = new Platform(x, y, 96, 32, "red", 2);
  platforms.push(platform);
  lastPlatformY = y;

  // Adjust the spawn interval based on the current time
  clearInterval(spawnId);
  spawnInterval = 1000 / Math.pow(1.05, counter / 5); // Decrease interval exponentially every 5 seconds
  spawnId = setInterval(spawnPlatform, spawnInterval);
}

// Start spawning platforms after the spawn function is defined
spawnId = setInterval(spawnPlatform, spawnInterval);


export { Platform, spawnPlatform, spawnId, platforms };

