import { GameObject } from "./GameObject.js";
import { ctx } from '../game.js';  // Import the canvas context

class Platform extends GameObject {
    constructor(x, y, width, height, color, speed) {
      super(x, y, width, height, color);
      this.speed = speed;
    }
  
    update() {
      this.x -= this.speed;
    }
  
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

export { Platform };
