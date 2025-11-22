"use strict";
exports.__esModule = true;
exports.useMenu = void 0;
var vue_1 = require("vue");
var food_json_1 = require("../data/food.json");
function useMenu() {
  var food = vue_1.ref([]);
  vue_1.onMounted(function () {
    food.value = food_json_1["default"];
  });
  return { food: food };
}
exports.useMenu = useMenu;
