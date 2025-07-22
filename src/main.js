// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'

// 1. Define dataLayer and gtag globally and immediately.
// This makes it available to your ConsentBanner component right away.
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

const head = createHead()

function initGTM() {
  // Check if GTM is already initialized to prevent multiple loads
  if (window.gtmInitialized) {
    return;
  }

  // 2. Use the global gtag function to set the default consent state.
  window.gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });

  // 3. Load the actual GTM script. This is the part that's delayed.
  const gtmScript = document.createElement('script')
  gtmScript.async = true
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-59737C95'
  document.head.appendChild(gtmScript)

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  })

  window.gtmInitialized = true;
}

function injectNoScript() {
  const noscript = document.createElement('noscript')
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59737C95"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`
  document.body.appendChild(noscript)
}

const app = createApp(App)
  .use(head)
  .use(router)
  .mount('#app')

// 4. Use your original strategy to delay loading GTM and not block the app.
setTimeout(() => {
  initGTM()
  injectNoScript()
}, 1500); // Using 1.5 seconds as an example delay

// Track SPA pageviews
router.afterEach((to) => {
  // We check for dataLayer here because the user might deny consent,
  // but we still want to track pageviews for SPA navigation.
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page_path: to.fullPath,
      page_title: to.name || document.title,
    })
  }
})
