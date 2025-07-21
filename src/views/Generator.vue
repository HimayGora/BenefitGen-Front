<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
// Assuming API_ENDPOINTS provides base URLs and other endpoints
import { API_ENDPOINTS } from '../utils/api' 
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import LoadingAnimation from '../components/LoadingAnimation.vue';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

const features = ref(localStorage.getItem('features') || '')
const isLoading = ref(false)
const generatedText = ref('')
const generatedBenefits = ref([])
const errorMessage = ref('')
const router = useRouter();
const piiErrorMessage = ref('')
const piiUpgradeLink = ref('')


// --- New State for User Plan and Generator Choice ---
const userPlan = ref('free') // Default plan
const selectedGenerator = ref('lp') // Default generator for admin

const MAX_WORDS = 100
const wordCount = ref(0)
const remainingWords = computed(() => MAX_WORDS - wordCount.value)  

function containsPII(text) {
  // Basic example: detects emails, phone numbers, SSNs (simple patterns)
  const piiPatterns = [
    /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/, // SSN-like pattern
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // US phone-like pattern
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // email
    /\b\d{16}\b/, // credit card (simple 16-digit)
  ]
  return piiPatterns.some(pattern => pattern.test(text))
}

const UPGRADE_URL = '/pricing' // Your actual upgrade page

const handleInput = () => {
  const words = features.value.trim().match(/\b\w+([-']\w+)*\b/g) || []
  wordCount.value = words.length
  
  // Reset error messages first
  errorMessage.value = ''
  piiErrorMessage.value = ''
  piiUpgradeLink.value = ''

  // Front-end PII check (runs before trimming)
  if (containsPII(features.value)) {
    piiErrorMessage.value = 'Your input contains sensitive information (PII) which is not allowed.'
    piiUpgradeLink.value = UPGRADE_URL
    // Optionally block further typing or clear input partially — here we just stop further input:
    return
  }

  if (userPlan.value === 'free' && wordCount.value > MAX_WORDS) {
    features.value = words.slice(0, MAX_WORDS).join(' ')
    wordCount.value = MAX_WORDS
  }

  localStorage.setItem('features', features.value)
}


// Add these methods to your existing methods in the script section

const copyGeneratedText = async () => {
  try {
    await navigator.clipboard.writeText(generatedText.value)
    
    console.log('Text copied to clipboard')
  } catch (error) {
    console.error('Failed to copy text:', error)
    errorMessage.value = 'Unable to copy. Please select manually.'
  }
}


const copyBenefitsAsText = async () => {
  try {
    // Convert benefits array to formatted text
    const benefitsText = generatedBenefits.value.map((benefit, index) => {
      if (typeof benefit === 'string') {
        return `${index + 1}. ${benefit}`;
      }
      
      let text = `${index + 1}. `;
      
      // Handle your specific JSON structure
      if (benefit.benefit) {
        text += `${benefit.benefit}\n`;
        if (benefit.supporting_sentence) {
          text += `${benefit.supporting_sentence}`;
        }
      } else {
        // Fallback for other structures
        if (benefit.title) text += `${benefit.title}\n`;
        if (benefit.description) text += `${benefit.description}`;
      }
      
      return text.trim();
    }).join('\n\n');
    
    await navigator.clipboard.writeText(benefitsText)
    console.log('Benefits copied to clipboard')
  } catch (error) {
    console.error('Failed to copy benefits:', error)
    errorMessage.value = 'Unable to copy. Please select manually.'
  }
}

const resetForm = () => {
  features.value = ''
  generatedText.value = ''
  generatedBenefits.value = []
  errorMessage.value = ''
  wordCount.value = 0
  localStorage.removeItem('features')
}

const downloadAsDocx = async () => {
  try {
    // For a real application, you would fetch your template.docx
    // For this example, we'll create a dummy template in memory
    const response = await fetch('/template.docx');
    if (!response.ok) {
        throw new Error("Template not found");
    }
    const content = await response.arrayBuffer();

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // Prepare data for the template
    const templateData = {
        generated_text: generatedText.value,
        benefits: generatedBenefits.value.map(b => {
            if (typeof b === 'string') {
                return { benefit: b, supporting_sentence: '' };
            }
            return {
                benefit: b.benefit || b.title,
                supporting_sentence: b.supporting_sentence || b.description
            };
        })
    };

    doc.render(templateData);

    const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(out, 'generated_benefits.docx');
  } catch (error) {
      console.error('Error generating DOCX:', error);
      errorMessage.value = 'Could not generate DOCX file. Please ensure `template.docx` is in the public directory.';
  }
};

const handleLogout = () => {
  // Add your logout logic here
  router.push('/login')
}

function extractJsonFromCodeBlock(text) {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    return match[1];
  }
  return text; // fallback to original text if no code block found
}

// const forceStopLoading = () => {
//  console.log('🛑 FORCE STOP: Manual loading reset')
//  isLoading.value = false
// if (loadingTimeout.value) {
//    clearTimeout(loadingTimeout.value)
 // }
//} 

const generateContent = async () => {
  console.log('🔄 Starting generation, setting isLoading to true')
  isLoading.value = true
  errorMessage.value = ''
  generatedText.value = ''
  generatedBenefits.value = [] // Clear previous benefits
  
  // --- Dynamic Endpoint Logic ---
  let generatorType = 'lp'; // Default for free users (lowercase)
  if (userPlan.value === 'pro') {
    generatorType = 'tb'; // lowercase
  } else if (userPlan.value === 'admin') {
    generatorType = selectedGenerator.value; // already lowercase from radio buttons
  }
  
  // Construct the full API URL
  const url = `${API_ENDPOINTS.generate()}/${generatorType}`;
  
  try {
    const response = await axios.post(url, {
      contents: features.value.trim()
    }, {
      withCredentials: true
    })
    
    const responseText = response.data.generatedText;
    
    // --- Unified JSON Parsing Logic for Both LP and TB ---
    const parseJsonResponse = (text) => {
      try {
        // First, try to parse as JSON directly
        const cleanedText =extractJsonFromCodeBlock(text);
        const parsedData = JSON.parse(cleanedText);
        
        // Validate that it's an array
        if (Array.isArray(parsedData)) {
          return { success: true, data: parsedData };
        } else {
          // If it's an object, try to extract benefits array
          if (parsedData.benefits && Array.isArray(parsedData.benefits)) {
            return { success: true, data: parsedData.benefits };
          } else {
            throw new Error('Invalid JSON structure');
          }
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.log("Raw response:", text);
        
        // Try to extract JSON from markdown code blocks
        const jsonMatch = text.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        if (jsonMatch) {
          try {
            const extractedJson = JSON.parse(jsonMatch[1]);
            return { success: true, data: Array.isArray(extractedJson) ? extractedJson : [extractedJson] };
          } catch (extractError) {
            console.error("Failed to parse extracted JSON:", extractError);
          }
        }
        
        // Try to find JSON array pattern without code blocks
        const arrayMatch = text.match(/\[[\s\S]*?\]/);
        if (arrayMatch) {
          try {
            const extractedArray = JSON.parse(arrayMatch[0]);
            return { success: true, data: Array.isArray(extractedArray) ? extractedArray : [extractedArray] };
          } catch (arrayError) {
            console.error("Failed to parse array from text:", arrayError);
          }
        }
        
        // Try to find JSON object pattern
        const objectMatch = text.match(/\{[\s\S]*?\}/);
        if (objectMatch) {
          try {
            const extractedObject = JSON.parse(objectMatch[0]);
            if (extractedObject.benefits && Array.isArray(extractedObject.benefits)) {
              return { success: true, data: extractedObject.benefits };
            }
            return { success: true, data: [extractedObject] };
          } catch (objectError) {
            console.error("Failed to parse object from text:", objectError);
          }
        }
        
        // No JSON found or parseable
        return { success: false, data: null };
      }
    };
    
    // Handle both LP and TB output with JSON parsing
    if (generatorType === 'tb' || generatorType === 'lp') {
      const parseResult = parseJsonResponse(responseText);
      
      if (parseResult.success) {
        generatedBenefits.value = parseResult.data;
      } else {
        // Fallback to plain text if JSON parsing fails
        generatedText.value = responseText;
      }
    } else {
      // For any other generator types, default to plain text
      generatedText.value = responseText;
    }
    
  } catch (error) {
  console.error('Error generating content:', error)

  // Clear previous error states
  errorMessage.value = ''
  piiErrorMessage.value = ''
  piiUpgradeLink.value = ''

  if (error.response?.status === 401) {
    errorMessage.value = 'Your session has expired. Please log in again.'
    router.push('/login')

  } else if (error.response?.status === 422 && error.response.data?.error === 'pii_detected') {
    // Handle PII detected error explicitly
    piiErrorMessage.value = error.response.data.message || 'Submission rejected due to detected personal information.'

    if (error.response.data.upgrade_url) {
      piiUpgradeLink.value = error.response.data.upgrade_url
    }

  } else {
    // Generic error fallback
    errorMessage.value = error.response?.data?.error || 'An error occurred while generating content.'
  }
}finally {
  isLoading.value = false
}
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
  <div class="w-full max-w-4xl px-4">
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
        <label for="features" class="block text-gray-300 text-sm font-bold mb-2 max-w">What does your product do?</label>
        <p class="text-gray-400 text-sm mb-2">
          Paste a short feature list or a 1–2 sentence description. We'll turn it into benefit copy.
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
        <p v-if="userPlan === 'free'" class="text-sm mt-1 text-right text-gray-400">
          {{ wordCount }} / {{ MAX_WORDS }} words used
        </p>
        <p v-if="errorMessage" class="text-red-500 text-xs italic mt-2">{{ errorMessage }}</p>

        <p v-if="piiErrorMessage" class="text-red-500 text-xs italic mt-2">{{ piiErrorMessage }}</p>


        <RouterLink
          v-if="piiUpgradeLink"
          :to="piiUpgradeLink"
          class="text-amber-400 underline text-xs block mt-1"
        >
          Upgrade your plan here
        </RouterLink>

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

    <div v-if="isLoading" class="bg-gray-800 shadow-md rounded-lg mt-6">
      <LoadingAnimation />
    </div>

    <div v-else-if="generatedText || generatedBenefits.length > 0" class="bg-gray-800 shadow-md rounded-lg p-6 mt-6">
      <h2 class="text-xl font-bold mb-4 text-amber-400">Generated Result:</h2>

      <div v-if="generatedText" class="mb-4">
        <p class="text-gray-300 whitespace-pre-wrap">{{ generatedText }}</p>
        <div class="mt-4 space-x-4">
          <button
            @click="copyGeneratedText"
            class="text-sm text-amber-400 hover:underline"
          >
            Copy to Clipboard
          </button>
          <button
            @click="downloadAsDocx"
            class="text-sm text-amber-400 hover:underline"
          >
            Download as DOCX
          </button>
        </div>
      </div>

      <div v-if="generatedBenefits.length > 0" class="space-y-4">
        <div
          v-for="(benefit, index) in generatedBenefits"
          :key="index"
          class="bg-gray-900/50 p-4 rounded-lg border-l-4 border-amber-500"
        >
          <h3 v-if="benefit.benefit" class="text-lg font-semibold text-amber-400 mb-2">
            {{ benefit.benefit }}
          </h3>
          <p v-if="benefit.supporting_sentence" class="text-gray-300 mb-2">
            {{ benefit.supporting_sentence }}
          </p>

          <h3 v-else-if="benefit.title" class="text-lg font-semibold text-amber-400 mb-2">
            {{ benefit.title }}
          </h3>
          <p v-if="benefit.description" class="text-gray-300 mb-2">
            {{ benefit.description }}
          </p>

          <p v-if="typeof benefit === 'string'" class="text-gray-300">
            {{ benefit }}
          </p>
        </div>

        <div class="mt-4 space-x-4">
            <button
              @click="copyBenefitsAsText"
              class="text-sm text-amber-400 hover:underline"
            >
              Copy All Benefits to Clipboard
            </button>
            <button
              @click="downloadAsDocx"
              class="text-sm text-amber-400 hover:underline"
            >
              Download as DOCX
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
}
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