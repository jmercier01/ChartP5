// Chart animated for p5.js
// Jerome Mercier
// https://www.jmercier.fr


let easing = 0.1;


function setup() {
	createCanvas(windowWidth,windowHeight);
	
	
	pie1 = new Pie(
		150, // Width and height of the pie
		createVector(width/4,height/5), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[20,20,20,10,10,20], //Valeur in PERCENT
		color(201,86,80) //Color in HSB (IMPORTANT)
	);
	
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

class Pie{
	constructor(radius,position,easing,vals,col){
		//Facilities
		angleMode(DEGREES);
		colorMode(HSB);

		//Variables you want
		this.radius = radius;
		this.easing = easing;
		this.vals = vals;
		this.col = col;
		this.position = position;
		
		//Variables program wants
		this.degrees = []; //Values in degrees for each valu in percent
		this.labels = []; //Values
		let h,s,b;
		this.posLabels = []; // Table of the position of each labels
		this.angles = vals; 
		this.nbSet = vals.length;
		
		//Set-up
		this.percnt2deg();
		this.parseColor();
		this.label();
	}
	
	
	percnt2deg(){
		//Transform percent values in degrees and calculate the position of each label
		for(var i=0;i<this.nbSet;i++){
			if(i>=1){
				this.degrees[i] = this.degrees[i-1]+(360*this.vals[i])/100;	
				this.posLabels[i]=(((360*this.vals[i])/100)/2)+(this.degrees[i-1]);
			} else {
				this.posLabels[i]=((360*this.vals[i])/100)/2;
				this.degrees[i] =  (360*this.vals[i])/100;	
			}
		}
	}
	
	parseColor(){
		this.h = hue(this.col);
		this.s = saturation(this.col);
		this.b = brightness(this.col);
	}
	
	
	
	label(){
		for(var i=0;i<this.nbSet;i++){
			this.labels[i]=this.vals[i];
		}
	}
	
	update(){
		// EASING 
		for(var i=0;i<this.nbSet;i++){
			this.angles[i] += (this.degrees[i]-this.angles[i])*easing;
		}
	}
	
	
	display(){
		textFont("staatliches");
		textAlign(CENTER,CENTER);
		ellipseMode(CENTER);
		push();
		translate(this.position.x,this.position.y);

		this.update();
		
		for(var i=this.nbSet;i>=0;i--){	
			var x = cos(this.posLabels[i])*this.radius/1.5;	
			var y = sin(this.posLabels[i])*this.radius/1.5;
			
			fill(this.h,this.s,this.b-((this.b/this.nbSet)*i));
			arc(0,0,this.radius,this.radius,0,this.angles[i]);
			textSize(this.radius/5);
			text(this.labels[i],x,y);			
		}
		pop();
	}


	
	run(){
		this.display();
	}
}