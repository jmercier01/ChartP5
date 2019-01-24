// Chart animated for p5.js
// Jerome Mercier
// https://www.jmercier.fr


let easing = 0.1;


function setup() {
	createCanvas(windowWidth,windowHeight);
		
	
	
	pie1 = new Pie(150,createVector(width/4,height/5),easing,[20,20,20,10,10,20],color(201,86,80));
	pie2 = new Pie(300,createVector(width/2,height/2),easing/3,[64,20,16],color(58,86,80));
	pie3 = new Pie(150,createVector(width-(width/4),height-(height/5)),easing/2,[33,33,44],color(298,81,70));
	pie4 = new Pie(100,createVector(width-(width/4),height/5),easing/2,[23,34,3,30,5,5],color(46,76,100));
	pie5 = new Pie(100,createVector(width/4,height-(height/5)),easing/2,[33,33,44],color(34,81,100));
	

}

function draw() {
	background("#BCE8F7");
	noStroke();
	
	pie1.run();
	pie2.run();
	pie3.run();
	pie4.run();
	pie5.run();

}

function Pie(radius,position,easing,vals,col){
	angleMode(DEGREES);
	colorMode(HSB);
	
	this.radius = radius;
	this.easing = easing;
	this.vals = vals;
	this.col = col;
	
	let percents = [];
	let labels = [];
	let h,s,b;
	let posLabels = [];
	this.angles = vals;
	var segment = vals.length;
	
	this.percnt2deg = function(){
		for(var i=0;i<segment;i++){
			if(i>=1){
				percents[i] = percents[i-1]+(360*this.vals[i])/100;	
				posLabels[i]=(((360*this.vals[i])/100)/2)+(percents[i-1]);
			} else {
				posLabels[i]=((360*this.vals[i])/100)/2;
				percents[i] =  (360*this.vals[i])/100;	
			}
		}
	}
	
	this.parseColor = function(){	
		this.h = hue(this.col);
		this.s = saturation(this.col);
		this.b = brightness(this.col);
	}
	
	
	
	this.label = function(){
		console.log(this.radius);
		textAlign(CENTER,CENTER);
		
		for(var i=0;i<segment;i++){
			labels[i]=vals[i];
		}
	}
	
	this.update = function(){
		for(var i=0;i<segment;i++){
			this.angles[i] += (percents[i]-this.angles[i])*easing;
		}
	}
	
	
	this.display = function(){
		textFont("staatliches");
		ellipseMode(CENTER);
		push();
		translate(position.x,position.y);
		this.update();
		
		for(var i=segment;i>=0;i--){	
			var x = cos(posLabels[i])*this.radius/1.5;	
			var y = sin(posLabels[i])*this.radius/1.5;
			
			fill(this.h,this.s,this.b-((this.b/segment)*i));
			arc(0,0,this.radius,this.radius,0,this.angles[i]);
			textSize(this.radius/5);
			text(labels[i],x,y);			
		}
		pop();
	}

	this.percnt2deg();
	this.parseColor();
	this.label();
	
	this.run = function(){
		this.display();
	}
}