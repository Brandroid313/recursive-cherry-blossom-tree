// Code from a modified Daniel Shiffman example
// https://thecodingtrain.com/

var angle = 0;
var seed;
var randomAngle;
var shading = 0;
var noisyX;
var wind;

var screenWidth = 800;
var screenHeight = 600;

function setup() {
  createCanvas(screenWidth, screenHeight);
  seed = random(1000);
    
  cherryBlossoms = [];
  for(i = 0; i < 100; i++){
      cherryBlossoms.push(new CherryBlossoms());
  }
}

////////////////////////////////////////////////
function draw() {
  background(183, 233, 247);
  angleMode(DEGREES);
  randomSeed(seed);
  angle = 45;
  stroke(255);
    
  /* Go through the cherryblossums, move display and 
    recycle them if they move to far */
  for(i = 0; i < cherryBlossoms.length; i++){
      cherryBlossoms[i].move(i);
      cherryBlossoms[i].display();
      
      if(cherryBlossoms[i].y > screenHeight + 10){
          cherryBlossoms[i].y = -5
      }
      
      if(cherryBlossoms[i].x > screenWidth + 10 ){
          cherryBlossoms[i].x = 0;
      }
      
      if(cherryBlossoms[i].x <= -5 ){
          cherryBlossoms[i].x = screenWidth + 5;
      }
  }
  
    
  // Start the branch off in the middle of the screen
  translate(screenWidth / 2, screenHeight);
  branch(120, 3, shading);
  
}

/////////////////////////////////////////////////
function branch(len, thickness, colorshading) {
  stroke(54 + colorshading, 34 + colorshading / 2, 4 + colorshading / 3);
  strokeWeight(thickness);
  noisyX = noise(frameCount / 200);
  wind = map(noisyX, 0, 1, -15, 15);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle * random(0.2, 0.9) + wind);
    branch(len * random(0.5, 0.8), thickness*0.8, colorshading + 10);
    pop();
      
    push();
    rotate(-angle * random(0.2, 0.9) + wind);
    branch(len * random(0.5, 0.8), thickness*0.8, colorshading + 10);
    pop();
  }
  // When we have reached maximum branching, draw a cherry blossom
  else {
      
      cherryBlossom(0,0);      
  }
}

// Cherry blossoms on the end of each branch
function cherryBlossom(x,y){
         noStroke();
         fill(255, 183, 197, 100);
         ellipse(0 + x, 0 + y, 15, 8);
      
}

// Cherry Blossom class
class CherryBlossoms {
  constructor() {
    this.x = random(0, screenWidth - 5);
    this.y = random(-100, screenHeight / 2);
    this.diameter = random(0.7, 1.5)
  }

  move(i) {
    noisyX = noise(frameCount / 200);
    wind = map(noisyX, 0, 1, -3, 3);
    this.x +=  wind + (i % 1);
    this.y += random(0, 1);
  }

  display() {
    noStroke();
    fill(255, 183, 197, 120);
    ellipse(this.x , this.y , 12 * this.diameter, 10 * this.diameter);
    
  }
}
