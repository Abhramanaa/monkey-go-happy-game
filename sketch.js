var monkey , monkey_running;
var banana , bananaImage;
var obstacle , obstacleImage;
var foodGroup, obstaclesGroup;
var score=0;

var PLAY=1;
var END=0;
var gameState=PLAY;
var ground;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  
  //creating the monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale=0.1;
  
  //creating the ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup=new Group();
  obstaclesGroup=new Group();

  console.log(monkey.y);
}


function draw() {
  
  background("lightblue");
  
  if(gameState===PLAY)
  {
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y>=312){
    monkey.velocityY=-15;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  spawnFood();
  spawnObstacles();

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/getFrameRate());
  
 text("Survival Time:" + survivalTime,100,50);
 if(foodGroup.isTouching(monkey)){
   score=score+1;
 }
 
 if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityY=0;
    gameState=END;
 }
 
  }
 if (gameState===END){
   ground.velocityX=0;
    monkey.velocityX=0;
    monkey.x=80;
    //monkey.adAnimation("monkey 1.png_1");
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  stroke("white");
  textSize(20);
  fill("white");
  text("GAME OVER",100,150);
  text("Survival Time:" + survivalTime,100,50);
  }

 monkey.collide(ground);
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" +score,100,100);
  
  
   
}

function spawnFood(){
  
  if(frameCount % 80===0){
  banana=createSprite(600,250,40,40);
  banana.y=random(120,200);
  banana.velocityX=-5;
  
  //assigning the lifetime to th evariables
  banana.lifetime=300;
  monkey.depth=banana.depth+1;
  
  //add image of banana
  banana.addImage(bananaImage);
  banana.scale=0.07;
  
  //add each banana to the group
  foodGroup.add(banana);
}
}

function spawnObstacles(){
  
  if(frameCount % 200===0)
  {
  obstacle=createSprite(800,320,40,40);
  obstacle.velocityX=-6;
    
   //adding image to the obstacles
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
  //adding lifetime to the obstacles
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
   }