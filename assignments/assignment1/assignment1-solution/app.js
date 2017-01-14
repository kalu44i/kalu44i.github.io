var app = angular.module('nickApp', [])

app.controller('MealController', MealController);

MealController.$inject = ['$scope'];
function MealController($scope) {
	$scope.checkMenu = function() {
		var menu = $scope.menu;
		if (menu) {
			var menuArr = menu.split(",");
			var length = getLengthOfNonEmptyValues(menuArr);
			if (length <= 3) {
				$scope.message = "Enjoy!";
			} else {
				$scope.message = "Too much!";
			}
		} else {
			$scope.message = "Please enter data first";
		}
	};
};

function getLengthOfNonEmptyValues(array) {
	var count = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i].trim().length != 0) {
			count++;
		}
	}
	console.log("count=");
	console.log(count);
	return count;
}