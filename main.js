var OrderBook = require("./OrderBook");
var OrderPlacer = require("./OrderPlacer");


var orderBook = new OrderBook();
var orderPlacer = new OrderPlacer(orderBook, "./messages.csv");

console.log(orderBook.trades);
