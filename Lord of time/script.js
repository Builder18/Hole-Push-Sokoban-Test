

//Variables that can change go here
var gameData = {
	currentTime: 10,
	currentSand: 0,
	hasSandUpgrade: 0,
	timeMultiplier: 1,
	gathererPrice: 11,
	currentSandGatherers: 0,
	currentHourglass: 0,
};

//No need to save these variables
var ctime;

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

//Hiding elements that aren't needed in beginning
sandUpgrades.style.display = 'none';
hourglassSpan.style.display = 'none';

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

//After timeout handlers, main functionality of buttons goes here

function SandIncrease() {
	gameData.currentSand++;
	sand.innerHTML = gameData.currentSand;
	if (gameData.currentSand === 11) sandUpgrades.style.display = 'block';
}

function TimeIncrease() {
	if (gameData.currentSand < (2 * gameData.timeMultiplier)) return;
	//If we have enough sand, increase time with 5*timeMultiplier, decrease sand with 2*timeMultiplier and upgrade html for both of them.
	gameData.currentTime += 5 * gameData.timeMultiplier;
	time.innerHTML = 	fancyTimeFormat(gameData.currentTime);
	gameData.currentSand -= 2 * gameData.timeMultiplier;
	sand.innerHTML = gameData.currentSand;
	//Increase timeMultiplier and change button text
	gameData.timeMultiplier++;
	btnTime.innerHTML = (2 * gameData.timeMultiplier) + " sand";
}

function SandGatherer() {
	if (gameData.currentSand < gameData.gathererPrice) return;
	//If enough sand, increase sand gatherers with 1, decrease sand with 11 (this doesn't increase)
	gameData.currentSandGatherers++;
	if (gameData.currentSandGatherers === 2) btnSand.style.display = 'none';
	if (gameData.currentSandGatherers === 100) {
		gathererSpan.style.display = 'none';
		hourglassSpan.style.display = 'inline';
	} 
	sandGatherers.innerHTML = gameData.currentSandGatherers;
	gameData.currentSand -= 11;
	sand.innerHTML = gameData.currentSand;
}

function Hourglass() {
	if (gameData.currentSand < 900 * (gameData.currentHourglass + 1)) return;
	//If enough sand, increase sand gatherers with 1, decrease sand with 11 (this doesn't increase)
	gameData.currentHourglass++;
	if (gameData.currentHourglass === 100) {
		hourglassSpan.style.display = 'none';
	} 
	gameData.currentSand -= 900 * gameData.currentHourglass;
	sand.innerHTML = gameData.currentSand;
	btnHourglass.innerHTML = (900 * (gameData.currentHourglass + 1)) + " sand";
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

//Game loop
function gameLoop() {
	gameData.currentTime--;
	time.innerHTML = 	fancyTimeFormat(gameData.currentTime);
	//time.innerHTML = gameData.currentTime;
	gameData.currentSand += gameData.currentSandGatherers;
	sand.innerHTML = gameData.currentSand;
	//If time runs out, reset time, sand and HTML for them
	if (gameData.currentTime < 1) {
		gameData.currentTime = 10;
		time.innerHTML = 	fancyTimeFormat(gameData.currentTime);
		gameData.currentSand = 0;
		sand.innerHTML = gameData.currentSand;
	}
	//gameLoop runs every second
	setTimeout(gameLoop, 1000);
}

gameLoop();
