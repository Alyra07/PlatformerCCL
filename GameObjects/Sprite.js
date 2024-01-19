import { ctx, canvas } from "../main.js";
import { GameObject } from "./GameObject.js";

class Sprite extends GameObject {
    constructor(x, y, imgSrc) {
        super (x, y);
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
    }
};

export {Sprite}