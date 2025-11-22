"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
exports.Manager = void 0;
var BasePerson_1 = require("./BasePerson");
var Manager = /** @class */ (function (_super) {
  __extends(Manager, _super);
  function Manager() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Manager.prototype.getRole = function () {
    return "Manager";
  };
  return Manager;
})(BasePerson_1.BasePerson);
exports.Manager = Manager;
