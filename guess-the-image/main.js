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
var timeout;
var showButton = document.createElement("BUTTON");
var loadButton = document.createElement("BUTTON");
var centerDiv;

var save = function(){
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		localStorage.setItem("gti-correctanswers", JSON.stringify(correct));
		localStorage.setItem("gti-incorrectanswers", JSON.stringify(incorrect));
		localStorage.setItem("gti-answeredcount", JSON.stringify(answered));
	} else {
		// Sorry! No Web Storage support..
		console.log("Your browser doesn't support Web Storage.");
	};
};

var load = function(){
	// Retrieve
	console.log("loading...")
      try {
				correct = JSON.parse(localStorage.getItem("gti-correctanswers"));
      } catch (ex) {
      	console.log('Exception while loading game, please report this.', ex);
      }
		
		incorrect = JSON.parse(localStorage.getItem("gti-incorrectanswers"));
		answered = JSON.parse(localStorage.getItem("gti-answeredcount"));
		
		next();
};

var start = function(){
	document.getElementById("startButton").style.display = "none";
	
	centerDiv = document.getElementById("centerMe");
	
	loadButton.innerHTML = "Load";
	centerDiv.appendChild(loadButton);
	
	
	img.src = "easyone.png";
	centerDiv.appendChild(img);                      // Append IMG to <body>
	
	showButton.innerHTML = "Show next image";                   // Insert text
	centerDiv.appendChild(showButton);
	showButton.style.display = "none";
	
	centerDiv.appendChild(document.createElement("br")); // Linebreaks
	centerDiv.appendChild(document.createElement("br"));
	
	btn1.innerHTML = "A";                   // Insert text
	btn1.id ='btn1';
	centerDiv.appendChild(btn1);               // Append <button> to <body>
	btn1.addEventListener("click", function(){
		//input = b1;
		//score();
	});
	btn2.innerHTML = "B";                   // Insert text
	btn2.id ='btn2';
	centerDiv.appendChild(btn2);               // Append <button> to <body>
	btn2.addEventListener("click", function(){
		//input = b2;
		//score();
	});
	btn3.innerHTML = "C";                   // Insert text
	btn3.id ='btn3';
	centerDiv.appendChild(btn3);               // Append <button> to <body>
	btn3.addEventListener("click", function(){
		//input = b3;
		//score();
	});
	btn4.innerHTML = "D";                   // Insert text
	btn4.id ='btn4';
	centerDiv.appendChild(btn4);               // Append <button> to <body>
	btn4.addEventListener("click", function(){
		//input = b4;
		//score();
	});
	btn5.innerHTML = "E";                   // Insert text
	btn5.id ='btn5';
	centerDiv.appendChild(btn5);               // Append <button> to <body>
	btn5.addEventListener("click", function(){
		//input = b5;
		//score();
	});
	centerDiv.appendChild(document.createElement("br")); // Linebreaks
	centerDiv.appendChild(document.createElement("br"));
	//hide start button and show other ones here
	//question = "Image goes here!";
	answer = "Pacman";
	b1 = "Pacman";
	buttonsCount = 1;
	buttons();
	timeout = setTimeout(alertFunc, 3000);
	//ask();
};

/*var ask = function(){ 
	input = prompt(question);
	score();
};*/

function alertFunc() {
  img.style.display = "none";
};

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
  img.style.display = "none";
  clearTimeout(timeout);
  score();
});

btn2.addEventListener("click", function(){
  input = b2;
  img.style.display = "none";
  clearTimeout(timeout);
  score();
});

btn3.addEventListener("click", function(){
  input = b3;
  img.style.display = "none";
  clearTimeout(timeout);
  score();
});

btn4.addEventListener("click", function(){
  input = b4;
  img.style.display = "none";
  clearTimeout(timeout);
  score();
});

btn5.addEventListener("click", function(){
  input = b5;
  img.style.display = "none";
  clearTimeout(timeout);
  score();
});

showButton.addEventListener("click", function(){
	timeout = setTimeout(alertFunc, 3000);
	img.style.display = "inline";
	showButton.style.display = "none";
});

loadButton.addEventListener("click", function(){
	load();
});

var score = function(){ 
	if(input == answer){ 
		correct = correct+1;
		alert("correct");
	}else{
		incorrect = incorrect+1;
		alert("incorrect");
	}
	loadfix();
};

//Use function to select next question.

var loadfix = function(){
	answered++;
	
	save();
	
	next();
};

var next = function(){
	console.log(answered);
	
	showButton.style.display = "inline";
	
	if(answered == 1){
		img.src = "Screenshot_7.png"; //change to another image with this function
		answer = "Smurf";
		b1 = "Something frozen";
		b2 = "Blue alien";
		b3 = "Smurf";
		b4 = "Blue M&M";
        	b5 = "Squidward";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 2){
		img.src = "Screenshot_9.png"; //change to another image with this function
		answer = "Spiderman";
		b1 = "Spiderman";
		b2 = "Spittermen";
		b3 = "Speederman";
		b4 = "Deadpool";
        	b5 = "Ant-man";
		buttonsCount = 5;
		buttons();
	}
	
	if(answered == 3){
		img.src = "Screenshot_8.png"; //change to another image with this function
		answer = "Donald Duck";
		b1 = "Donald Trump";
		b2 = "Donald Duck";
		b3 = "Mr.Quack";
        	b4 = "Ducky Mcduck";
        	b5 = "Daffy Duck";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 4){
		img.src = "Screenshot_10.png"; //change to another image with this function
		answer = "Kermit the frog";
		b1 = "Kermit the frog";
		b2 = "One eyed monster from Monster high";
		b3 = "Texture colored green and white";
		b4 = "Plant monster";
        	b5 = "Pickle Rick";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 5){
		img.src = "Screenshot_11.png"; //change to another image with this function
		answer = "Troll face";
		b1 = "Sans from Undertale";
		b2 = "Bendy and the ink machine";
		b3 = "Black-white character";
		b4 = "Troll face";
		b5 = "Snoopy";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 6){
		img.src = "Screenshot_12.png"; //change to another image with this function
		answer = "Sanic";
		b1 = "Sanic";
		b2 = "Sonic";
		b3 = "Baby Shark";
        	b4 = "Bruce (The shark from Finding Nemo)";
        	b5 = "Dory";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 7){
		img.src = "Screenshot_13.png"; //change to another image with this function
		answer = "Dat boi";
		b1 = "Dat boi";
		b2 = "Green Dino";
		b3 = "A clown riding a Unicycle";
        	b4 = "Rex (From Toy Story)";
        	b5 = "The good dinosaur";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 8){
		img.src = "Screenshot_14.png"; //change to another image with this function
		answer = "Hot dog from Snapchat";
		b1 = "candy orange headphones person";
		b2 = "Hot dog from Snapchat";
		b3 = "Homer Simpson dressed as a hot dog";
        	b4 = "Sausage man";
        	b5 = "The lego hot dog man";
        	buttonsCount = 5;
		buttons();
	}
	
	if(answered == 9){
		img.src = "Screenshot_15.png"; //change to another image with this function
		answer = "Peppa pig";
		b1 = "Gary";
		b2 = "Peppa pig";
		b3 = "Pink Panther";
      		b4 = "Kirby";
      		b5 = "Piglet";
      		buttonsCount = 5;
		buttons();
	}
	
	if(answered == 10){
      img.src = "shrek.png"; //change to another image with this function
      answer = "Shrek";
      b1 = "Shrek";
      b2 = "Green stick";
      b3 = "The Grinch";
      b4 = "Oscar (The Dustbin Muppet)";
      b5 = "Dispy (The green teletubby)";
      buttonsCount = 5;
      buttons();
    }
	 
	 if(answered == 11){
        img.src = "pikachu.png"; //change to another image with this function
        answer = "Pikachu";
        b1 = "Iron man";
        b2 = "Bart Simpson";
        b3 = "Pikachu";
        b4 = "Giant chicken from Family guy";
        b5 = "Charmander";
        buttonsCount = 5;
        buttons();
    }
 
     if(answered == 12){
        img.src = "pepe-the-frog.png"; //change to another image with this function
        answer = "Pepe the frog";
        b1 = "Illuminati";
        b2 = "Pepe the frog";
        b3 = "Hulk";
        b4 = "Super Saiyan green";
        b5 = "Shrek";
        buttonsCount = 5;
        buttons();
    }
 
     if(answered == 13){
        img.src = "donald-trump.png"; //change to another image with this function
        answer = "Donald Trump";
        b1 = "Bill Clinton";
        b2 = "Theresa May";
        b3 = "Boris Johnson";
        b4 = "Hillary Clinton";
        b5 = "Donald Trump";
        buttonsCount = 5;
        buttons();
	  }
	  
	  if(answered == 14){
		  img.src = "Mr.Burns.png"; //change to another image with this function
        	answer = "Mr.Burns";
        	b1 = "Cheese boi";
        	b2 = "Cheese man";
        	b3 = "Spongebob's dad";
        	b4 = "Mr.Burns";
        	b5 = "Yellow planet";
        	buttonsCount = 5;
        	buttons();
	  }
	  
	  if(answered == 15){
		  img.src = "Mrs Potato head.png"; //change to another image with this function
        	answer = "Mrs. Potato head";
        	b1 = "Flower boi";
        	b2 = "Mrs. Potato head";
        	b3 = "Field of flowers";
        	b4 = "Toy flower";
        	b5 = "Flower hat";
        	buttonsCount = 5;
        	buttons();
	  }
	
	if(answered == 16){
		alert("Well done, you got " + correct + " out of 15");
		btn1.style.display = "none";
		btn2.style.display = "none";
		btn3.style.display = "none";
		btn4.style.display = "none";
		btn5.style.display = "none";
		console.log("Game won!");
	}
}
