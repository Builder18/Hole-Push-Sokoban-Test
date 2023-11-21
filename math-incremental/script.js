	let elements = {
		txtPoints: document.querySelector("#res-points"),
		txtPointsIncome: document.querySelector("#points-income"),
        txtProducerPlus: document.querySelector("#plus"),
		btnPlusCost: document.querySelector("#plus-cost"),
		txtProducerMulti: document.querySelector("#multi"),
		btnMultiCost: document.querySelector("#multi-cost"),
		txtProducerPercent: document.querySelector("#percent"),
		btnPercentCost: document.querySelector("#percent-cost"),
		txtPrestige: document.querySelector("#prestige"),
		btnPrestigeCost: document.querySelector("#prestige-cost"),
		divGame: document.querySelector("#game"),
		divInfo: document.querySelector("#info"),
		divSettings: document.querySelector("#settings"),
		btnGame: document.querySelector("#tab-game"),
		btnInfo: document.querySelector("#tab-info"),
		btnSettings: document.querySelector("#tab-settings"),
		smallTabs: document.querySelector("#small-tabs"),
		autobuyersDisabled: document.querySelector("#autobuyers-disabled")
	};
	
	let numPoints = 1;
	let numPointsIncome = 0; // Saving not needed
	
	let plusAmount = 0;
	let plusCost = 1;
	let plusAmtIncrease = 1;  // Saving...
	let plusCostIncrease = 2; //  ...not needed?
	
	let havePlusAutobuyer = false; // Saving not needed
	
	let multiAmount = 1;
	let multiCost = 100;
	let multiAmtIncrease = 1;    // Saving...
	let multiCostIncrease = 100; //  ...not needed?
	
	let haveMultiAutobuyer = false; // Saving not needed
	
	let percentAmount = 0;
	let percentCost = number_expand(10, "k");
	let percentAmtIncrease = 1; 					  // Saving...
	let percentCostIncrease = number_expand(10, "k"); //  ...not needed?
	
	let prestigeAmount = 0;
	let prestigeCost = number_expand(100, "k");
	let prestigePower = 1000;  // Saving...
	let prestigeCostMulti = 2; //  ...not needed?
	
	elements.btnPrestigeCost.disabled = true;
	
	elements.divInfo.style.display = 'none';
	elements.divSettings.style.display = 'none';
	
	// Settings
	elements.smallTabs.addEventListener("change", () => {
		if (elements.smallTabs.checked) {
			// Switch the tab size to small
			elements.btnGame.classList.remove("tab");
			elements.btnInfo.classList.remove("tab");
			elements.btnSettings.classList.remove("tab");
		} else {
			elements.btnGame.classList.add("tab");
			elements.btnInfo.classList.add("tab");
			elements.btnSettings.classList.add("tab");
		}
	});
	
	elements.autobuyersDisabled.addEventListener("change", () => {
		if (elements.autobuyersDisabled.checked) {
			havePlusAutobuyer = false;
			haveMultiAutobuyer = false;
		} else {
			if(prestigeAmount > 0) havePlusAutobuyer = true;
			
			if(prestigeAmount > 1) haveMultiAutobuyer = true;
		}
	});
	
	// Click a tab to switch into it.
	elements.btnGame.addEventListener('click', function(evt) {
		elements.divInfo.style.display = "none";
		elements.divSettings.style.display = "none";
		elements.divGame.style.display = "block";
		
		// Gives the clicked tab class selected, after removing it from other tabs.
		elements.btnInfo.classList.remove("selected");
		elements.btnSettings.classList.remove("selected");
		elements.btnGame.classList.add("selected");
	});
	
	elements.btnInfo.addEventListener('click', function(evt) {
		elements.divGame.style.display = "none";
		elements.divSettings.style.display = "none";
		elements.divInfo.style.display = "block";
		
		elements.btnGame.classList.remove("selected");
		elements.btnSettings.classList.remove("selected");
		elements.btnInfo.classList.add("selected");
	});
	
	elements.btnSettings.addEventListener('click', function(evt) {
		elements.divGame.style.display = "none";
		elements.divInfo.style.display = "none";
		elements.divSettings.style.display = "block";
		
		elements.btnGame.classList.remove("selected");
		elements.btnInfo.classList.remove("selected");
		elements.btnSettings.classList.add("selected");
	});
	
	// Prestige resets everything, but gives you bonus income for faster runs.
	elements.btnPrestigeCost.addEventListener('click', function(evt) {	
		let prestigeProgress = Math.ceil(plusAmount * multiAmount); 
		
		prestigeProgress *= 1 + (percentAmount / 100);
		
		if(prestigeAmount > 0) prestigeProgress += prestigePower;
		
		//console.log(prestigeProgress);
		
		if(prestigeProgress < prestigeCost) return;
		
		prestigeAmount++;
		
		if(prestigeAmount === 1) havePlusAutobuyer = true;
		if(prestigeAmount === 2) haveMultiAutobuyer = true;
		
		prestigeCost *= prestigeCostMulti;
		prestigeCostMulti *= 2;
		
		if(prestigeAmount === 2) prestigeCost = number_expand(1, "m");
		if(prestigeAmount === 4) prestigeCost = number_expand(10, "b");
		if(prestigeAmount === 6) prestigeCost = number_expand(10, "t");
		if(prestigeAmount === 8) prestigeCost = number_expand(10, "qa");
		if(prestigeAmount === 10) prestigeCost = number_expand(10, "qi");
		
		prestigePower *= 10;
		updatePrestigeText();
		
		prestigeReset();
	});
	
	// This function can be used for both prestiges
	function prestigeReset() {
		numPoints = 1;
		numPointsIncome = 0;
	
		plusAmount = 0;
		plusCost = 1;
		plusAmtIncrease = 1;
		plusCostIncrease = 2;
	
		multiAmount = 1;
		multiCost = 100;
		multiAmtIncrease = 1;
		multiCostIncrease = 100;
	
		percentAmount = 0;
		percentCost = number_expand(10, "k");
		percentAmtIncrease = 1;
		percentCostIncrease = number_expand(10, "k");
		
		elements.btnMultiCost.disabled = true;
		elements.btnPercentCost.disabled = true;
		elements.btnPrestigeCost.disabled = true;
		
		updatePointsText();
		updatePlusText();
		updateMultiText();
		updatePercentageText();
	}
	
	// Having the event listeners made this way allows auto-buyers to call the function.
	elements.btnPlusCost.addEventListener('click', function(evt) {
		fnPlusCost();
	});
	
	function fnPlusCost() {
        if (numPoints < plusCost) return;
        
        plusAmount += plusAmtIncrease;
        numPoints -= plusCost;
        plusCost += plusCostIncrease;
		
		if (plusAmount === 10) {
			plusCostIncrease = 200;
			plusAmtIncrease = 10;
			plusCost = 200;
			numPoints = Math.ceil(numPoints / 10) * 10;
		}
		
		if (plusAmount === 100) {
			plusCostIncrease = 10000;
			plusAmtIncrease = 100;
			plusCost = 10000;
			numPoints = Math.ceil(numPoints / 100) * 100;
		}
		
		if (plusAmount === 1000) {
			plusCostIncrease = number_expand(5, "m");
			plusAmtIncrease = 1000;
			plusCost = number_expand(5, "m");
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (plusAmount === 10000) {
			plusCostIncrease = number_expand(500, "m");
			plusAmtIncrease = 10000;
			plusCost = number_expand(500, "m");
			numPoints = Math.ceil(numPoints / 10000) * 10000;
		}
		
		if (plusAmount === number_expand(100, "k")) {
			plusCostIncrease = number_expand(500, "b");
			plusAmtIncrease = number_expand(100, "k");
			plusCost = number_expand(500, "b");
			numPoints = Math.ceil(numPoints / number_expand(1, "m")) * number_expand(1, "m");
		}
		
		if (plusAmount === number_expand(1, "m")) {
			plusCostIncrease = number_expand(100, "t");
			plusAmtIncrease = number_expand(1, "m");
			plusCost = number_expand(100, "t");
			numPoints = Math.ceil(numPoints / number_expand(100, "m")) * number_expand(100, "m");
		}
		
		if (plusAmount === number_expand(10, "m")) {
			plusCostIncrease = number_expand(20, "qa");
			plusAmtIncrease = number_expand(10, "m");
			plusCost = number_expand(20, "qa");
			numPoints = Math.ceil(numPoints / number_expand(1, "b")) * number_expand(1, "b");
		}
		
		if (plusAmount === number_expand(100, "m")) {
			plusCostIncrease = number_expand(50, "qi");
			plusAmtIncrease = number_expand(100, "m");
			plusCost = number_expand(50, "qi");
			numPoints = Math.ceil(numPoints / number_expand(10, "b")) * number_expand(10, "b");
		}
		
		if (plusAmount === number_expand(1, "b")) {
			plusCostIncrease = number_expand(10000, "qi");
			plusAmtIncrease = number_expand(1, "b");
			plusCost = number_expand(10000, "qi");
			numPoints = Math.ceil(numPoints / number_expand(100, "b")) * number_expand(100, "b");
		}
		
        updatePlusText();
        updatePointsText();
		
		// The if checks are so it won't unnecessarily disable the buttons.
		if(numPoints < plusCost) elements.btnPlusCost.disabled = true;
		if(numPoints < multiCost) elements.btnMultiCost.disabled = true;
		if(numPoints < percentCost) elements.btnPercentCost.disabled = true;
    }
	
	elements.btnMultiCost.addEventListener('click', function(evt) {
		fnMultiCost();
	});
	
	function fnMultiCost() {
        if (numPoints < multiCost) return;
        
        multiAmount += multiAmtIncrease;
        numPoints -= multiCost;
        multiCost += multiCostIncrease;
		
		if (multiAmount === 10) {
			multiCostIncrease = 10000;
			multiAmtIncrease = 10;
			multiCost = 10000;
			numPoints = Math.ceil(numPoints / 100) * 100;
		}
		
		if (multiAmount === 100) {
			multiCostIncrease = number_expand(2, "m");
			multiAmtIncrease = 100;
			multiCost = number_expand(2, "m");
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (multiAmount === 1000) {
			multiCostIncrease = number_expand(200, "m");
			multiAmtIncrease = 1000;
			multiCost = number_expand(200, "m");
			numPoints = Math.ceil(numPoints / 10000) * 10000;
		}
		
		if (multiAmount === 10000) {
			multiCostIncrease = number_expand(5, "b");
			multiAmtIncrease = 10000;
			multiCost = number_expand(5, "b");
			numPoints = Math.ceil(numPoints / number_expand(1, "m")) * number_expand(1, "m");
		}
		
		if (multiAmount === number_expand(100, "k")) {
			multiCostIncrease = number_expand(1, "t");
			multiAmtIncrease = number_expand(100, "k");
			multiCost = number_expand(1, "t");
			numPoints = Math.ceil(numPoints / number_expand(100, "m")) * number_expand(100, "m");
		}
		
		if (multiAmount === number_expand(1, "m")) {
			multiCostIncrease = number_expand(50, "t");
			multiAmtIncrease = number_expand(1, "m");
			multiCost = number_expand(50, "t");
			numPoints = Math.ceil(numPoints / number_expand(10, "b")) * number_expand(10, "b");
		}
		
		if (multiAmount === number_expand(10, "m")) {
			multiCostIncrease = number_expand(10, "qa");
			multiAmtIncrease = number_expand(10, "m");
			multiCost = number_expand(10, "qa");
			numPoints = Math.ceil(numPoints / number_expand(100, "b")) * number_expand(100, "b");
		}
		
		if (multiAmount === number_expand(100, "m")) {
			multiCostIncrease = number_expand(20, "qi");
			multiAmtIncrease = number_expand(100, "m");
			multiCost = number_expand(20, "qi");
			numPoints = Math.ceil(numPoints / number_expand(1, "t")) * number_expand(1, "t");
		}
		
		// Hmm, these costs are getting huge...
		if (multiAmount === number_expand(1, "b")) {
			multiCostIncrease = number_expand(5000, "qi");
			multiAmtIncrease = number_expand(1, "b");
			multiCost = number_expand(5000, "qi");
			numPoints = Math.ceil(numPoints / number_expand(10, "t")) * number_expand(10, "t");
		}
		
        updateMultiText();
        updatePointsText();
		
		if(numPoints < plusCost) elements.btnPlusCost.disabled = true;
		if(numPoints < multiCost) elements.btnMultiCost.disabled = true;
		if(numPoints < percentCost) elements.btnPercentCost.disabled = true;
    }
	
	elements.btnPercentCost.addEventListener('click', function(evt) {
        if (numPoints < percentCost) return;
        
        percentAmount += percentAmtIncrease;
        numPoints -= percentCost;
        percentCost += percentCostIncrease;
		
		if (percentAmount === 10) {
			percentCostIncrease = number_expand(10, "m");
			percentAmtIncrease = 10;
			percentCost = number_expand(10, "m");
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (percentAmount === 100) {
			percentCostIncrease = number_expand(250, "b");
			percentAmtIncrease = 100;
			percentCost = number_expand(250, "b");
			numPoints = Math.ceil(numPoints / number_expand(100, "k")) * number_expand(100, "k");
		}
		
		if (percentAmount === 1000) {
			percentCostIncrease = number_expand(100, "t");
			percentAmtIncrease = 1000;
			percentCost = number_expand(100, "t");
			numPoints = Math.ceil(numPoints / number_expand(1, "m")) * number_expand(1, "m");
		}
		
		if (percentAmount === number_expand(10, "k")) {
			percentCostIncrease = number_expand(25, "qi");
			percentAmtIncrease = number_expand(10, "k");
			percentCost = number_expand(25, "qi");
			numPoints = Math.ceil(numPoints / number_expand(1, "qa")) * number_expand(1, "qa");
		}
		
		if (percentAmount === number_expand(100, "k")) {
			percentCostIncrease = number_expand(100000, "qi");
			percentAmtIncrease = number_expand(100, "k");
			percentCost = number_expand(100000, "qi");
			numPoints = Math.ceil(numPoints / number_expand(10, "qa")) * number_expand(10, "qa");
		}
		
        updatePercentageText();
        updatePointsText();
		
		if(numPoints < plusCost) elements.btnPlusCost.disabled = true;
		if(numPoints < multiCost) elements.btnMultiCost.disabled = true;
		if(numPoints < percentCost) elements.btnPercentCost.disabled = true;
    });
	
	// Here we update the HTML to show what has changed.
	function updatePointsText() {
        elements.txtPoints.textContent = thousands_separators(numPoints);
		elements.txtPointsIncome.textContent = thousands_separators(Math.ceil(numPointsIncome));
    }
	
	function updatePlusText() {
        elements.txtProducerPlus.textContent = "+" + thousands_separators(plusAmount);
        elements.btnPlusCost.textContent = "Cost (" + thousands_separators(plusCost) + ")";
    }
	
	function updateMultiText() {
        elements.txtProducerMulti.textContent = "*" + thousands_separators(multiAmount);
        elements.btnMultiCost.textContent = "Cost (" + thousands_separators(multiCost) + ")";
    }
	
	function updatePercentageText() {
        elements.txtProducerPercent.textContent = "+" + thousands_separators(percentAmount) + "%";
        elements.btnPercentCost.textContent = "Cost (" + thousands_separators(percentCost) + ")";
    }
	
	function updatePrestigeText() {
        elements.txtPrestige.textContent = "+" + thousands_separators(prestigePower) + " metaincome";
        elements.btnPrestigeCost.textContent = "Cost (" + thousands_separators(prestigeCost) + " income)";
    }
	
	//Utility function
	function thousands_separators(num)
	{
		let num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	}
	
	function number_expand(num, postfix = "")
	{
		//console.log(num + ", " + (num * get_extension(postfix)));
		
		return num * get_extension(postfix);
	}
	
	//From Technomancy by fuzzything44
	function get_extension(to_parse) {
		const postfixes = [
			"", "k", "m", "b", "t", "qa", "qi"
		];
		if (postfixes.indexOf(to_parse.toLowerCase()) == -1) {
			return 0;
		}
		return Math.pow(10, 3 * postfixes.indexOf(to_parse.toLowerCase()));
	}
    
    function gameLoop() {
        numPointsIncome = Math.ceil(plusAmount * multiAmount); 
		
		// Base multiplier of 1 and percentAmount divided with 100.
		numPointsIncome *= 1 + (percentAmount / 100);
		
		if(prestigeAmount > 0) numPointsIncome += prestigePower;
		
		numPoints += Math.ceil(numPointsIncome);
		
		// Player has autobuyer and double points than the cost.
		if(havePlusAutobuyer && numPoints > plusCost * 2) fnPlusCost();
		
		if(haveMultiAutobuyer && numPoints > multiCost * 2) fnMultiCost();
		
        updatePointsText();
		
		if(numPointsIncome > prestigeCost - 1) elements.btnPrestigeCost.disabled = false;
		
        window.setTimeout(gameLoop, 1000);
    }
    
    gameLoop();
	
	function displayLoop() {
		if(numPoints > plusCost - 1) elements.btnPlusCost.disabled = false;
		
		if(numPoints > multiCost - 1) elements.btnMultiCost.disabled = false;
		
		if(numPoints > percentCost - 1) elements.btnPercentCost.disabled = false;
		
		window.setTimeout(displayLoop, 100);
	}
	
	displayLoop();
	