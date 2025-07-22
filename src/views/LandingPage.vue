<script setup>
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router';
import { useAuth } from '../store/auth';

const { isAuthenticated } = useAuth();

useHead({
  title: 'BenefitGen: Help Stakeholders Understand Technical Work',
  meta: [
    {
      name: 'description',
      content: 'BenefitGen helps technical teams turn complex updates into business-friendly summaries. Translate APIs, migrations, and tech debt into clear stakeholder-ready outputs.',
    },
    { property: 'og:title', content: 'BenefitGen: From Technical Jargon to Business Clarity' },
    { property: 'og:description', content: 'Translate engineering work into stakeholder language. Start free with 40 cards/month — no credit card needed.' },
    { property: 'og:url', content: 'https://generator.hsgportfolio.com' },
    { property: 'og:image', content: 'https://generator.hsgportfolio.com/BFG.png' },
  ],
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4">
    
    <!-- Hero Section -->
    <section class="text-center py-16">
      <div class="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-xl px-6 py-3 rounded-full inline-block mb-8">
        FREE • 40 Cards/Month • No Credit Card Required
      </div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Turn <span class="text-amber-400">Engineering Docs</span><br />
        Into <span class="text-amber-400">Executive Summaries</span> in Seconds
      </h1>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        Stop rewriting the same update for every audience. Paste your work — get 3 clear, stakeholder-ready outputs. Technical work deserves better business communication.
      </p>
      
      <!-- Value Props -->
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">⚡</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">3-in-1 Output</h3>
          <p class="text-gray-400">One card gives you 3 summaries — exec, product, and team.</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Stakeholder Alignment</h3>
          <p class="text-gray-400 text-sm">Bridge the gap with messaging tailored to each business role.</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">📄</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Ready to Export</h3>
          <p class="text-gray-400">Word, PowerPoint, and email formats — coming soon to select plans.</p>
        </div>
      </div>
      
      <!-- Main CTA -->
      <div class="mb-12">
        <div v-if="!isAuthenticated">
          <RouterLink
            to="/register"
            class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
          >
            Start Free with 40 Cards
          </RouterLink>
          <p class="text-gray-400 mt-4">
            No card needed • 3 summaries per input • 40 cards/month
          </p>
        </div>
        <RouterLink
          v-else
          to="/generator"
          class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
        >
          Go to Generator
        </RouterLink>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="mb-16">
      <div class="bg-red-900/20 border border-red-500/30 rounded-xl p-8">
        <h2 class="text-3xl font-bold text-center mb-6 text-white">The Translation Problem Every Technical Team Faces</h2>
        <div class="grid md:grid-cols-2 gap-8 text-center">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-red-400">What You Write</h3>
            <div class="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 font-mono">
              "Implemented RESTful API with OAuth 2.0 authentication, horizontal scaling via containerization, reduced latency by 40ms through query optimization..."
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-green-400">What They Need to Hear</h3>
            <div class="bg-gray-800 p-4 rounded-lg text-sm text-gray-300">
              "Launched a scalable, secure system that supports 10x more users and saves $50K in infrastructure — improving customer experience and uptime."
            </div>
          </div>
        </div>
        <div class="h-1 bg-gradient-to-r from-red-500 to-green-500 my-6 rounded"></div>
        <p class="text-center text-gray-300 text-lg">
          You spend hours rewriting technical updates for business folks. BenefitGen automates that — and gives you 3 useful outputs from each card.
        </p>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 text-center">
      <div class="bg-gray-800 rounded-2xl p-12 border border-gray-700 shadow-2xl shadow-amber-500/10">
        <h2 class="text-4xl font-bold mb-4 text-white">
          Built for Engineers. Loved by Stakeholders.
        </h2>
        <p class="text-xl text-amber-400 mb-8">
          Start free — 3 outputs per card, 40 cards per month, no credit card required.
        </p>
        
        <div v-if="!isAuthenticated" class="space-y-6">
          <div class="space-y-4">
            <RouterLink
              to="/register"
              class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
            >
              Start Free with 40 Cards
            </RouterLink>
            <p class="text-gray-400">40 cards/month • 100 input character limit • Each card generates 3 summaries</p>
          </div>
          
          <div class="border-t border-gray-600 pt-6">
            <p class="text-gray-400 mb-4">Already have an account?</p>
            <RouterLink
              to="/login"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-block"
            >
              Log In to Convert Now
            </RouterLink>
          </div>
          
          <div class="text-xs text-gray-500 pt-4">
            <p>Upgrade anytime: Pro ($35/mo) includes higher quotas, export support, and priority generation.</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <p class="text-blue-300 text-lg">
            💡 You’re set! 40 cards/month — each generates 3 polished outputs. Ready when you are.
          </p>
          <RouterLink
            to="/generator"
            class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
          >
            Go to the Generator
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-amber-500\/30 {
  box-shadow: 0 10px 25px -3px rgba(245, 158, 11, 0.3);
}

.shadow-amber-500\/10 {
  box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.1);
}
</style>
