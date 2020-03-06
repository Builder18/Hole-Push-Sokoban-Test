

var textNumber = 1;

var sb_image = document.getElementById('sb_image');
var sb_text = document.getElementById('sb_text');
var defenderImage = document.getElementById('defenderImage');

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
	}
});

defenderImage.addEventListener('click', function(){
	alert('Ahhahaa! Don\'t tickle!');
});

