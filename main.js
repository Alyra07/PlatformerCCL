import {Player} from "./GameObjects/Player.js";
import {Sprite} from "./GameObjects/Sprite.js";
import { collisionBlocks} from "./map/collisionUtils.js";
import {BirdEnemy, GroundEnemy} from "./GameObjects/Enemy.js";

// Canvas Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;

// Player Figure (x, y, width, height, {collisionBlocks})
const player = new Player(canvas.width/2 - 48, 0, 50, 50, {collisionBlocks: collisionBlocks});
const playerSprite = new Sprite(player.x-10, player.y+10, "./img/playerDog.png", 0, 10, 1100, 1000);

// Enemy Figures
const birdEnemies = new BirdEnemy();
const carEnemies = new GroundEnemy();

// Background Sprite
const background = new Sprite(0, 0, "../img/backgroundclouds.png", 0, 0, canvas.width, canvas.height);

// Keys pressed?
const keys = {
    w: false,
    a: false,
    d: false
};

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();

    // Draw Collision Blocks
    collisionBlocks.forEach((block) => {
        block.draw();
    });

    // Player Controls a & d
    player.v.x = 0;
    if (keys.a) player.v.x = -5;
    else if (keys.d) player.v.x = 5;

    // Update and Draw Player
    player.draw();
    // playerSprite.draw();
    player.update();

    // Draw & Update Bird Enemies
    birdEnemies.handleBirds(2);
    birdEnemies.update();
    // Draw & Update Car Enemies
    carEnemies.handleCars(2);
    carEnemies.update();

    requestAnimationFrame(gameLoop);
}
gameLoop();

// Event Listeners for Player Controls
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            if (player.v.y === 0) {
                player.v.y = -15;}
            break;
        case "a":
            keys.a = true;
            player.v.x = -5;
            break;
        case "d":
            keys.d = true;
            player.v.x = 5;
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            keys.a = false;
            player.v.x = 0;
            break;
        case "d":
            keys.d = false;
            player.v.x = 0;
            break;
    }
});

export {canvas, ctx};
