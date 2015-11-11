var fs = require("fs");
var Order = require("./Order").Order;

var OrderPlacer = function OrderPlacer(orderBook, orderFile) {
	this.orderBook = orderBook;
	this.orders = fs.readFileSync(orderFile, {
		encoding: "utf-8"
	})
		.split("\n")
		.slice(0, 1000)
		.map(function(line) {
			return new Order(line);
		})

		this.orders.forEach(function(order) {
			this.orderBook.placeOrder(order);
		}, this);
};

module.exports = OrderPlacer;
