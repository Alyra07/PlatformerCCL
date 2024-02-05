// Player.js
import { canvas, ctx } from '../game.js';

const jumpSpeed = -15;
const gravity = 0.5;

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
    this.grounded = false;
  }

  moveRight() {
    this.v.x = this.speed;
  }

  moveLeft() {
    this.v.x = -this.speed;
  }

  stopHorizontalMovement() {
    this.v.x = 0;
  }

  jump() {
    if (this.grounded) {
      this.v.y = jumpSpeed;
    }
  }

  isCollidingWith(platform) {
    return this.x < platform.x + platform.width &&
           this.x + this.width > platform.x &&
           this.y < platform.y + platform.height &&
           this.y + this.height > platform.y;
  };

  handleCollision(platform) {
    this.y = platform.y - this.height;
    this.v.y = 0;
    this.grounded = true;
  }

  updatePosition() {
    this.x += this.v.x;
    this.y += this.v.y;
  }

  checkBounds() {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
      this.v.y = 0;
      this.grounded = true;
    }
  };

  update(platforms) {
    this.v.y += gravity;
    this.grounded = false;

    let nextX = this.x + this.v.x;
    let nextY = this.y + this.v.y;

    for (const platform of platforms) {
      if (this.isCollidingWith(platform, nextX, nextY)) {
        this.handleCollision(platform);
        break;
      }
    }

    this.updatePosition();
    this.checkBounds();
  };

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

export { Player };