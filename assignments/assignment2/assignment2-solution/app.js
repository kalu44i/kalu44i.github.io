(function () {
'use strict';
var app = angular.module('ShoppingListCheckOff', []);

app.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);




ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {
	var shopList = this;
	shopList.items = ShoppingListCheckOffService.getBuyItems();
	shopList.errorMessage = "Everything is bought!";
	shopList.buy = function(index) {
		ShoppingListCheckOffService.buy(index);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var list = this;
	list.errorMessage = "Nothing bought yet.";

	list.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
	var service = this;
	var toBuyItems = [{ name: "cookies", quantity: 10 },
	{ name: "cookies", quantity: 11 },
	{ name: "cookies", quantity: 12 },
	{ name: "cookies", quantity: 13 },
	{ name: "cookies", quantity: 14 }];
	var boughtItems = [];

	service.getBuyItems = function() {
		return toBuyItems;
	}

	service.getBoughtItems = function() {
		return boughtItems;
	}

	service.buy = function(index) {
		var item = toBuyItems[index];
		toBuyItems.splice(index, 1);
		boughtItems.push(item);
	}


}
})();

