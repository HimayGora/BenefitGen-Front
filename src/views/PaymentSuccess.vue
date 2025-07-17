<script setup>
import { useHead } from '@vueuse/head';
import { RouterLink } from 'vue-router';

useHead({
  title: 'Payment Successful - BenefitGen',
  meta: [
    { name: 'description', content: 'Your account upgrade was successful. Welcome to your new plan.' },
  ],
});
</script>

<template>
  <div class="w-full max-w-4xl px-4">
    <section class="text-center py-20">
      
      <svg class="w-16 h-16 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

      <h1 class="text-5xl font-bold tracking-tight mb-4 text-white">
        Upgrade Complete!
      </h1>

      <p class="text-lg text-gray-300 max-w-xl mx-auto mb-8">
        Thanks for your purchase. Your account has been upgraded, and your new limits are now active.
      </p>

      <RouterLink
        to="/generator"
        class="inline-block bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
      >
        Go to the Generator
      </RouterLink>

    </section>
  </div>
</template>