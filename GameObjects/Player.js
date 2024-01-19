import {canvas, ctx} from "../main.js";
import { GameObject } from "./GameObject.js";

class Player extends GameObject {
    constructor(x, y, width, height, color) {
        super (x, y, width, height, color);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.v.x;
        this.y += this.v.y
        this.side.bottom = this.y + this.height;

        // Above bottom canvas edge
        if (this.side.bottom + this.v.y < canvas.height) {
            this.v.y += this.gravity;
        } else {
            this.v.y = 0
        }
    }
}

export {Player}