class Line extends Bar{
	
	display(){
		
		textFont("staatliches");
		textAlign(CENTER,CENTER);
		push();
		translate(this.position.x-(this.bsWidth/2),this.position.y);
		
		this.update();
		
		for(var i=0;i<this.nbSet;i++){
			let bright = this.b-((this.b/this.nbSet)*i);
			fill(this.h,this.s,bright);
			let posx = ((i*this.bWidth)+(this.shiftx*i))+(this.bWidth/2)-(this.shiftx*i/2);
			
			
			ellipse(posx,-this.barheights[i],5,5);
			
			
			
			if(i>0){
				
				this.prevPosx = (((i-1)*this.bWidth)+(this.shiftx*(i-1)))+(this.bWidth/2)-(this.shiftx*(i-1)/2);
//				console.log(this.prevPosx,posx);
				stroke(0);
				line(this.prevPosx,-this.barheights[i-1],posx,-this.barheights[i]);
			   }
//			
			noStroke();
			fill(this.h,this.s,this.b,0.2);
			rect((i*this.bWidth)+(this.shiftx*i)/2,0,this.bWidth,-this.barheights[i]);	
			fill(this.h,this.s,bright);
			textSize(this.bWidth/3.5);
			
			//Labels
			text(this.labels[i],posx,-this.barheights[i]-20);
			//Legends
			this.wlegends(i,posx);
		}
		pop();
	}
}