import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import clickOutside from "./directives/click-outside";
import "./assets/css/styles.css";

const app = createApp(App);
app.directive("click-outside", clickOutside);
app.use(store);

app.mount("#app");
