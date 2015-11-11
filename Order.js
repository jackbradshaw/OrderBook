var Order = function Order(message) {
	var messageItems = message.split(",");
	this.time = messageItems.shift();
	this.type = messageItems.shift();
	this.id = messageItems.shift();
	this.size = messageItems.shift();
	this.price = messageItems.shift();
	this.direction = messageItems.shift();
}

exports.Order = Order;
