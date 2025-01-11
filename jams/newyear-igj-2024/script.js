	let elements = {
		effortBar: document.querySelector("#effort-bar"),
		spanReward: document.querySelector("#span-reward"),
		spanPercentage: document.querySelector("#span-percentage"),
		btnEffort: document.querySelector("#btn-effort"),
		btnBonus: document.querySelector("#btn-bonus"),
		btnReward: document.querySelector("#btn-reward"),
		btnButtons: document.querySelector("#btn-buttons"),
		currentRewards: document.querySelector("#current-rewards"),
		btnEffortTwo: document.querySelector("#btn-effort-two"),
		btnEffortThree: document.querySelector("#btn-effort-three"),
		spanLaziness: document.querySelector("#span-laziness"),
		spanLazinessText: document.querySelector("#laziness-text")
	};
	
	let data = {
		numEffort: 0,
		numReward: 0,
		numRewardGain: 100,
		numPercentage: 100,
		numEffortGain: 20,
		numBonusCost: 100,
		numRewardCost: 2000,
		numButtonsCost: 5000,
		numLastClick: 5,
		numGainMax: 100,
		numEffortButtons: 1,
		numLaziness: 0,
		numLazinessIncrease: 1
	};
	
	let textVisible = false;
	
	let lastUpdate = Date.now();
	
	elements.btnEffortTwo.style.display = 'none';
	elements.btnEffortThree.style.display = 'none';
	elements.spanLazinessText.style.display = 'none';
	
	elements.btnButtons.addEventListener('click', function(evt) {
		if (data.numReward < data.numButtonsCost) return;
		
		// Show another button for effort gain.
		if (data.numEffortButtons < 3) {
			if (data.numEffortButtons === 1) {
				elements.btnEffortTwo.style.display = 'inline';
			}
			
			if (data.numEffortButtons === 2) {
				elements.btnEffortThree.style.display = 'inline';
			
				elements.btnButtons.disabled = true;
			}
			
			data.numEffortButtons++;
		}
		
		data.numReward -= data.numButtonsCost;
		data.numButtonsCost *= 10;
		
		updateButtonsText();
		updateRewardText();
	});
	
	elements.btnEffort.addEventListener('click', function(evt) {
		elements.btnEffort.disabled = true;
		
		effortClicked();
	});
	
	elements.btnEffortTwo.addEventListener('click', function(evt) {
		elements.btnEffortTwo.disabled = true;
		
		effortClicked();
	});
	
	elements.btnEffortThree.addEventListener('click', function(evt) {
		elements.btnEffortThree.disabled = true;
		
		effortClicked();
	});
	
	elements.btnBonus.addEventListener('click', function(evt) {
		if (data.numReward < data.numBonusCost) return;
		
		data.numEffortGain += 20;
		data.numReward -= data.numBonusCost;
		data.numBonusCost *= 3;
		
		updateRewardText();
		updateEffortText();
		updateBonusText();
	});
	
	elements.btnReward.addEventListener('click', function(evt) {
		if (data.numReward < data.numRewardCost) return;
		
		data.numGainMax = Math.ceil(data.numGainMax * 1.5 / 100) * 100;
		data.numRewardGain = data.numGainMax;
		
		data.numReward -= data.numRewardCost;
		data.numRewardCost *= 7;
		
		updateRewardText();
		updateButtonReward();
	});
	
	function effortClicked() {
		data.numEffort += data.numEffortGain;
		data.numLastClick++; // Can make numLastClick quite large of a number.
		
		if (data.numEffort > 99) {
			data.numReward += data.numRewardGain;
			data.numGainMax += 100;
			
			data.numRewardGain = data.numGainMax;
			
			data.numEffort -= 100;
			
			updateRewardText();
			
			data.numLazinessIncrease++;
		}
		
		if (data.numEffort > 99) {
			data.numReward += data.numRewardGain;
			data.numGainMax += 100;
			
			data.numRewardGain = data.numGainMax;
			
			data.numEffort = 0;
			
			updateRewardText();
			
			data.numLazinessIncrease++;
		}
		
		updateEffortText();
	}
	
	function updateEffortText() {
		elements.effortBar.value = data.numEffort;
		elements.btnEffort.textContent = data.numEffortGain + "%";
		
		elements.btnEffortTwo.textContent = data.numEffortGain + "%";
		elements.btnEffortThree.textContent = data.numEffortGain + "%";
	}
	
	function updateRewardText() {
		data.numPercentage = Math.floor(data.numRewardGain / data.numGainMax * 100);
		
		elements.spanReward.textContent = formatThousands(data.numRewardGain) + " :";
		elements.spanPercentage.textContent = data.numPercentage + "%";
		elements.currentRewards.textContent = formatThousands(data.numReward);
	}
	
	function updateBonusText() {
		elements.btnBonus.textContent = formatThousands(data.numBonusCost) + " reward";
	}
	
	function updateButtonReward() {
		elements.btnReward.textContent = formatThousands(data.numRewardCost) + " reward";
	}
	
	function updateButtonsText() {
		elements.btnButtons.textContent = formatThousands(data.numButtonsCost) + " reward";
		
		if (data.numEffortButtons === 3) elements.btnButtons.textContent = "Maxed out";
	}
	
	function updateLazinessText() {
		elements.spanLaziness.textContent = data.numLaziness;
	}
	
	function formatThousands(num)
	{
		let num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	}
	
	function gameLoop() {
		elements.btnEffort.disabled = false;
		
		if (data.numEffortButtons > 1) {
			elements.btnEffortTwo.disabled = false;
			
			if (data.numEffortButtons > 2) {
				elements.btnEffortThree.disabled = false;
			}
		}
		
		let deltaTime = Date.now() - lastUpdate;
		lastUpdate = Date.now();
		
		let seconds = Math.floor(deltaTime / 1000);
		let rewardTransfer = Math.ceil(data.numEffort * seconds / 5);
		
		if (data.numEffort === 0) rewardTransfer = 1;
		
		if (data.numRewardGain - rewardTransfer > 0) {
			data.numReward += rewardTransfer;
			data.numRewardGain -= rewardTransfer;
			
			updateRewardText();
		} else {
			if (data.numRewardGain > 1) {
				data.numReward += data.numRewardGain - 1;
				data.numRewardGain = 1;
				
				updateRewardText();
			}
		}
		
		//console.log(rewardTransfer);
		
		if (data.numLastClick > 0) {
			data.numLastClick--;
		} else {
			data.numEffort = 0;
			
			data.numLaziness += data.numLazinessIncrease;
			
			if (data.numLaziness > 9 && textVisible === false) {
				elements.spanLazinessText.style.display = 'inline';
				
				textVisible = true;
			}
			
			if (data.numLaziness > 99) {
				data.numEffortGain--;
				
				data.numLaziness -= 100;
			}
			
			if (data.numLaziness > 99) {
				data.numEffortGain--;
				
				data.numLaziness = 0 + Math.ceil(data.numLazinessIncrease / 10);
			}
			
			updateLazinessText();
			updateEffortText();
			
			data.numLastClick = 5;
		}
		
		window.setTimeout(gameLoop, 1000);
	}
	
	gameLoop();
	