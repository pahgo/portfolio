var module = angular.module('app', []);
module.controller('StockCtrl', function ($scope, $http) {

	$scope.symbol = "";
	$scope.result={};


	$scope.getData = function() {

		var req = {
			"url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=" +$scope.symbol+ "&region=US",
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "3da9a06586msh81767504ee21385p15455djsn146dbf5a3e2d",
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}
		};
		console.log("req: " + JSON.stringify(req));
	    $http(req).then(function(data) {
	    	console.log("success data="+ JSON.stringify(data));
	    	if(data.query.results == null) {
	    		console.log("No Valid Results could be Returned!!")
	    	}
	    	else {
		        $scope.result.Name = "Name: " + data.query.results.quote.Name;
		        $scope.result.Exchange = "Exchange: " + data.query.results.quote.StockExchange;
		        $scope.result.MarketCap = "MarketCap: " + data.query.results.quote.MarketCapitalization;
		        $scope.result.LastPrice = "Bid Price: " + data.query.results.quote.LastTradePriceOnly;
		        $scope.result.PercentChange = "% Change: " + data.query.results.quote.PercentChange;
		        $scope.result.YearRange = "Year Range: " + data.query.results.quote.YearRange;
		    }
	    }, function(err) {
	        var err = status + ", " + data;
	            $scope.result = "Request failed: " + err;
	    }
		);
	};

});
