	let elements = {
		spanEnergy: document.querySelector("#span-energy"),
		energyBar: document.querySelector("#energy-bar"),
		spanMatter: document.querySelector("#span-matter"),
		btnMatter: document.querySelector("#btn-matter"),
		btnAugmentator: document.querySelector("#btn-augmentator"),
		btnEnergy: document.querySelector("#btn-energy"),
		spanAutomation: document.querySelector("#span-automation"),
		btnAutomation: document.querySelector("#btn-automation"),
	};
	
	let data = {
		numEnergy: 100,
		numMatter: 1,
		numEnergyGain: 1,
		numGeneratorCost: 500,
		numMatterGain: 1,
		numAugmentatorCost: 5,
		boolAutomatedConversion: false,
		numEnergyUse: 1,
		numEnergyUseCost: 1,
	};
	
	//Used for setTimeout that calls fnMatter multiple times each click.
	let matterGenerationTimes = 0;
	
	let lastUpdate = Date.now();
	
	elements.btnAutomation.addEventListener('click', function(evt) {
		if (data.numMatter < data.numEnergyUseCost) return;
		
		if (data.numEnergyUse < 100) {
			data.numEnergyUse++;
			
			let tempCost = data.numEnergyUseCost + Math.ceil(data.numMatter / 100);
			data.numMatter -= data.numEnergyUseCost;
			data.numEnergyUseCost = tempCost;
			
			updateAutomationText();
		} else {
			data.boolAutomatedConversion = true;
			data.numMatter -= data.numEnergyUseCost;
			
			elements.spanAutomation.textContent = data.numEnergyUse;
			elements.btnAutomation.textContent = "Maxed out";
			elements.btnAutomation.disabled = true;
		}
		
		updateMatterText();
		updateMatterGainText();
		
		if(data.numMatter < data.numAugmentatorCost) elements.btnAugmentator.disabled = true;
		if(data.numMatter < data.numGeneratorCost) elements.btnEnergy.disabled = true;
		if(data.numMatter < data.numEnergyUseCost) elements.btnAutomation.disabled = true;
	});
	
	elements.btnEnergy.addEventListener('click', function(evt) {
		if (data.numMatter < data.numGeneratorCost) return;
		
		data.numEnergyGain++;
		data.numMatter -= data.numGeneratorCost;
		data.numGeneratorCost *= 2;
		
		updateMatterText();
		updateEnergyGainText();
		
		if(data.numMatter < data.numAugmentatorCost) elements.btnAugmentator.disabled = true;
		if(data.numMatter < data.numGeneratorCost) elements.btnEnergy.disabled = true;
		if(data.numMatter < data.numEnergyUseCost) elements.btnAutomation.disabled = true;
	});
	
	elements.btnAugmentator.addEventListener('click', function(evt) {
		if (data.numMatter < data.numAugmentatorCost) return;
		
		data.numMatterGain *= 2;
		data.numMatter -= data.numAugmentatorCost;
		data.numAugmentatorCost *= 3;
		
		updateMatterText();
		updateMatterGainText();
		updateAugmentatorsText();
		
		if(data.numMatter < data.numAugmentatorCost) elements.btnAugmentator.disabled = true;
		if(data.numMatter < data.numGeneratorCost) elements.btnEnergy.disabled = true;
		if(data.numMatter < data.numEnergyUseCost) elements.btnAutomation.disabled = true;
	});
	
	elements.btnMatter.addEventListener('click', function(evt) {
		// Can be increased with upgrades
		matterGenerationTimes = data.numEnergyUse - 1;
		//console.log("btnMatter pressed! Running " + matterGenerationTimes + " times!");
		elements.btnMatter.disabled = true;
		
		fnMatter();
	});
	
	function fnMatter() {
		if (data.numEnergy < 1) {
			elements.btnMatter.disabled = false;
			matterGenerationTimes = 0;
			return;
		}
		
		data.numMatter += data.numMatterGain;
		data.numEnergy--;
		
		updateMatterText();
		updateEnergyText();
		
		if(matterGenerationTimes > 0) {
			window.setTimeout(fnMatter, 1000);
			
			matterGenerationTimes--;
		} else {
			elements.btnMatter.disabled = false;
		}
	}
	
	function updateEnergyText() {
		elements.spanEnergy.textContent = data.numEnergy;
		elements.energyBar.value = data.numEnergy;
	}
	
	function updateMatterText() {
		elements.spanMatter.textContent = data.numMatter;
	}
	
	function updateMatterGainText() {
		elements.btnMatter.textContent = data.numEnergyUse + "% energy to " + data.numMatterGain*data.numEnergyUse + " matter";
	}
	
	function updateAugmentatorsText() {
		elements.btnAugmentator.textContent = "Cost: " + data.numAugmentatorCost + " matter";
	}
	
	function updateEnergyGainText() {
		elements.btnEnergy.textContent = "Cost: " + data.numGeneratorCost + " matter";
	}
	
	function updateAutomationText() {
		elements.spanAutomation.textContent = data.numEnergyUse - 1;
		elements.btnAutomation.textContent = "Cost: " + data.numEnergyUseCost + " matter";
	}
	
	function gameLoop() {
		elements.btnMatter.disabled = false;
		if (data.boolAutomatedConversion && matterGenerationTimes === 0) {
			matterGenerationTimes = data.numEnergyUse - 1;
			elements.btnMatter.disabled = true;
			
			fnMatter();
		}
		
		let deltaTime = Date.now() - lastUpdate;
		lastUpdate = Date.now();
		
		data.numEnergy += Math.floor(data.numEnergyGain * deltaTime / 5000);
		if (data.numEnergy > 100) data.numEnergy = 100;
		updateEnergyText();
		
		//console.log("data.numEnergy += " + Math.floor(data.numEnergyGain * deltaTime / 5000));
		
		window.setTimeout(gameLoop, 5000);
	}
	
	gameLoop();
	
	function displayLoop() {
		if(data.numMatter > data.numAugmentatorCost - 1) elements.btnAugmentator.disabled = false;
		
		if(data.numMatter > data.numGeneratorCost - 1) elements.btnEnergy.disabled = false;
		
		if(data.numMatter > data.numEnergyUseCost - 1 && !data.boolAutomatedConversion) elements.btnAutomation.disabled = false;
		
		window.setTimeout(displayLoop, 200);
	}
	
	displayLoop();