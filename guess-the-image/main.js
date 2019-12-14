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
var para;
var buttons = 1;
var btn1;
var btn2;
var btn3;
var btn4;
var btn5;
var answer = "none";

var start = function(){
	document.getElementById("startButton").style.display = "none";
	
	para = document.createElement("P");               // Create a <p> element
	para.innerText = "Image goes here";               // Insert text
	document.body.appendChild(para);                      // Append <p> to <body>
	
	document.body.appendChild(document.createElement("br")); // Linebreaks
	document.body.appendChild(document.createElement("br"));
	
	btn1 = document.createElement("BUTTON");   // Create a <button> element
	btn1.innerHTML = "A";                   // Insert text
	btn1.id ='btn1';
	document.body.appendChild(btn1);               // Append <button> to <body>
	btn1.addEventListener("click", function(){
		//input = b1;
		//score();
	});
	btn2 = document.createElement("BUTTON");   // Create a <button> element
	btn2.innerHTML = "B";                   // Insert text
	btn2.id ='btn2';
	document.body.appendChild(btn2);               // Append <button> to <body>
	btn2.addEventListener("click", function(){
		//input = b2;
		//score();
	});
	btn3 = document.createElement("BUTTON");   // Create a <button> element
	btn3.innerHTML = "C";                   // Insert text
	btn3.id ='btn3';
	document.body.appendChild(btn3);               // Append <button> to <body>
	btn3.addEventListener("click", function(){
		//input = b3;
		//score();
	});
	btn4 = document.createElement("BUTTON");   // Create a <button> element
	btn4.innerHTML = "D";                   // Insert text
	btn4.id ='btn4';
	document.body.appendChild(btn4);               // Append <button> to <body>
	btn4.addEventListener("click", function(){
		//input = b4;
		//score();
	});
	btn5 = document.createElement("BUTTON");   // Create a <button> element
	btn5.innerHTML = "E";                   // Insert text
	btn5.id ='btn5';
	document.body.appendChild(btn5);               // Append <button> to <body>
	btn5.addEventListener("click", function(){
		//input = b5;
		//score();
	});
	//hide start button and show other ones here
	question = "Image goes here!";
	answer = "Answer goes here!";
	b1 = "Answer goes here!";
	buttons = 1;
	buttons();
	//ask();
}

/*var ask = function(){ 
	input = prompt(question);
	score();
};*/

var buttons = function(){
	if(buttons = 1){
		btn1.innerHTML = "A: " + b1;
		btn2.style.display = "none";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttons = 2){
		btn2.style.display = "inline";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttons = 3){
		btn2.style.display = "inline";
		btn3.style.display = "inline";
		btn4.style.display = "none";
		btn5.style.display = "none";
	}
	if(buttons = 4){
		btn2.style.display = "inline";
		btn3.style.display = "inline";
		btn4.style.display = "inline";
		btn5.style.display = "none";
	}
	if(buttons = 5){
		btn2.style.display = "inline";
		btn3.style.display = "inline";
		btn4.style.display = "inline";
		btn5.style.display = "inline";
	}
}

//Replace that with button functions to get user input.

//Add variable for each button to place that variable into input.

btn1.addEventListener("click", function(){
  //input = b1;
  //score();
});

btn2.addEventListener("click", function(){
  //input = b2;
  //score();
});

btn3.addEventListener("click", function(){
  //input = b3;
  //score();
});

btn4.addEventListener("click", function(){
  //input = b4;
  //score();
});

btn5.addEventListener("click", function(){
  //input = b5;
  //score();
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
	
	if(answered = 1){
		question = "Image goes here!";
		answer = "Answer goes here!";
		b1 = "Answer goes here!";
		b2 = "answer goes here!";
		b3 = "Answer goes here";
		buttons = 3;
		buttons();
	}
	
	if(answered = 2){
		question = "Image goes here!";
		answer = "Answer goes here!";
	}
	
	if(answered = 3){
		question = "Image goes here!";
		answer = "Answer goes here!";
	}
	
	if(answered = 4){
		alert("Well done, you got " + correct + " out of 4");
	}
}

