import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/styles/tailwind/tailwind.css";
import "../src/assets/styles/main.scss";
import Loader from "@/components/notification/Loader.vue";
import SmallLoader from "@/components/notification/SmallLoader.vue";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .component("Loader", Loader)
  .component("SmallLoader", SmallLoader)
  .mount("#app");
