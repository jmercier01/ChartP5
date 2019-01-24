
//let angFin = 45;
let easing = 0.01;


function setup() {
	createCanvas(windowWidth,windowHeight);
	textFont("staatliches");
	pie1 = new Pie(easing,0,[10,20,40,100]);
}

function draw() {
	background("#BCE8F7");
	noStroke();
	
	pie1.run();
	
}

function Pie(easing,angle,aray){
	angleMode(DEGREES);
	this.easing = easing;
	
	this.aray = aray;
	this.angles = aray;
	let percents = [];
	
	for(var i=0;i<aray.length;i++){
		percents[i] =  (360*this.aray[i])/100;
	}
	
	this.run = function(){
		for(var i=0;i<aray.length;i++){
	
			this.angles[i] += (percents[i]-this.angles[i])*easing;
			fill(0+(i*50),30);
			arc(400,200,180,180,0,this.angles[i]);
		}
	}
}

	
	