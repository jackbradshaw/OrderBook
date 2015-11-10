var fs = require("fs");
var Order = require("./Order").Order;

var OrderPlacer = function OrderPlacer(orderBook, orderFile) {
	this.orderBook = orderBook;
	this.orders = fs.readFileSync(orderFile, {
		encoding: "utf-8"
	}).slice(0, 500)
		.split("\n")
		.map(function(line) {
			return new Order(line);
		})
};

exports.OrderPlacer = OrderPlacer;
