(function() {
	//Trying strict mode, remove if required
	"use strict"
//Variables that can change go here
var gameData = {
	currentData: 1,
	chanceOne: 50,
	chanceZero: 50,
	costOne: 1,
	costZero: 1,
};

var ctime, num;
var binaryString = "";

//Elements go here
var dataSpan = document.getElementById('dataSpan');
var oneButton = document.getElementById('oneButton');
var zeroButton = document.getElementById('zeroButton');
var binaryDisplay = document.getElementById('binaryDisplay');
var oneSpan = document.getElementById('oneSpan');
var zeroSpan = document.getElementById('zeroSpan');
/*
var m1Span = document.getElementById('m1Progress');
var m2Span = document.getElementById('m2Progress');
var m1Idle = document.getElementById('m1Idle');
var m2Idle = document.getElementById('m2Idle');
*/

//Hiding elements that aren't needed in beginning
//m4Span.style.display = 'none';
//m5Span.style.display = 'none';

//Listeners and other code go here
oneButton.addEventListener("click", oneIncrease);
zeroButton.addEventListener("click", zeroIncrease);

//Main functionality of buttons goes here

function oneIncrease() {
	var random_boolean = (Math.random() * 100) < gameData.chanceOne;
	if (random_boolean) {
		gameData.currentData++;
		dataSpan.textContent = thousands_separators(gameData.currentData);
		
		binaryString = binaryString + 1;
		binaryDisplay.textContent = binaryString;
		if (binaryString.length > 49) {
			//console.log(binaryString.length);
			gameData.currentData += 50;
			dataSpan.textContent = thousands_separators(gameData.currentData);
			
			binaryString = "Binary reached to 50, reseting!";
			binaryDisplay.textContent = binaryString;
			binaryString = "";
		}
	}
	//console.log(random_boolean);
}

function zeroIncrease() {
	var random_boolean = (Math.random() * 100) < gameData.chanceZero;
	if (random_boolean) {
		gameData.currentData++;
		dataSpan.textContent = thousands_separators(gameData.currentData);
		
		binaryString = binaryString + 0;
		binaryDisplay.textContent = binaryString;
		if (binaryString.length > 49) {
			//console.log(binaryString.length);
			gameData.currentData += 50;
			dataSpan.textContent = thousands_separators(gameData.currentData);
			
			binaryString = "Binary reached to 50, reseting!";
			binaryDisplay.textContent = binaryString;
			binaryString = "";
		}
	}
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
	//Idle income for chanceOne
	
	if (gameData.chanceOne < 100) {
	if (gameData.currentData > gameData.costOne) {
		 gameData.chanceOne++;
		 oneSpan.textContent = gameData.chanceOne;
		 
		 gameData.currentData -= gameData.costOne;
		 dataSpan.textContent = gameData.currentData;
		 
		 //Increase cost of better chance with 1
		 gameData.costOne++;
   }}
	 
	//Once chanceOne is working, repeat for chanceZero
	 
	if (gameData.chanceZero < 100) {
		if (gameData.currentData > gameData.costZero) {
			gameData.chanceZero++;
			zeroSpan.textContent = gameData.chanceZero;
			
			gameData.currentData -= gameData.costZero;
			dataSpan.textContent = gameData.currentData;
			
			//Increase cost of better chance with 1
			gameData.costZero++;
			
			//console.log(gameData.chanceZero);
		}
	}
	
	//gameLoop runs every second
	setTimeout(gameLoop, 1000);
}

gameLoop();
})();