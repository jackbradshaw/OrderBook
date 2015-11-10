var OrderBook = require("./OrderBook").OrderBook;
var OrderPlacer = require("./OrderPlacer").OrderPlacer;

console.log(OrderBook);

var orderBook = new OrderBook();
var orderPlacer = new OrderPlacer(orderBook, "./messages.csv");

console.log(orderPlacer.orders);
