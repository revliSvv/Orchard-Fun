const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var ground;

let backgroundImage;
let arrow;
let staticFruit;
let fruitsArray = [];
let coins = [];
let lifeUps = [];

let basket;

let score = 0;
let fruitCounter = 0;
let lives = 3;

function preload() {
  backgroundImage = loadImage('./assets/background.jpg');
  staticFruit = loadImage('./assets/apple.png');
  coinImage = loadImage('./assets/coin.png')
  lifeUpImage = loadImage("./assets/life.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  arrow = new Arrow(100, height / 2 - 50, 100, 60, 0);

  basket = new Basket(width - 250, height - 150, 400, 200);
}

function draw() {
  background(backgroundImage);

  Engine.update(engine);

  arrow.display();

  for (let q = 0; q < fruitsArray.length; q++) {
    displayFruits(fruitsArray[q]);
    handleCollision(q);
    for (let i = 0; i < coins.length; i++) {
      detectPowerupCollision(coins, q, i);
    }
    for (let i = 0; i < lifeUps.length; i++) {
      detectPowerupCollision(lifeUps, q, i);
    }
  }

  push();
  imageMode(CENTER);
  image(staticFruit, arrow.x, height / 2 - 25, 60, 75);
  pop();

  basket.display();

  push();
  fill('black');
  textSize(25);
  text('Score: ' + score, width - 170, 50);
  text("Lives: " + lives, 20, 50);

  textSize(40);
  fill('black');
  text('Fruit Count: ' + fruitCounter, basket.body.position.x - 150, basket.body.position.y + 50);

  textSize(60);
  text('Orchard Fun', width / 2 - 275, 50)
  pop();

  if (score >= 100 || lives == 0) {
    gameOver();
  }

  //basket.move();
  //moveBasket();
  spawnCoins();
  removeCoins();
  spawnLifeUps();
  removeLifeUps();

  drawSprites();
}

function keyPressed() {
  if (lives > 0) {
    if (keyCode === 32) {
      let fruit = new Fruit(arrow.x, height / 2 - 25);
      Matter.Body.setAngle(fruit.body, arrow.angle);
      fruitsArray.push(fruit);
    }
  }
}

function keyReleased() {
  if (lives > 0) {
    if (keyCode === 32) {
      fruitsArray[fruitsArray.length - 1].shoot();
    }
  }
}

function displayFruits(fruit) {
  if (fruit) {
    fruit.display();
  }
}

function handleCollision(index) {
  if (fruitsArray[index]) {
    var collision = Matter.SAT.collides(fruitsArray[index].body, basket.body);
    if (collision.collided) {
      fruitsArray[index].remove(index);
      score += 2;
      fruitCounter++;
      //moveBasket();
    }
    else if (fruitsArray[index].body.position.y > height - 10) {
      fruitsArray[index].remove(index);
      if (lives > 0) {
        lives--;
      }
    }
  }
}

/*function moveBasket() {
  if (fruitCounter > 2) {
    if (basket.body.position.x < width - 10) {
      Matter.Body.setStatic(basket.body, false);
      //basket.body.position.x -= fruitCounter / 2 - 1
      Matter.Body.setVelocity(basket.body, { x: -(fruitCounter / 2 - 1), y: 0 });
    }
    else if (basket.body.position.x < 200) {
      Matter.Body.setVelocity(basket.body, { x: fruitCounter / 2 - 1, y: 0 });
    }
  }
  //if (!basket.isMoving) {
    var dx = -(fruitCounter / 2 - 1)
    //basket.isMoving = true;
  //}
  if (basket.body.position.x >= width - 200) {
    dx = -dx;
    basket.body.position.x -= 100;
  }
  if (basket.body.position.x - 200 <= 300) {
    dx = fruitCounter / 2 - 1
    basket.body.position.x += 100;
    console.log(dx);
  }
  if (fruitCounter > 2) {
    if (basket.body.isStatic) {
      Matter.Body.setStatic(basket.body, false);
    }
    basket.body.position.x += dx
  }
}*/

function gameOver() {
  if (score >= 100) {
    swal(
      {
        title: `You Won!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://eat-pregnant.com/wp-content/uploads/2019/06/mangerfruit7.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  else if (lives <= 0) {
    swal(
      {
        title: `You lost!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://eat-pregnant.com/wp-content/uploads/2019/06/mangerfruit7.png",
        imageSize: "150x150",
        confirmButtonText: "Try Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
}

function spawnCoins() {
  if (frameCount % 240 == 0) {
    let coinX = random(200, width - 200);
    let coin = createSprite(coinX, -30);
    coin.addImage("coin", coinImage);
    coin.scale = 0.1;
    coin.velocityY = 2;
    coins.push(coin);
  }
}

function removeCoins() {
  for (var q = 0; q < coins.length; q++) {
    if (coins[q].y > height + 20) {
      coins[q].remove();
      coins.splice(q);
    }
  }
}

function detectPowerupCollision(powerGroup, q, i) {
  if (fruitsArray[q] != null) {
    var d = dist(fruitsArray[q].body.position.x, fruitsArray[q].body.position.y, powerGroup[i].position.x, powerGroup[i].position.y);
    if (d <= 30) {
      fruitsArray[q].remove(q);
      if (powerGroup == coins) {
        coins[i].remove();
        coins.splice(i);
        score += 5;
      }
      else if (powerGroup == lifeUps) {
        lifeUps[i].remove();
        lifeUps.splice(i);
        lives++;
      }
      return true;
    }
    else {
      return false;
    }
  }
}

function spawnLifeUps() {
  if (frameCount % 360 == 0) {
    let lifeX = random(200, width - 200);
    let lifeUp = createSprite(lifeX, -30);
    lifeUp.addImage("lifeUp", lifeUpImage);
    lifeUp.scale = 0.25;
    lifeUp.velocityY = 5;
    lifeUps.push(lifeUp);
  }
}

function removeLifeUps() {
  for (var q = 0; q < lifeUps.length; q++) {
    if (lifeUps[q].y > height + 20) {
      lifeUps[q].remove();
      lifeUps.splice(q);
    }
  }
}
