"use strict";
exports.__esModule = true;
exports.useOrder = void 0;
var vue_1 = require("vue");
var Customer_1 = require("../models/Customer");
var order_json_1 = require("../data/order.json");
var nextOrderId = 100;
var orders = vue_1.ref([]);
var selectedOrder = vue_1.ref(null);
function useOrder() {
    vue_1.onMounted(function () {
        if (order_json_1["default"] && order_json_1["default"].length) {
            // Convert JSON customer objects into Customer instances
            orders.value = order_json_1["default"].map(function (o) { return ({
                id: nextOrderId++,
                customer: new Customer_1.Customer(o.customer.id, o.customer.name),
                food: o.food,
                quantity: o.quantity,
                notes: o.notes
            }); });
        }
    });
    function createOrder(customer, food, notes) {
        var _a;
        var first = food && food.length ? food[0] : null;
        // Use customer's placeOrder helper, then adjust quantity from the array
        var order = customer.placeOrder(nextOrderId++, first, notes);
        // If multiple items were passed, record quantity accordingly
        order.quantity = (_a = food === null || food === void 0 ? void 0 : food.length) !== null && _a !== void 0 ? _a : 1;
        orders.value.push(order);
        return order;
    }
    function openOrder(order) {
        selectedOrder.value = order;
    }
    return { orders: orders, selectedOrder: selectedOrder, createOrder: createOrder, openOrder: openOrder };
}
exports.useOrder = useOrder;
