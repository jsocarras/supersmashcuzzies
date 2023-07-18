let images = [];
let img1, img2;

let player1, player2;

let player1Selected = false;
let player2Selected = false;

function preload() {
  for (let i = 1; i <= 8; i++) {
    images[i] = loadImage(`images/char${i}.png`);
  }
}

class Player {
  constructor(x, y, img, upKey, downKey, leftKey, rightKey, attackKey1, attackKey2) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.speed = 5;
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.attackKey1 = attackKey1;
    this.attackKey2 = attackKey2;
    this.health = 100;
    this.health2 = 200;
    this.img = img;  // Use the img argument passed in to constructor
  }

  show() {
    // rect(this.x, this.y, this.size, this.size);
    image(this.img, this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(this.upKey)) {
      this.y -= this.speed;
    }
    if (keyIsDown(this.downKey)) {
      this.y += this.speed;
    }
    if (keyIsDown(this.leftKey)) {
      this.x -= this.speed;
    }
    if (keyIsDown(this.rightKey)) {
      this.x += this.speed;
    }
  }

  checkCollision(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.size) {
      this.health -= 1;
      other.health -= 1;
    }
  }
}

function setup() {
  createCanvas(800, 600);

  // Create player objects
  // Player1 uses WASD keys for movement, and X, C for attacks
  player1 = new Player(100, 300, null, 87, 83, 65, 68, 88, 67); // ASCII key codes
  // Player2 uses Arrow keys for movement, and N, M for attacks
  player2 = new Player(700, 300, null, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 78, 77); // ASCII key codes
}

function draw() {
  background(0);

  if (!player1Selected || !player2Selected) {
    showCharacterSelectScreen();
  } else {
    player1.show();
    player1.move();
    player2.show();
    player2.move();

    player1.checkCollision(player2);
    player2.checkCollision(player1);

    // Display player health
    fill(255);
    textSize(18);
    text(`Player 1 Health: ${player1.health}`, 10, 20);
    text(`Player 2 Health: ${player2.health2}`, width - 150, 20);

    // Check for game over
    textSize(32);
    if (player1.health <= 0) {
      text('Player 2 Wins!', width / 2, height / 2);
      noLoop();
    } else if (player2.health <= 0) {
      text('Player 1 Wins!', width / 2, height / 2);
      noLoop();
    }

    if (img1.width === 0) {
      console.log('img1 not loaded');
    } else {
      console.log('img1 loaded');
    }

    if (img2.width === 0) {
      console.log('img2 not loaded');
    } else {
      console.log('img2 loaded');
    }
  }
}

function showCharacterSelectScreen() {
  let x = 50;
  let y = 50;
  let w = 80;
  let h = 80;

  // Draw a 2x4 grid of images
  for (let i = 1; i <= 8; i++) {
    image(images[i], x, y, w, h);
    x += w + 20;
    if (i % 4 === 0) {
      x = 50;
      y += h + 20;
    }
  }
}

function mousePressed() {
  let w = 80;
  let h = 80;

  for (let i = 1; i <= 8; i++) {
    let x = 50 + ((i - 1) % 4) * (w + 20);
    let y = 50 + Math.floor((i - 1) / 4) * (h + 20);

    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      if (!player1Selected) {
        img1 = images[i];
        player1.img = img1;
        player1Selected = true;
      } else if (!player2Selected) {
        img2 = images[i];
        player2.img = img2;
        player2Selected = true;
      }
    }
  }
}
