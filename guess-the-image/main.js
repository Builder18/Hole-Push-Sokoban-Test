var correct = 0;
var incorrect = 0;
var answered = 0;
var question = "none";
var input = "none";
var b1 = "none";
var b2 = "none";
var b3 = "none";
var b4 = "none";
var b5 = "none";
var img = document.createElement("IMG");
var buttonsCount = 1; // How many buttons.
var btn1 = document.createElement("BUTTON");   // Create a <button> element
var btn2 = document.createElement("BUTTON");
var btn3 = document.createElement("BUTTON");
var btn4 = document.createElement("BUTTON");
var btn5 = document.createElement("BUTTON");
var answer = "none";

var start = function(){
	document.getElementById("startButton").style.display = "none";
	
	img.src = "easyone.png";
	document.body.appendChild(img);                      // Append IMG to <body>
	
	document.body.appendChild(document.createElement("br")); // Linebreaks
	document.body.appendChild(document.createElement("br"));
	
	btn1.innerHTML = "A";                   // Insert text
	btn1.id ='btn1';
	document.body.appendChild(btn1);               // Append <button> to <body>
	btn1.addEventListener("click", function(){
		//input = b1;
		//score();
	});
	btn2.innerHTML = "B";                   // Insert text
	btn2.id ='btn2';
	document.body.appendChild(btn2);               // Append <button> to <body>
	btn2.addEventListener("click", function(){
		//input = b2;
		//score();
	});
	btn3.innerHTML = "C";                   // Insert text
	btn3.id ='btn3';
	document.body.appendChild(btn3);               // Append <button> to <body>
	btn3.addEventListener("click", function(){
		//input = b3;
		//score();
	});
	btn4.innerHTML = "D";                   // Insert text
	btn4.id ='btn4';
	document.body.appendChild(btn4);               // Append <button> to <body>
	btn4.addEventListener("click", function(){
		//input = b4;
		//score();
	});
	btn5.innerHTML = "E";                   // Insert text
	btn5.id ='btn5';
	document.body.appendChild(btn5);               // Append <button> to <body>
	btn5.addEventListener("click", function(){
		//input = b5;
		//score();
	});
	//hide start button and show other ones here
	//question = "Image goes here!";
	answer = "Pacman";
	b1 = "Pacman";
	buttonsCount = 1;
	buttons();
	//ask();
}

/*var ask = function(){ 
	input = prompt(question);
	score();
};*/

var buttons = function(){
	if(buttonsCount == 1){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "none";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttonsCount == 2){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "inline";
		btn2.innerHTML = "B: " + b2;
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttonsCount == 3){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "inline";
		btn2.innerHTML = "B: " + b2;
		btn3.style.display = "inline";
		btn3.innerHTML = "C: " + b3;
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttonsCount == 4){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "inline";
		btn2.innerHTML = "B: " + b2;
		btn3.style.display = "inline";
		btn3.innerHTML = "C: " + b3;
		btn4.style.display = "inline";
		btn4.innerHTML = "D: " + b4;
		btn5.style.display = "none";
	}
	if(buttonsCount == 5){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "inline";
		btn2.innerHTML = "B: " + b2;
		btn3.style.display = "inline";
		btn3.innerHTML = "C: " + b3;
		btn4.style.display = "inline";
		btn4.innerHTML = "D: " + b4;
		btn5.style.display = "inline";
		btn5.innerHTML = "E: " + b5;
	}
	
	//console.log("buttons hidden/shown!");
}

//Replace that with button functions to get user input.

//Add variable for each button to place that variable into input.

btn1.addEventListener("click", function(){
  input = b1;
  score();
});

btn2.addEventListener("click", function(){
  input = b2;
  score();
});

btn3.addEventListener("click", function(){
  input = b3;
  score();
});

btn4.addEventListener("click", function(){
  input = b4;
  score();
});

btn5.addEventListener("click", function(){
  input = b5;
  score();
});

var score = function(){ 
	if(input == answer){ 
		correct = correct+1;
		alert("correct");
	}else{
		incorrect = incorrect+1;
		alert("incorrect");
	}
	next();
};

//Use function to select next question.

var next = function(){
	answered++;
	
	console.log(answered);
	
	if(answered == 1){
		//img.src = "easyone.png"; //change to another image with this function
		//question = "Image goes here!";
		answer = "Answer goes here!";
		b1 = "Answer goes here!";
		b2 = "answer goes here!";
		b3 = "Answer goes here";
		buttonsCount = 3;
		buttons();
	}
	
	if(answered == 2){
		//img.src = "easyone.png"; //change to another image with this function
		//question = "Image goes here!";
		answer = "Answer goes here!";
		b1 = "Answer goes here!";
		b2 = "answer goes here!";
		b3 = "Answer goes here";
		b4 = "Cake is an lie!";
		b5 = "Not true!";
		buttonsCount = 5;
		buttons();
	}
	
	if(answered == 3){
		//img.src = "easyone.png"; //change to another image with this function
		//question = "Image goes here!";
		answer = "Answer goes here!";
		b1 = "Answer goes here!";
		b2 = "answer goes here!";
		b3 = "Answer goes here";
		buttonsCount = 3;
		buttons();
	}
	
	if(answered == 4){
		alert("Well done, you got " + correct + " out of 4");
		btn1.style.display = "none";
		btn2.style.display = "none";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
		console.log("Game won!");
	}
}

