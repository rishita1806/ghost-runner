var tower, towerImage;
var door, doorIMG, doorsGroup;
var climber, climberIMG, climbersGroup;
var ghost, ghostIMG;
var block, blocksGroup;
var gameState = "play";
var sound;

function preload(){
  
  towerImage = loadImage("tower.png");
  doorIMG = loadImage("door.png");
  climberIMG = loadImage("climber.png");
  ghostIMG = loadImage("ghost-standing.png");
  
  sound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostIMG);
  ghost.scale = 0.3;
                  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blocksGroup = new Group();
  
  //sound.loop();
}

function draw(){
  if(gameState === "play"){
 
    if(tower.y>400){
     tower.y = 300;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(blocksGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }

    doors();
    
    drawSprites();
    
  }
  
  if(gameState === "end"){
    background(0);
    stroke("red");
    fill("red");
    textSize(30);
    text("GAME OVER", 230, 250);
  }
  

}

function doors(){
  if(frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorIMG);
    
    climber = createSprite(200,10);
    climber.addImage(climberIMG);
    
    block = createSprite(200,15);
    block.width = climber.width;
    block.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    block.x = door.x;
    block.velocityY = 1;
    
    door.lifetime = 700;
    doorsGroup.add(door);
    
    climber.lifetime = 700;
    climbersGroup.add(climber);
    
    block.lifetime = 700;
    blocksGroup.add(block);

  }
}