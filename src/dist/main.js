"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
require("vuetify/styles");
var vuetify_1 = require("vuetify");
var components = require("vuetify/components");
var directives = require("vuetify/directives");
// main.ts
var resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;
var nativeResizeObserver = window.ResizeObserver;
window.ResizeObserver = /** @class */ (function (_super) {
    __extends(ResizeObserverOverride, _super);
    function ResizeObserverOverride(callback) {
        return _super.call(this, function (entries, observer) {
            try {
                callback(entries, observer);
            }
            catch (err) {
                // ignore ResizeObserver loop errors
                if (!resizeObserverLoopErrRe.test(err.message)) {
                    throw err; // rethrow other errors
                }
            }
        }) || this;
    }
    return ResizeObserverOverride;
}(nativeResizeObserver));
var vuetify = vuetify_1.createVuetify({
    components: components,
    directives: directives
});
vue_1.createApp(App_vue_1["default"]).use(vuetify).use(router_1["default"]).mount("#app");
