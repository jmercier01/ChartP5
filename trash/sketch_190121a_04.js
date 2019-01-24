let easing = 0.1;


function setup() {
	createCanvas(windowWidth,windowHeight);
	textFont("staatliches");	
	pie1 = new Pie(createVector(width/2,height/2),easing,0,[1,5,2,6,9,23,6,31,12]);

}

function draw() {
	background("#BCE8F7");
	noStroke();
	pie1.run();
}

function Pie(position,easing,angle,aray){
	angleMode(DEGREES);
	
	this.easing = easing;
	this.aray = aray;
	this.angles = aray;
	let percents = [];
	
	for(var i=0;i<aray.length;i++){
		if(i>=1){
			percents[i] = percents[i-1]+(360*this.aray[i])/100;	
		} else {
			percents[i] =  (360*this.aray[i])/100;	
		}
	}
	
	this.run = function(){
		for(var i=0;i<aray.length;i++){
			this.angles[i] += (percents[i]-this.angles[i])*easing;
			fill(255-(i*50),70);
			arc(position.x,position.y,180,180,0,this.angles[i]);
		}
	}
}

	
	