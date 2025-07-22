<template>
  <div v-if="showBanner" id="consent-banner">
    <p>We use cookies to improve your experience. By clicking "Accept," you agree to our use of cookies for analytics.</p>
    <div id="consent-buttons">
      <button @click="acceptConsent" id="btn-accept">Accept</button>
      <button @click="denyConsent" id="btn-deny">Deny</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showBanner = ref(true);

// Helper function to set a cookie
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Helper function to get a cookie
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const acceptConsent = () => {
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
  setCookie('consent_choice', 'granted', 180);
  showBanner.value = false;
};

const denyConsent = () => {
  window.gtag('consent', 'update', {
    'analytics_storage': 'denied'
  });
  setCookie('consent_choice', 'denied', 180);
  showBanner.value = false;
};

// This code runs after the component is mounted on the client-side
onMounted(() => {
  if (!getCookie('consent_choice')) {
    showBanner.value = true;
  }
});
</script>

<style scoped>
#consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #222;
  color: #fff;
  padding: 15px 20px;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  font-family: sans-serif;
}
/* ... all other CSS from the previous example ... */
#consent-banner p { margin: 0; padding-right: 20px; }
#consent-buttons button { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px; }
#btn-accept { background-color: #4CAF50; color: white; }
#btn-deny { background-color: #f44336; color: white; }
</style>