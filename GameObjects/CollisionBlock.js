import {GameObject} from "./GameObject.js";
import {ctx, canvas} from "../main.js";

class CollisionBlock extends GameObject {
    constructor(x, y) {
        super (x, y);
        this.color = "red";
        this.width = 32;
        this.height = 32;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export {CollisionBlock}