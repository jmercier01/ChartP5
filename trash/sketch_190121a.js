//let angle = 0;
//let angFin = 45;
let easing = 0.01;

function setup() {
	createCanvas(windowWidth,windowHeight);
	//background("#3E565E");
	pie1 = new Pie(width/2,height/2,300,0,100,0.1);
}

function draw() {
	background("#3E565E");

	pie1.update();
	pie1.display();
	
	
	//	ellipseMode(CENTER);
	//	fill("#39E1DD");
	//	noStroke();	
	//	angle += (angFin-angle)*easing;
	//	arc(100,100,300,300,0,radians(angle));
}

function Pie(x,y,radius,angleDep,percent,easing){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.angleDep = angleDep;
	this.percent = percent;
	let angFin = (360*this.percent)/100;
	console.log("anglefin = "+angFin);
	
	this.easing = easing;
	let angle = 0;
	//this.angle = TWO_PI*(this.angleFin/100);
	
	this.update = function(){
		angle += (angFin-angle)*this.easing;
		//console.log("anglefin = "+angFin);
		//console.log("angle = "+angle);
	}
	this.display = function(){
		ellipseMode(CENTER);
		fill("#39E1DD");
		noStroke();	
		arc(this.x,this.y,this.radius,this.radius,this.angleDep,radians(angle));
		
		
	}
}