var HPTimeout;
var AtkTimeout;
var DefTimeout;
var rememberedElement = null;

//Variables that can change go here
var currentHP = 3;
var currentAtk = 1;
var currentDef = 0;
var statPoints = 0;

//Elements go here
var HP = document.getElementById('HP');
var Atk = document.getElementById('Atk');
var Def = document.getElementById('Def');
var stats = document.getElementById('stats');

//Hiding elements that aren't needed in beginning


//Listeners and other code go here

document.getElementById("give-HP").addEventListener("mouseover", HPOver);
document.getElementById("give-HP").addEventListener("mouseout", HPOut);
document.getElementById("give-HP").addEventListener("click", HPIncrease);
//For Atk
document.getElementById("give-Atk").addEventListener("mouseover", AtkOver);
document.getElementById("give-Atk").addEventListener("mouseout", AtkOut);
document.getElementById("give-Atk").addEventListener("click", AtkIncrease);
//For Def
document.getElementById("give-Def").addEventListener("mouseover", DefOver);
document.getElementById("give-Def").addEventListener("mouseout", DefOut);
document.getElementById("give-Def").addEventListener("click", DefIncrease);

function HPOver() {
  HPTimeout = setInterval(HPIncrease, 2000);
}

function HPOut() {
  clearInterval(HPTimeout);
}

function AtkOver() {
  AtkTimeout = setInterval(AtkIncrease, 2000);
}

function AtkOut() {
  clearInterval(AtkTimeout);
}

function DefOver() {
  DefTimeout = setInterval(DefIncrease, 2000);
}

function DefOut() {
  clearInterval(DefTimeout);
}

//After timeout handlers, main functionality of buttons goes here

function HPIncrease() {
	//if (statPoints < 1) return;
	currentHP++;
	HP.innerHTML = currentHP;
	statPoints--;
	stats.innerHTML = statPoints;
}

function AtkIncrease() {
	//if (statPoints < 2) return;
	currentAtk++;
	Atk.innerHTML = currentAtk;
	statPoints -= 2;
	stats.innerHTML = statPoints;
}

function DefIncrease() {
	//if (statPoints < 3) return;
	currentDef++;
	Def.innerHTML = currentDef;
	statPoints -= 3;
	stats.innerHTML = statPoints;
}

//Untested, may not work correctly
function addEventListeners(){
     var images = document.getElementsByClassName("images");
     for (var i = 0; i < images.length; i++){
		var image = images[i];
		/*image.addEventListener('click',function(event){
         if (rememberedElement === null){
            rememberedElement = event.target;
         }
         else {
            swapImages(rememberedElement, event.target);
         }
		},false); */
		
		if (rememberedElement === null){
			if (image.getAttribute('src') === 'hero.png') {
				rememberedElement = image;
			
				console.log(rememberedElement);
				} else {
				console.log(image.getAttribute('src'));
			}
		}
      else {
			//console.log(image);
			//swapImages(rememberedElement, image);
		}
   } //for i
 }
 
 function swapImages(image1, image2){
    var tmpSrc = image1.getAttribute('src');

    image1.setAttribute('src', image2.getAttribute('src'));
    image2.setAttribute('src', tmpSrc);

    //rememberedElement = null;
 }
 
 
