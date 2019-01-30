class Bar{
	constructor(bsWidth,hMax,position,easing,vals,legends,color){
		colorMode(HSB);
		this.position = position;
		this.bsWidth = bsWidth;
		this.col = color;
		console.log(this.col);
		this.nbSet = vals.length;
		this.labels = []; //Values
		this.legends = legends;
		
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
		console.log("h="+this.h+" -s="+this.s+" -b="+this.b);
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
	
	wlegends(i,posx){ //Write legends at the right place
		text(this.legends[i],posx,20);
	}
	
	display(){
		textFont("staatliches");
		textAlign(CENTER,CENTER);
		push();
		translate(this.position.x-(this.bsWidth/2),this.position.y);
		
		this.update();
		
		for(var i=0;i<this.nbSet;i++){
			let bright = this.b-((this.b/this.nbSet)*i);
			fill(this.h,this.s,bright);
//			fill(this.h,this.s,this.b);
			rect((i*this.bWidth)+(this.shiftx*i)/2,0,this.bWidth,-this.barheights[i]);	
			textSize(this.bWidth/3.5);
			//text(this.labels[i],((i*this.bWidth)+(this.shiftx*i))+(this.bWidth/2)-(this.shiftx*i/2),20);
			let posx = ((i*this.bWidth)+(this.shiftx*i))+(this.bWidth/2)-(this.shiftx*i/2);
			//Labels
			text(this.labels[i],posx,-this.barheights[i]-20);
			//Legends
			this.wlegends(i,posx);
		}
		pop();
	}
}