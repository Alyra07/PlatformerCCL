import {canvas, ctx} from "../main.js";
import { GameObject } from "./GameObject.js";

class Player extends GameObject {
    constructor(x, y, width, height, {collisionBlocks = []}) {
        super (x, y, width, height);
        this.color = "blue";

        this.collisionBlocks = collisionBlocks;
        this.frame = null;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
    // Gravity & Player velocity
        this.v.y += this.gravity;
        this.x += this.v.x;
        this.y += this.v.y;

    // Collision with the canvas edges
    // Left & Right
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
    }
    // Bottom
    if (this.y + this.height > canvas.height) {
        this.y = canvas.height - this.height;
        this.v.y = 0;
    }
    // Top
    if (this.y < 0) {
        // Call function here to set a new background image and level
        
    }


    // Collision detection with Collision Blocks
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];
            // Check if player is colliding with a block
            if (this.x < block.side.right &&
                this.x + this.width > block.side.left &&
                this.y < block.side.bottom &&
                this.y + this.height > block.side.top) {
                    console.log("colliding somehow")
                    // Top collision
                    if (this.v.y > 0 && this.y + this.height - this.v.y <= block.y) {
                        this.v.y = 0;
                        this.y = block.y - this.height;
                    }
                    // Bottom collision
                    else if (
                        this.v.y < 0 &&
                        this.y - this.v.y >= block.y + block.height
                    ) {
                        this.v.y = 0;
                        this.y = block.y + block.height;
                    }
                    // Left collision
                    if (this.v.x > 0 && this.x + this.width - this.v.x <= block.x) {
                        this.v.x = 0;
                        this.x = block.x - this.width;
                    }
                    // Right collision
                    else if (
                        this.v.x < 0 &&
                        this.x - this.v.x >= block.x + block.width
                    ) {
                        this.v.x = 0;
                        this.x = block.x + block.width;
                }     
            }
        }
    }
}

export {Player}