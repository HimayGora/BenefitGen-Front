<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/api'
import { useRouter } from 'vue-router'

const email = ref('') // Changed from username
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    // The payload now sends 'email' instead of 'username'
    const response = await axios.post(API_ENDPOINTS.register(), {
      email: email.value,
      password: password.value
    });

    if (response.data.status === 'ok') {
      successMessage.value = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch (error) {
    console.error('Error registering:', error);
     if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message || 'Registration failed.';
    } else {
        errorMessage.value = 'An error occurred. Please try again.';
    }
  }
}
useHead({
  title: 'AI Benefit Copy Generator | Convert Features to Benefits',
  meta: [
    {
      name: 'description',
      content: 'Effortlessly translate product features into powerful benefit copy with our AI-powered generator. Perfect for marketers and founders looking to craft compelling copy that converts.',
    },
    { property: 'og:title', content: 'AI Benefit Copy Generator | Convert Features to Benefits' },
    { property: 'og:description', content: 'Turn your product features into marketing copy that sells. Get beta access to our AI-powered generator.' },
    { property: 'og:url', content: 'https://generator.hsgportfolio.com' },
    { property: 'og:image', content: 'https://generator.hsgportfolio.com/BFG.png' },
  ],
})
</script>

<template>
  <div class="w-full max-w-md">
    <form @submit.prevent="handleRegister" class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h1 class="text-2xl font-bold text-center mb-6 text-amber-400">Create Account</h1>
      <div class="mb-4">
        <label for="email" class="block text-gray-300 text-sm font-bold mb-2">
          Email Address
        </label>
        <input 
          v-model="email"
          type="email" 
          id="email"
          placeholder="Enter your email"
          class="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"
        >
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Create a secure password"
          class="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500">
      </div>
      <p v-if="errorMessage" class="text-red-500 text-xs italic mb-4">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 text-xs italic mb-4">{{ successMessage }}</p>
      <div class="flex items-center justify-center">
        <button type="submit"
          class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
          Register
        </button>
      </div>
       <p class="text-center text-gray-400 text-sm mt-4">
        Already have an account? 
        <router-link to="/login" class="font-medium text-amber-400 hover:underline">Login here</router-link>
      </p>
    </form>
  </div>
</template>