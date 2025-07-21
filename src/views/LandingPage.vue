<script setup>
import { useHead } from '@vueuse/head'
import { RouterLink } from 'vue-router';
import { useAuth } from '../store/auth';

const { isAuthenticated } = useAuth();

// SEO metadata remains optimized from our first exercise.
useHead({
  title: 'BenefitGen: Help Stakeholders Understand Technical Work',
  meta: [
    {
      name: 'description',
      content: 'BenefitGen helps technical teams frame their work in business-relevant language. Turn feature explanations into summaries stakeholders can understand. Try it free.',
    },
    { property: 'og:title', content: 'BenefitGen: From Technical Jargon to Business Clarity' },
    { property: 'og:description', content: 'Help your stakeholders get it. Frame your tech updates in ways that highlight business value. Start free.' },
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
        Paste Your <span class="text-amber-400">Technical Docs</span><br>
        Get Executive-Ready <span class="text-amber-400">Business Reports</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        API documentation → Business impact summary. Database migration plan → Stakeholder report. Technical debt → Executive briefing. <strong>Each card gives you 3 stakeholder-ready outputs from a single input.</strong>
      </p>
      
      <!-- Value Props -->
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">⚡</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Instant Multi-Output Cards</h3>
          <p class="text-gray-400">One input → Three stakeholder-ready summaries in seconds</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Audience-Specific Drafting</h3>
          <p class="text-gray-400 text-sm">Coming soon on select plans: Tailor outputs for execs, PMs, consumers, and tech leads</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">📄</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Export Options (Coming Soon)</h3>
          <p class="text-gray-400">Plan to support Word, PowerPoint, and email formats</p>
        </div>
      </div>
      
      <!-- Main CTA -->
      <div class="mb-12">
        <div class="" v-if="!isAuthenticated">
          <RouterLink
            to="/register"
            class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
          >
            Start Free with 40 Cards
          </RouterLink>
          <div class="my-4"></div>
          <RouterLink 
            class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
            to="/pricing"
          >
            Need more than 40 cards? Upgrade to Pro for higher usage caps, 1000-word inputs, and export formats — just $35/month.
          </RouterLink>
        </div>
        <RouterLink
          v-else
          to="/generator"
          class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
        >
          Go to Generator
        </RouterLink>
        <p class="text-gray-400 mt-4" v-if="!isAuthenticated">40 free cards/month • No credit card required • Each card includes 3 stakeholder-ready summaries</p>
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
              "Delivered secure user login system that handles 10x more customers without crashes, saving $50K annually in server costs while improving user experience."
            </div>
          </div>
        </div>
        <div class="h-1 bg-gradient-to-r from-red-500 to-green-500 my-6 rounded"></div>
        <p class="text-center text-gray-300 text-lg">
          You spend hours rewriting technical updates for business stakeholders. BenefitGen gives you 3 summaries per card — in seconds.
        </p>
      </div>
    </section>

    <!-- Use Cases and other sections remain unchanged unless you want to update those too -->
    
    <!-- Final CTA Section -->
    <section class="py-16 text-center">
      <div class="bg-gray-800 rounded-2xl p-12 border border-gray-700 shadow-2xl shadow-amber-500/10">
        <h2 class="text-4xl font-bold mb-4 text-white">
          Try it free. No card required. Get 40 cards/month — each with 3 tailored outputs.
        </h2>
        <p class="text-xl text-amber-400 mb-8">
          Join technical teams already converting their docs into stakeholder-ready reports
        </p>
        
        <div v-if="!isAuthenticated" class="space-y-6">
          <div class="space-y-4">
            <RouterLink
              to="/register"
              class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
            >
              Start Free with 40 Cards
            </RouterLink>
            <p class="text-gray-400">40 cards/month • 100 input limit • Each card includes 3 audience-ready summaries</p>
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
            <p>Upgrade anytime: Unlimited cards • All export formats • Priority support - $35/month</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <p class="text-blue-300 text-lg">
            💡 You're ready to go. You've got 40 cards/month — each with 3 stakeholder-ready outputs.
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