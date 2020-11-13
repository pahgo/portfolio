var app = angular.module('app', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'chart.js']);
app.component('myRow', {
	bindings: {
		data : '<'
	},
	templateUrl: 'myRow.html'
});