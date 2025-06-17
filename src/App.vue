<script setup>
import { ref } from 'vue'
import KeyEntryForm from './components/KeyEntryForm.vue'
import Generator from './components/Generator.vue' // Import the new component

const isAuthenticated = ref(false)

const handleSuccessfulVerification = () => {
  isAuthenticated.value = true
}
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
    <KeyEntryForm v-if="!isAuthenticated" @verification-success="handleSuccessfulVerification" />

    <Generator v-else />

  </div>
</template>