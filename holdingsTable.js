app.component('holdingsTable', {
    templateUrl: 'holdingsTable.html',
    bindings: {
        holdings: '='
    }
}).controller('tableCtrl', function($scope, $http) {
	$scope.autocompleteQuery = function(searchText) {
		//calls are expensive, use this to mock it
		var results = {"explains":[],"count":15,"quotes":[{"exchange":"NMS","shortname":"Advanced Micro Devices, Inc.","quoteType":"EQUITY","symbol":"AMD","index":"quotes","score":5.93623E7,"typeDisp":"Equity","longname":"Advanced Micro Devices, Inc.","isYahooFinance":true},{"exchange":"CCY","shortname":"USD/AMD","quoteType":"CURRENCY","symbol":"AMD=X","index":"quotes","score":30208.0,"typeDisp":"Currency","isYahooFinance":true},{"exchange":"CCY","shortname":"AMD/RUX","quoteType":"CURRENCY","symbol":"AMDRUX=X","index":"quotes","score":30022.0,"typeDisp":"Currency","isYahooFinance":true},{"exchange":"CCY","shortname":"AMD/BRX","quoteType":"CURRENCY","symbol":"AMDBRX=X","index":"quotes","score":30015.0,"typeDisp":"Currency","isYahooFinance":true},{"exchange":"NMS","shortname":"Amdocs Limited","quoteType":"EQUITY","symbol":"DOX","index":"quotes","score":22649.0,"typeDisp":"Equity","longname":"Amdocs Limited","isYahooFinance":true},{"exchange":"NAS","shortname":"American Century Mid Cap Value ","quoteType":"MUTUALFUND","symbol":"AMDVX","index":"quotes","score":20180.0,"typeDisp":"Fund","longname":"American Century Mid Cap Value Fund R6 Class","isYahooFinance":true},{"exchange":"GER","shortname":"ADVANCED MIC.DEV.  DL-,01","quoteType":"EQUITY","symbol":"AMD.DE","index":"quotes","score":20078.0,"typeDisp":"Equity","longname":"Advanced Micro Devices, Inc.","isYahooFinance":true}],"news":[{"uuid":"fc76dbe8-0fb0-3994-9165-97b0738738eb","title":"AMD's PC CPU and GPU Chief Discusses Current and Next-Gen Products","publisher":"TheStreet.com","link":"https://finance.yahoo.com/m/fc76dbe8-0fb0-3994-9165-97b0738738eb/amd%27s-pc-cpu-and-gpu-chief.html","providerPublishTime":1605019740,"type":"STORY"},{"uuid":"180081b5-5618-32ea-9b04-61f657a0b414","title":"AMD Unveils AMD Ryzen™ Embedded V2000 Processors with Enhanced Performance and Power Efficiency","publisher":"GlobeNewswire","link":"https://finance.yahoo.com/news/amd-unveils-amd-ryzen-embedded-140000963.html","providerPublishTime":1605016800,"type":"STORY"},{"uuid":"719f351f-54eb-383a-9205-dd45b5d382e3","title":"Clearside Biomedical Announces Third Quarter 2020 Financial Results and Provides Corporate Update","publisher":"GlobeNewswire","link":"https://finance.yahoo.com/news/clearside-biomedical-announces-third-quarter-210500471.html","providerPublishTime":1605042300,"type":"STORY"},{"uuid":"e204a3e9-f06d-3fc6-b621-13dab5a7cc92","title":"Why Shares of Zoom, Pinterest, and Advanced Micro Devices Fell Today","publisher":"Motley Fool","link":"https://finance.yahoo.com/m/e204a3e9-f06d-3fc6-b621-13dab5a7cc92/why-shares-of-zoom%2C.html","providerPublishTime":1605036360,"type":"STORY"},{"uuid":"9a45477d-cb2b-3056-a034-6420f176d7e2","title":"Dow Jones Futures: Stock Market Rotation Continues; 6 Tech Giants Sell Off","publisher":"Investor's Business Daily","link":"https://finance.yahoo.com/m/9a45477d-cb2b-3056-a034-6420f176d7e2/dow-jones-futures%3A-stock.html","providerPublishTime":1605047277,"type":"STORY"},{"uuid":"0b7fb3ca-59dc-315d-b328-f4ff0d97b8bb","title":"Model N Announces Fourth Quarter and Fiscal Year 2020 Financial Results","publisher":"Business Wire","link":"https://finance.yahoo.com/news/model-n-announces-fourth-quarter-211500171.html","providerPublishTime":1605042900,"type":"STORY"},{"uuid":"95df8b47-493d-3d8a-b3e5-43f1f660de6d","title":"AMD Launches AMD Ryzen 5000 Series Desktop Processors: The Fastest Gaming CPUs in the World","publisher":"GlobeNewswire","link":"https://finance.yahoo.com/news/amd-launches-amd-ryzen-5000-163000254.html","providerPublishTime":1602174600,"type":"STORY"},{"uuid":"941aea23-3d9b-3633-a5f7-4f29bcdf95df","title":"AMD Is in Advanced Talks to Buy Xilinx","publisher":"The Wall Street Journal","link":"https://finance.yahoo.com/m/941aea23-3d9b-3633-a5f7-4f29bcdf95df/amd-is-in-advanced-talks-to.html","providerPublishTime":1602205800,"type":"STORY"}],"nav":[],"lists":[],"researchReports":[],"totalTime":23,"timeTakenForQuotes":408,"timeTakenForNews":600,"timeTakenForAlgowatchlist":400,"timeTakenForPredefinedScreener":400,"timeTakenForCrunchbase":0,"timeTakenForNav":400,"timeTakenForResearchReports":0};
		// return results.quotes;
		return $http({
			url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q="+searchText+"&region=US",
			method:"GET",
			headers: {
				"x-rapidapi-key": "3da9a06586msh81767504ee21385p15455djsn146dbf5a3e2d",
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}})
			.then(function(data) {
				// Map the response object to the data object.
				//map(x => x.shortname)
				return data.data.quotes;});
  	};

	$scope.change = function(uuid) {
        var ind = getIndexByUuid($scope.$ctrl, uuid);
		$scope.$ctrl.holdings[ind].editing = !($scope.$ctrl.holdings[ind].editing);
		saveAndReload($scope.$ctrl.holdings)
		// updateVariables();
	}
	$scope.sell = function(uuid) {
        var ind = getIndexByUuid($scope.$ctrl, uuid);
		$scope.$ctrl.holdings[ind].status = "Selling";
	}
	$scope.confirmSell = function(uuid) {
        var ind = getIndexByUuid($scope.$ctrl, uuid);
		$scope.$ctrl.holdings[ind].status = "Sold";
		saveAndReload($scope.$ctrl.holdings)
		// updateVariables();
	}
	$scope.delete = function(uuid) {
        var ind = getIndexByUuid($scope.$ctrl, uuid);
		$scope.$ctrl.holdings.splice(ind, 1); 
		saveAndReload($scope.$ctrl.holdings)
	}

	$scope.enterCost = function(holding) {
		return enterCost(holding);
	}
	$scope.currentVal = function(holding) {
		return currentVal(holding);
    }
    enterCost = function(holding) {
		var result = parseFloat(((holding.shares * holding.enter) + holding.commissions).toFixed(2));
		return Number.isNaN(result) ? 0 : result;
	}
	currentVal = function(holding) {
		var result = parseFloat(((holding.shares * holding.currentPrice) - holding.commissions).toFixed(2));
		return Number.isNaN(result) ? 0 : result;
	}
	
	function saveAndReload(holdings) {
		localStorage.setItem("holdings", JSON.stringify(holdings));
		window.location.reload();
	}
	$scope.totalResults = $scope.$ctrl.holdings.reduce((a,b) => +a + +(currentVal(b) - enterCost(b)), 0).toFixed(2);

    function getIndexByUuid(list, uuid) {
        return list.holdings.indexOf(list.holdings.find(h => h.uuid === uuid))
    }
});