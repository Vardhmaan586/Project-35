var balloon;
var bg;

var balloon,balloonImage;

function preload(){
  bg = loadImage("Hot Air Ballon-01.png");
  balloonImage = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);

  balloon = createSprite(250,250,100,100);

  database = firebase.database();
    
  var balloonref = database.ref("balloon/position");

  balloonref.on("value",readBalloonPosition,showError);

  balloon.addAnimation("chbdcj",balloonImage);
  balloon.scale = 0.3;
}

function readBalloonPosition(data){
  position=data.val();
  balloon.x = position.x;
  balloon.y = position.y;

  console.log("x : "+position.x  +"y : "+position.y);
}

function showError(){
  console.log("there is an error while reading the data");
}

function draw() {
  background(bg);  
  
  

  stroke("white");
  textSize(15);
  fill("black")
  text("Use Arrows Key To Move Hot Air Balloon",5,20);

  
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
        balloon.scale = balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
        balloon.scale = balloon.scale+0.01;
    }

  drawSprites();

}

function writePosition(x,y){
  var databaseRef = database.ref("balloon/position");
  databaseRef.set({"x":position.x+x,"y":position.y+y});
}
