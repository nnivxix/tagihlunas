import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "@/App.vue";
import router from "@/router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import Icon from "@/components/Icon.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("DefaultLayout", DefaultLayout);
app.component("GuestLayout", GuestLayout);
app.component("Icon", Icon);
app.mount("#app");
