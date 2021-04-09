var mawla;
var enemyGroup;
var sword;
var score = 0;
var life = 3;
var gameState = "stop"
var gameOver;
var boundary;
var fireBallGroup;
var notice;


function preload()
{
mawlaImg=loadImage("Mawla.png");
backgroundImage = loadImage("battle ground.jpg");
swordImage = loadImage("sword.png");
heart = loadImage("heart.png");
enemyImg = loadImage("enemy.png");
gameOverImg = loadImage("gameOver.png");
fireballImg = loadImage("fireball.png");
youWinIMg = loadImage("youwin.png")
}

function setup() {
	createCanvas(1350, 650);
	
	mawla = createSprite(300,350,30,100);
mawla.addImage(mawlaImg);
	mawla.scale = 0.4

	sword = createSprite(270,370,10,10)
	sword.addImage(swordImage);
	sword.scale = 0.3;

	life1 = createSprite(400,100,10,10)
	life1.addImage(heart);
    life1.scale = 0.2
	life2 = createSprite(480,100,10,10)
	life2.addImage(heart);
	life2.scale = 0.2
	life3 = createSprite(560,100,10,10)
	life3.addImage(heart);
	life3.scale = 0.2
	enemyGroup = new Group()
  boundary=createSprite(650,100,1350,10);
  boundary.visible = false;

  fireBallGroup = new Group()
}


function draw() {
background(backgroundImage);
sword.x = mawla.x-30
sword.y = mawla.y+20
if(gameState==="play"){
mawla.x = mouseX;
mawla.y = mouseY;
if(mawla.y<100){
	mawla.y = 200;
	mawla.x = mouseX
}
}
if(enemyGroup.isTouching(sword)){

	enemyGroup.destroyEach()
	score = score+1;
}
for(var i=0;i<enemyGroup.length;i++){
	if(enemyGroup.get(i).isTouching(mawla)){
		enemyGroup.get(i).destroy()
		life = life-1
	}
}

for(var i=0;i<fireBallGroup.length;i++){
	if(fireBallGroup.get(i).isTouching(mawla)){
		fireBallGroup.get(i).destroy()
		life = life-1
	}
}

if(enemyGroup.isTouching(fireBallGroup)){

	enemyGroup.destroyEach()
}


switch(life){
	case 0:life1.visible = false;
	life2.visible = false;
	life3.visible = false;
	break;
	case 1:life2.visible = false;
	life3.visible = false;
	life1.visible = true;
	break;
	case 2:life2.visible = true;
	life3.visible = false;
	life1.visible = true;
	break;
	case 3:life2.visible = true;
	life3.visible = true;
	life1.visible = true;
	break;
	default:
	break
}

if(life === 0){
	gameState = "end"


}
if(gameState==="end"){
	mawla.destroy()
	sword.destroy()
	life1.destroy()
	life2.destroy()
	life3.destroy()
	enemyGroup.destroyEach()
	gameOver = createSprite(650,325,20,20);
  gameOver.addImage(gameOverImg);
}
console.log(life)
if(gameState==="play"){
	spawnEnemies()
	spawnFireBall()
}
if(keyDown("space")){
	gameState="play"
}
mawla.collide(boundary);
 drawSprites()
 textSize (30);
 fill("yellow")
 text("Score : "+score,1100,100);

 textSize(30)
 fill("blue")
 if(gameState==="stop"){
 text("CONTROL PLAYER WITH MOUSE",100,200)
 text("PRESS 'SPACE' TO START",650,325)
 }
 console.log(gameState)

 if(score>9){
	 gameState="win"
 }
 if(gameState==="win"){
	mawla.destroy()
	sword.destroy()
	life1.destroy()
	life2.destroy()
	life3.destroy()
	enemyGroup.destroyEach()
	youWin = createSprite(650,325,20,20);
  youWin.addImage(youWinIMg);
 }
}
function spawnEnemies(){
	if(frameCount%100===0){

	
	var enemy = createSprite(1000,random(350,600),30,100);
	enemy.scale = 1.3;
	enemy.setCollider("rectangle",0,0,enemy.width,enemy.height);
	enemy.addImage(enemyImg)
	enemy.velocityX = -4;
	enemyGroup.add(enemy);
	enemy.lifeTime = 200;
	}
}
function spawnFireBall(){
	if(frameCount%140===0){
    var fireBall = createSprite(random(20,800),100,30,30);
	fireBall.addImage(fireballImg);
	fireBall.scale = 0.2;
	fireBall.velocityY = 6;
	fireBall.lifeTime = 200;
	fireBallGroup.add(fireBall);
	}
}
