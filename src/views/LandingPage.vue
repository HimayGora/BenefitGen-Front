<script setup>
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router';
import { useAuth } from '../store/auth';

const { isAuthenticated } = useAuth();

// SEO metadata remains optimized from our first exercise.
useHead({
  title: 'BenefitGen: Translate Technical Features into Stakeholder Benefits',
  meta: [
    {
      name: 'description',
      content: 'Stop struggling to explain technical features. BenefitGen instantly translates complex jargon into clear, benefit-driven messaging that resonates with any stakeholder. Try it free!',
    },
    { property: 'og:title', content: 'BenefitGen: From Confusing Jargon to Clear Benefits' },
    { property: 'og:description', content: 'Stop trying to justify technical features. Instantly create clear, persuasive messaging that gets stakeholder buy-in. See how it works' },
    { property: 'og:url', content: 'https://generator.hsgportfolio.com' },
    { property: 'og:image', content: 'https://generator.hsgportfolio.com/BFG.png' },
  ],
})
</script>
<template>
  <div class="w-full max-w-4xl mx-auto px-4">
        <section class="text-center py-16">
      <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-amber-400">
        Ship the Feature. Nail the Pitch.
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        Your work is technical. Your stakeholders aren't. BenefitGen is the bridge, translating complex features into the clear, compelling benefits that drive budgets and win support.
      </p>
    </section>

        <section class="mb-16 text-center max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-6 text-white">Ever Feel Like You're Speaking a Different Language?</h2>
      <p class="text-gray-400">
        You see elegant code, a robust API, or a scalable architecture. They see a line item and ask, "What's the ROI?" That gap is where great projects lose momentum. You're forced to become a translator on the fly, fighting to justify the value of your team's hard work.
      </p>
    </section>

        <section class="mb-16">
      <div class="bg-gray-800 rounded-lg p-8 md:p-12 border border-gray-700">
          <h2 class="text-3xl font-bold text-center mb-6 text-white">BenefitGen is Your On-Demand <span class="text-amber-400">Translator</span></h2>
          <p class="text-gray-300 text-center max-w-3xl mx-auto text-lg">
              Feed it your technical feature—no matter how jargony—and instantly get clear, benefit-driven messaging tailored for the stakeholder you need to convince. Stop writing from scratch. Start communicating with impact.
          </p>
      </div>
    </section>

        <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">Move Faster, From Code to Buy-In</h2>
      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center">
          <div class="text-3xl mb-2">🤝</div>
          <h3 class="font-bold text-xl mb-2 text-amber-400">Win Over Stakeholders</h3>
          <p class="text-gray-400">Generate copy that speaks their language: results, efficiency, and competitive advantage.</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-2">⚡</div>
          <h3 class="font-bold text-xl mb-2 text-amber-400">Eliminate Guesswork</h3>
          <p class="text-gray-400">Instantly find the strongest angle to prove your feature's value, without hours of wordsmithing.</p>
        </div>
        <div class="text-center">
          <div class="text-3xl mb-2">📈</div>
          <h3 class="font-bold text-xl mb-2 text-amber-400">Accelerate Your Roadmap</h3>
          <p class="text-gray-400">Get faster approvals and unite your teams by making the "why" behind your work undeniable.</p>
        </div>
      </div>
    </section>
    
        <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">It's Not Just Automation, It's Insight</h2>
        <p class="text-gray-400 text-center max-w-3xl mx-auto">
        Other AI tools write generic copy. BenefitGen is different. It's trained on product specs, pitch decks, and stakeholder updates. It doesn't just replace words; it reframes your perspective, turning technical jargon into strategic business value.
        </p>
    </section>
    
        <section id="get-access" class="py-12 bg-gray-900 rounded-lg">
      <h2 class="text-3xl font-bold text-center mb-4 text-white">
        Stop Translating in Your Head.
      </h2>
      <p class="text-center text-amber-400 text-lg mb-8">Start generating winning pitches in seconds.</p>

      <div v-if="!isAuthenticated" class="space-y-6">
      <div class="flex items-center justify-center space-x-4">
        <RouterLink
          to="/login"
          class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
         >
        Log In
        </RouterLink>

        <RouterLink
          to="/register"
          class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
        >
        Start Translating for Free
        </RouterLink>
      </div>
        <p class="text-center text-gray-500 text-sm">No credit card required.</p>
    </div>

    <div v-else class="space-y-4 text-center">
      <p class="text-blue-300 text-lg px-8">
        💡 You're ready to go. Let's build your next pitch.
      </p>

      <RouterLink
        to="/generator"
       class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
       >
       Go to the Generator
      </RouterLink>
   </div>
  </section>
 </div>
</template>
