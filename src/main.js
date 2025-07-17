// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'

axios.defaults.withCredentials = true;
const head = createHead()

createApp(App)
  .use(head)
  .use(router)
  .mount('#app')