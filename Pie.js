class Pie{
	constructor(radius,position,easing,vals,legends,col){
		//Facilities
		angleMode(DEGREES);
		colorMode(HSB);

		//Variables you want
		this.radius = radius;
		this.easing = easing;
		this.vals = vals;
		this.col = col;
		this.position = position;
		this.legends = legends;
		
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
	
	wlegends(i){ //Write legends at the right place
		push();
		let shifty = this.radius/7;
		let wdthSqr = this.radius/10;
		translate(this.radius, i*shifty-((wdthSqr*this.nbSet+shifty)/2));
		rect(0,0,wdthSqr,wdthSqr);
		textAlign(LEFT,TOP);
		text(this.legends[i],wdthSqr+5,0);
		pop();
	}
	
	
	display(){
		textFont("staatliches");
		textAlign(CENTER,CENTER);
		ellipseMode(CENTER);
		push();
		translate(this.position.x,this.position.y);
		this.update();
		
		for(var i=this.nbSet-1;i>=0;i--){	
			var x = cos(this.posLabels[i])*this.radius/1.5;	
			var y = sin(this.posLabels[i])*this.radius/1.5;
			
			fill(this.h,this.s,this.b-((this.b/this.nbSet)*i));
			arc(0,0,this.radius,this.radius,0,this.angles[i]);
			
			textSize(this.radius/8);
			text(this.labels[i]+"%",x,y);
			
			// legends
			this.wlegends(i);
		}
		
		pop();
//		square(30, 20, 55);
	}
}