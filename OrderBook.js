var Trade = require("./Trade");

var OrderBook = function OrderBook() {
	this.buyOrders = [];
	this.sellOrders = [];
	this.trades = [];
};

OrderBook.prototype.placeOrder = function(order) {
	console.log(this.buyOrders.slice(0,5), this.sellOrders.slice(0,5));
	var orders;
	var passiveOrders;
	if(order.type === "1") {
		if(order.direction === "-1") {
			orders = this.buyOrders;
			passiveOrders = this.sellOrders;
		} else {
			orders = this.sellOrders;
			passiveOrders = this.buyOrders;
		}

		for(var i = passiveOrders.length - 1; i >= 0 && order.size > 0 && order.price > passiveOrders[i]; i--) {
			this.trade(order, order, passiveOrders[i], passiveOrders);
		}
		if(order.size !== 0) {
			orders.push(order);
			orders.sort(function(order1, order2) {
				return order1.price - order2.price || order1.time - order2.time;
			})
		}
	}
};

OrderBook.prototype.trade = function(order, order, passiveOrder, passiveOrders) {
	size = Math.min(order.price, passiveOrder.price);
	order.size -= size;
	passiveOrder.size -= size;
	this.trades.push(new Trade(passiveOrder.price, size));
	if(passiveOrder.size === 0) {
		this.passiveOrders.pop();
	}
}

module.exports = OrderBook;
