//Ayaan Patel, 6/2/2025, Cactus (Ecosystem Lab)

let cactusImg;

let cactus;

function preload(){
  
  cactusImg = loadImage("cactus.png");

}

function cactusSize(){
  //scales
  return min(height * 0.85, width *0.6);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cactus = new Cactus(cactusImg, cactusSize(), width /2, height / 2);
}

function windowResized(){

  resizeCanvas(windowWidth, windowHeight);
  cactus.size = cactusSize();
  cactus.position.set(width/2, height/2);

}

function draw() {

  background(13, 27, 42); //matches the sites dark navy
  frameRate(40);
  cactus.update();
  cactus.display();

}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {

    cactus.applyForce(createVector(5, 0)); //wind right

  } else if (keyCode === LEFT_ARROW) {

    cactus.applyForce(createVector(-5, 0)); //wind left

  }
}

class Cactus {
  constructor(img, size, x, y){

    this.img = img;
    this.size = size;

    //movement
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);

    this.acceleration = createVector(0, 0);

    this.maxAngle = 0.3;
    this.angle = 0;
    this.noiseSpeed = 0.01;
    this.xOffset = random(200, 500);
  }

  applyForce(force){

    this.acceleration.add(force);

  }

  update(){

    let noiseV = noise(this.xOffset); //noise
    this.angle = map(noiseV, 0, 1, -this.maxAngle, this.maxAngle);
    this.xOffset += this.noiseSpeed;


    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
    this.position.add(this.velocity);
    this.velocity.mult(0.95); //friction so the wind drift settles
    this.acceleration.mult(0);

  }


  show(){
    push();

    translate(this.position.x, this.position.y);
    scale(1, -1); //flips vertically to match the og orientation
    shearX(this.angle);

    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size);

    pop();

  }

  display(){

    this.show();

  }
}
