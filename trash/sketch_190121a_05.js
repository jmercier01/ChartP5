let easing = 0.1;


function setup() {
	createCanvas(windowWidth,windowHeight);
	textFont("staatliches");	
	colorMode(HSB);
	pie1 = new Pie(createVector(width/2,height/2),easing,[30,30,30],color(2,76,70));

}

function draw() {
	background("#BCE8F7");
	noStroke();
	pie1.run();
}

function Pie(position,easing,vals,col){
	angleMode(DEGREES);
	
	this.easing = easing;
	
	this.vals = vals;
	let percents = [];
	this.col = col;
	let h,s,b;
	
	this.convert = function(){
		
		//convert percent
		for(var i=0;i<vals.length;i++){
			if(i>=1){
				percents[i] = percents[i-1]+(360*this.vals[i])/100;	
			} else {
				percents[i] =  (360*this.vals[i])/100;	
			}
		}
		//converts color
		this.h = hue(this.col);
		this.s = saturation(this.col);
		this.b = brightness(this.col);
	}
	
	this.convert();
	
	this.angles = vals;
	
	this.run = function(){
		for(var i=0;i<vals.length;i++){
			this.angles[i] += (percents[i]-this.angles[i])*easing;
			
			fill(this.h,this.s,this.b-((this.b/vals.length)*i));
			if(i>=1){
				
				arc(position.x,position.y,180,180,this.angles[i-1],this.angles[i]);	
			} else {
				
				arc(position.x,position.y,180,180,0,this.angles[i]);
			}
			
		}
	}
}