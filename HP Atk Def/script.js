var HPTimeout;
var AtkTimeout;
var DefTimeout;
var rememberedElement = null;
var previousHP;

//Variables that can change go here
var currentHP = 3;
var currentAtk = 1;
var currentDef = 0;
var statPoints = 0;
var dead = 0;
var resurrectsCount = 0;

//Elements go here
var HP = document.getElementById('HP');
var Atk = document.getElementById('Atk');
var Def = document.getElementById('Def');
var stats = document.getElementById('stats');
var restartButton = document.getElementById('restart');
var HPButton = document.getElementById('give-HP');
var HPLost = document.getElementById('HPLost');
var statPointsGained = document.getElementById('statPointsGained');

//Hiding elements that aren't needed in beginning
restartButton.style.display = 'none';

//Listeners and other code go here

HPButton.addEventListener("mouseover", HPOver);
HPButton.addEventListener("mouseout", HPOut);
HPButton.addEventListener("click", HPIncrease);
//For Atk
document.getElementById("give-Atk").addEventListener("mouseover", AtkOver);
document.getElementById("give-Atk").addEventListener("mouseout", AtkOut);
document.getElementById("give-Atk").addEventListener("click", AtkIncrease);
//For Def
document.getElementById("give-Def").addEventListener("mouseover", DefOver);
document.getElementById("give-Def").addEventListener("mouseout", DefOut);
document.getElementById("give-Def").addEventListener("click", DefIncrease);
//Restart button
restartButton.addEventListener("click", restart);

function HPOver() {
  HPTimeout = setInterval(HPIncrease, 1000);
}

function HPOut() {
  clearInterval(HPTimeout);
}

function AtkOver() {
  AtkTimeout = setInterval(AtkIncrease, 1000);
}

function AtkOut() {
  clearInterval(AtkTimeout);
}

function DefOver() {
  DefTimeout = setInterval(DefIncrease, 1000);
}

function DefOut() {
  clearInterval(DefTimeout);
}

//After timeout handlers, main functionality of buttons goes here

function HPIncrease() {
	if (statPoints < 1) return;
	//If we have enough stat points, increase HP with 1, decrease stat points with 1 and upgrade html for both of them.
	currentHP++;
	HP.innerHTML = currentHP;
	statPoints--;
	stats.innerHTML = statPoints;
}

function AtkIncrease() {
	if (statPoints < 2) return;
	currentAtk++;
	Atk.innerHTML = currentAtk;
	statPoints -= 2;
	stats.innerHTML = statPoints;
}

function DefIncrease() {
	if (statPoints < 3) return;
	currentDef++;
	Def.innerHTML = currentDef;
	statPoints -= 3;
	stats.innerHTML = statPoints;
}

//Main function and game loop
function addEventListeners(){
	 //Call this function every 3000 milliseconds aka 3 seconds.
	 setTimeout(addEventListeners, 3000);
	 //Defeat handler, checks for current HP
	 if (currentHP < 1) {
		 //If HP is lower than 1, check if we are dead yet.
		 if (dead) {
				return;
		 } else {
					//Gain 3 stat points, show resurrect button and hide HP purchasing button.
					statPoints += 3;
					stats.innerHTML = statPoints;
					console.log("RIP");
					restartButton.style.display = 'inline';
					HPButton.style.display = 'none';
					//Mark as dead and return out of this function.
					dead = 1;
					return;
				}
	 } else {
		 //If HP is 1 or more, mark as not dead.
		 dead = 0;
	 }
	 //Finds all images and stores list of them.
    var images = document.getElementsByClassName("images");
	 //Changes rememberedElement to null
	 rememberedElement = null;
	 heroFound = 0;
	 //Loops through images, you could use break to get out of loop
    for (var i = 0; i < images.length; i++){
		//Takes one of images from list.
		var image = images[i];
		
		/*image.addEventListener('click',function(event){
         if (rememberedElement === null){
            rememberedElement = event.target;
         }
         else {
            swapImages(rememberedElement, event.target);
         }
		},false); */
		
		//Check if we already have something in rememberedElement.
		if (rememberedElement === null){
			//If not, try to find hero.png
			if (image.getAttribute('src') === 'hero.png') {
				//hero.png was found!
				rememberedElement = image;
			
				//console.log(rememberedElement);
				} else {
				//console.log(image.getAttribute('src'));
			}
		}
      else {
			//console.log(image);
			heroFound = 1;
			break;
		}
   } //for i
	//if (heroFound) console.log("Hero found!");
	if (heroFound) swapImages(rememberedElement, image);
 }
 
 //After we know where to move, check for baddies and battle if one is found.
 
 function swapImages(image1, image2){
    var tmpSrc = image2.getAttribute('src');
	 
	 console.log(tmpSrc);
	 
	 //Used to see how much HP you lost in battle.
	 
	 previousHP = currentHP;
	 
	 //If image2 has baddie1 as it's source, run the battle.
	 if (tmpSrc === 'baddie1.png') {
		if (currentDef < 1) {
			currentHP--;
			HP.innerHTML = currentHP;
		}
		//Gain 2 stat points and upgrade html.
		if (currentHP > 0) { 
			statPoints += 2;
			statPointsGained.innerHTML = 2;
		} else {
			statPointsGained.innerHTML = 0;
		}
		
		stats.innerHTML = statPoints;
		 
		tmpSrc = 'empty.png';
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one checks for baddie2 instead
	 if (tmpSrc === 'baddie2.png') {
		if (currentDef < 3) {
			currentHP -= (3 - currentDef);
			HP.innerHTML = currentHP;
		}
		//For stronger baddies, check currentAtk as well
		if (currentAtk > 2) {
			if (currentHP > 0) { 
				statPoints += 5;
				statPointsGained.innerHTML = 5;
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		 
			tmpSrc = 'empty.png';
		} else {
				//Continue here if player's attack wasn't powerful enough.
				if (currentDef < 3) {
					currentHP -= (3 - currentDef);
					HP.innerHTML = currentHP;
				}
				if (currentHP > 0) { 
					statPoints += 5;
					statPointsGained.innerHTML = 5;
				} else {
					statPointsGained.innerHTML = 0;
				}
				
				stats.innerHTML = statPoints;
		 
				tmpSrc = 'empty.png';
		}
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one is for baddie3
	 if (tmpSrc === 'baddie3.png') {
		 //Now we are starting to get serious. (Up to 11!)
		 if (currentDef < 11) {
			currentHP -= (11 - currentDef);
			HP.innerHTML = currentHP;
		}
		//For stronger baddies, check currentAtk as well
		if (currentAtk > 5) {
			if (currentHP > 0) { 
				statPoints += 8;
				statPointsGained.innerHTML = 8;
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		 
			tmpSrc = 'empty.png';
		} else {
				//Continue here if player's attack wasn't powerful enough.
				if (currentDef < 11) {
					currentHP -= (11 - currentDef);
					HP.innerHTML = currentHP;
				}
				if (currentHP > 0) { 
					statPoints += 8;
					statPointsGained.innerHTML = 8;
				} else {
					statPointsGained.innerHTML = 0;
				}
				
				stats.innerHTML = statPoints;
		 
				tmpSrc = 'empty.png';
		}
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one is for baddie4
	 if (tmpSrc === 'baddie4.png') {
		 if (currentDef < 20) {
			currentHP -= (20 - currentDef);
			HP.innerHTML = currentHP;
		}
		//For stronger baddies, check currentAtk as well
		if (currentAtk > 8) {
			if (currentHP > 0) { 
				statPoints += 15;
				statPointsGained.innerHTML = 15;
				console.log(resurrectsCount + " resurrects");
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		 
			tmpSrc = 'empty.png';
		} else {
				//Continue here if player's attack wasn't powerful enough.
				if (currentDef < 20) {
					currentHP -= (20 - currentDef);
					HP.innerHTML = currentHP;
				}
				if (currentHP > 0) { 
					statPoints += 15;
					statPointsGained.innerHTML = 15;
					console.log(resurrectsCount + " resurrects");
				} else {
					statPointsGained.innerHTML = 0;
				}
				
				stats.innerHTML = statPoints;
		 
				tmpSrc = 'empty.png';
		}
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //Continue only if player isn't dead.
    if (currentHP > 0) {
		image2.setAttribute('src', image1.getAttribute('src'));
		image1.setAttribute('src', tmpSrc);
		//image2.setAttribute('src', 'hero.png');
		//image1.style.display = 'none';
	 } else {
		 //console.log("RIP");
	 }

    //rememberedElement = null;
	 //After reducing HP, check if HP is 0 or less
	 if (currentHP < 1) {
		 if (dead) {
				return;
		 } else {
					statPoints += 3;
					stats.innerHTML = statPoints;
					console.log("RIP");
					restartButton.style.display = 'inline';
					HPButton.style.display = 'none';
					dead = 1;
					return;
				}
	 } else {
		 dead = 0;
	 }
 }
 
 function restart() {
	 //On resurrect, increase HP to 3, hide resurrect button, show HP purchasing button and upgrade html.
	 
	 //Instead increase HP to 3 + current stat points?
	 currentHP = (3 + statPoints);
	 resurrectsCount++;
    /*currentAtk = 1;
	 currentDef = 0;*/
	 statPoints = 0;
	 dead = 0;
	 restartButton.style.display = 'none';
	 HPButton.style.display = 'inline';
	 //InnerHTML
	 HP.innerHTML = currentHP;
	 /*Atk.innerHTML = currentAtk;
	 Def.innerHTML = currentDef;*/
	 stats.innerHTML = statPoints;
 }
 
 
