class Arrow {
    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.image = loadImage('./assets/arrow.png');
    }
    display() {
         if (keyIsDown(UP_ARROW) && this.angle > -30) {
            this.angle--;
        }
        if (keyIsDown(DOWN_ARROW) && this.angle < 30) {
            this.angle++;
        }


        push();
        translate(this.x, this.y);
        rotate(this.angle);
        //imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
        noFill();
    }
}