import { ctx, canvas } from "/game.js";
import { GameObject } from "/GameObjects/GameObject.js";

class Sprite extends GameObject{
    constructor(x, y, width, height, imgSrc) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
};

export {Sprite}