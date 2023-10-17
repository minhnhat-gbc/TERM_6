"use strict";
exports.__esModule = true;
var customer_1 = require("./customer");

var customer1 = new customer_1.Customer("John", "Smith", 12);
customer1.greeter();
customer1.GetAge();

var customer2 = new customer_1.Customer("Ame", "Lyli", 32);
customer2.greeter();
customer2.GetAge();
