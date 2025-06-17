<script setup>
import { ref } from 'vue'
import axios from 'axios'

// We need to declare the custom event this component can send
const emit = defineEmits(['verificationSuccess'])

const betaKey = ref('')
const errorMessage = ref('') // New state to hold error messages

const checkKey = async () => {
  const apiUrl = '3.134.238.10/api/verify'
  errorMessage.value = '' // Clear previous errors

  try {
    const response = await axios.post(apiUrl, { key: betaKey.value });

    if (response.data.status === 'ok') {
      // On success, instead of an alert, we emit an event to the parent
      emit('verificationSuccess')
    }
  } catch (error) {
    // On failure, we set the error message to display it to the user
    console.error('Error verifying key:', error);
    errorMessage.value = 'Invalid key. Please try again.'
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <form @submit.prevent="checkKey" class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="betaKey" class="block text-gray-300 text-sm font-bold mb-2">
          Beta Access Key
        </label>
        <input 
          v-model="betaKey"
          type="text" 
          id="betaKey"
          placeholder="Enter your key"
          class="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"
        >
      </div>

      <p v-if="errorMessage" class="text-red-500 text-xs italic mb-4">
        {{ errorMessage }}
      </p>

      <div class="flex items-center justify-center">
        <button 
          type="submit"
          class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Verify Key
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>