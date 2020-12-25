//(function() {
	//Trying strict mode, remove if required
	//"use strict"
//Variables that can change go here
var gameData = {
	currentWords: 1,
	currentSentences: 0,
	stringVariable: "",
	stringVariableTwo: "",
	foundWord: -1,
	currentAutocorrect: 0,
	currentLetterUpgrades: 0,
};

var ctime, num;
var letter = "";
var buttonDom;
var wordArray = ['ASK', 'TUCK', 'TICK', 'SICK', 'SIT', 'TASK', 'EAT', 'EATS', 'EAST', 'TICKS', 'SEAT', 'STUCK', 'STICK', 'TUSK', 'SEA', 'CAT', 'CATS',
'CAST', 'CASK', 'CUT', 'CUTS', 'CUTE', 'CUTIE', 'TAKE', 'SUCK', 'ICE', 'SITE', 'CAKE', 'CAKES', 'CIST', 'CASE', 'CASTE', 'TIC', 'SACK', 'SAKE', 'SECT',
'ACT', 'CUE', 'CUES', 'SET', 'SUE', 'KITE', 'KITES', 'AT', 'ATE', 'SAT', 'TIE', 'TIES', 'ACE', 'ACES'];
var wordArrayTwo = ['ERA', 'ERAS', 'EAR', 'EARS', 'EARN', 'EARNS', 'EAT', 'EATS', 'AIR', 'ATE', 'ANT', 'ANTS', 'ART', 'ARTS', 'ARE', 'ARSE', 'AT',
'SIN', 'TAR', 'TAN', 'TEST', 'TENT', 'TEAR', 'TEN', 'NET', 'NEST', 'STAT', 'SIT', 'SITE', 'SAT', 'EAST', 'SEAT', 'SEA', 'SEAR', 'SENT', 'START',
'STAR', 'STIR', 'TIRE', 'TIRES', 'TIN', 'TINT', 'SET', 'RANT', 'RAN', 'RATE', 'SIR', 'RITE', 'RITES', 'TIE', 'TIES', 'TIER', 'NEAT', 'NEAR', 'NETS',
'TEARS', 'TENTS', 'TIERS', 'RANTS', 'STATE', 'STARE', 'REST', 'RAT', 'RATS', 'RENT', 'RENTS', 'RINSE', 'RATES', 'SIREN', 'TASER', 'NITE',
'STERN', 'STEAR'];
var item, index;


//Elements go here
var sentenceSpan = document.getElementById('sentenceSpan');
var currentString = document.getElementById('currentString');
var currentStringTwo = document.getElementById('currentStringTwo');
var buttonLetters = document.getElementById('buttonLetters');
var buttonStats = document.getElementById('buttonStats');
var tabWithLetters = document.getElementById('tabWithLetters');
var tabWithStats = document.getElementById('tabWithStats');
var wordSpan = document.getElementById('wordSpan');
var autocorrectCount = document.getElementById('autocorrectCount');
var buttonAutocorrect = document.getElementById('buttonAutocorrect');
var buttonMoreLetters = document.getElementById('buttonMoreLetters');
var moreOne = document.getElementById('moreOne');

//Hiding elements that aren't needed in beginning
tabWithStats.style.display = 'none';
moreOne.style.display = 'none';

//Listeners and other code go here
//window.addEventListener("click", wordIncrease);
buttonLetters.addEventListener("click", tabLetters);
buttonStats.addEventListener("click", tabStats);
buttonAutocorrect.addEventListener("click", buyAutocorrect);
buttonMoreLetters.addEventListener("click", buyLetters);

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
			//console.log(item);
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

function letterClickedTwo(letter, buttonDom) {
	//console.log(buttonDom);
	gameData.stringVariableTwo += letter;
	letter = "";
	currentStringTwo.textContent = gameData.stringVariableTwo;
	buttonDom.disabled = true;
	//I guess comparing stringVariable into word list/arrays would work?
	wordArrayTwo.forEach(function(item, index, array) {
		if(gameData.stringVariableTwo === item){
			//console.log(item);
			gameData.foundWord = index;
		}
	})
	//Remove found word from array and call wordIncrease() function
	if (gameData.foundWord > -1) {
		wordArrayTwo.splice(gameData.foundWord, 1);
		gameData.foundWord = -1;
		console.log(wordArrayTwo);
		wordIncrease();
	}
}

function wordIncrease() {
		if (gameData.currentWords > 100) {
			gameData.currentSentences++;
			sentenceSpan.textContent = gameData.currentSentences;
			gameData.currentWords = 0;
			wordSpan.textContent = 1;
			document.body.style.backgroundSize = "1%";
		}
		gameData.currentWords++;
		document.body.style.backgroundSize = gameData.currentWords + "%";
		wordSpan.textContent = gameData.currentWords;
		clearString();
}

function clearString() {
	let temp = document.getElementsByClassName("letter");
	let i;
	for (i = 0; i < temp.length; i++) {
		temp[i].disabled = false;
	}
	gameData.stringVariable = "";
	gameData.stringVariableTwo = "";
	currentString.textContent = "";
	currentStringTwo.textContent = "";
}

/*function fancyTimeFormat(ctime)
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
  }*/
  
function tabLetters() {
	tabWithLetters.style.display = 'block';
	tabWithStats.style.display = 'none';
}

function tabStats() {
	tabWithStats.style.display = 'block';
	tabWithLetters.style.display = 'none';
}

function buyAutocorrect() {
	gameData.currentAutocorrect++;
	autocorrectCount.textContent = gameData.currentAutocorrect;
	if (30*gameData.currentAutocorrect < 100) {
		//If not enough resources to buy, revert the changes and exit function
		if (30*gameData.currentAutocorrect > gameData.currentWords) {
			gameData.currentAutocorrect--;
			autocorrectCount.textContent = gameData.currentAutocorrect;
			return;
		}
		
		buttonAutocorrect.textContent = 30*(gameData.currentAutocorrect + 1) + " words";
		gameData.currentWords -= 30*gameData.currentAutocorrect;
		wordSpan.textContent = gameData.currentWords;
	} else {
		//If not enough resources to buy, revert the changes and exit function
		if (Math.round(30*gameData.currentAutocorrect/100) > gameData.currentSentences) {
			gameData.currentAutocorrect--;
			autocorrectCount.textContent = gameData.currentAutocorrect;
			return;
		}
		
		buttonAutocorrect.textContent = Math.round(30*(gameData.currentAutocorrect + 1)/100) + " sentences";
		gameData.currentSentences -= Math.round(30*gameData.currentAutocorrect/100);
		sentenceSpan.textContent = gameData.currentSentences;
		//console.log(Math.round(30*gameData.currentAutocorrect/100));
	}
}

function buyLetters() {
	if (20*(gameData.currentLetterUpgrades + 1) > gameData.currentWords) return;
	
	gameData.currentLetterUpgrades++;
	if (gameData.currentLetterUpgrades === 1) {
		moreOne.style.display = 'block';
		buttonMoreLetters.textContent = 20*(gameData.currentLetterUpgrades + 1) + " words";
		gameData.currentWords -= 20*gameData.currentLetterUpgrades;
		wordSpan.textContent = gameData.currentWords;
	}
	if (gameData.currentLetterUpgrades === 2) {
		
	}
	if (gameData.currentLetterUpgrades === 3) {
		
	}
	if (gameData.currentLetterUpgrades === 4) {
		
	}
}
  
//Game loop
function gameLoop() {
	//Autocorrect production goes here
	 gameData.currentWords += gameData.currentAutocorrect;
	 
	 if (gameData.currentWords > 99) {
			gameData.currentSentences++;
			sentenceSpan.textContent = gameData.currentSentences;
			gameData.currentWords = 1;
			wordSpan.textContent = 1;
			document.body.style.backgroundSize = "1%";
		}
		document.body.style.backgroundSize = gameData.currentWords + "%";
		wordSpan.textContent = gameData.currentWords;
	
	//gameLoop runs every five seconds
	setTimeout(gameLoop, 5000);
}

gameLoop();
//})();