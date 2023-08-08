var ground
var groundImg
var asteroid,asteroidImg, asteroidsGroup
var spacecraft, spacecraftImg
var alien, alienImg
var laser
var count = 0
var score = 0
var aliensGroup
var lasersGroup
var laserShot
var gameover
var heart, heart2, heart3, heartImg, heart2Img, heart3Img
function preload() {
  groundImg = loadImage("bg.jpg")
  spacecraftImg = loadImage("spacecraft.png")
  alienImg = loadImage("ufo.png")
  laserShot = loadSound("lasershot.mp3")
  asteroidImg = loadImage("asteroid.png")
  heartImg = loadImage("1heart.png")
  heart2Img = loadImage("2heart.png")
  heart3Img = loadImage("3hearts.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(0, 300, windowWidth, windowHeight)
  ground.scale = 2.5
  ground.addImage("space", groundImg)
 
  spacecraft = createSprite(100, 300, 20, 20)
  spacecraft.addImage("spacecraft", spacecraftImg)
  spacecraft.scale = 0.4

  aliensGroup = new Group()
  lasersGroup = new Group()
  asteroidsGroup = new Group()
 

}

function draw() {
  background(30);

  if (ground.x < 750) {
    ground.x = ground.width / 2
  }
  ground.velocityX = -6

  //CONTROLLS
  if (keyDown("up")) {
    spacecraft.y -= 5
  }

  if (keyDown("down")) {
    spacecraft.y += 5
  }
  if (keyDown("space")) {
    laser = createSprite(spacecraft.x, spacecraft.y, 40, 6)
    laser.velocityX = 4
    laser.shapeColor = "red"
    lasersGroup.add(laser)
    laserShot.play()
  }



  if (lasersGroup.isTouching(aliensGroup)) {
    for (var a = 0; a < aliensGroup.length; a++) {
      if(aliensGroup[a].isTouching(lasersGroup)){
        aliensGroup[a].destroy()
      }
    }
    lasersGroup.destroyEach()
    score = score + 5
  }


  

  



  spawnAliens()
  spawnAsteroids()
  life()
  drawSprites()

  fill("white")
  textSize(50)
  text("SCORE : " + score, 150, 100)

}


function spawnAliens() {

  if (frameCount % 60 == 0) {
    alien = createSprite(width, Math.round(random(100, height - 100)), 20, 20)
    alien.addImage("alien", alienImg)
    alien.scale = 0.4
    alien.velocityX = -5
    alien.lifetime = width / 5
    aliensGroup.add(alien)
  }
}

function spawnAsteroids(){

if(frameCount % 100 == 0){
  asteroid = createSprite(width, Math.round(random(100, height-100)),20,20)
  asteroid.addImage("asteroid", asteroidImg)
    asteroid.scale = 0.2
    asteroid.velocityX = -5
    asteroid.lifetime = width / 5
    asteroidsGroup.add(asteroid)
}
}
 function life(){
 
  heart3 = createSprite(windowWidth/2, 100, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.2
  heart3.visible = false

  heart2 = createSprite(windowWidth/2, 100, 20, 20)
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.2
  heart2.visible = false

  heart = createSprite(windowWidth/2, 100, 20, 20)
  heart.addImage("heart", heartImg)
  heart.scale = 0.2
  heart.visible = false
  

 

  if (lasersGroup.isTouching(asteroidsGroup)) {
    for (var d = 0; d < asteroidsGroup.length; d++) {
      if(asteroidsGroup[d].isTouching(lasersGroup)){
        asteroidsGroup[d].destroy()
      }
    }
    lasersGroup.destroyEach()
    count = count + 1
    if(count === 0){
  
      heart3.visible = true
      heart2.visible = false
      heart.visible = false
    }
    else if(count === 1){
  
      heart3.visible = false
      heart2.visible = true
      heart.visible = false
    }
    
    else if(count == 2){
    
      heart3.visible = false
      heart2.visible = false
      heart.visible = true
    }
    
    else if(count == 3){
    
    
      fill("white")
      textSize(50)
      gameover = text("GAME OVER ", windowWidth/2, windowHeight/2)
    
    
    }
    console.log(count)
  }

 }
