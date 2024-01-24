import {canvas, ctx} from "../main.js";
import { GameObject } from "./GameObject.js";

// Player Sprite Animation States
const animationStates = [
    {name: "idle", frames: 7},
    {name: "jump", frames: 7},
    {name: "fall", frames: 7},
    {name: "run", frames: 9},
    {name: "dizzy", frames: 11}
];
const spriteAnimations = [];

// ---- PLAYER CLASS ----
class Player extends GameObject {
    constructor(x, y, width, height, {collisionBlocks = []}) {
        super (x, y, width, height);
        this.collisionBlocks = collisionBlocks;
    // Player Spritesheet
        this.image = new Image();
        this.image.src = "../img/shadow_dog.png";
        this.sx = 0;
        this.sy = 0;
        this.sw = 575;
        this.sh = 523;
        this.gameFrame = 0;
        this.playerState = "dizzy";
        // Slow or speed up animation of Player Sprite
        this.staggerFrames = 5;
    }

    // Access different Animation States & Frames on Player Spritesheet
    animate() { 
        animationStates.forEach((state, i) => {
            let frames = {loc: []};
            for (let j = 0; j < state.frames; j++) {
                let positionX = this.sw * j;
                let positionY = this.sh * i;
                frames.loc.push({x: positionX, y: positionY});
            }
            spriteAnimations[state.name] = frames;
        })
    }

    // Call Sprite animation & draw the right frame of Player Spritesheet
    draw() {
        // ctx.fillStyle = "rgba( 0, 0, 0.0, 0.3)";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        this.animate();
        let position = Math.floor(this.gameFrame/this.staggerFrames) % spriteAnimations[this.playerState].loc.length;
        let frameX = this.sw * position;
        let frameY = spriteAnimations[this.playerState].loc[position].y;

        ctx.drawImage(this.image, 
            frameX, frameY, this.sw, this.sh, 
            this.x-6, this.y-10, this.width+12, this.height+10);
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
            this.v.y = 0;}

    // Collision detection with Collision Blocks
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];
            // Check if player is colliding with a block
            if (this.x < block.side.right &&
                this.x + this.width > block.side.left &&
                this.y < block.side.bottom &&
                this.y + this.height > block.side.top) {
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