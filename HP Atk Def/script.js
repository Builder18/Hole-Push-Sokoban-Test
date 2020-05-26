var HPTimeout;
var AtkTimeout;
var DefTimeout;
var rememberedElement = null;
var previousHP;
var attackRequired;
var reduceStatPoints;
var imageList = [];
var images;
var i;
var image;
var previousBaddie;
var baddie4Found;

//Variables that can change go here
var currentHP = 3;
var currentAtk = 1;
var currentDef = 0;
var statPoints = 0;
var dead = 0;
var resurrectsCount = 0;
var prestigesCount = 0;
var reverse = 0;

//Elements go here
var HP = document.getElementById('HP');
var Atk = document.getElementById('Atk');
var Def = document.getElementById('Def');
var stats = document.getElementById('stats');
var restartButton = document.getElementById('restart');
var HPButton = document.getElementById('give-HP');
var HPLost = document.getElementById('HPLost');
var statPointsGained = document.getElementById('statPointsGained');
var resurrects = document.getElementById('resurrects');
var prestiges = document.getElementById('prestiges');
var betterHealing = document.getElementById('betterHealing');
var betterDefence = document.getElementById('betterDefence');
var betterAttack = document.getElementById('betterAttack');

//Hiding elements that aren't needed in beginning
restartButton.style.display = 'none';
betterHealing.style.display = 'none';
betterDefence.style.display = 'none';
betterAttack.style.display = 'none';

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

//Get list of all image src's and use it for prestige
	//Finds all images and stores list of them.
    images = document.getElementsByClassName("images");
	 //Loops through images, you could use break to get out of loop
    for (i = 0; i < images.length; i++){
		//Takes one of images from list.
		image = images[i];
		//Take image src and append it to list
		imageList.push(image.getAttribute('src'));
   } //for i
	
console.log(imageList);
//Finally put this variable into console log for analysis

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
	currentHP += (1 + prestigesCount);
	HP.innerHTML = currentHP;
	statPoints--;
	stats.innerHTML = statPoints;
}

function AtkIncrease() {
	if (statPoints < 2) return;
	
	if (prestigesCount < 11) {
		currentAtk++;
	} else {
		currentAtk += 3;
	}
	Atk.innerHTML = currentAtk;
	statPoints -= 2;
	stats.innerHTML = statPoints;
}

function DefIncrease() {
	if (statPoints < 3) return;
	
	if (prestigesCount < 6) {
		currentDef++;
	} else {
		currentDef += 5;
	}
	Def.innerHTML = currentDef;
	statPoints -= 3;
	stats.innerHTML = statPoints;
}

//Main function and game loop
function addEventListeners(){
	 //Call this function every 3000 milliseconds aka 3 seconds.
	 setTimeout(addEventListeners, 2000);
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
    images = document.getElementsByClassName("images");
	 //Changes rememberedElement to null
	 rememberedElement = null;
	 heroFound = 0;
	 //Loops through images, you could use break to get out of loop
    for (i = 0; i < images.length; i++){
		//Takes one of images from list.
		image = images[i];
		
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
	 
	 //console.log(tmpSrc);
	 
	 //Used to see how much HP you lost in battle.
	 
	 previousHP = currentHP;
	 reduceStatPoints = 0;
	 
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
			previousBaddie = image2;
			//console.log(previousBaddie);
		} else {
			statPointsGained.innerHTML = 0;
		}
		
		stats.innerHTML = statPoints;
		 
		tmpSrc = 'empty.png';
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one checks for baddie2 instead
	 if (tmpSrc === 'baddie2.png') {
		if ((currentAtk / 2) > 2) {
			 //Current attack divided with 2 is more than 2
			 //console.log(currentAtk + " more than enough");
				statPoints += 5;
				statPointsGained.innerHTML = 5;
				previousBaddie = image2;
				//console.log(previousBaddie);
				stats.innerHTML = statPoints;
		 
				tmpSrc = 'empty.png';
				image2.setAttribute('src', image1.getAttribute('src'));
				image1.setAttribute('src', tmpSrc);
				return;
		 }
		 
		if (currentDef < 3) {
			currentHP -= (3 - currentDef);
			HP.innerHTML = currentHP;
		}
		//For stronger baddies, check currentAtk as well
			
		if (currentAtk > 2) {
			if (currentHP > 0) {
				statPoints += 5;
				statPointsGained.innerHTML = 5;
				previousBaddie = image2;
				//console.log(previousBaddie);
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		 
			tmpSrc = 'empty.png';
		} else {
				do {
					attackRequired = 3;
					//Continue here if player's attack wasn't powerful enough.
					if (currentDef < 3) {
						currentHP -= (3 - currentDef);
						HP.innerHTML = currentHP;
					} else {
						currentAtk++;
						Atk.innerHTML = currentAtk;
						statPoints -= 2;
						stats.innerHTML = statPoints;
						reduceStatPoints -= 2;
					}
					
					
					if (currentHP > 0) {
						if (currentAtk < attackRequired) {
							statPointsGained.innerHTML = (5 + reduceStatPoints);
						}
					} else {
						statPointsGained.innerHTML = 0;
						break;
					}
				}
				//As long as currentHP is more than 0 or currentAtk is lower than attackRequired, don't exit while loop.
				while (currentAtk < attackRequired);
				
				//console.log(currentAtk);
				
				if (currentHP > 0) {
					statPoints += 5;
				
					stats.innerHTML = statPoints;
		 
					tmpSrc = 'empty.png';
					
					previousBaddie = image2;
					//console.log(previousBaddie);
				}
		}
		//Keep this
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one is for baddie3
	 if (tmpSrc === 'baddie3.png') {
		 if ((currentAtk / 2) > 5) {
			 //Current attack divided with 2 is more than 5
			 //console.log(currentAtk + " more than enough");
				statPoints += 8;
				statPointsGained.innerHTML = 8;
				previousBaddie = image2;
				//console.log(previousBaddie);
				stats.innerHTML = statPoints;
		 
				tmpSrc = 'empty.png';
				image2.setAttribute('src', image1.getAttribute('src'));
				image1.setAttribute('src', tmpSrc);
				return;
		 }
		 
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
				previousBaddie = image2;
				//console.log(previousBaddie);
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		 
			tmpSrc = 'empty.png';
		} else {
				do {
					attackRequired = 6;
					//Continue here if player's attack wasn't powerful enough.
					if (currentDef < 11) {
						currentHP -= (11 - currentDef);
						HP.innerHTML = currentHP;
					} else {
						currentAtk++;
						Atk.innerHTML = currentAtk;
						statPoints -= 2;
						stats.innerHTML = statPoints;
						reduceStatPoints -= 2;
					}
					
					if (currentHP > 0) { 
						if (currentAtk < attackRequired) {
							statPointsGained.innerHTML = (8 + reduceStatPoints);
						}
					} else {
						statPointsGained.innerHTML = 0;
						break;
					}
				}
				while (currentAtk < attackRequired);
				
				if (currentHP > 0) {
					statPoints += 8;
				
					stats.innerHTML = statPoints;
		 
					tmpSrc = 'empty.png';
					
					previousBaddie = image2;
					//console.log(previousBaddie);
				}
		}
		HPLost.innerHTML = (previousHP - currentHP);
	 }
	 
	 //This one is for baddie4
	 if (tmpSrc === 'baddie4.png') {
		 if ((currentAtk / 2) > 8) {
			 //Current attack divided with 2 is more than 8
			 console.log(currentAtk + " more than enough");
				statPoints += 15;
				statPointsGained.innerHTML = 15;
				//console.log(previousBaddie);
				tmpSrc = 'baddie4.png';
				if (previousBaddie === 0) {
					alert("You won! Resurrects: " + resurrectsCount);
				}
				image1 = previousBaddie;
				previousBaddie = 0;
				prestigeNow();
				image2.setAttribute('src', image1.getAttribute('src'));
				image1.setAttribute('src', tmpSrc);
				return;
		 }
		 
		 if (currentDef < 20) {
			currentHP -= (20 - currentDef);
			HP.innerHTML = currentHP;
		}
		//For stronger baddies, check currentAtk as well
		if (currentAtk > 8) {
			if (currentHP > 0) { 
				statPoints += 15;
				statPointsGained.innerHTML = 15;
				//console.log(previousBaddie);
				tmpSrc = 'baddie4.png';
				if (previousBaddie === 0) {
					alert("You won! Resurrects: " + resurrectsCount);
				}
				image1 = previousBaddie;
				previousBaddie = 0;
				prestigeNow();
				//console.log(resurrectsCount + " resurrects");
			} else {
				statPointsGained.innerHTML = 0;
			}
			
			stats.innerHTML = statPoints;
		} else {
				do {
					attackRequired = 9;
					//Continue here if player's attack wasn't powerful enough.
					if (currentDef < 20) {
						currentHP -= (20 - currentDef);
						HP.innerHTML = currentHP;
					} else {
						currentAtk++;
						Atk.innerHTML = currentAtk;
						statPoints -= 2;
						stats.innerHTML = statPoints;
						reduceStatPoints -= 2;
					}
					
					if (currentHP > 0) { 
						if (currentAtk < attackRequired) {
							statPointsGained.innerHTML = (15 + reduceStatPoints);
						}
					} else {
						statPointsGained.innerHTML = 0;
						break;
					}
				}
				while (currentAtk < attackRequired);
				
				if (currentHP > 0) {  
					statPoints += 15;
				
					stats.innerHTML = statPoints;
				
					//console.log(resurrectsCount + " resurrects");
					
					//console.log(previousBaddie);
					
					tmpSrc = 'baddie4.png';
					if (previousBaddie === 0) {
						alert("You won! Resurrects: " + resurrectsCount);
					}
					image1 = previousBaddie;
					previousBaddie = 0;
					
					prestigeNow();
				}
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
					currentHP = 0;
					HP.innerHTML = currentHP;
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
	 //On resurrect, increase HP to 3 + current stat points, hide resurrect button, show HP purchasing button and upgrade html.
	
	 currentHP = (3 + (statPoints * (1 + prestigesCount)));
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
	 resurrects.innerHTML = resurrectsCount;
 }
 
 function prestigeNow() {
	 //Increases prestigesCount, resets HTML and player variables.
	 prestigesCount++;
	 //console.log(prestigesCount);
	 prestiges.innerHTML = prestigesCount;
	 currentHP = 3;
	 currentAtk = 1;
	 currentDef = 0;
	 statPoints = 0;
	 HP.innerHTML = currentHP;
	 Atk.innerHTML = currentAtk;
	 Def.innerHTML = currentDef;
	 stats.innerHTML = statPoints;
	 betterHealing.style.display = 'inline';
	 if (prestigesCount > 5) betterDefence.style.display = 'inline';
	 if (prestigesCount > 10) betterAttack.style.display = 'inline';
	 //Reset image src
	 images = document.getElementsByClassName("images");
	 //console.log(images.length);console.log(imageList.length);
	 //console.log(images);
    for (i = 0; i < imageList.length; i++){
		//Takes one of images from list.
		image1 = imageList[i];
		image2 = images[i];
		//Change image
		image2.setAttribute('src', image1);
   } //for i
	//Hide all images after baddie4
	//hideImages();
 }
 
 /*function hideImages() {
	 //Finds all images and stores list of them.
    images = document.getElementsByClassName("images");
	 //Changes baddie4Found to 0
	 baddie4Found = 0;
	 //Loops through images, you could use break to get out of loop
    for (i = 0; i < images.length; i++){
		//Takes one of images from list.
		image = images[i];
		
		//Check if we already have found baddie4.
		if (baddie4Found === 0){
			//If not, try to find baddie4.png
			if (image.getAttribute('src') === 'baddie4.png') {
				//baddie4.png was found!
				baddie4Found = 1;
			}
			console.log(image);
		} else {
			//Hides all images after baddie4
			image.style.display = 'none';
		}
		//console.log(i + " and " + image.getAttribute('src'));
   } //for i
 }*/