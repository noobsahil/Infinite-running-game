var PLAYER, PLAYERImage, PLAYERCollider;

var back111, back111Image;

var ob, ob1, ob2, ob3;
var obImg, ob1Img, ob2Img, ob3Img;

var Ob5;

var invisibleground;

var Play = 0;
var End = 0;
var score = 0;
var gameState = Play;

function preload() {
  PLAYERImage = loadAnimation(
    "PLAYER1.png",
    "PLAYER2.png",
    "PLAYER3.png",
    "PLAYER4.png",
    "PLAYER5.png",
    "PLAYER6.png",
    "PLAYER8.png",
    "PLAYER9.png"
  );

  back111Image = loadImage("back111.jpg", back111Image);

  ob1Img = loadImage("ob1.png");
  ob2Img = loadImage("ob2.png");
  ob3Img = loadImage("ob3.png");
}

function setup() {
  invisibleground;
  createCanvas(500, 500);

  back111 = createSprite(300, 230, 21, 10);
  back111.scale = 3.5;
  back111.addImage("back111", back111Image);
  back111.velocityX = -4;
  back111.x = back111.width / 2;

  obGroup = new Group();

  invisibleground = createSprite(500, height - 40, 1000, 20);
  invisibleground.visible = false;

  // PLAYER.setCollider("rectangle", 0, 5);

  PLAYER = createSprite(60, 400, 20, 20);
  PLAYER.addAnimation("PLAYER", PLAYERImage);
  // PLAYER.scale = 5;

  PLAYER.debug = true;
  PLAYER.setCollider("rectangle", 0,3,50,50);
}

function draw() {
  background("back");

  if (back111.x < 0) {
    back111.x = back111.width / 2;
  }
  text(mouseX + " " + mouseY, mouseX, mouseY);

  text("Score:  " + score, width / 4 + 100, height / 2 + 15);
  fill("Black");
  text(
    "HighestScore :" + localStorage["HighestScore"],
    width / 4 - 100,
    height / 2 + 15
  );

  textStyle("Bold");
  if (gameState === Play) {
    // Gameover.visible = false;
    // restart.visible = false;

    score = score + Math.round(frameCount % 5 === 0);

    if (keyDown("space") && PLAYER.y >= height - 140) {
      PLAYER.velocityY = -6;
    } else if (touches.length > 0 && PLAYER.y >= height - 140) {
      PLAYER.velocityY = -6;
    }

    PLAYER.velocityY = PLAYER.velocityY + 0.5;
    back111.velocityX = -(4 + score / 100);
    if (back111.x < 0) {
      back111.x = back111.width / 2;
    }

    if (PLAYER.isTouching(obGroup)) {
      gameState = End;
      
    }

    if (score > 0 && score % 100 === 0) {
      
    }
  } else if (gameState === End) {
    back111.velocityX = 0;
    PLAYER.velocityX = 0;
    

    obGroup.setLifetimeEach(30);
  }
  PLAYER.collide(invisibleground);
  spawnOb5();
  drawSprites();
}

function spawnOb5() {
  if (frameCount % 80 === 0) {
    ob1 = createSprite(360, 430, 20, 20);
    ob1.velocityX = -(6 + score / 100);
    obGroup.add(ob1)
    ob1.depth = PLAYER.depth;
    PLAYER.depth += 1;
    // Ob1.scale = 0.7;

    var rand = Math.round(random(1, 3));

    switch (rand) {
      case 1:
        ob1.addImage(ob1Img);
        break;
      case 2:
        ob1.addImage(ob2Img);
        break;
      case 3:
        ob1.addImage(ob3Img);
        break;
      default:
        break;
    }
  }
}
