// Player.js
import { canvas, ctx } from '../game.js';

class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.v = {
      x: 0,
      y: 0
    };
    this.speed = 5;  // Adjust the moving speed of the player
    this.gravity = 0.5;
  }

  moveRight() {
    this.v.x = this.speed;
  };

  moveLeft() {
    this.v.x = -this.speed;
  };

  stopHorizontalMovement() {
    this.v.x = 0;
  };

  jump() {
    // Check if the player is close to the ground (with a margin for floating-point precision)
    if (this.y + this.height >= canvas.height - 1) {
      this.v.y = -15;  // Set vertical velocity to make the player jump
    }
  };

  isCollidingWith(platform) {
    return this.x < platform.x + platform.width &&
           this.x + this.width > platform.x &&
           this.y < platform.y + platform.height &&
           this.y + this.height > platform.y;
  };

  update(platforms) {
    // Update position based on velocity
    this.x += this.v.x;
    this.y += this.v.y;
    
    // Check for collision with platforms
    for (let i = 0; i < platforms.length; i++) {
        if (this.isCollidingWith(platforms[i])) {
              // Collision detected, adjust player position and velocity
              this.y = platforms[i].y - this.height;
              this.v.y = 0;
        }
    }
    // Simulate gravity by increasing vertical velocity
    this.v.y += this.gravity;

    // Keep the player within the canvas bounds
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
      this.v.y = 0;  // Reset vertical velocity when on the ground
    }
  };

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

export { Player };