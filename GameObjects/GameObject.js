import { ctx } from '../game.js';

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.side = {
            top: this.y,
            bottom: this.y + this.height,
            left: this.x,
            right: this.x + this.width
        };
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { GameObject };