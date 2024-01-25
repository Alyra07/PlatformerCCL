import {CollisionBlock} from "../GameObjects/CollisionBlock.js";
import {platformData} from "./platformData.js";

Array.prototype.parse2D = function () {
    const rows = [];
    for (let i = 0; i < this.length; i+= 32) {
            rows.push(this.slice(i, i + 32));
    }
    return rows;
};

Array.prototype.createItems2D = function () {
   const items = [];
   this.forEach((row, y) => {
      row.forEach((num, x) => {
         if(num !== 0) {
            items.push(new CollisionBlock(x*32, y*32));
         }
      });
   })
   return items;
};

const parsedCollisions = platformData.parse2D();
const collisionBlocks = parsedCollisions.createItems2D();

export {collisionBlocks}