
//Variables that can change go here
var textNumber = 1;

//Elements go here
var sb_image = document.getElementById('sb_image');
var sb_text = document.getElementById('sb_text');
var defenderImage = document.getElementById('defenderImage');
var defenderLogo = document.getElementById('defenderLogo');
var configLogo = document.getElementById('configLogo');
var programFilesImage = document.getElementById('programFilesImage');
var windowsImage = document.getElementById('windowsImage');
var usersImage = document.getElementById('usersImage');

//Hiding elements that aren't needed in beginning
defenderLogo.style.display = "none";
configLogo.style.display = "none";
programFilesImage.style.display = "none";
windowsImage.style.display = "none";
usersImage.style.display = "none";

programFilesImage.addEventListener('click', function(){
	alert('Place for installed programs.');
});

windowsImage.addEventListener('click', function(){
	alert('Access denied!');
});

usersImage.addEventListener('click', function(){
	alert('I, you, me.');
});

sb_image.addEventListener('click', function(){
	textNumber++;
	console.log(textNumber);
	if (textNumber === 2) {
		sb_text.textContent = 'Your first lesson is to find your installation folder and open configuration file in there.';
	}
	if (textNumber === 3) {
		sb_image.style.display = "none";
		sb_text.style.display = "none";
		defenderImage.style.display = "none";
		programFilesImage.style.display = "inline";
		windowsImage.style.display = "inline";
		usersImage.style.display = "inline";
	}
});

sb_text.addEventListener('click', function(){
	textNumber++;
	console.log(textNumber);
	if (textNumber === 2) {
		sb_text.textContent = 'Your first lesson is to find your installation folder and open configuration file in there.';
	}
	if (textNumber === 3) {
		sb_image.style.display = "none";
		sb_text.style.display = "none";
		defenderImage.style.display = "none";
		programFilesImage.style.display = "inline";
		windowsImage.style.display = "inline";
		usersImage.style.display = "inline";
	}
});

defenderImage.addEventListener('click', function(){
	alert('Ahhahaa! Don\'t tickle!');
});

