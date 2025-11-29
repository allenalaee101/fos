"use strict";
exports.__esModule = true;
exports.BasePerson = void 0;
var BasePerson = /** @class */ (function () {
    function BasePerson(id, name) {
        this.id = id;
        this.name = name;
    }
    // Base person should be initiated and needs subclass for roles and inheritancs so its an class base componant
    BasePerson.prototype.placeOrder = function (orderId, food, note) {
        return {
            id: orderId,
            customer: this,
            food: food,
            quantity: 1,
            notes: note || ""
        };
    };
    return BasePerson;
}());
exports.BasePerson = BasePerson;
