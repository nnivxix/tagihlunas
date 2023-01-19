import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faEye, faEyeSlash, faPlus, faArrowRightFromBracket, faArrowLeft, faPen} from '@fortawesome/free-solid-svg-icons';

import './style.css';
import App from './App.vue';
import router from "./router";

library.add(faEye, faEyeSlash, faPlus, faArrowRightFromBracket, faArrowLeft, faPen);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');