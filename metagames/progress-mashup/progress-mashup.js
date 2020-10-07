(function() {
	//Trying strict mode, remove if required
	"use strict"
//Variables that can change go here
var gameData = {
	currentProgress: 1,
	m1IncreaseVar: 0,
	m2IncreaseVar: 0,
	m3IncreaseVar: 0,
};

//Progress bar variables
var width = 1;
var width2 = 1;
var width3 = 1;

var ctime, num;

//Elements go here
var bigProgress = document.getElementById('myBar');
var m1Bar = document.getElementById('m1Bar');
var m2Bar = document.getElementById('m2Bar');
var m3Bar = document.getElementById('m3Bar');
var m1Span = document.getElementById('m1Progress');
var m2Span = document.getElementById('m2Progress');
var m3Span = document.getElementById('m3Progress');
var m1Idle = document.getElementById('m1Idle');
var m2Idle = document.getElementById('m2Idle');
var m3Idle = document.getElementById('m3Idle');

//Hiding elements that aren't needed in beginning
//m4Span.style.display = 'none';
//m5Span.style.display = 'none';

//Listeners and other code go here
m1Span.addEventListener("click", m1Increase);
m2Span.addEventListener("click", m2Increase);
m3Span.addEventListener("click", m3Increase);

//Main functionality of buttons goes here

function m1Increase() {
	var random_boolean = Math.random() < 0.1;
	if (random_boolean) {
		gameData.m1IncreaseVar++;
		m1Idle.textContent = gameData.m1IncreaseVar;
	} else {
		width++;
		m1Bar.style.width = width + "%";
	}
	//console.log(random_boolean);
}

function m2Increase() {
	var random_boolean = Math.random() < 0.1;
	if (random_boolean) {
		gameData.m2IncreaseVar++;
		m2Idle.textContent = gameData.m2IncreaseVar;
	} else {
		width2++;
		m2Bar.style.width = width2 + "%";
	}
	//console.log(random_boolean);
}

function m3Increase() {
	var random_boolean = Math.random() < 0.1;
	if (random_boolean) {
		gameData.m3IncreaseVar++;
		m3Idle.textContent = gameData.m3IncreaseVar;
	} else {
		width3++;
		m3Bar.style.width = width3 + "%";
	}
	//console.log(random_boolean);
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
	
	if (width >= 100) {
		 gameData.m1IncreaseVar++;
		 m1Idle.textContent = gameData.m1IncreaseVar;
		 gameData.currentProgress++;
		 bigProgress.style.width = gameData.currentProgress + "%";
		 m1Bar.style.width = "1%";
		 width = 1;
   } else {
		 width += gameData.m1IncreaseVar;
		 m1Bar.style.width = width + "%";
    }
	 
	//Once m1 is working, repeat this for m2 and m3
	 
	if (width2 >= 100) {
		 gameData.m2IncreaseVar++;
		 m2Idle.textContent = gameData.m2IncreaseVar;
		 gameData.currentProgress++;
		 bigProgress.style.width = gameData.currentProgress + "%";
		 m2Bar.style.width = "1%";
		 width2 = 1;
   } else {
		 width2 += gameData.m2IncreaseVar;
		 m2Bar.style.width = width2 + "%";
    }
	 
	 //And m3
	 
	 if (width3 >= 100) {
		 gameData.m3IncreaseVar++;
		 m3Idle.textContent = gameData.m3IncreaseVar;
		 gameData.currentProgress++;
		 bigProgress.style.width = gameData.currentProgress + "%";
		 m3Bar.style.width = "1%";
		 width3 = 1;
   } else {
		 width3 += gameData.m3IncreaseVar;
		 m3Bar.style.width = width3 + "%";
    }
	
	//gameLoop runs every second
	setTimeout(gameLoop, 1000);
}

gameLoop();
})();