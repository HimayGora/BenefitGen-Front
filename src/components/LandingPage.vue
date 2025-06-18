<script setup>
import { useHead } from '@vueuse/head'
import KeyEntryForm from './KeyEntryForm.vue'

// This component no longer needs to handle emits for navigation
// The KeyEntryForm will handle it directly with the router

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
  <div class="w-full max-w-4xl mx-auto px-4">
    <section class="text-center py-16">
      <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-amber-400">
        Stop Writing Features, Start Selling Benefits.
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        AI-Powered Copy That Converts. Reclaim Your Time & Boost Results.
      </p>
    </section>

    <section id="get-access" class="py-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Ready to Experience the Power?</h2>
        <p class="text-center text-gray-400 mb-8">
          If you do not have a key, please email 
          <a href="mailto:hsg@hsgportfolio.com" class="text-amber-400 hover:underline font-medium">hsg@hsgportfolio.com</a> 
          to request access or a free demo.
        </p>
        <KeyEntryForm />
    </section>
  </div>
</template>