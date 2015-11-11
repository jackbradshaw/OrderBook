var fs = require("fs");
var Order = require("./Order");

var OrderPlacer = function OrderPlacer(orderBook, orderFile) {
	this.orderBook = orderBook;
	this.highestBuy = 0;
	this.lowestSell = Infinity;
	this.orders = fs.readFileSync(orderFile, {
		encoding: "utf-8"
	})
		.split("\n")
		.slice(0, 1000)
		.map(function(line) {
			var messageItems = line.split(",");

			return new Order(
				this.time = parseFloat(messageItems.shift()),
				this.type = parseInt(messageItems.shift()),
				this.id = messageItems.shift(),
				this.size = parseFloat(messageItems.shift()),
				this.price = parseFloat(messageItems.shift()),
				this.direction = parseInt(messageItems.shift()));
		});

		this.scheduleOrder();
};

OrderPlacer.prototype.scheduleOrder = function(time) {
	setTimeout(this.timeout.bind(this), time || 0, this);
}

OrderPlacer.prototype.timeout = function() {
	var order = this.orders.shift();
	if(order.type === 1) {
		if(order.direction === 1) {
			var direction = "buy";
			this.highestBuy < order.price && (this.highestBuy = order.price);
		} else {
			var direction = "sell";
			this.lowestSell > order.price && (this.lowestSell = order.price);
		}
		console.log(direction, order.price, order.size, "(lowest sell: "+ this.lowestSell + ", highest buy: " + this.highestBuy + ")");
		order && this.orderBook.placeOrder(order);
	}
	var nextOrder = this.orders[this.orders.length - 1];

	nextOrder && this.scheduleOrder(nextOrder.time - order.time);
}

module.exports = OrderPlacer;
