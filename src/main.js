// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'

const head = createHead()

// Manual Google Analytics implementation
function initGoogleAnalytics() {
  // Create and load the gtag script
  const gtagScript = document.createElement('script')
  gtagScript.async = true
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-4WZEZQRZEE'
  document.head.appendChild(gtagScript)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  
  // Make gtag globally available
  window.gtag = gtag
  
  // Initialize gtag
  gtag('js', new Date())
  gtag('config', 'G-4WZEZQRZEE', {
    // Optional: Add additional config
    page_title: document.title,
    page_location: window.location.href
  })

  console.log('Google Analytics initialized manually')
  console.log('dataLayer:', window.dataLayer)
  console.log('gtag function:', window.gtag)
}

// Create and mount Vue app
const app = createApp(App)
  .use(head)
  .use(router)
  .mount('#app')

// Initialize Google Analytics after app mounts
initGoogleAnalytics()

// Optional: Track route changes if you're using Vue Router
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