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
            orders.value = order_json_1["default"].map(function (o) {
                var foods = Array.isArray(o.food) ? o.food : [o.food];
                return {
                    id: nextOrderId++,
                    customer: new Customer_1.Customer(o.customer.id, o.customer.name),
                    food: foods.map(function (f) { return ({
                        id: f.id,
                        name: f.name,
                        type: f.type,
                        price: f.price,
                        description: f.description
                    }); }),
                    quantity: o.quantity,
                    notes: o.notes
                };
            });
        }
    });
    function createOrder(customer, foods, notes) {
        if (!foods || foods.length === 0)
            throw new Error("Order must have at least one food item");
        var order = {
            id: nextOrderId++,
            customer: customer,
            food: foods,
            quantity: foods.length,
            notes: notes || ""
        };
        orders.value.push(order);
        return order;
    }
    function openOrder(order) {
        selectedOrder.value = order;
    }
    return { orders: orders, selectedOrder: selectedOrder, createOrder: createOrder, openOrder: openOrder };
}
exports.useOrder = useOrder;
