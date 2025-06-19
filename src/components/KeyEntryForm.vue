<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/api'
import { useRouter } from 'vue-router' // 1. Import useRouter

// We no longer need to emit an event
// const emit = defineEmits(['verificationSuccess'])

const betaKey = ref('')
const errorMessage = ref('')
const router = useRouter() // 2. Get the router instance

const checkKey = async () => {
  const apiUrl = API_ENDPOINTS.verify()
  errorMessage.value = ''

  try {
    const response = await axios.post(apiUrl, { key: betaKey.value });

    if (response.data.status === 'ok') {
      // 3. Navigate to the generator page on success
      router.push('/generator')
    }
  } catch (error) {
    console.error('Error verifying key:', error);
    errorMessage.value = 'Invalid key. Please try again.'
  }
}
</script>

<template>
  <div class="w-full max-w-auto">
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
          class="bg-amber-500 hover:bg-amber-600 text-rose-500 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Verify Key
        </button>
      </div>
    </form>
  </div>
</template>