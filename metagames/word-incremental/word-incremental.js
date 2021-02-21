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

var foundWordsList = [];
var foundWordsListTwo = [];

var ctime, num;
var letter = "";
var buttonDom;
var mlState = 0;
var tempWord = "";
//var wordArray = ['ASK', 'TUCK', 'TICK', 'SICK', 'SIT', 'TASK', 'EAT', 'EATS', 'EAST', 'TICKS', 'SEAT', 'STUCK', 'STICK', 'TUSK', 'SEA', 'CAT', 'CATS',
//'CAST', 'CASK', 'CUT', 'CUTS', 'CUTE', 'CUTIE', 'TAKE', 'SUCK', 'ICE', 'SITE', 'CAKE', 'CAKES', 'CIST', 'CASE', 'CASTE', 'TIC', 'SACK', 'SAKE', 'SECT',
//'ACT', 'CUE', 'CUES', 'SET', 'SUE', 'KITE', 'KITES', 'AT', 'ATE', 'SAT', 'TIE', 'TIES', 'ACE', 'ACES', 'CAUSE', 'KIT', 'KITS', 'TEA', 'CASKET'];
//var wordArrayTwo = ['ERA', 'ERAS', 'EAR', 'EARS', 'EARN', 'EARNS', 'EAT', 'EATS', 'AIR', 'ATE', 'ANT', 'ANTS', 'ART', 'ARTS', 'ARE', 'ARSE', 'AT',
//'SIN', 'TAR', 'TAN', 'TEST', 'TENT', 'TEAR', 'TEN', 'NET', 'NEST', 'STAT', 'SIT', 'SITE', 'SAT', 'EAST', 'SEAT', 'SEA', 'SEAR', 'SENT', 'START',
//'STAR', 'STIR', 'TIRE', 'TIRES', 'TIN', 'TINT', 'SET', 'RANT', 'RAN', 'RATE', 'SIR', 'RITE', 'RITES', 'TIE', 'TIES', 'TIER', 'NEAT', 'NEAR', 'NETS',
//'TEARS', 'TENTS', 'TIERS', 'RANTS', 'STATE', 'STARE', 'REST', 'RAT', 'RATS', 'RENT', 'RENTS', 'RINSE', 'RATES', 'SIREN', 'TASER', 'NITE',
//'STERN', 'STEAR'];
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
var mlHelp = document.getElementById('mlHelp');
var mlInfo = document.getElementById('mlInfo');
var foundWordsDiv = document.getElementById('foundWordsDiv');
var foundWordsDivTwo = document.getElementById('foundWordsDivTwo');

//import wordlist from 'wordlist-english';
//var englishWords = wordlist['english'];

//Hiding elements that aren't needed in beginning
tabWithStats.style.display = 'none';
moreOne.style.display = 'none';
mlInfo.style.display = 'none';

//Lets try auto-loading your progress
loadProgress();

//Listeners and other code go here
//window.addEventListener("click", wordIncrease);
buttonLetters.addEventListener("click", tabLetters);
buttonStats.addEventListener("click", tabStats);
buttonAutocorrect.addEventListener("click", buyAutocorrect);
buttonMoreLetters.addEventListener("click", buyLetters);
mlHelp.addEventListener("click", toggleMLInfo);

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
			tempWord = gameData.stringVariable;
			gameData.foundWord = index;
		}
	})
	//Check if the word is on foundWordsList yet
	foundWordsList.forEach(function(item, index) {
		if(gameData.stringVariable === item){
			//console.log(item);
			//If yes, reset foundWord back to -1
			gameData.foundWord = -1;
		}
	})
	
	//Remove found word from array and call wordIncrease() function
	if (gameData.foundWord > -1) {
		wordArray.splice(gameData.foundWord, 1);
		//Add word to foundWordsList and foundWordsDiv
		foundWordsList.push(tempWord);
		foundWordsDiv.textContent = foundWordsList;
		//Reset the variable and call wordIncrease function
		gameData.foundWord = -1;
		console.log(foundWordsList);
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
	wordArray.forEach(function(item, index, array) {
		if(gameData.stringVariableTwo === item){
			//console.log(item);
			tempWord = gameData.stringVariableTwo;
			gameData.foundWord = index;
		}
	})
	//Check if the word is on foundWordsListTwo yet
	foundWordsListTwo.forEach(function(item, index) {
		if(gameData.stringVariableTwo === item){
			//console.log(item);
			//If yes, reset foundWord back to -1
			gameData.foundWord = -1;
		}
	})
	
	//Remove found word from array and call wordIncrease() function
	if (gameData.foundWord > -1) {
		wordArray.splice(gameData.foundWord, 1);
		//Add word to foundWordsListTwo and foundWordsDivTwo
		foundWordsListTwo.push(tempWord);
		foundWordsDivTwo.textContent = foundWordsListTwo;
		//Reset the variable and call wordIncrease function
		gameData.foundWord = -1;
		console.log(foundWordsListTwo);
		wordIncrease();
	}
}

function wordIncrease() {
		if (gameData.currentWords > 100) {
			gameData.currentSentences++;
			sentenceSpan.textContent = gameData.currentSentences;
			gameData.currentWords = 0;
			wordSpan.textContent = 1;
			//document.body.style.backgroundSize = "1%";
			document.body.style.backgroundSize = gameData.currentSentences + "%";
		}
		gameData.currentWords++;
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

function toggleMLInfo() {
	mlHelp.setAttribute("aria-pressed", !mlState);
	if(mlState) {
		mlInfo.style.display = 'none';
		mlState = 0;
	} else {
		mlInfo.style.display = 'inline';
		mlState = 1;
	}
}

function buyAutocorrect() {
	gameData.currentAutocorrect++;
	autocorrectCount.textContent = gameData.currentAutocorrect;
	if (30*(gameData.currentAutocorrect + 1) < 100) {
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
	//Unlocks the letter groups
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

//Save functionality
	document.querySelector("#load").addEventListener('click', function(evt) {
        loadProgress();
    });
    
    document.querySelector("#save").addEventListener('click', function(evt) {
        if (typeof(Storage) !== "undefined") {
 	 			// Code for localStorage/sessionStorage.
				document.querySelector("#load").style.display = 'inline';
				saveProgress();
			} else {
 	 			// Sorry! No Web Storage support..
     	 alert('Sorry! No Web Storage support..');
			}
    });
	
	function saveProgress() {
    	// Store
	    localStorage.setItem("builder18-wordIncremental", JSON.stringify(gameData));
		localStorage.setItem("builder18-foundWordsList", JSON.stringify(foundWordsList));
		localStorage.setItem("builder18-foundWordsListTwo", JSON.stringify(foundWordsListTwo));
	    //console.log(JSON.parse(localStorage.getItem("builder18-wordIncremental")));
    }
    
    function loadProgress() {
    	// Retrieve
      try {
				gameData = JSON.parse(localStorage.getItem("builder18-wordIncremental"));
      } catch (ex) {
				console.log('Exception while loading game, please report this.', ex);
      }
	  
	  if (gameData === null || gameData.length === 0)
		{
			// gameData is null or []
			// reset variables
		
			gameData = {
				currentWords: 1,
				currentSentences: 0,
				stringVariable: "",
				stringVariableTwo: "",
				foundWord: -1,
				currentAutocorrect: 0,
				currentLetterUpgrades: 0,
			};
		}
		
		// if gameData has variables, interact with them
		sentenceSpan.textContent = gameData.currentSentences;
		wordSpan.textContent = gameData.currentWords;
		// reset words data
		clearString();
		//gameData.foundWord = -1;
		// upgrades
		autocorrectCount.textContent = gameData.currentAutocorrect;
		if (30*(gameData.currentAutocorrect + 1) < 100) {
			buttonAutocorrect.textContent = 30*(gameData.currentAutocorrect + 1) + " words";
		} else {
			buttonAutocorrect.textContent = Math.round(30*(gameData.currentAutocorrect + 1)/100) + " sentences";
		}
      
		if (gameData.currentLetterUpgrades > 0) {
			buttonMoreLetters.textContent = 20*(gameData.currentLetterUpgrades + 1) + " words";
			moreOne.style.display = 'block';
		}
		
		//Now load foundWordsList and write it into foundWordsDiv
		try {
				foundWordsList = JSON.parse(localStorage.getItem("builder18-foundWordsList"));
      } catch (ex) {
				console.log('Exception while loading game, please report this.', ex);
      }
	  
	  if (foundWordsList === null || foundWordsList.length === 0)
		{
			// gameData is null or []
			// reset variables
		
			foundWordsList = [];
		}
		
		foundWordsDiv.textContent = foundWordsList;
		
		try {
				foundWordsListTwo = JSON.parse(localStorage.getItem("builder18-foundWordsListTwo"));
      } catch (ex) {
				console.log('Exception while loading game, please report this.', ex);
      }
	  
	  if (foundWordsListTwo === null || foundWordsListTwo.length === 0)
		{
			// gameData is null or []
			// reset variables
		
			foundWordsListTwo = [];
		}
		
		foundWordsDivTwo.textContent = foundWordsListTwo;
	}
	  
//Autosave
function autoSave() {
	saveProgress();
	
	//autoSave runs every 30 seconds
	setTimeout(autoSave, 30000);
}

autoSave();
  
//Game loop
function gameLoop() {
	//Autocorrect production goes here
	 gameData.currentWords += gameData.currentAutocorrect;
	 
	 if (gameData.currentWords > 99) {
			gameData.currentSentences++;
			sentenceSpan.textContent = gameData.currentSentences;
			gameData.currentWords = 1;
			wordSpan.textContent = 1;
			document.body.style.backgroundSize = gameData.currentSentences + "%";
			//document.body.style.backgroundSize = "1%";
		}
		wordSpan.textContent = gameData.currentWords;
	
	//gameLoop runs every five seconds
	setTimeout(gameLoop, 5000);
}

gameLoop();
//})();