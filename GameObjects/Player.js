// Player.js
import { canvas, ctx } from '../game.js';
import { GameObject } from './GameObject.js';

const jumpSpeed = -15;
const gravity = 0.5;

class Player extends GameObject {
    constructor(x, y, width, height, color, { collisionBlocks = [] }) {
        super(x, y, width, height);
        this.color = color;
        this.v = {
            x: 0,
            y: 0
        };
        this.speed = 5;  // Adjust the moving speed of the player
        this.grounded = false;
        this.collisionBlocks = collisionBlocks;

        // Bind the draw method to this instance
        this.draw = this.draw.bind(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

    isCollidingWith(platform) {
        return this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y < platform.y + platform.height &&
            this.y + this.height > platform.y;
    };

    handleCollision(platform) {
        // Only handle the collision if the player is above the platform
        if (this.y + this.height <= platform.y + platform.height) {
            this.y = platform.y - this.height;
            this.v.y = 0;
            this.grounded = true;
        }
    }

    update() {
        this.v.y += gravity;
        this.grounded = false;

        for (const platform of this.collisionBlocks) {
            if (this.isCollidingWith(platform)) {
                this.handleCollision(platform);
                break;
            }
        }

        // Update the player's position
        this.updatePosition();

        this.checkBounds();

        // If the player is grounded, make them jump
        if (this.grounded) {
            this.jump();
        }
    }
}

export { Player };