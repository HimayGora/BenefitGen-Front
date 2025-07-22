// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'
import App from './App.vue'
import './style.css'

const head = createHead()

// --- THIS FUNCTION IS UPDATED ---
function initGTM() {
  // 1. Initialize dataLayer and the gtag helper function.
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // 2. Set the default consent state to 'denied' BEFORE loading GTM.
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });

  // 3. Now, load the GTM script as you were before.
  const gtmScript = document.createElement('script')
  gtmScript.async = true
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-59737C95'
  document.head.appendChild(gtmScript)

  // This original gtm.js event is still fine to keep.
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  })
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

// Load GTM after delay to avoid blocking first paint
setTimeout(() => {
  initGTM()
  injectNoScript()
}, 1000)

// Track SPA pageviews
router.afterEach((to) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page_path: to.fullPath,
      page_title: to.name || document.title,
    })
  }
})