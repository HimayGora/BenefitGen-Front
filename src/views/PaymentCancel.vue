<script setup>
import { useHead } from '@vueuse/head';
import { RouterLink } from 'vue-router';

useHead({
  title: 'Payment Canceled - BenefitGen',
  meta: [
    { name: 'description', content: 'Your payment session was canceled. No charges were made.' },
  ],
});
</script>

<template>
  <div class="w-full max-w-4xl px-4">
    <section class="text-center py-20">

      <svg class="w-16 h-16 mx-auto mb-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

      <h1 class="text-5xl font-bold tracking-tight mb-4 text-white">
        Payment Canceled
      </h1>

      <p class="text-lg text-gray-300 max-w-xl mx-auto mb-8">
        Your checkout session was canceled, and no charges were made. Your plan has not been changed.
      </p>

      <RouterLink
        to="/pricing"
        class="inline-block bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
      >
        View Plans Again
      </RouterLink>

    </section>
  </div>
</template>