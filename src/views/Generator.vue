<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
// Assuming API_ENDPOINTS provides base URLs and other endpoints
import { API_ENDPOINTS } from '../utils/api' 
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

const features = ref(localStorage.getItem('features') || '')
const isLoading = ref(false)
const generatedText = ref('')
const errorMessage = ref('')
const router = useRouter();

// --- New State for User Plan and Generator Choice ---
const userPlan = ref('free') // Default plan
const selectedGenerator = ref('lp') // Default generator for admin

const MAX_WORDS = 100
const wordCount = ref(0)
const remainingWords = computed(() => MAX_WORDS - wordCount.value)

const handleInput = () => {
  const words = features.value.trim().match(/\b\w+([-']\w+)*\b/g) || []
  wordCount.value = words.length
  if (wordCount.value > MAX_WORDS) {
    features.value = words.slice(0, MAX_WORDS).join(' ')
    wordCount.value = MAX_WORDS
  }
  localStorage.setItem('features', features.value)
  errorMessage.value = ''
}

const generateContent = async () => {
  isLoading.value = true
  errorMessage.value = ''
  generatedText.value = ''

  // --- Dynamic Endpoint Logic ---
  let generatorType = 'lp'; // Default for free users
  if (userPlan.value === 'pro') {
    generatorType = 'tb';
  } else if (userPlan.value === 'admin') {
    generatorType = selectedGenerator.value;
  }

  // Construct the full API URL
  const url = `${API_ENDPOINTS.base}/generate/${generatorType}`;

  try {
    // Corrected payload key from 'features' to 'contents' to match the backend
    const response = await axios.post(url, {
      contents: features.value.trim()
    })
    generatedText.value = response.data.generatedText
  } catch (error) {
    console.error('Error generating content:', error)
    if (error.response?.status === 401) {
      errorMessage.value = 'Your session has expired. Please log in again.'
      router.push('/login')
    } else {
      errorMessage.value = error.response?.data?.error || 'An error occurred while generating content.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await axios.post(API_ENDPOINTS.logout())
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error)
    errorMessage.value = 'Failed to log out. Please try again.'
  }
}

const copyGeneratedText = async () => {
  try {
    await navigator.clipboard.writeText(generatedText.value)
  } catch {
    errorMessage.value = 'Unable to copy. Please select manually.'
  }
}

const resetForm = () => {
  features.value = ''
  wordCount.value = 0
  generatedText.value = ''
  localStorage.removeItem('features')
}

onMounted(async () => {
  handleInput();
  
  // --- Fetch User Status and Plan ---
  try {
    // Assuming API_ENDPOINTS.status() points to your /api/status endpoint
    const response = await axios.get(API_ENDPOINTS.status());
    if (response.data && response.data.plan) {
      userPlan.value = response.data.plan; // Set plan from API response
    }
  } catch (error) {
    console.error("Could not fetch user status:", error);
    // If the call fails (e.g., 401 Unauthorized), redirect to login
    if (error.response?.status === 401) {
      router.push('/login');
    }
  }
});

useHead({
  title: 'Generator | BenefitGen'
})
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
      <div v-if="userPlan === 'admin'" class="mb-6 bg-gray-900/50 p-4 rounded-lg">
        <h3 class="font-bold text-gray-300 mb-2">Admin Panel: Select Generator</h3>
        <div class="flex items-center space-x-6">
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input type="radio" v-model="selectedGenerator" value="lp" name="generator" class="form-radio bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500">
            <span class="ml-2">LP Generator</span>
          </label>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input type="radio" v-model="selectedGenerator" value="tb" name="generator" class="form-radio bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500">
            <span class="ml-2">TB Generator</span>
          </label>
        </div>
      </div>

      <div class="mb-6">
        <label for="features" class="block text-gray-300 text-sm font-bold mb-2">What does your product do?</label>
        <p class="text-gray-400 text-sm mb-2">
          Paste a short feature list or a 1–2 sentence description. We’ll turn it into benefit copy.
        </p>
        <textarea
          v-model="features"
          @input="handleInput"
          :disabled="isLoading"
          id="features"
          rows="6"
          placeholder="e.g., Tracks employee time spent on projects vs replying to emails..."
          class="shadow border rounded w-full py-2 px-3 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"
        ></textarea>
        <p class="text-sm mt-1 text-right text-gray-400">
          {{ wordCount }} / {{ MAX_WORDS }} words used
        </p>
        <p v-if="errorMessage" class="text-red-500 text-xs italic mt-2">{{ errorMessage }}</p>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          :disabled="isLoading || wordCount === 0"
          class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Generating...' : 'Generate Benefits' }}
        </button>

        <button
          type="button"
          @click="resetForm"
          class="text-sm text-gray-400 hover:underline ml-4"
          v-if="features || generatedText"
        >
          Clear & Start Over
        </button>
      </div>
    </form>

    <div v-if="generatedText" class="bg-gray-800 shadow-md rounded-lg p-6 mt-6">
      <h2 class="text-xl font-bold mb-4 text-amber-400">Generated Result:</h2>
      <p class="text-gray-300 whitespace-pre-wrap">{{ generatedText }}</p>
      <button
        @click="copyGeneratedText"
        class="mt-4 text-sm text-amber-400 hover:underline"
      >
        Copy to Clipboard
      </button>
    </div>
  </div>
</template>

<style scoped>
textarea:disabled {
  background-color: #4b5563;
  opacity: 0.6;
  cursor: not-allowed;
}

/* Styling for custom radio buttons */
.form-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  border-radius: 100%;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>