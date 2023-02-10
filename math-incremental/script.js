	var elements = {
		txtPoints: document.querySelector("#res-points"),
		txtPointsIncome: document.querySelector("#points-income"),
        txtProducerPlus: document.querySelector("#plus"),
		btnPlusCost: document.querySelector("#plus-cost"),
		txtProducerMulti: document.querySelector("#multi"),
		btnMultiCost: document.querySelector("#multi-cost"),
		txtProducerPercent: document.querySelector("#percent"),
		btnPercentCost: document.querySelector("#percent-cost"),
	};
	
	var numPoints = 1;
	var numPointsIncome = 0;
	
	var plusAmount = 0;
	var plusCost = 1;
	var plusAmtIncrease = 1;
	var plusCostIncrease = 2;
	
	var multiAmount = 1;
	var multiCost = 100;
	var multiAmtIncrease = 1;
	var multiCostIncrease = 100;
	
	var percentAmount = 0;
	var percentCost = 10000;
	var percentAmtIncrease = 1;
	var percentCostIncrease = 10000;
	
	elements.btnPlusCost.addEventListener('click', function(evt) {
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
			plusCostIncrease = 5000000;
			plusAmtIncrease = 1000;
			plusCost = 5000000;
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (plusAmount === 10000) {
			plusCostIncrease = 500000000;
			plusAmtIncrease = 10000;
			plusCost = 500000000;
			numPoints = Math.ceil(numPoints / 10000) * 10000;
		}
		
		if (plusAmount === 100000) {
			plusCostIncrease = 50000000000;
			plusAmtIncrease = 100000;
			plusCost = 50000000000;
			numPoints = Math.ceil(numPoints / 100000) * 100000;
		}
		
        updatePlusText();
        updatePointsText();
		
		elements.btnPlusCost.disabled = true;
		elements.btnMultiCost.disabled = true;
		elements.btnPercentCost.disabled = true;
    });
	
	elements.btnMultiCost.addEventListener('click', function(evt) {
        if (numPoints < multiCost) return;
        
        multiAmount += multiAmtIncrease;
        numPoints -= multiCost;
        multiCost += multiCostIncrease;
		
		if (multiAmount === 10) {
			multiCostIncrease = 10000;
			multiAmtIncrease = 10;
			multiCost = 10000;
			numPoints = Math.ceil(numPoints / 10) * 10;
		}
		
		if (multiAmount === 100) {
			multiCostIncrease = 5000000;
			multiAmtIncrease = 100;
			multiCost = 5000000;
			numPoints = Math.ceil(numPoints / 100) * 100;
		}
		
		if (multiAmount === 1000) {
			multiCostIncrease = 100000000;
			multiAmtIncrease = 1000;
			multiCost = 100000000;
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (multiAmount === 10000) {
			multiCostIncrease = 500000000;
			multiAmtIncrease = 10000;
			multiCost = 500000000;
			numPoints = Math.ceil(numPoints / 10000) * 10000;
		}
		
		if (multiAmount === 100000) {
			multiCostIncrease = 50000000000;
			multiAmtIncrease = 100000;
			multiCost = 50000000000;
			numPoints = Math.ceil(numPoints / 100000) * 100000;
		}
		
        updateMultiText();
        updatePointsText();
		
		elements.btnPlusCost.disabled = true;
		elements.btnMultiCost.disabled = true;
		elements.btnPercentCost.disabled = true;
    });
	
	elements.btnPercentCost.addEventListener('click', function(evt) {
        if (numPoints < percentCost) return;
        
        percentAmount += percentAmtIncrease;
        numPoints -= percentCost;
        percentCost += percentCostIncrease;
		
		if (percentAmount === 10) {
			percentCostIncrease = 1000000;
			percentAmtIncrease = 10;
			percentCost = 1000000;
			numPoints = Math.ceil(numPoints / 100) * 100;
		}
		
		if (percentAmount === 100) {
			percentCostIncrease = 100000000;
			percentAmtIncrease = 100;
			percentCost = 100000000;
			numPoints = Math.ceil(numPoints / 1000) * 1000;
		}
		
		if (percentAmount === 1000) {
			percentCostIncrease = 10000000000;
			percentAmtIncrease = 1000;
			percentCost = 10000000000;
			numPoints = Math.ceil(numPoints / 10000) * 10000;
		}
		
		if (percentAmount === 10000) {
			percentCostIncrease = 1000000000000;
			percentAmtIncrease = 10000;
			percentCost = 1000000000000;
			numPoints = Math.ceil(numPoints / 100000) * 100000;
		}
		
		if (percentAmount === 100000) {
			percentCostIncrease = 100000000000000;
			percentAmtIncrease = 100000;
			percentCost = 100000000000000;
			numPoints = Math.ceil(numPoints / 1000000) * 1000000;
		}
		
        updatePercentageText();
        updatePointsText();
		
		elements.btnPlusCost.disabled = true;
		elements.btnMultiCost.disabled = true;
		elements.btnPercentCost.disabled = true;
    });
	
	function updatePointsText() {
        elements.txtPoints.textContent = thousands_separators(numPoints);
		elements.txtPointsIncome.textContent = thousands_separators(Math.ceil(numPointsIncome));
    }
	
	function updatePlusText() {
        elements.txtProducerPlus.textContent = "+" + plusAmount;
        elements.btnPlusCost.textContent = "Cost (" + thousands_separators(plusCost) + ")";
    }
	
	function updateMultiText() {
        elements.txtProducerMulti.textContent = "*" + multiAmount;
        elements.btnMultiCost.textContent = "Cost (" + thousands_separators(multiCost) + ")";
    }
	
	function updatePercentageText() {
        elements.txtProducerPercent.textContent = "+" + percentAmount + "%";
        elements.btnPercentCost.textContent = "Cost (" + thousands_separators(percentCost) + ")";
    }
	
	//Utility function
	function thousands_separators(num)
	{
		var num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	}
    
    function gameLoop() {
        numPointsIncome = Math.ceil(plusAmount * multiAmount); 
		
		numPointsIncome *= 1 + (percentAmount / 100);
		
		numPoints += Math.ceil(numPointsIncome);
		
        updatePointsText();
		
		if(numPoints > plusCost - 1) elements.btnPlusCost.disabled = false;
		
		if(numPoints > multiCost - 1) elements.btnMultiCost.disabled = false;
		
		if(numPoints > percentCost - 1) elements.btnPercentCost.disabled = false;
		
        window.setTimeout(gameLoop, 1000);
    }
    
    gameLoop();
	
	