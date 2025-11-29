"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
require("vuetify/styles");
var vuetify_1 = require("vuetify");
var components = require("vuetify/components");
var directives = require("vuetify/directives");
// main.ts
// Suppress noisy ResizeObserver loop errors (dev overlay spam)
var isResizeObserverLoopError = function (msg) {
    return !!msg && msg.includes("ResizeObserver loop completed with undelivered notifications");
};
window.addEventListener("error", function (event) {
    try {
        if (isResizeObserverLoopError(event === null || event === void 0 ? void 0 : event.message)) {
            event.stopImmediatePropagation();
            event.preventDefault();
            console.warn("ResizeObserver warning suppressed");
        }
    }
    catch (e) {
        // noop
    }
}, true // use capture so this runs before other handlers (webpack overlay)
);
window.addEventListener("unhandledrejection", function (event) {
    try {
        var reason = (event && event.reason) || "";
        var message = typeof reason === "string" ? reason : reason && (reason.message || String(reason));
        if (isResizeObserverLoopError(message)) {
            event.preventDefault();
            console.warn("ResizeObserver rejection suppressed");
        }
    }
    catch (e) {
        // noop
    }
}, true);
var ro = new ResizeObserver(function (entries) {
    try {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            // handle resize
            console.log(entry.contentRect.width, entry.contentRect.height);
        }
    }
    catch (err) {
        // suppress the error
    }
});
var vuetify = vuetify_1.createVuetify({
    components: components,
    directives: directives
});
vue_1.createApp(App_vue_1["default"]).use(vuetify).use(router_1["default"]).mount("#app");
