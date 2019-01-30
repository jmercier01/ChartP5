// Chart animated for p5.js
// Jerome Mercier
// https://www.jmercier.fr


let easing = 0.05;


function setup() {
	colorMode(HSB);
	createCanvas(windowWidth,2000);
	
	line1 = new Line(
		300,200, // Width and height of the bar
		createVector(width/2,300), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[108,187,89,67,130,200], //Values
		[2014,2015,2016,2017,2018,2019],
		color(215,81,70) //Color in HSB (IMPORTANT)
		
	);
	
	bar1 = new Bar(
		300,200, // Width and height of the bar
		createVector(width/2,600), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[200,300,200,56,78,23], //Values
		[2014,2015,2016,2017,2018,2019],
		color(215,81,70) //Color in HSB (IMPORTANT)
		
	);
	
	pie1 = new Pie(
		200, // Width and height of the pie
		createVector(width/2,900), //Position of the pie
		easing, //value of the easing (0.1 => fast ; 0.001 => slow)
		[50,20,10,10,10], //Values in PERCENT
		["Robin","Cyborg","Starfire", "Raven","Changelin"], //legends
		color(215,81,70) //Color in HSB (IMPORTANT)
	);
}

function draw() {
	background("#BCE8F7");
	noStroke();
	line1.display();
	bar1.display();
	pie1.display();
}










