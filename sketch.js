var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ufo,ufoImage;


var astroeidsGroup, astroeidImage;
var backgroundSound,ufoCrashSound;


var score=0;

var gameOver, restart;

var backgroundImage1;

localStorage["HighestScore"] = 0;


function preload(){
  //trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_collided = loadAnimation("trex_collided.png");

  ufoImage = loadImage("UFOImage.png");

  backgroundImage1 = loadImage("Images/BackgroundImage1.jpeg");
  backgroundSound = loadSound("Audios/BackgroundMusic.mp3");

  ufoCrashSound = loadSound("Audios/Ufo crashing Sound.m4a");
  
  
  astroeidImage = loadImage("Images/astroeidImage.png");
  
  
  
  gameOverImg = loadImage("Images/GameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  //backgroundSound.loop();
  

  
  ufo = createSprite(80,180,20,50);
  
  ufo.addImage(ufoImage);
  //trex.addAnimation("collided", trex_collided);
  ufo.scale = 0.2;
  
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  astroeidsGroup = new Group();

  ufo.setCollider("circle",0,0,40);
  ufo.debug = false;
  
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImage1);
  
  text("Score: "+ score, 500,50);

  //ufo.collides(edges);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("UP_ARROW")){
      ufo.velocityY = -5;
      ufo.velocityX = 0;
      backgroundSound.play();
    }
    if(keyDown("DOWN_ARROW")){
      ufo.velocityY = 5;
      ufo.velocityX = 0;
    }
    if(keyDown("LEFT_ARROW")){
      ufo.velocityY = 0;
      ufo.velocityX = -5;
    }
    if(keyDown("RIGHT_ARROW")){
      ufo.velocityY = 0;
      ufo.velocityX = +5;
    }
  
    ufo.velocityY = ufo.velocityY + 0.8
  
    ufo.collide(invisibleGround);
  
    spawnastroeids();
    
    
  
    if(astroeidsGroup.isTouching(ufo)){
        gameState = END;
        ufoCrashSound.play();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    
    ufo.velocityY = 0;
    
    astroeidsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //ufo.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    
    astroeidsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnastroeids() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var astroeid = createSprite(600,120,40,10);
    astroeid.y = Math.round(random(80,120));
    astroeid.addImage(astroeidImage);
    astroeid.scale = 0.1;
    astroeid.velocityX = -(3+score/100);
    
     //assign lifetime to the variable
     astroeid.lifetime = 200;
    
    //adjust the depth
    astroeid.depth = ufo.depth;
    ufo.depth = ufo.depth + 1;
    astroeid.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //add each cloud to the group
    astroeidsGroup.add(astroeid);
  }
  
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  //obstaclesGroup.destroyEach();
  astroeidsGroup.destroyEach();
  
  //trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}