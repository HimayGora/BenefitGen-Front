<script setup>
import { ref } from 'vue'
import axios from 'axios'

// State for the new form input
const features = ref('')

// State for handling the API response (this logic is the same)
const isLoading = ref(false)
const generatedText = ref('')

const generateContent = async () => {
  isLoading.value = true
  generatedText.value = ''
  
  const apiUrl = 'http://127.0.0.1:5001/api/generate'
  
  // The payload now sends a 'features' key
  const payload = {
    features: features.value
  }

  try {
    const response = await axios.post(apiUrl, payload);
    generatedText.value = response.data.generatedText;
    console.log("Raw AI Response:", JSON.stringify(response.data.generatedText));
  } catch (error) {
    console.error('Error generating content:', error);
    generatedText.value = 'An error occurred while generating content. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="w-full max-w-2xl">
    <h1 class="text-3xl font-bold text-center mb-6 text-amber-400">Benefit Statement Generator</h1>
    <form @submit.prevent="generateContent" class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      
      <div class="mb-6">
        <label for="features" class="block text-gray-300 text-sm font-bold mb-2">Product Features</label>
        <textarea v-model="features" id="features" rows="6" 
          placeholder="Describe the product features here. e.g., Tracks employee time spent on projects vs replying to emails..."
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-200 border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500"></textarea>
      </div>

      <div class="flex items-center justify-center">
        <button type="submit" :disabled="isLoading"
          class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {{ isLoading ? 'Generating...' : 'Generate Benefits' }}
        </button>
      </div>
    </form>

    <div v-if="generatedText" class="bg-gray-800 shadow-md rounded-lg p-6 mt-6">
      <h2 class="text-xl font-bold mb-4 text-amber-400">Generated Result:</h2>
      <p class="text-gray-300 whitespace-pre-wrap bg-red-500">{{ generatedText }}</p>
    </div>

  </div>
</template>