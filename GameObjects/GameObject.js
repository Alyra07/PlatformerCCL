class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.color = color;

        this.side = {
            top: this.y,
            bottom: this.y + this.height,
            left: this.x,
            right: this.x + this.width
        };
        
        this.gravity = 0.5;
        this.v = {
            x: 0,
            y: 0
        };
    }
}

export {GameObject}