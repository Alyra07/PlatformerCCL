import { GameObject } from './GameObject.js';
import { canvas } from '../game.js';

class Player extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.v = {
            x: 0,
            y: 0
        };
    }

    jump() {
        // Check if the player is close to the ground (with a margin for floating-point precision)
        if (this.y + this.height >= canvas.height - 1) {
            this.v.y = -15;  // Set vertical velocity to make the player jump
        }
    }

    update() {
        // Update position based on velocity
        this.y += this.v.y;
        // Simulate gravity by increasing vertical velocity
        this.v.y += this.gravity;

        // Keep the player within the canvas bounds
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.v.y = 0;  // Reset vertical velocity when on the ground
        }
    }
}

export { Player };