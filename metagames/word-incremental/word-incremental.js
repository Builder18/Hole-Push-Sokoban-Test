//(function() {
	//Trying strict mode, remove if required
	//"use strict"
//Variables that can change go here
var gameData = {
	currentWords: 1,
	currentSentences: 0,
	stringVariable: "",
	foundWord: -1,
};

var ctime, num;
var letter = "";
var buttonDom;
var wordArray = ['ASK', 'TUCK', 'TICK', 'SICK', 'SIT', 'TASK', 'EAT', 'EATS', 'EAST', 'TICKS', 'SEAT', 'STUCK', 'STICK', 'TUSK', 'SEA', 'CAT', 'CATS',
'CAST', 'CASK', 'CUT', 'CUTS', 'CUTE', 'CUTIE', 'TAKE', 'SUCK', 'ICE', 'SITE'];
var item, index;


//Elements go here
var sentenceSpan = document.getElementById('sentenceSpan');
var currentString = document.getElementById('currentString');

//Hiding elements that aren't needed in beginning
//m4Span.style.display = 'none';
//m5Span.style.display = 'none';

//Listeners and other code go here
//window.addEventListener("click", wordIncrease);

//Main functionality of buttons goes here

function letterClicked(letter, buttonDom) {
	//console.log(buttonDom);
	gameData.stringVariable += letter;
	letter = "";
	currentString.textContent = gameData.stringVariable;
	buttonDom.disabled = true;
	//I guess comparing stringVariable into word list/arrays would work?
	wordArray.forEach(function(item, index, array) {
		if(gameData.stringVariable === item){
			console.log(item);
			gameData.foundWord = index;
		}
	})
	//Remove found word from array and call wordIncrease() function
	if (gameData.foundWord > -1) {
		wordArray.splice(gameData.foundWord, 1);
		gameData.foundWord = -1;
		console.log(wordArray);
		wordIncrease();
	}
}

function wordIncrease() {
		if (gameData.currentWords > 100) {
			gameData.currentSentences++;
			sentenceSpan.textContent = gameData.currentSentences;
			gameData.currentWords = 0;
			document.body.style.backgroundSize = "1%";
		}
		gameData.currentWords++;
		document.body.style.backgroundSize = gameData.currentWords + "%";
		clearString();
}

function clearString() {
	let temp = document.getElementsByClassName("letter");
	let i;
	for (i = 0; i < temp.length; i++) {
		temp[i].disabled = false;
	}
	gameData.stringVariable = "";
	currentString.textContent = "";
}

function fancyTimeFormat(ctime)
{   
    // Hours, minutes and seconds
    var hrs = ~~(ctime / 3600);
    var mins = ~~((ctime % 3600) / 60);
    var secs = ~~ctime % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  
//Game loop
function gameLoop() {
	//Progress bar for m1
	
	/*if (width >= 100) {
		 gameData.m1IncreaseVar++;
		 m1Idle.textContent = gameData.m1IncreaseVar;
		 gameData.currentProgress++;
		 bigProgress.style.width = gameData.currentProgress + "%";
		 m1Bar.style.width = "1%";
		 width = 1;
   } else {
		 width += gameData.m1IncreaseVar;
		 m1Bar.style.width = width + "%";
    }*/
	 
	 
	
	//gameLoop runs every second
	setTimeout(gameLoop, 1000);
}

gameLoop();
//})();

/*function testFunction(testVariable){
	letterClicked(testVariable);
}*/