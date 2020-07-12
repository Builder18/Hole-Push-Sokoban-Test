(function() {
	//Trying strict mode, remove if required
	"use strict"
//Variables that can change go here
var gameData = {
	currentCorruption: 1,
	corruptionIncrease: 1,
	fullCorruption: 0,
	increaseIncrease: 2,
	currentPolicia: 100,
};

var temp = 55;
var imageHeight = 55;

//Elements go here
var txtCorruption = document.getElementById('corruption');
var fcorruption = document.getElementById('fullCorruption');
var btnFasterCorruption = document.getElementById('fasterCorruption');
var divFaster = document.getElementById('divFaster');
var policiaButton = document.getElementById('policiaButton');
var policiaImage = document.getElementById('corrupt-badge');
var policiaBottom = document.getElementById('bottom-policia');

//Hiding elements that aren't needed in beginning
//sandUpgrades.style.display = 'none';

btnFasterCorruption.addEventListener("click", fasterCorruption);
policiaButton.addEventListener("click", policiaCorruption);

function fasterCorruption() {
	if (gameData.fullCorruption < 2) return;
	gameData.increaseIncrease += 1;
	gameData.fullCorruption -= 2;
	fcorruption.textContent = thousands_separators(gameData.fullCorruption);
	if (gameData.increaseIncrease > 99) {
		divFaster.style.display = 'none';
	}
}

function policiaCorruption() {
	if (gameData.fullCorruption < 10) return;
	//Calculate how many times we can get this.
	temp = Math.floor(gameData.fullCorruption / 10);
	//console.log(temp);
	gameData.currentPolicia -= 1*temp;
	gameData.fullCorruption -= 10*temp;
	console.log(gameData.currentPolicia);
	fcorruption.textContent = thousands_separators(gameData.fullCorruption);
	if (gameData.currentPolicia > 49) {
		imageHeight = Math.abs(50 - gameData.currentPolicia);
		//console.log(imageHeight);
		policiaBottom.style.height = imageHeight + "%";
	} else { if (gameData.currentPolicia > 0) {
		imageHeight = gameData.currentPolicia;
		//console.log(imageHeight);
		policiaImage.style.height = imageHeight + "%";
	} else {
		policiaImage.style.height = "50%";
		policiaBottom.style.height = "50%";
		alert('You win!');
	}}
}

//Utility function
function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  
//Game loop
function gameLoop() {
	gameData.currentCorruption += gameData.corruptionIncrease;
	if (gameData.currentCorruption > 99) {
		gameData.fullCorruption++;
		fcorruption.textContent = thousands_separators(gameData.fullCorruption);
		gameData.currentCorruption = 0;
		gameData.corruptionIncrease = 0;
	}
	txtCorruption.textContent = thousands_separators(gameData.currentCorruption);
	gameData.corruptionIncrease += gameData.increaseIncrease;
	//gameLoop runs every second
	setTimeout(gameLoop, 500);
}

gameLoop();
})();