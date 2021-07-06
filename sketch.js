var jake;
var jakeAnimation;
var rails;
var train; 
var trainImage1;
var trainsGroup;
var score = 0;
var gameState = "play";
var barrier1;
var barrier2;
var railsGroup;

function preload(){
  //pre-load images
  jakeAnimation = loadAnimation("jake1.png", "jake2.png",               "jake4.PNG","jake5.png");
  
  trainImage1 = loadImage("train.png");
}

function setup(){
  createCanvas(400,400);
  //create sprites here
  jake = createSprite(200,300,20,20);
  jake.addAnimation("jakeRunning", jakeAnimation)
  jake.scale = 0.4;
  trainsGroup = new Group();
  barrier1 = createSprite(50,0,10,800)
  barrier2 = createSprite(350,0,10,800)
  
  railsGroup = new Group();
}

function draw() {
  background("black");
  textSize(15)
  fill("white")
  text("Score:"+score,320,20)
  
  barrier1.visible = false;
  barrier2.visible = false;
  
  if (gameState === "play"){
    score += Math.round (frameCount/200)
    
    jake.visible = true;
    
    if (keyDown("right")){
      jake.velocityX = 5;
    }

    if (keyDown("left")){
      jake.velocityX = -5;
    }

    jake.bounceOff(barrier1)
    jake.bounceOff(barrier2)
    
    if (jake.isTouching(trainsGroup)){
      gameState = "end";
    }

    spawnRails();
    spawnRails2();
    spawnTrains();
  }
  else if (gameState === "end"){
    railsGroup.destroyEach();
    
    jake.visible = false;
    textSize(20)
    fill("white")
    text("GAME OVER YOU GOT: "+score+" POINTS", 50, 200)
    
    textSize(20)
    fill("white")
    text("PRESS R TO RESTART", 120, 150)
    
    if (keyWentDown("r")){
      score = 0;
      gameState = "play";
      jake.x = 200;
    }
  }
  
  drawSprites();
}

function spawnRails() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    rail = createSprite(150,0,10,100);
    rail.scale = 0.4;
    rail.velocityY = 5;
    rail.lifetime = 200;
    
    //adjust the depth
    rail.depth = jake.depth
    jake.depth = jake.depth + 1;
    
    railsGroup.add(rail);
    }
}

function spawnRails2() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    rail = createSprite(250,0,10,100);
    rail.scale = 0.4;
    rail.velocityY = 5;
    rail.lifetime = 200;
    
    //adjust the depth
    rail.depth = jake.depth
    jake.depth = jake.depth + 1;
    
    railsGroup.add(rail)
    }
}

function spawnTrains(){
  if (frameCount % 80 === 0) {
    train = createSprite(0, 0, 80 , 200)
    train.addImage(trainImage1);
    train.scale = 0.03;
    train.velocityY = Math.round(random(5,10));
    train.lifetime = 200;
    trainsGroup.add(train);
    var a = Math.round(random(1,3))
    switch(a){
      case 1: train.x = 100;
        break
      case 2: train.x = 200;
        break
      case 3: train.x = 300;
        break
    }
    
  }
}