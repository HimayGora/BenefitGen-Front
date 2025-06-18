// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head' // Import it
import App from './App.vue'
import './style.css'

const app = createApp(App)
const head = createHead() // Create an instance

app.use(head) // Tell your app to use it
app.mount('#app')