var OrderBook = function OrderBook() {
	this.orders = [];
};

OrderBook.prototype.placeOrder = function(order) {
	this.orders.push(order);
};

exports.OrderBook = OrderBook;
