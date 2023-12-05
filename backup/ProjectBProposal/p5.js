let currentImage;
let leaves = [];
let codeStarted = false;

class Leaf {
  constructor() {
    this.x = random(width);
    this.y = random(-50, -10);
    this.speed = random(1, 3);
    this.angle = random(PI);
    this.size = random(15, 25); 
  }

  update() {
    this.y += this.speed;
    this.x += 0.5 * sin(this.angle);
    this.angle += 0.05;

    if (this.y > height) {
      this.y = random(-50, -10);
      this.x = random(width);
    }
  }

  display() {
    fill(0, 100, 0); 
    noStroke();
    ellipse(this.x, this.y, this.size, this.size * 1.5);
  }

  touchesOlive() {
    
    let greenThreshold = 50; 
    let pixelColor = currentImage.get(floor(this.x), floor(this.y));

    
    return green(pixelColor) > greenThreshold && red(pixelColor) < greenThreshold && blue(pixelColor) < greenThreshold;
  }
}

function preload() {
  
  currentImage = loadImage('images.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (codeStarted) {
   
    image(currentImage, 0, 0, width, height);

    
    for (let i = 0; i < leaves.length; i++) {
      leaves[i].update();
      leaves[i].display();

      
      if (leaves[i].touchesOlive()) {
       
        changeImage('images-5.png');
      }
    }
  }
}

function changeImage(newImagePath) {
 
  currentImage = loadImage(newImagePath);
}

function mousePressed() {
  
  codeStarted = true;

  
  for (let i = 0; i < 10; i++) {
    leaves.push(new Leaf());
  }
}
