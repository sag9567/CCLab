let bubbles = [];
let n = 30;

function setup() {
  createCanvas(400, 400);
  for(let i=0; i<n; i++){
    bubbles[i]= new Bubble();
  }
}

function draw() {
  background(0, 0, 255);
  for(let i=0; i<n; i++){
    bubbles[i].display();
    bubbles[i].move();
    bubbles[i].update();
  }
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height,(height*3) /2);
    this.s = random(5,50);
    this.ySpeed = map(this.s, 5,20, 5, 0.5);
    
  //sound
    let t1 = 0.001;
    let l1 = 0.5;
    let t2 = 0.3;
    let l2= 0.01;
    
    this.osc  =new p5.Oscillator('sine');
    this.env = new p5.Envelope (t1,l1,t2, l2);
  }

  display() {
    fill(255,120); 
    noStroke();
    circle (this.x, this.y, this.s);
   
  }
  move(){
    this.y = this.y + this.ySpeed; 

  }
  update(){
    if(this.y < 0){
      this.osc.start();
      let freq = map(this.s, 5, 50, 2000, 100);
      this.osc.freq(freq);
      this.x = random(width);
    this.y = random(height, (height*3) / 2);
    }
  }
}
let gridSize = 15;
let cam;
let midPointBr;
let pmidPointBr;


function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(0);
  cam.loadPixels();
  noStroke();
  
  let i = (width/2 + height/2*cam.width)*4;
      let rm = cam.pixels[i + 0];
      let gm= cam.pixels[i+1];
      let bm =cam.pixels[i+2];
  midPointBr = (rm+gm+bm)/3;
  
  let d = (pmidPointBr-midPointBr);
  
  console.log(d);
  
   pmidPointBr =midPointBr;
  
  for(let x = 0; x < width; x=x+gridSize){
    for(let y = 0; y < cam.height; y=y+gridSize){
      
      let index = (x + y*cam.width)*4;
      let  r = cam.pixels[index + 0];
      let g = cam.pixels[index+1];
      let b =cam.pixels[index+2];
      
      let br = (r+g+b)/3;
      let s =map(br, 0, 255, 1, gridSize);
      
   
      
      fill(r,g,b);
      circle(x,y,s);
    }
  }
 // image(cam,0,0);
}