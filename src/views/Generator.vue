<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/api'
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

const features = ref('')
const isLoading = ref(false)
const generatedText = ref('')
const errorMessage = ref('')
const router = useRouter();

const MAX_WORDS = 100
const wordCount = ref(0)
const remainingWords = computed(() => MAX_WORDS - wordCount.value)

// handleInput logic remains the same
const handleInput = () => {
  const words = features.value.trim().match(/\b\w+([-']\w+)*\b/g) || [];
  wordCount.value = words.length;
  if (wordCount.value > MAX_WORDS) {
    features.value = words.slice(0, MAX_WORDS).join(' ');
    wordCount.value = MAX_WORDS;
  }
  errorMessage.value = '';
};

// generateContent logic remains the same, with added error handling for expired sessions
const generateContent = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  generatedText.value = '';
  
  try {
    const response = await axios.post(API_ENDPOINTS.generate(), {
      features: features.value.trim()
    });
    generatedText.value = response.data.generatedText;
  } catch (error) {
    console.error('Error generating content:', error);
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Your session has expired. Please log in again.';
      router.push('/login');
    } else if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'An error occurred while generating content.';
    }
  } finally {
    isLoading.value = false;
  }
}

// New function to handle user logout
const handleLogout = async () => {
    try {
        await axios.post(API_ENDPOINTS.logout());
        router.push('/login'); // Redirect to login page after logout
    } catch (error) {
        console.error('Error logging out:', error);
        errorMessage.value = 'Failed to log out. Please try again.';
    }
}
useHead({
  title: 'Generator | BenefitGen'
});
</script>

<template>
  <div class="w-full max-w-2xl">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-amber-400">Benefit Copy Generator</h1>
        <button @click="handleLogout" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-300">
            Logout
        </button>
    </div>
    
    <form @submit.prevent="generateContent" class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div class="mb-6">
        <label for="features" class="block text-gray-300 text-sm font-bold mb-2">Product Features</label>
        <textarea
          v-model="features" @input="handleInput" id="features" rows="6" 
          placeholder="Describe the product features here. e.g., Tracks employee time spent on projects vs replying to emails..."
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"
        ></textarea>
        <p class="text-sm mt-1 text-right" :class="{ 'text-red-500': remainingWords < 10, 'text-gray-400': remainingWords >= 10 }">
          {{ wordCount }} / {{ MAX_WORDS }} words (<span :class="{ 'text-red-500': remainingWords < 0 }">{{ remainingWords }}</span> words left)
        </p>
        <p v-if="errorMessage" class="text-red-500 text-xs italic mt-2">{{ errorMessage }}</p>
      </div>

      <div class="flex items-center justify-center">
        <button type="submit" :disabled="isLoading || wordCount === 0" class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {{ isLoading ? 'Generating...' : 'Generate Benefits' }}
        </button>
      </div>
    </form>

    <div v-if="generatedText" class="bg-gray-800 shadow-md rounded-lg p-6 mt-6">
      <h2 class="text-xl font-bold mb-4 text-amber-400">Generated Result:</h2>
      <p class="text-gray-300 whitespace-pre-wrap ">{{ generatedText }}</p>
    </div>
  </div>
</template>