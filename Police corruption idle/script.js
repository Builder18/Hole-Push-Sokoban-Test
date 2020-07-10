(function() {
	//Trying strict mode, remove if required
	"use strict"
//Variables that can change go here
var gameData = {
	currentCorruption: 1,
	corruptionIncrease: 1,
	fullCorruption: 0,
	increaseIncrease: 2,
	currentPolicia: 0,
};

//Elements go here
var txtCorruption = document.getElementById('corruption');
var fcorruption = document.getElementById('fullCorruption');
var btnFasterCorruption = document.getElementById('fasterCorruption');
var divFaster = document.getElementById('divFaster');
var policiaButton = document.getElementById('policiaButton');

//Hiding elements that aren't needed in beginning
//sandUpgrades.style.display = 'none';

btnFasterCorruption.addEventListener("click", fasterCorruption);

function fasterCorruption() {
	if (gameData.fullCorruption < 2) return;
	gameData.increaseIncrease += 1;
	gameData.fullCorruption -= 2;
	fcorruption.textContent = thousands_separators(gameData.fullCorruption);
	if (gameData.increaseIncrease > 99) {
		divFaster.style.display = 'none';
	}
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