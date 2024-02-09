import { GameObject } from "./GameObject.js";
import { canvas, ctx } from '../game.js';
import { counter } from '../out-of-canvas/scoreboard.js';

let platforms = []; // Array to store all platforms
let lastPlatformY = null;
let spawnInterval = 1000;
let spawnId = null;

// Platform Class --------------------------------------------------------------

class Platform extends GameObject {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.lastPlatformY = null;
    
    // Load cloud-platform images
    this.platformImages = [
      new Image(),
      new Image(),
      new Image()
    ];
    this.platformImages[0].src = '../img/cloud1_w240.png';
    this.platformImages[1].src = '../img/cloud2_w218.png';
    this.platformImages[2].src = '../img/cloud3_w185_h37.png';
    // Choose a random image and decide whether to mirror it
    this.img = this.platformImages[Math.floor(Math.random() * this.platformImages.length)];
    this.mirror = Math.random() < 0.5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.drawPlatformImage();
  }

  drawPlatformImage() {
    const imgWidth = this.width * 1.5; // Increase width by 50%
    const imgHeight = this.height * 1.5; // Increase height by 50%
    const imgX = this.x - imgWidth / 5; // Move the image to the left

    ctx.save();
    if (this.mirror) {
      // Flip the context on the vertical axis
      ctx.translate(imgX + imgWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, this.y, imgWidth, imgHeight);
    } else {
      // Draw the image on the platform
      ctx.drawImage(this.img, imgX, this.y, imgWidth, imgHeight);
    }
    ctx.restore();
  }

  update() {
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
  const platform = new Platform(x, y, 128, 32, `rgba(117, 69, 132, 0.3)`, 2);
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

