import {Player} from "./GameObjects/Player.js";
import {Sprite} from "./GameObjects/Sprite.js";

// Canvas Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;

// Player Figure
const player = new Player(100, 100, 64, 64, "blue");

// Level Background
const background1 = new Sprite(0, 0, "../img/map1.png"); 

// Keys pressed
const keys = {
    w: false,
    a: false,
    d: false
};

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background1.draw();
    // Player Controls a & d
    player.v.x = 0;
    if (keys.a) player.v.x = -5;
    else if (keys.d) player.v.x = 5;

    // Update and Draw Player
    player.draw();
    player.update();

    requestAnimationFrame(gameLoop);
}
gameLoop();

// Event Listeners for Player Controls
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            if (player.v.y === 0) {
                player.v.y = -20;}
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
