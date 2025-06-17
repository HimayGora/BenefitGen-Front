<script setup>
import { ref, computed } from 'vue' // Import 'computed'
import axios from 'axios'
import { API_ENDPOINTS } from '../utils/api'

// State for the new form input
const features = ref('')

// --- New: Word Count and Cap ---
const MAX_WORDS = 100 // Define your word limit here
const wordCount = ref(0) // To store the current word count
const remainingWords = computed(() => MAX_WORDS - wordCount.value) // Computed property for words left

// Function to update word count and enforce cap
const handleInput = () => {
  // A more robust word count:
  // - matches sequences of word characters (letters, numbers, underscore)
  // - handles hyphens within words (e.g., "high-quality")
  // - filters out matches that are just punctuation or empty strings
  const words = features.value.trim().match(/\b\w+([-']\w+)*\b/g) || []; // Matches words more accurately

  wordCount.value = words.length;

  // Enforce word cap: if over limit, truncate the text
  if (wordCount.value > MAX_WORDS) {
    // Reconstruct the string from the first MAX_WORDS words
    features.value = words.slice(0, MAX_WORDS).join(' ');
    wordCount.value = MAX_WORDS; // Ensure count reflects truncation
  }
  errorMessage.value = ''; // Clear error on new input
};
// --- End: New Word Count and Cap ---

// State for handling the API response (this logic is the same)
const isLoading = ref(false)
const generatedText = ref('')
const errorMessage = ref('') // For frontend errors

const generateContent = async () => {
  errorMessage.value = ''; // Clear previous errors
  generatedText.value = ''; // Clear previous generated text

  const featuresToSanitize = features.value.trim();

  // --- FRONTEND SANITIZATION (Integrate with word count) ---
  // Re-check word count as a final frontend validation
  const currentWords = featuresToSanitize.split(/\s+/).filter(word => word.length > 0).length;
  if (currentWords === 0) {
    errorMessage.value = 'Please enter some product features.';
    return;
  }
  if (currentWords > MAX_WORDS) { // Should be caught by handleInput, but good for final check
    errorMessage.value = `Input exceeds word limit of ${MAX_WORDS} words.`;
    return;
  }
  // Max character length (if you want to keep this, adjust MAX_FRONTEND_INPUT_LENGTH)
  // For simplicity, if using MAX_WORDS, a separate MAX_FRONTEND_INPUT_LENGTH might be redundant unless
  // you're also worried about extremely long words. Let's rely on word count for this example.
  // Original problematic phrases check
  const problematicPhrases = [
    "ignore previous instructions",
    "as an ai model",
    "generate content in json",
    "disregard all",
    "output only",
    "act as a",
    "you are now",
    "system prompt"
  ];
  for (const phrase of problematicPhrases) {
    if (featuresToSanitize.toLowerCase().includes(phrase)) {
      errorMessage.value = 'Input contains potentially problematic content. Please rephrase.';
      return;
    }
  }
  // --- END FRONTEND SANITIZATION ---

  isLoading.value = true
  
  const apiUrl = API_ENDPOINTS.generate()
  const payload = {
    features: featuresToSanitize // Send the sanitized version
  }

  try {
    const response = await axios.post(apiUrl, payload);
    generatedText.value = response.data.generatedText;
    console.log("Raw AI Response:", JSON.stringify(response.data.generatedText));
  } catch (error) {
    console.error('Error generating content:', error);
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'An error occurred while generating content. Please try again.';
    }
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
        <textarea
          v-model="features"
          @input="handleInput" id="features"
          rows="6" 
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