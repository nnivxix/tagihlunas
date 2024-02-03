import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faArrowRightFromBracket,
  faArrowLeft,
  faPen,
  faXmark,
  faArrowDownAZ,
  faEllipsisVertical,
  faX,
  faArrowUpFromBracket,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";
import "./style.css";
import App from "@/App.vue";
import router from "@/router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import Icon from "@/components/Icon.vue";

library.add(
  faEye,
  faEyeSlash,
  faPlus,
  faArrowRightFromBracket,
  faArrowLeft,
  faPen,
  faXmark,
  faArrowDownAZ,
  faEllipsisVertical,
  faX,
  faArrowUpFromBracket,
  faCopy
);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("DefaultLayout", DefaultLayout);
app.component("GuestLayout", GuestLayout);
app.component("Icon", Icon);
app.mount("#app");
