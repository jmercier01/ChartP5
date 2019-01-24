var angle = 54;
var offset = 0;
var scalar = 100;
var speed = 0.05;

function setup() {
	createCanvas(200,200);
	background(204);
}

function draw() {
	push();
	translate(width/2,height/2);
	ellipseMode(CENTER);
	var x = cos(radians(angle))*scalar;	
	var y = sin(radians(angle))*scalar;	
	ellipse(x,y,40,40);
	pop();
	
}