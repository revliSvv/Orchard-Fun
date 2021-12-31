class Fruit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 60
        this.image = loadImage('./assets/apple.png');
        var options = {
            isStatic: true
        };
        this.body = Bodies.circle(x, y, 30, options);
        World.add(world, this.body);

    }
    shoot() {
        var newAngle = arrow.angle - 5;
        newAngle = newAngle * (3.14 / 180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)
        })
    }

    display() {
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r + 15);
        pop();
    }

    remove(index) {
        if (fruitsArray[index]) {
            Matter.Body.setVelocity(fruitsArray[index].body, { x: 0, y: 0 });

            World.remove(world, fruitsArray[index].body);
            delete fruitsArray[index];
        }
    }
}