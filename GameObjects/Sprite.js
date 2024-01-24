import { ctx, canvas } from "../main.js";
import { GameObject } from "./GameObject.js";

class Sprite extends GameObject {
    constructor(x, y, imgSrc, sx, sy, sw, sh) {
        super (x, y);
        this.image = new Image();
        this.image.src = imgSrc;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
        }
        // Source image x, y, width & height for spritesheet
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
    }
    draw() {
        if (!this.loaded) return;
        ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y, canvas.width, canvas.height);
    }
};

export {Sprite}