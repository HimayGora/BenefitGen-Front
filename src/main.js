// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'

const head = createHead()

// Load Google Analytics after everything else is ready
function initGoogleAnalytics() {
  // Delay loading to not block initial render
  setTimeout(() => {
    const gtagScript = document.createElement('script')
    gtagScript.async = true
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-4WZEZQRZEE'
    document.head.appendChild(gtagScript)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    
    gtag('js', new Date())
    gtag('config', 'G-4WZEZQRZEE')
  }, 1000) // Load after 1 second delay
}

// Create and mount Vue app
const app = createApp(App)
  .use(head)
  .use(router)
  .mount('#app')

// Initialize Google Analytics with delay to not block page load
setTimeout(initGoogleAnalytics, 1000)

// Track route changes
if (router) {
  router.afterEach((to) => {
    if (window.gtag) {
      window.gtag('config', 'G-4WZEZQRZEE', {
        page_path: to.path,
        page_title: to.name || document.title
      })
    }
  })
}