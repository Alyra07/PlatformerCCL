import { GameObject } from "./GameObject.js";
import { ctx, canvas } from "../game.js";
import { updateScore } from "../out-of-canvas/scoreboard.js";

class Enemy extends GameObject {
    constructor() {
        super();
        this.enemies = [];
        this.image = new Image();
        this.frame = {
            x: 0,
            y: 0
        }
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.enemyTimer = 0;
        this.collision = false;
    }

    draw() {
        ctx.drawImage(this.image, this.frame.x * this.width, 0, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.v.x;
        this.y += this.v.y;
        // Sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frame.x < this.maxFrame) {
                this.frame.x++;
            }
            else {
                this.frame.x = 0;
            }
        }
        else {
            this.frameTimer += this.deltaTime;
        }
    }
    // Collision detection with Player - Mark Enemy for Deletion
    checkCollision(player) {
        this.enemies.forEach((enemy) => {
            if (enemy.x < player.x + player.width &&
                enemy.x + enemy.width > player.x &&
                enemy.y < player.y + player.height &&
                enemy.y + enemy.height > player.y) {
                enemy.collision = true;
            }
        })
    }
}

class BirdEnemy extends Enemy {
    constructor() {
        super();
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 200); // Randomize Bird Spawn Height
        this.width = 60;
        this.height = 44;
        this.v = {
            x: 2,
            y: 0
        }
        this.image.src = "../img/bird_spritesheet.png";
        this.maxFrame = 5;
        this.enemies = [];
        this.enemyTimer = 0;
        // Handle Bird Spawn Rate (Interval & Frame Rate)
        this.enemyInterval = 100;
        this.deltaTime = 10;
        // Score (How many birds player has caught)
        this.playerScore = 0;
    }

    // Draw Bird Enemy for each Bird in Array
    update(deltaTime) {
        super.update(deltaTime) // Movement & Sprite animation
        this.enemies.forEach((bird) => {
            bird.draw();
        })
    };

    addBirds() {
        this.enemies.push(new BirdEnemy());
    };

    // Handle Bird Spawn Rate in gameLoop (Interval & Frame Rate)
    handleBirds(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.addBirds();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach((bird) => {
            bird.update(deltaTime);
        })
    };

    // Delete Birds that are off screen or have collided with Player
    deleteEnemy() {
        this.enemies.forEach((bird, index) => {
            if (bird.x + bird.width < 0) {
                this.enemies.splice(index, 1);
            } else if (bird.collision === true) {
                // if player catches bird, delete bird & increment score
                this.enemies.splice(index, 1);
                this.playerScore++;
                updateScore();
            }
        })
    }
}

class GroundEnemy extends Enemy {
    constructor() {
        super();
        this.width = 120;
        this.height = 85;
        this.x = 0 - this.width;
        this.y = canvas.height - (this.height + 32);
        this.v = {
            x: -3,
            y: 0
        }
        this.collisionsGameOver = 1;
        this.image.src = "../img/car_spritesheet.png";
        this.maxFrame = 1;
        this.enemies = [];
        this.enemyTimer = 0;
        // Handle Car Enemy Spawn Rate (Interval & Frame Rate)
        this.enemyInterval = 400;
        this.deltaTime = 3;
    }
    // Draw Car for each GroundEnemy in Array
    update(deltaTime) {
        super.update(deltaTime) // Movement & Sprite animation
        this.enemies.forEach((car) => {
            car.draw();
        })
    };

    addCars() {
        this.enemies.push(new GroundEnemy());
    };

    // Handle Car Enemy Spawn Rate in gameLoop (Interval & Frame Rate)
    handleCars(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.addCars();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach((car) => {
            car.update(deltaTime);
        })
    };

    // Delete Cars that are off screen or have collided with Player
    deleteEnemy() {
        this.enemies.forEach((car, index) => {
            if (car.x > canvas.width + car.width) {
                this.enemies.splice(index, 1);
            }
            // Game Over if player collides with a car
            else if (car.collision === true) {
                // this.enemies.splice(index, 1);
                this.collisionsGameOver--;
            }
        })
    }
}

export { BirdEnemy, GroundEnemy }