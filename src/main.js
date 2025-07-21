// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'
import VueGtag from 'vue-gtag';

const head = createHead()

createApp(App)
  .use(head)
  .use(router)
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GA_MEASUREMENT_ID }
  }, router)
  .mount('#app')