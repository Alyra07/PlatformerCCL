import {GameObject} from "./GameObject.js";
import {ctx, canvas} from "../main.js";

class Enemy extends GameObject {
    constructor(){
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
        this.markedForDeletion = false;
    }

    draw() {
        ctx.drawImage(this.image, this.frame.x * this.width, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }

    update(){
        this.x -= this.v.x;
        this.y += this.v.y;
        // Sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frame.x < this.maxFrame) {
                this.frame.x++;} 
            else {
                this.frame.x = 0;}
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
                enemy.markedForDeletion = true;
            }
        })
    }
}

class BirdEnemy extends Enemy {
    constructor(){
        super();
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 200);
        this.width = 60;
        this.height = 44;
        this.v = {
            x: 2,
            y: 0
        }
        this.image.src = "../img/enemy_bird.png";
        this.maxFrame = 5;
        this.enemies = [];
        this.enemyTimer = 0;

        // Handle Bird Spawn Rate (Interval & Frame Rate)
        this.enemyInterval = 100;
        this.deltaTime = 10;
    }

// Inherit movement from Enemy class and draw Birds
    update(deltaTime){
        super.update(deltaTime)
        this.enemies.forEach((bird) => {
            bird.draw();
        })
    };

    addBirds(){
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
        this.enemies.forEach((enemy, index) => {
            if (enemy.x + enemy.width < 0 ||
                enemy.markedForDeletion === true) {
                this.enemies.splice(index, 1);
            }
        })
    }
}

class GroundEnemy extends Enemy {
    constructor(){
        super();
        this.width = 60;
        this.height = 87;
        this.x = 0;
        this.y = canvas.height - (this.height +32);
        this.v = {
            x: -3,
            y: 0
        }
        this.image.src = "../img/enemy_plant.png";
        this.maxFrame = 1;
        this.enemies = [];
        this.enemyTimer = 0;

        // Handle Car Enemy Spawn Rate (Interval & Frame Rate)
        this.enemyInterval = 400;
        this.deltaTime = 10;
    }

    update(deltaTime){
        super.update(deltaTime)
        this.enemies.forEach((enemy) => {
            enemy.draw();
        })
    };

    addCars(){
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
        this.enemies.forEach((enemy, index) => {
            if (enemy.x + enemy.width > canvas.width ||
                enemy.markedForDeletion === true) {
                this.enemies.splice(index, 1);
                console.log(this.enemies);
            }
        })
    }
}

export {Enemy, BirdEnemy, GroundEnemy}