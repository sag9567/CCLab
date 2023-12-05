
let dancer;
let img;

function preload(){
  img = loadImage('download.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dancer = new Olive(width / 2, height / 2);
}

function draw() {
  background('beige');
  drawFloor();
  image(img, width / 2 - 220, height / 2 - 210, 400, 400);

  dancer.update();
  dancer.display();

  
  if (dancer.isMouseOver() && mouseIsPressed) {
    dancer.shakeAndFall();
  }
}

class Olive {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.rotationSpeed = 0.1;
    this.yOffset = 0;
    this.yOffsetSpeed = 2;
    this.armAngle = 0;
    this.armSpeed = 0.2;
    this.shaking = false;
    this.fallSpeed = 5;
  }

  update() {

    this.angle += this.rotationSpeed;
    this.yOffset = 10 * sin(this.angle);
    
    
    this.armAngle += this.armSpeed;
  }

  display() {
    push();
    translate(this.x, this.y - this.yOffset);

    
    fill('green');
    noStroke();
    ellipse(1, -5, 50, 60);

    
    stroke(255, 87, 51);
    strokeWeight(5);
    line(35, 30, 20, 10);
    line(-35, 30, -20, 10);

    
    fill(155);
    ellipse(15, -5, 10, 10); 
    ellipse(-15, -5, 10, 10); 

   
    fill(155);
    stroke(255, 87, 61);
    strokeWeight(1);
    arc(0, 10, 20, 20, 0, PI);
    pop();
  }

  isMouseOver() {
    
    let d = dist(this.x, this.y - this.yOffset, mouseX, mouseY);
    return d < 30; 
  }

  shakeAndFall() {
    
    if (!this.shaking) {
      this.shaking = true;
      this.fallSpeed = 5;
    }

    this.y += this.fallSpeed;
    this.fallSpeed += 0.5;

    if (this.y > height + 100) {
      
      this.y = -100;
      this.shaking = false;
    }
  }
}
