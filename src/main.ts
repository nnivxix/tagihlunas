import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
// import Avatar from 'vue-avatar'

const app = createApp(App)

// app.component('avatar', Avatar)
app.use(router)
app.mount('#app')
