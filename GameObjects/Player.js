import {canvas, ctx} from "../main.js";
import { GameObject } from "./GameObject.js";

class Player extends GameObject {
    constructor(x, y, width, height, {collisionBlocks = []}) {
        super (x, y, width, height);
        this.color = "blue";
        this.collisionBlocks = collisionBlocks;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.v.x;

        // Check for horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];
            // Check if player is colliding with a block
            if (this.x <= block.side.right &&
                this.side.right >= block.x &&
                this.side.bottom >= block.y &&
                this.y <= block.side.bottom) {
                    // Collision on x-axis going to the right
                    if (this.v.x > 1) {
                        this.x = block.x - this.width - 0.01;
                        break
                    }
                    // Collision on x-axis going to the left
                    if (this.v.x < -1) {
                        this.x = block.side.right + 0.01;
                        break
                    }
            }
        }

        this.y += this.v.y
        this.side.bottom = this.y + this.height;

        // Above bottom canvas edge
        if (this.side.bottom + this.v.y < canvas.height) {
            this.v.y += this.gravity;
        } else {
            this.v.y = 0
        }
    }
}

export {Player}