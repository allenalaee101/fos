import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// main.ts
const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;

const nativeResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserverOverride extends nativeResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (err: any) {
        // ignore ResizeObserver loop errors
        if (!resizeObserverLoopErrRe.test(err.message)) {
          throw err; // rethrow other errors
        }
      }
    });
  }
};

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount("#app");
