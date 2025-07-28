<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { useAuth } from '../store/auth';
import { RouterLink, useRouter } from 'vue-router';
import { API_ENDPOINTS } from '../utils/api/endpoints.js';

useHead({
  title: 'Pricing - BenefitGen',
  meta: [
    { name: 'description', content: 'Choose the perfect plan to start translating technical features into powerful benefits. Free plan available.' },
  ],
});

const { isAuthenticated } = useAuth();
const router = useRouter();
const errorMessage = ref('');
const loadingPriceId = ref(null);

// --- Plan Data ---
// Storing plans in the script makes the template cleaner and easier to manage.
const plans = ref([
  {
    name: 'Free',
    price: '$0',
    priceId: null, // No Stripe ID for the free plan
    description: 'For individuals & hobbyists getting started.',
    features: [
      '10 Generations per day',
      '40 Generations per month',
      '100 Word max input'
    ],
    
    cta: {
      text: 'Start for Free',
      action: () => router.push('/register'), // Action for non-authed users
      authedAction: () => router.push('/generator'), // Action for authed users
    },
    isPrimary: false,
  },
  {
    name: 'Community',
    price: '$0',
    priceId: null, // No Stripe ID, free plan
    description: 'Free plan with higher quotas in exchange for providing data and feedback.',
    features: [
      '20 Generations per day',
      '200 Generations per month',
      '100 Word max input',
      'Contribute Input/Output pairs & feedback',
      'Help improve the service with your data.'
    ],
    cta: {
      text: 'Join Community',
      action: () => router.push('/register'),
      authedAction: () => router.push('/community'),
    },
    isPrimary: false,
  },
  {
    name: 'Pro',
    price: '$35',
    priceId: 'prod_SggQsgqkHOCPi3', // IMPORTANT: Replace with your actual Stripe Price ID
    description: 'For professionals who need more power.',
    features: [
      '45 Generations per day',
      '450 Generations per month',
      'Email Support',
      '1000 Word max input'
    ],
    cta: {
      text: 'Subscribe to Pro',
      action: (priceId) => handleCheckout(priceId),
    },
    isPrimary: true, // This can be used for special styling, e.g., a "Most Popular" badge
  },
]);

// --- Checkout Logic ---
const handleCheckout = async (priceId) => {
  if (!isAuthenticated.value) {
    router.push('/login'); // Redirect to login if not authenticated
    return;
  }
  loadingPriceId.value = priceId;
  errorMessage.value = '';
  try {
    const res = await fetch(API_ENDPOINTS.createCheckoutSession(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
      credentials: 'include'
    });

    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url; // Redirect to Stripe
    } else {
      const errorData = await res.json();
      errorMessage.value = errorData.error || 'Failed to start checkout.';
      loadingPriceId.value = null;
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.';
    loadingPriceId.value = null;
    console.log(error)
  }
};
</script>

<template>
  <div class=" max-w-4xl mx-auto px-4">
    <section class="text-center py-16">
      <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-amber-400">
        Find the Right Fit
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        Start translating for free. Upgrade when you need more power and capacity. Simple, transparent pricing.
      </p>
    </section>

    <section class="mb-16">
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          v-for="plan in plans" 
          :key="plan.name"
          class="bg-gray-800 rounded-lg p-8 border flex flex-col"
          :class="plan.isPrimary ? 'border-amber-400' : 'border-gray-700'"
        >
          <h3 class="font-bold text-2xl mb-2" :class="plan.isPrimary ? 'text-amber-400' : 'text-white'">
            {{ plan.name }}
          </h3>
          <p class="text-gray-400 mb-6 h-12">{{ plan.description }}</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold text-white">{{ plan.price }}</span>
            <span v-if="plan.price !== '$0'" class="text-lg text-gray-400">/ month</span>
          </div>

          <ul class="space-y-4 text-gray-300 mb-8">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center">
              <svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button
            v-if="plan.priceId"
            @click="() => plan.cta.action(plan.priceId)"
            :disabled="loadingPriceId === plan.priceId"
            class="mt-auto font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
            :class="plan.isPrimary ? 'bg-amber-500 hover:bg-amber-600 text-stone-900' : 'bg-gray-700 hover:bg-gray-600 text-white'"
          >
            {{ loadingPriceId === plan.priceId ? 'Redirecting...' : plan.cta.text }}
          </button>

          <button
            v-else
            @click="() => plan.cta.action(plan.priceId)"
            class="mt-auto  font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
            :class="plan.isPrimary ? 'bg-amber-500 hover:bg-amber-600 text-stone-900' : 'bg-gray-700 hover:bg-gray-600 text-white'"
          >
            {{ plan.cta.text }}
          </button>
        </div>
      </div>
       <p v-if="errorMessage" class="text-center text-red-400 mt-8">{{ errorMessage }}</p>
    </section>
  </div>
</template>