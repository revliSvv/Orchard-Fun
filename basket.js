class Basket {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    var options = {
      isStatic: true
    };

    //this.isMoving = false;
    this.body = Bodies.rectangle(x, y, 400, 10, options);
    //this.body = Bodies.rectangle(x, y, w, h, options);
    this.image = loadImage('./assets/basket.png');
  }

  display() {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.width, this.height);
    rect(pos.x, pos.y, 400, 10);
    pop();
  }

  /*move() {
    if (!this.isMoving) {
      var dx = -(fruitCounter / 2 - 1)
      basket.isMoving = true;
    }
    if (this.body.position.x >= width - 200) {
      dx = -dx;
      this.body.position.x -= 100;
    }
    if (this.body.position.x - 200 <= 300) {
      dx = fruitCounter / 2 - 1
      this.body.position.x += 100;
      console.log(dx);
    }
    if (fruitCounter > 2) {
      if (!this.body.isStatic) {
        Matter.Body.setStatic(this.body, false);
      }
      basket.body.position.x += dx
    }
  }*/

}