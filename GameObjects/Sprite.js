import { ctx, canvas } from "../main.js";

class Sprite {
    constructor(x, y, imgSrc) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imgSrc;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
    }
};

export {Sprite}