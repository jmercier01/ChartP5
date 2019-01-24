//let angle = 0;
//let angFin = 45;
let easing = 0.01;

function setup() {
	createCanvas(windowWidth,windowHeight);
	pie1 = new Pie(width/2,height/2,300,0,78,0.1,color("#A3E2F7"));
	pie2 = new Pie(width/3,height/3,200,0,34,0.1,color("#709CAB"));
	pie3 = new Pie(width/5,height/2,200,0,48,0.1,color("#2B6478"));
	
}

function draw() {
	background("#3E565E");
	pie1.run();
	pie2.run();
	pie3.run();
	
}

function Pie(x,y,radius,angleDep,percent,easing,color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.angleDep = angleDep;
	this.percent = percent;
	this.color = color;
	
	// change percent in radians
	let angFin = (360*this.percent)/100;
	
	this.easing = easing;
	let angle = 0;
	
	
	this.update = function(){
		angle += (angFin-angle)*this.easing;
	}
	this.display = function(){
		ellipseMode(CENTER);
		fill(this.color);
		noStroke();	
		arc(this.x,this.y,this.radius,this.radius,this.angleDep,radians(angle));
		
		
	}
	this.run = function(){
		this.update();
		this.display();
	}
}