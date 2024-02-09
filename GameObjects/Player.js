// Player.js
import { canvas, ctx } from '../game.js';
import { GameObject } from './GameObject.js';

// Player Physics Constants
const jumpSpeed = -15;
const gravity = 0.5;

// Player Sprite Animation States & Frames
const animationStates = [
    {name: "idle", frames: 7},
    {name: "jump", frames: 7},
    {name: "fall", frames: 7},
    {name: "run", frames: 9},
    {name: "dizzy", frames: 11}
];
const spriteAnimations = [];

// Player Class --------------------------------------------------------------
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
        this.dead = false; // Added dead property

        // Player Spritesheet
        this.image = new Image();
        this.image.src = "../img/player_sprite.png";
        this.sx = 0; // Source x & y position
        this.sy = 0;
        this.sw = 575; // Source width & height
        this.sh = 523;
        this.gameFrame = 0;
        this.playerState = "idle"; // initial Animarion State
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
    updateGameFrame() {
        this.gameFrame++;
        if (this.gameFrame > spriteAnimations[this.playerState].loc.length * this.staggerFrames) {
          this.gameFrame = 0;
        }
    }

    // Call Sprite animation & draw the correct frame
    draw() {
        this.animate();
        this.updateGameFrame(); // next frame
        let position = Math.floor(this.gameFrame / this.staggerFrames) % spriteAnimations[this.playerState].loc.length;
        let frameX = this.sw * position;
        let frameY = spriteAnimations[this.playerState].loc[position].y;
    
        ctx.save(); // Save current state of canvas-context
        // If the player is moving to the left, flip the context
        if (this.v.x < 0) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, 
                frameX, frameY, this.sw, this.sh, 
                -this.x-6-this.width-12, this.y-10, this.width+12, this.height+10);
        } else { // Draw the player normally
            ctx.drawImage(this.image, 
                frameX, frameY, this.sw, this.sh, 
                this.x-6, this.y-10, this.width+12, this.height+10);
        }
        ctx.restore(); // Restore the context to its saved state
    }

    moveRight() {
        if (!this.dead) { // Added condition to check if player is dead
            this.v.x = this.speed;
            if (this.playerState !== "fall") this.playerState = "run";
        }
    }

    moveLeft() {
        if (!this.dead) { // Added condition to check if player is dead
            this.v.x = -this.speed;
            if (this.playerState !== "fall") this.playerState = "run";
        }
    }

    stopHorizontalMovement() {
        this.v.x = 0;
    }

    jump() {
        if (this.grounded && !this.dead) { // Added condition to check if player is dead
            this.playerState = "jump";
            this.v.y = jumpSpeed;
        }
    }

    updatePosition() {
        this.x += this.v.x;
        this.y += this.v.y;
    }

    // Check if player is out of canvas bounds
    checkBounds() {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
        // If player is on ground, stop falling
        if (this.y > canvas.height - this.height - 32) {
            this.y = canvas.height - this.height - 32;
            this.v.y = 0;
            this.grounded = true;
        }
    }

    isCollidingWith(platform) {
        return this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y < platform.y + platform.height &&
            this.y + this.height > platform.y;
    };

    handleCollision(platform) {
        // Only handle collision if the player is above the platform
        if (this.y + this.height <= platform.y + platform.height) {
            this.y = platform.y - this.height;
            this.v.y = 0;
            this.grounded = true;
        }
    }

    update() {
        // Apply gravity
        this.v.y += gravity;
        this.grounded = false;
        // Check for collisions with platforms
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
        if (this.grounded && !this.dead) { // Added condition to check if player is dead
            this.jump();
        }
        // If the player is falling, set playerState to "fall"
        if (this.v.y > 0) {
            this.playerState = "fall";
        }
        // If the player is dead, set playerState to "dizzy"
        if (this.dead) {
            this.playerState = "dizzy";
        }
    }
}

export { Player };