import {GameObject} from "./GameObject.js";
import {ctx, canvas} from "../main.js";

class Enemy extends GameObject {
    constructor(){
        super();
        this.image = new Image();
        this.frame = {
            x: 0,
            y: 0
        }
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
    }

draw() {
    ctx.drawImage(this.image, this.frame.x * this.width, 0, this.width, this.height, 
        this.x, this.y, this.width, this.height);
}

update(deltaTime){
    this.x += this.v.x;
    this.y += this.v.y;
    if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.frame.x < this.maxFrame) {
            this.frame.x++;} 
        else {
            this.frame.x = 0;}
    }
    else {
        this.frameTimer += deltaTime;
    }
}
}

class BirdEnemy extends Enemy {
    constructor(){
        super();
        this.x = 200;
        this.y = 200;
        this.width = 64;
        this.height = 44;
        this.v = {
            x: 2,
            y: 0
        }
        this.image.src = "../img/enemy_bird.png";
        this.maxFrame = 5;

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
    }

    update(deltaTime){
        super.update(deltaTime)
    };

    addBirds(){
        this.enemies.push(new BirdEnemy());
    };

    handleBirds(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.addBirds();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach((bird) => {
            bird.update(deltaTime);
            bird.draw(ctx);
        })
    };
}

class GroundEnemy extends Enemy {

}

export {Enemy, BirdEnemy, GroundEnemy}