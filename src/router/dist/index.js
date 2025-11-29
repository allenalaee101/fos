"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var HomeView_vue_1 = require("../views/HomeView.vue");
var AboutView_vue_1 = require("../views/AboutView.vue");
var routes = [
    { path: "/", name: "home", component: HomeView_vue_1["default"] },
    { path: "/about", name: "about", component: AboutView_vue_1["default"] },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(),
    routes: routes
});
exports["default"] = router;
