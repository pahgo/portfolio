app.component('charts', {
    templateUrl: 'charts.html',
    bindings: {
        holdings: '=',
        colors: '<', 
        side: '<'
    }
}).controller('ChartCtrl', function($scope) {
    if (angular.isUndefined($scope.$ctrl.colors)) {
        if ($scope.$ctrl.side === 'Buy') {
            $scope.$ctrl.colors = ["#0069af","#e42220","#eb671c","#feda02","#90c02e","#46a1d8","#243d91","#70368b"];
        } else {
            $scope.$ctrl.colors = ["#3e4d2d","#69652d","#937c2c","#875249","#7b2865","#bd94b2","#ffffff","#858585","#0a0a0a"];
        }
    }

    function updateVariables() {
        holdings = $scope.$ctrl.holdings.filter(h => h.status === $scope.$ctrl.side);
        $scope.labels = holdings.map(h => h.name.symbol);
        $scope.amountInvested = holdings.map(h => (h.enter * h.shares).toFixed(2));
		$scope.currentValue = holdings.map(h => (h.currentPrice * h.shares).toFixed(2));
		$scope.profitability = holdings.map(h => (((h.currentPrice * h.shares)/(h.enter * h.shares) -1)*100).toFixed(2));
		$scope.totalInvested = $scope.amountInvested.reduce((a, b) => 1*a+b*1, 0);
		$scope.currentTotal = $scope.currentValue.reduce((a, b) => 1*a+b*1, 0);
    }
    updateVariables();
});

