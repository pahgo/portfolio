var app = angular.module('app', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'chart.js']);
app.controller('MainCtrl', function($scope, $http) {
    if (localStorage.getItem("holdings")) {
		$scope.holdings = JSON.parse(localStorage.getItem("holdings"));
	}
	$scope.add = function() {
		$scope.holdings.push({editing:true, status:'Buy', uuid:generateUUID()});
		// saveAndReload($scope.holdings)
	}
	function generateUUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};
	$scope.getCurrentPrices = function() {
		//calls are expensive, use this to mock it
		var symbols = $scope.holdings.map(h => h.name.symbol);
		// return results.quotes;
		// var mybody = angular.element(document).find('body');
		// mybody.addClass('waiting');   // set cursor to hourglass
		var result = $http({
			url:"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=" + symbols.join(",") + "&region=US",
			method:"GET",
			headers: {
				"x-rapidapi-key": "3da9a06586msh81767504ee21385p15455djsn146dbf5a3e2d",
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}})
			.then(function(response) {
				$scope.holdings.filter(h => h.status != 'Sold').forEach(h => {
					h.market = response.data.quoteResponse.result.filter(r => r.symbol == h.name.symbol)[0];
					h.currentPrice = h.market.ask;
				});	
				saveAndReload($scope.holdings)
			});
			// updateVariables()
			// $scope.$apply();
			// mybody.removeClass('waiting');  // set cursor to normal
			return result;
  	};
// });
	$scope.download = function(){
      var a = document.createElement("a");

    //   var content = LZString.compress(JSON.stringify($scope.holdings));
      var content = JSON.stringify($scope.holdings);
 
      if (window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob([decodeURIComponent(content)], {
          type: "text/json;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, 'portfolioExtract.json');
      } else {
 
        a.href = 'data:attachment/json;charset=utf-8,' + encodeURI(content);
        a.target = '_blank';
        a.download = 'portfolioExtract.json';
        document.body.appendChild(a);
        a.click();
      }
    }
	$scope.upload = function() {
		console.log("Now");
		document.getElementById("uploadFile").click();		
		var timeout = 60000;
		const interval = 1000;
		var value;
		while (timeout - interval >= 0 && !value) {
			setTimeout(() => {
				if (document.getElementById("uploadFile").value) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var uploadedHoldings = JSON.parse(e.target.result);
						saveAndReload(uploadedHoldings);

					}
					reader.readAsText(document.getElementById("uploadFile").files[0]);
				}
			}, timeout - interval);
			timeout -= interval;
		}

	}

// /*Storage*/
// app.controller('tableCtrl', function($scope, $http) {

	// function updateVariables() {
	// 	$scope.soldOperations = $scope.holdings.filter(h => h.status === 'Sold');
	// 	$scope.totalResults = $scope.holdings.reduce((a,b) => +a + +($scope.currentVal(b) - $scope.enterCost(b)), 0).toFixed(2);
	// 	$scope.amountInvested = $scope.holdings.filter(h => h.status === 'Buy').map(h => (h.enter * h.shares).toFixed(2));
	// 	$scope.profitabilityOpen = $scope.holdings.filter(h => h.status === 'Buy').map(h => (((h.currentPrice * h.shares)/(h.enter * h.shares) -1)*100).toFixed(2));
	// 	$scope.labels = $scope.holdings.map(h => h.name.symbol);
	// 	$scope.openLabels = $scope.holdings.filter(h => h.status === 'Buy').map(h => h.name.symbol);
	// 	$scope.openPositions = $scope.holdings.filter(h => h.status === 'Buy');
	// 	$scope.profitabilityClosed = $scope.holdings.filter(h => h.status === 'Sold').map(h => (((h.currentPrice * h.shares)/(h.enter * h.shares) -1)*100).toFixed(2));
	// 	$scope.amountInvestedClosed = $scope.holdings.filter(h => h.status === 'Sold').map(h => (h.enter * h.shares).toFixed(2));
	// 	$scope.finalValue = $scope.holdings.filter(h => h.status === 'Sold').map(h => (h.currentPrice * h.shares).toFixed(2));
	// 	$scope.closedLabels = $scope.holdings.filter(h => h.status === 'Sold').map(h => h.name.symbol);
	// 	$scope.openColours = ["#0069af","#e42220","#eb671c","#feda02","#90c02e","#46a1d8","#243d91","#70368b"];
	// 	$scope.soldColours = ["#3e4d2d","#69652d","#937c2c","#875249","#7b2865","#bd94b2","#ffffff","#858585","#0a0a0a"];
	// 	$scope.totalInvested = $scope.amountInvested.reduce((a, b) => 1*a+b*1, 0);
	// 	$scope.currentValue = $scope.holdings.filter(h => h.status === 'Buy').map(h => (h.currentPrice * h.shares).toFixed(2));
	// 	$scope.currentTotal = $scope.currentValue.reduce((a, b) => 1*a+b*1, 0);
	// }
	// if ($scope.holdings) {
	// 	updateVariables();
	// }

// }).filter('side', function() {
// 	return function(side) {
// 		return status === side;
// 	}
	function saveAndReload(holdings) {
		localStorage.setItem("holdings", JSON.stringify(holdings));
		window.location.reload();
	}

});
