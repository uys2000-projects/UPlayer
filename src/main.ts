import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { setULogger } from "u-logger";

setULogger(true, false);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
