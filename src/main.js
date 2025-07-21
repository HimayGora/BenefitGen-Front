// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'
import { createGtag } from 'vue-gtag'; // Correct import for vue-gtag v3.x
const head = createHead()
createApp(App)
  .use(head)
  .use(router)
  .use(gtag)
  .mount('#app')
