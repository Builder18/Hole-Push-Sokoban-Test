
(function() {
	//Trying strict mode, remove if required
	"use strict"
//Variables that can change go here
var gameData = {
	currentTime: 10,
	currentSand: 0,
	hasSandUpgrade: 0,
	timeMultiplier: 1,
	gathererPrice: 11,
	currentSandGatherers: 0,
	currentHourglass: 0,
	hasTimeBender: 0,
	hasTimeManipulator: 0,
	hasTimeSacrifice: 0,
	timeBenderDelay: 3000,
	sacrificeProgress: 1,
	prestigesCount: 0,
	sacrificeSeconds: 60,
	currentMoney: 0
};

var benderTimeout;

//No need to save these variables
var ctime, num;
var i = 0;
var SandTimeout, TimeTimeout, SandGathererTimeout, HourglassTimeout, TimeBenderTimeout, TimeManipulatorTimeout, ActivateSacrificeTimeout;
var sandCost;

//Elements go here
var time = document.getElementById('time');
var btnSand = document.getElementById('btnSand');
var btnTime = document.getElementById('btnTime');
var sand = document.getElementById('sand');
var btnSandGatherer = document.getElementById('btnSandGatherer');
var sandUpgrades = document.getElementById('sandUpgrades');
var sandGatherers = document.getElementById('sandGatherers');
var gathererSpan = document.getElementById('gathererSpan');
var hourglassSpan = document.getElementById('hourglassSpan');
var btnHourglass = document.getElementById('btnHourglass');
var timebenderSpan = document.getElementById('timebenderSpan');
var btnTimeBender = document.getElementById('btnTimeBender');
var timemanipulatorSpan = document.getElementById('timemanipulatorSpan');
var btnTimeManipulator = document.getElementById('btnTimeManipulator');
var timesacrificeSpan = document.getElementById('timesacrificeSpan');
var btnActivateSacrifice = document.getElementById('btnActivateSacrifice');
var prestiges = document.getElementById('prestiges');
var prestigeUpgrades = document.getElementById('prestigeUpgrades');
var hourGlass = document.getElementById('hourGlass');
var moneyUnlocked = document.getElementById('moneyUnlocked');
var money = document.getElementById('money');


//Hiding elements that aren't needed in beginning
sandUpgrades.style.display = 'none';
hourglassSpan.style.display = 'none';
timebenderSpan.style.display = 'none';
timemanipulatorSpan.style.display = 'none';
timesacrificeSpan.style.display = 'none';
prestigeUpgrades.style.display = 'none';
moneyUnlocked.style.display = 'none';

//Listeners and other code go here
btnSand.addEventListener("mouseover", SandOver);
btnSand.addEventListener("mouseout", SandOut);
btnSand.addEventListener("click", SandIncrease);
//For gaining time
btnTime.addEventListener("mouseover", TimeOver);
btnTime.addEventListener("mouseout", TimeOut);
btnTime.addEventListener("click", TimeIncrease);
//Sand gatherers
btnSandGatherer.addEventListener("mouseover", SandGathererOver);
btnSandGatherer.addEventListener("mouseout", SandGathererOut);
btnSandGatherer.addEventListener("click", SandGatherer);
//Hourglass
btnHourglass.addEventListener("mouseover", HourglassOver);
btnHourglass.addEventListener("mouseout", HourglassOut);
btnHourglass.addEventListener("click", Hourglass);
//Time bender
btnTimeBender.addEventListener("mouseover", TimeBenderOver);
btnTimeBender.addEventListener("mouseout", TimeBenderOut);
btnTimeBender.addEventListener("click", TimeBender);
//Time manipulator
btnTimeManipulator.addEventListener("mouseover", TimeManipulatorOver);
btnTimeManipulator.addEventListener("mouseout", TimeManipulatorOut);
btnTimeManipulator.addEventListener("click", TimeManipulator);
//Time sacrifice
btnActivateSacrifice.addEventListener("mouseover", ActivateSacrificeOver);
btnActivateSacrifice.addEventListener("mouseout", ActivateSacrificeOut);
btnActivateSacrifice.addEventListener("click", ActivateSacrifice);

function SandOver() {
  SandTimeout = setInterval(SandIncrease, 1000);
}

function SandOut() {
  clearInterval(SandTimeout);
}

function TimeOver() {
  TimeTimeout = setInterval(TimeIncrease, 1000);
}

function TimeOut() {
  clearInterval(TimeTimeout);
}

function SandGathererOver() {
  SandGathererTimeout = setInterval(SandGatherer, 1000);
}

function SandGathererOut() {
  clearInterval(SandGathererTimeout);
}

function HourglassOver() {
  HourglassTimeout = setInterval(Hourglass, 1000);
}

function HourglassOut() {
  clearInterval(HourglassTimeout);
}

function TimeBenderOver() {
  TimeBenderTimeout = setInterval(TimeBender, 1000);
}

function TimeBenderOut() {
  clearInterval(TimeBenderTimeout);
}

function TimeManipulatorOver() {
  TimeManipulatorTimeout = setInterval(TimeManipulator, 1000);
}

function TimeManipulatorOut() {
  clearInterval(TimeManipulatorTimeout);
}

function ActivateSacrificeOver() {
  ActivateSacrificeTimeout = setInterval(ActivateSacrifice, 1000);
}

function ActivateSacrificeOut() {
  clearInterval(ActivateSacrificeTimeout);
}

//After timeout handlers, main functionality of buttons goes here

function SandIncrease() {
	gameData.currentSand++;
	sand.textContent = gameData.currentSand;
	if (gameData.currentSand === 11) {
		if (gameData.hasSandUpgrade === 0) gameData.hasSandUpgrade = 1;
		sandUpgrades.style.display = 'block';
	}
}

function TimeIncrease() {
	//Let's try with multiplier of 10 instead of 5 for sand
	if (gameData.currentSand < (10 * gameData.timeMultiplier)) return;
	//If we have enough sand, increase time with 5*timeMultiplier, decrease sand with 2*timeMultiplier and upgrade html for both of them.
	gameData.currentTime += 5 * gameData.timeMultiplier;
	time.textContent = 	fancyTimeFormat(gameData.currentTime);
	gameData.currentSand -= 10 * gameData.timeMultiplier;
	sand.textContent = thousands_separators(gameData.currentSand);
	//Increase timeMultiplier and change button text
	gameData.timeMultiplier += 2;
	btnTime.textContent = (10 * gameData.timeMultiplier) + " sand";
}

function SandGatherer() {
	if (gameData.currentSand < gameData.gathererPrice) return;
	//If enough sand, increase sand gatherers with 1, decrease sand with 11 (this doesn't increase)
	gameData.currentSandGatherers++;
	if (gameData.currentSandGatherers === 2) btnSand.style.display = 'none';
	if (gameData.currentSandGatherers === 50) {
		gameData.gathererPrice = 50;
		btnSandGatherer.textContent = 50 + " sand";
		hourglassSpan.style.display = 'inline';
		timebenderSpan.style.display = 'inline';
		if (gameData.hasSandUpgrade === 1) gameData.hasSandUpgrade = 2;
	}
	if (gameData.currentSandGatherers === 200) {
		gathererSpan.style.display = 'none';
	} 
	sandGatherers.textContent = gameData.currentSandGatherers;
	gameData.currentSand -= gameData.gathererPrice;
	sand.textContent = thousands_separators(gameData.currentSand);
}

function Hourglass() {
	if (gameData.currentSand < 900 * (gameData.currentHourglass + 1)) return;
	//If enough sand, increase sand gatherers with 1, decrease sand with 11 (this doesn't increase)
	gameData.currentHourglass++;
	hourGlass.textContent = gameData.currentHourglass;
	gameData.currentSand -= 900 * gameData.currentHourglass;
	sand.textContent = thousands_separators(gameData.currentSand);
	btnHourglass.textContent = 
	thousands_separators(900 * (gameData.currentHourglass + 1)) + " sand";
}

function TimeBender() {
	if (gameData.currentSand < 9999) return;
	//If enough sand, enable time bender and hide it...
	gameData.hasTimeBender = 1;
	timebenderSpan.style.display = 'none';
	timemanipulatorSpan.style.display = 'inline';
	timesacrificeSpan.style.display = 'block';
	if (gameData.hasSandUpgrade === 2) gameData.hasSandUpgrade = 3;
	//Reduce sand
	gameData.currentSand -= 9999;
	sand.textContent = gameData.currentSand;
	timeBenderLoop();
}

function TimeManipulator() {
	if (gameData.currentSand < 99999) return;
	//If enough sand, enable time manipulator and hide it...
	gameData.hasTimeManipulator = 1;
	timemanipulatorSpan.style.display = 'none';
		//timemanipulatorSpan.style.display = 'inline';
		//if (gameData.hasSandUpgrade === 2) gameData.hasSandUpgrade = 3;
	gameData.currentSand -= 99999;
	sand.textContent = gameData.currentSand;
	gameData.timeBenderDelay = 1500;
}

function ActivateSacrifice() {
	if (i === 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 500);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
		  gameData.sacrificeProgress = 1;
		  gameData.sacrificeSeconds += 60;
		  elem.style.width = "1%";
		  prestigeNow();
        i = 0;
      } else {
			if (gameData.currentTime < gameData.sacrificeSeconds) return;
			width++;
			gameData.sacrificeProgress = width;
			gameData.currentTime -= gameData.sacrificeSeconds;
			time.textContent = fancyTimeFormat(gameData.currentTime);
			var tempTime = 100 * (1 + gameData.prestigesCount);
			var tempHours = ~~(tempTime / 60);
			btnActivateSacrifice.textContent = 
			tempHours + " hours, " + ~~(tempTime - tempHours * 60) + " minutes";
			elem.style.width = width + "%";
      }
    }
  }
}

function prestigeNow() {
	//Increases prestigesCount, resets HTML and player variables.
	gameData.prestigesCount++;
	//console.log(gameData.prestigesCount);
	prestiges.textContent = gameData.prestigesCount;
	prestigeUpgrades.style.display = 'block';
	 	gameData.currentTime = 20;
		gameData.currentSand = 5000 * gameData.prestigesCount;
		//gameData.timeMultiplier = 1;
		gameData.gathererPrice = 11;
		gameData.currentSandGatherers = 10;
		gameData.currentHourglass = 0;
		gameData.hasTimeBender = 0;
		gameData.hasTimeManipulator = 0;
		gameData.timeBenderDelay = 3000;
	time.textContent = fancyTimeFormat(gameData.currentTime);
	sand.textContent = gameData.currentSand;
	btnSandGatherer.textContent = 11 + " sand";
	sandGatherers.textContent = gameData.currentSandGatherers;
	btnHourglass.textContent = 900 + " sand";
	hourGlass.textContent = gameData.currentHourglass;
	hourglassSpan.style.display = 'none';
	timebenderSpan.style.display = 'none';
	timemanipulatorSpan.style.display = 'none';
	btnSand.style.display = 'none';
	gathererSpan.style.display = 'inline';
	//Disable time bender
	clearTimeout(benderTimeout);
	//Disable time sacrifice
	clearInterval(id);
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

//Time bender increases time slowly
function timeBenderLoop() {
	gameData.currentTime++;
	gameData.currentSand -= 100;
	time.textContent = fancyTimeFormat(gameData.currentTime);
	sand.textContent = thousands_separators(gameData.currentSand);
	//timeBenderLoop runs every three seconds
	benderTimeout = setTimeout(timeBenderLoop, gameData.timeBenderDelay);
}

//Game loop
function gameLoop() {
	gameData.currentTime--;
	time.textContent = fancyTimeFormat(gameData.currentTime);
	//time.textContent = gameData.currentTime;
	gameData.currentSand += gameData.currentSandGatherers * (gameData.currentHourglass + 1);
	sand.textContent = thousands_separators(gameData.currentSand);
	//If time runs out, reset time, sand and HTML for them
	if (gameData.currentTime < 1) {
		gameData.currentTime = 10;
		time.textContent = fancyTimeFormat(gameData.currentTime);
		gameData.currentSand = 0;
		sand.textContent = thousands_separators(gameData.currentSand);
	}
	//gameLoop runs every second
	setTimeout(gameLoop, 1000);
}

gameLoop();
})();