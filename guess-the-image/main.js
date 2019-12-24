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
	document.body.appendChild(document.createElement("br")); // Linebreaks
	document.body.appendChild(document.createElement("br"));
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
	
	//img.width = 500;
	//img.height = 500;
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
		img.src = "Screenshot_7.png"; //change to another image with this function
		answer = "Smurf";
		b1 = "Something frozen";
		b2 = "Blue alien";
		b3 = "Smurf";
		buttonsCount = 3;
		buttons();
	}
	
	if(answered == 2){
		img.src = "Screenshot_9.png"; //change to another image with this function
		answer = "Spiderman";
		b1 = "Spiderman";
		b2 = "Spittermen";
		b3 = "Speederman";
		b4 = "Some kind of superhero?";
		b5 = "Next question, please!";
		buttonsCount = 5;
		buttons();
	}
	
	if(answered == 3){
		img.src = "Screenshot_8.png"; //change to another image with this function
		answer = "Donald Duck";
		b1 = "Donald Trump";
		b2 = "Donald Duck";
		buttonsCount = 2;
		buttons();
	}
	
	if(answered == 4){
		img.src = "Screenshot_10.png"; //change to another image with this function
		answer = "Kermit the frog";
		b1 = "Kermit the frog";
		b2 = "One eyed monster from Monster high";
		b3 = "Texture colored green and white";
		buttonsCount = 3;
		buttons();
	}
	
	if(answered == 5){
		img.src = "Screenshot_11.png"; //change to another image with this function
		answer = "Troll face";
		b1 = "Sans from Undertale";
		b2 = "Bendy and the ink machine";
		b3 = "Black-white character";
		b4 = "Troll face";
		buttonsCount = 4;
		buttons();
	}
	
	if(answered == 6){
		alert("Well done, you got " + correct + " out of 6");
		btn1.style.display = "none";
		btn2.style.display = "none";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
		console.log("Game won!");
	}
}

