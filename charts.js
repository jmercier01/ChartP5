// Chart animated for p5.js
// Jerome Mercier
// https://www.jmercier.fr


let easing = 0.05;


function setup() {
	createCanvas(windowWidth,2000);
	
	bar1 = new Bar(
		300,200, // Width and height of the bar
		createVector(width/2,600), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[200,300,200,56,78,23], //Values
		color(298,81,70) //Color in HSB (IMPORTANT)
	);
	
	pie1 = new Pie(
		150, // Width and height of the pie
		createVector(width/2,200), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[20,20,20,10,10,20], //Values in PERCENT
		color(201,86,80) //Color in HSB (IMPORTANT)
	);
}

function draw() {
	background("#BCE8F7");
	noStroke();
	bar1.display();
	pie1.display();
}

class Bar{
	constructor(bsWidth,hMax,position,easing,vals,color){
		colorMode(HSB);
		this.position = position;
		this.bsWidth = bsWidth;
		this.col = color;
		this.nbSet = vals.length;
		this.labels = []; //Values
		this.posLabels = []; // Table of the position of each labels
		this.vals = vals;
		this.hMax = hMax;
		this.shiftx = 5;
		this.barheights=[];
		let h,s,b;	
		this.bWidth = 0;
		this.parseColor();
		this.calcWidths(this.bsWidth);
		this.initBar();
		this.label();
		this.mapVals();
		
	}
	initBar(){
		for(var i=0;i<this.nbSet;i++){
			this.barheights[i] = 0;
		}
	}
	parseColor(){
		this.h = hue(this.col);
		this.s = saturation(this.col);
		this.b = brightness(this.col);
	}
	
	calcWidths(bsWidth){
		this.bWidth = this.bsWidth/this.nbSet;
		return this.bWidth;
		
	}
	mapVals(){
		let maxVal = max(this.vals);
		for(var i=0;i<this.nbSet;i++){
		 this.vals[i] = map(this.vals[i],0,maxVal,0,this.hMax);	
		}
	}
	
	label(){
		for(var i=0;i<this.nbSet;i++){
			this.labels[i]=round(this.vals[i]);
		}
	}
	
	update(){
		// EASING 
		for(var i=0;i<this.nbSet;i++){
			this.barheights[i] += (this.vals[i]-this.barheights[i])*easing;
		}
	}
	
	display(){
		textFont("staatliches");
		textAlign(CENTER,CENTER);
		push();
		translate(this.position.x-(this.bsWidth/2),this.position.y);
		this.update();
		
		for(var i=0;i<this.nbSet;i++){
			fill(this.h,this.s,this.b-((this.b/this.nbSet)*i));
			rect((i*this.bWidth)+(this.shiftx*i)/2,0,this.bWidth,-this.barheights[i]);	
			textSize(this.bWidth/3.5);
			//text(this.labels[i],((i*this.bWidth)+(this.shiftx*i))+(this.bWidth/2)-(this.shiftx*i/2),20);
			text(this.labels[i],((i*this.bWidth)+(this.shiftx*i))+(this.bWidth/2)-(this.shiftx*i/2),-this.barheights[i]-20);
		}
		pop();
	}
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
}