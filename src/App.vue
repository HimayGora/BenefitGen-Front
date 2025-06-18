<script setup>
import { ref } from 'vue'
// Import your new LandingPage component
import LandingPage from './components/LandingPage.vue' 
import Generator from './components/Generator.vue'

const isAuthenticated = ref(false)

const handleSuccessfulVerification = () => {
  isAuthenticated.value = true
}
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
    
    <LandingPage v-if="!isAuthenticated" @verification-success="handleSuccessfulVerification" />

    <Generator v-else />

  </div>
</template>