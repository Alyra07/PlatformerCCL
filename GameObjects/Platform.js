import { GameObject } from "./GameObject.js";
import { ctx } from '../game.js';  // Import the canvas context

class Platform extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Platform };
