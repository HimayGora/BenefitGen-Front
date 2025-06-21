<script setup>
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router';
import { useAuth } from '../store/auth';

const { isAuthenticated, email, handleLogout } = useAuth();

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
        Turn your product’s raw potential into messaging that lands. AI-crafted benefit copy — written in seconds, built to convert.
      </p>
    </section>

    <section class="mb-12 text-center max-w-3xl mx-auto">
      <p class="text-gray-400 mb-4">
        You're building something powerful. But turning all those features into customer-focused messaging that actually resonates? That’s a grind — especially with limited time, competing priorities, and no copywriter on standby.
      </p>
      <p class="text-gray-400">
        That’s where the Benefit Copy Generator steps in. It’s your shortcut to persuasive copy that speaks to what your audience actually cares about: outcomes, value, and results.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">The Problem</h2>
      <p class="text-gray-400 text-center max-w-3xl mx-auto">
        Most copy is too technical, too feature-heavy, or too generic to convert. And if you're stuck staring at a blank page, you’re wasting precious time and missing opportunities.
        You don’t need another template — you need traction.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">The Solution: Benefit Copy Generator</h2>
      <p class="text-gray-400 text-center max-w-3xl mx-auto">
        The Benefit Copy Generator takes your feature list (or even just a rough idea) and instantly creates clean, punchy benefit-driven copy — perfect for landing pages, ads, emails, or pitch decks. All 100% editable and tailored to the outcomes your audience actually wants.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">⭐ Key Benefits</h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">✅ Convert More, Write Less</h3>
          <p class="text-gray-400">Get copy that connects emotionally and drives action — without hours of writing or second-guessing.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">⏳ Reclaim Your Time</h3>
          <p class="text-gray-400">Generate polished messaging in seconds. Focus on growth, not copy edits.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">📈 Boost Your ROII</h3>
          <p class="text-gray-400">Better copy = better results. Improve performance across campaigns and channels.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">✍️ Tell a Clearer Story</h3>
          <p class="text-gray-400">Communicate what matters — not what it does, but what it does for them.</p>
        </div>
      </div>
    </section>

    <section class="mb-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">🛠️ Core Features</h2>
        <ul class="list-disc list-inside max-w-md mx-auto text-gray-400 space-y-2">
            <li>⚡ Instant AI benefit copy based on your inputs</li>
            <li>🎯 Multiple angles & tones to choose from</li>
            <li>🧠 Built for marketers and founders — no fluff</li>
            <li>🖊️ Fully editable results with no lock-in</li>
        </ul>
    </section>
    
    <section class="mb-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">💬 Why Us?</h2>
        <p class="text-gray-400 text-center max-w-3xl mx-auto">
            Other AI tools give you filler. We give you focus. The Benefit Copy Generator is built for high-intent messaging — by people who’ve shipped, pitched, and marketed real products. This isn’t generic automation. It’s a tool that gets your value across, fast.
        </p>
    </section>
    
    <section id="get-access" class="py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">
      Ready to Transform Your Messaging?
      </h2>

      <div v-if="!isAuthenticated" class="space-y-6">
      <p class="text-center text-gray-400 max-w-xl mx-auto">
        🚀 Create benefit-driven messaging in under 60 seconds. No writing blocks. No guesswork.  
        Start free and see your product in a whole new light.
      </p>

      <div class="flex items-center justify-center space-x-4">
        <RouterLink
          to="/login"
          class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Log In
        </RouterLink>

        <RouterLink
          to="/register"
          class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Start Free — No Credit Card
        </RouterLink>
      </div>
    </div>

    <div v-else class="space-y-4 text-center">
      <p class="text-blue-300 text-lg">
        💡 You're just one click away from benefit copy that lands.
      </p>

      <RouterLink
        to="/generator"
        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
      >
        Start Writing Copy
      </RouterLink>
    </div>
  </section>
  </div>
</template>