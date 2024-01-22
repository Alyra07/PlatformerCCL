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

        // // Check for horizontal collisions
        // for (let i = 0; i < this.collisionBlocks.length; i++) {
        //     const block = this.collisionBlocks[i];

        //     // Check if player is colliding with a block
        //     if (this.x <= block.side.right &&
        //         this.side.right >= block.x &&
        //         this.side.bottom >= block.y &&
        //         this.y <= block.side.bottom) {
        //             // Collision on x-axis going to the right
        //             if (this.v.x > 1) {
        //                 console.log("Collision on x-axis going to the right");
        //                 this.x = block.x - this.width - 0.01;
        //                 break
        //             }
        //             // Collision on x-axis going to the left
        //             if (this.v.x < -1) {
        //                 this.x = block.side.right + 0.01;
        //                 break
        //             }
        //     }
        // }

        this.y += this.v.y
        this.side.bottom = this.y + this.height;

        // Stay above bottom canvas edge
        if (this.side.bottom + this.v.y < canvas.height) {
            this.v.y += this.gravity;
        } else {
            this.v.y = 0
        }

        // Check for vertical collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            // Check if player is colliding with a block
            if (this.x < block.side.right &&
                this.x + this.width > block.side.left &&
                this.y < block.side.bottom &&
                this.y + this.height > block.side.top) {

                    console.log("colliding somehow")
                    // // Collision on y-axis going downwards
                    // if (this.v.y > 1) {
                    //     console.log("Collision on y-axis going downwards");
                    //     this.y = block.y - this.height - 0.01;
                    //     this.v.y = 0;
                    //     break;
                    // }
                    // // Collision on y-axis going upwards
                    // if (this.v.y < -1) {
                    //     console.log("Collision on y-axis going upwards");
                    //     this.y = block.side.bottom + 0.01;
                    //     this.v.y = 0;
                    //     break;
                    // }
            }
        }
    }
}

export {Player}