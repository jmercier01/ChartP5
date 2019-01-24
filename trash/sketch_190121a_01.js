
//let angFin = 45;
let easing = 0.01;


function setup() {
	createCanvas(windowWidth,windowHeight);
	pie1 = new Pie(width/2,height/2,300,0,34,0.1,color("#5F97AB"));
	pie2 = new Pie(width/3,height/3,200,0,95,0.1,color("#918D51"));
	pie3 = new Pie(width/5,height/2,200,0,48,0.1,color("#6B5158"));
	textFont("staatliches");
}

function draw() {
	background("#3E565E");
	pie1.run();
	pie2.run();
	pie3.run();
//	
}

class Pie{
	constructor(x,y,radius,angleDep,percent,easing,color){
		
		this.x = x;
		this.y = y;
		this.easing = easing;
		this.radius = radius;
		this.percent = percent;
		this.color = color;
		this.angleDep = angleDep;
		
		
		this.angle = this.angleDep; 
		// change percent in radians
		this.angFin = (360*this.percent)/100;

		
			
	}
	
	update(){
		this.angle += (this.angFin-this.angle)*this.easing;
	}
	label(){
		textSize(42);
		fill(255);
	}
	run(){
		this.update();
		this.display();
	}
	display(){
		ellipseMode(CENTER); 
		fill(70);
		ellipse(this.x,this.y,this.radius,this.radius);
		fill(this.color);
		noStroke();	
		arc(this.x,this.y,this.radius,this.radius,this.angleDep,radians(this.angle));
		this.label();
		text(this.percent+"%",this.x+10,this.y-10);
	}
	
	
}
