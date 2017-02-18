(function() {
	'use strict';
	var app = angular.module('NarrowItDownApp', []);

	app.controller("NarrowItDownController", NarrowItDownController)
	.service("MenuSearchService", MenuSearchService)
	.directive("foundItems", FoundItems);


	NarrowItDownController.$inject = ['MenuSearchService']; 
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;
		
		ctrl.narrowIt = function() {
			var promice= MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
			promice.then(function(result) {
				ctrl.foundItems = result;
				console.log("ctrl.foundItems = ", ctrl.foundItems.length);
			})
		};
		
		ctrl.removeItem = function(index) {
			ctrl.foundItems.splice(index, 1);
		};

	};


	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;
		
		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			}).then(function (response) {
    			var items = response.data.menu_items;
    			var foundItems = [];
    			for (var i = 0; i < items.length; i++) {
    				if (items[i].description.indexOf(searchTerm) !== -1) {
    					foundItems.push(items[i]);
    				}
    			}
    			return foundItems;
  			})
  			.catch(function (error) {
    			console.log("Something went terribly wrong.");
  			});
		};


	};


	function FoundItems() {
		return {
			replace: true,
			restrict: "E",
			templateUrl: "result.html",
			scope: {
				foundItems: "<",
				onRemove: "&"
			},
			controller: NarrowItDownController,
    		controllerAs: 'ctrl',
			bindToController: true
		};
	}


})()