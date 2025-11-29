import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// main.ts
// Suppress noisy ResizeObserver loop errors (dev overlay spam)
const isResizeObserverLoopError = (msg?: string) =>
  !!msg && msg.includes("ResizeObserver loop completed with undelivered notifications");

window.addEventListener(
  "error",
  (event: ErrorEvent) => {
    try {
      if (isResizeObserverLoopError(event?.message)) {
        event.stopImmediatePropagation();
        event.preventDefault();
        console.warn("ResizeObserver warning suppressed");
      }
    } catch (e) {
      // noop
    }
  },
  true // use capture so this runs before other handlers (webpack overlay)
);

window.addEventListener(
  "unhandledrejection",
  (event: PromiseRejectionEvent) => {
    try {
      const reason = (event && (event.reason as any)) || "";
      const message =
        typeof reason === "string" ? reason : reason && (reason.message || String(reason));
      if (isResizeObserverLoopError(message)) {
        event.preventDefault();
        console.warn("ResizeObserver rejection suppressed");
      }
    } catch (e) {
      // noop
    }
  },
  true
);

const ro = new ResizeObserver((entries) => {
  try {
    for (let entry of entries) {
      // handle resize
      console.log(entry.contentRect.width, entry.contentRect.height);
    }
  } catch (err) {
    // suppress the error
  }
});

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount("#app");
