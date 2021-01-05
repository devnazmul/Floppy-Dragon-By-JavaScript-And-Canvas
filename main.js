const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const scoreSection = document.getElementById('s');

canvas.width = 400;
canvas.height = 550;

var bgWidth = 1920*(550/1080);
var bgHeight = 1080*(550/1080);
var pillarWidth;
var pillarHeight;

var score = 0;
var player;

var bgSkyX = 0;
var bgHillX = 0;
var bgSiliconX = 0;
var bgFloorX = 0;
//var bgCattasX = 0;
var bgY = 0;
var gameOverIs;

var pillarX;
var pillarY;
 //the with and height of our spritesheet
 var spriteWidth = 573; 
 var spriteHeight = 644; 
 //we are having two rows and 8 cols in the current sprite sheet
 var rows = 4; 
 var cols = 3; 
 //because all the sprites are of equal width and height 
 var width = spriteWidth/cols; 
 //Same for the height we divided the height with number of rows 
 var height = spriteHeight/rows;  
 //Each row contains 8 frame and at start we will display the first frame (assuming the index from 0)
 var curFrame = 0;  
 //The total frame is 8 
 var frameCount = 3;  
 //x and y coordinates to render the sprite 
 var x;
 var y; 
 //x and y coordinates of the canvas to get the single frame 
 var srcX=10; 
 var srcY=166; 
 //Speed of the movement 
 var speed = .001; 
let bgH = 550/980;

function init(){
	upPillar.src = 'assets/upPillar.png'
	downPillar.src = 'assets/downPillar.png'
	pillarWidth = 80/1.5;
	pillarHeight = 400/1.5;
	pillarX = 200;
	pillarY = 0;
	player = new Image();
	player.src = "assets/player.png";
	x=50;
	y=innerHeight/2; 
}
function sound(a){
	let audio = new Audio(a);
	audio.play();
}

function updateFrame(){
	 //Updating the frame index 
	 curFrame = ++curFrame % frameCount; 
	 //Calculating the x coordinate for spritesheet 
	 srcX = curFrame * width; 
	}
	addEventListener('touchstart',function playerUp (){
		if(y > 15){
			y-=40;
		}
	});

	function updatePlayer (){
		y+=.009;
}


var bgSky = new Image();
var bgHill = new Image();
var bgSilicon = new Image();
var upPillar = new Image();
var downPillar = new Image();
var bgFloor = new Image();



bgSky.src = 'assets/1.png'
bgHill.src = 'assets/2.png'
bgSilicon.src = 'assets/3.png'

bgFloor.src = 'assets/5.png'

let rand = null;
let rand2 = null;




let animationId;
function draw(){
	animationId = requestAnimationFrame(draw)
	ctx.clearRect (0,0,innerWidth,innerHeight)

	bgHillX-=.001;
	if(bgHillX<0-bgWidth){
		bgHillX=bgHillX+bgWidth;
	}
	bgSiliconX-=.01;
	if(bgSiliconX < 0-bgWidth){
		bgSiliconX = bgSiliconX+bgWidth;
	}
	
	pillarX-=.02;
	if(pillarX<0-pillarWidth){
		sound('assets/point.mp3')
		score+=1
		pillarX=pillarX+450;
		rand = Math.ceil(Math.random()*(180-10)+10)
	}
	
	bgFloorX-=.02;
	if(bgFloorX<0-bgWidth){
		bgFloorX=bgFloorX+bgWidth;
	}
	
	ctx.drawImage(bgSky,bgSkyX,bgY,bgWidth,bgHeight);
	ctx.drawImage(bgSky,bgSkyX+bgWidth,bgY,bgWidth,bgHeight);
	
	ctx.drawImage(bgHill,bgHillX,bgY,bgWidth,bgHeight);
	ctx.drawImage(bgHill,bgHillX+bgWidth,bgY,bgWidth,bgHeight);

	ctx.drawImage(bgSilicon,bgSiliconX,bgY,bgWidth,bgHeight);
	ctx.drawImage(bgSilicon,bgSiliconX+bgWidth,bgY,bgWidth,bgHeight);
	
	ctx.drawImage(upPillar,pillarX,bgY-rand,pillarWidth,pillarHeight);
	ctx.drawImage(downPillar,pillarX,bgY-rand+pillarHeight+150,pillarWidth,pillarHeight)
	
	ctx.drawImage(bgFloor,bgFloorX,bgY,bgWidth,bgHeight);
	ctx.drawImage(bgFloor,bgFloorX+bgWidth,bgY,bgWidth,bgHeight);
	//COLLUTION DETECTION...........
	if((x+width/2-15 >= pillarX) && (x+30 <= pillarX+pillarWidth) && ( (y+30 <= (bgY-rand+pillarHeight)) ||  ((y+height/2-20) >= (bgY-rand+pillarHeight+150)) ) || (y+height/2-20 >= canvas.height-44))
	{
		document.getElementById('gameOver').style.display='flex'
		cancelAnimationFrame(animationId)
		gameOverIs = true
		bgHillX+=.001;
		bgSiliconX+=.01;
		pillarX+=.02;
		bgFloorX+=.02;
	}
	updatePlayer();
	//Updating the frame 
	updateFrame();
	//Drawing the image
	ctx.drawImage(player,srcX,srcY,width,height,x,y,width/2,height/2);
	// document.getElementById('score').innerHTML= score;
	document.getElementById('score').innerHTML=score

}


function start(){
	document.getElementById('title').style.display='none'
	sound('assets/bgS.mp3')
	init()
	gameOverIs = false
	setInterval(draw,10)
}
function restart(){
	document.getElementById('gameOver').style.display='none'
	init()

	score=0;
}
if (gameOverIs == true) {
	sound('assets/gameOver.mp3')
}else{
	sound('assets/bgS.mp3')
}