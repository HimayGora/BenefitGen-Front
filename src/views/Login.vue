<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/api'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth' // ## NEW: Import useAuth
import { useHead } from '@vueuse/head';

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const { setAuthenticated } = useAuth() // ## NEW: Get the setAuthenticated function

axios.defaults.withCredentials = true;

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const response = await axios.post(API_ENDPOINTS.login(), {
      email: email.value,
      password: password.value
    });

    if (response.data.status === 'ok') {
      // ## NEW: Update the global state after successful login
      setAuthenticated(email.value);
      
      // Redirect to the generator page
      router.push('/generator');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message || 'Invalid email or password.';
    } else {
        errorMessage.value = 'An error occurred. Please try again.';
    }
  }
}
useHead({
  title: 'Login | BenefitGen'
});
</script>

<template>
  <div class="max-w-md">
    <form @submit.prevent="handleLogin" class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h1 class="text-2xl font-bold text-center mb-6 text-amber-400">Login</h1>
      <div class="mb-4">
        <label for="email" class="block text-gray-300 text-sm font-bold mb-2">
          Email Address
        </label>
        <input 
          v-model="email"
          type="email" 
          id="email"
          placeholder="Enter your email"
          class="shadow appearance-none border rounded  py-3 px-4 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"
        >
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Password</label>
        <input v-model="password" type="password" id="password" placeholder="******************"
          class="shadow appearance-none border rounded  py-3 px-4 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500">
      </div>
      <p v-if="errorMessage" class="text-red-500 text-xs italic mb-4">{{ errorMessage }}</p>
      <div class="flex items-center justify-center">
        <button type="submit"
          class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
          Login
        </button>
      </div>
       <p class="text-center text-gray-400 text-sm mt-4">
        Don't have an account? 
        <router-link to="/register" class="font-medium text-amber-400 hover:underline">Register here</router-link>
      </p>
    </form>
  </div>
</template>