import {GameObject} from "./GameObject.js";
import {ctx} from "../main.js";

class CollisionBlock extends GameObject {
    constructor(x, y) {
        super (x, y);
        this.width = 32;
        this.height = 32;

        this.side = {
            top: this.y,
            bottom: this.y + this.height,
            left: this.x,
            right: this.x + this.width
        };
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

export {CollisionBlock}