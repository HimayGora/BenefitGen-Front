<script setup>
import { useHead } from '@vueuse/head'
import KeyEntryForm from './KeyEntryForm.vue'

const emit = defineEmits(['verificationSuccess'])

const handleVerification = () => {
  emit('verificationSuccess')
}
// Add this to manage the head tags for this page
useHead({
  title: 'AI Benefit Copy Generator | Convert Features to Benefits',
  meta: [
    {
      name: 'description',
      content: 'Effortlessly translate product features into powerful benefit copy with our AI-powered generator. Perfect for marketers and founders looking to craft compelling copy that converts.',
    },
    {
      name: 'google-site-verification',
      content: 'Lm3e4ux4vHfBq-8d8CbBmBBZFIq-FHevH08QR8k9sK8',
    },
    // Open Graph Tags for social sharing
    {
      property: 'og:title',
      content: 'AI Benefit Copy Generator | Convert Features to Benefits',
    },
    {
      property: 'og:description',
      content: 'Turn your product features into marketing copy that sells. Get beta access to our AI-powered generator.',
    },
    {
      property: 'og:url',
      content: 'https://generator.hsgportfolio.com',
    },
    
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

    <section class="mb-12 text-center max-w-3xl mx-auto">
      <p class="text-gray-400 mb-4">
        Hey there, I get it. You're passionate about your work, but juggling limited resources and demanding deadlines feels like a constant uphill battle. You pour your heart into crafting compelling messages, but sometimes the words just don't seem to land. You know your product is amazing, but translating those features into benefits that resonate with your audience feels… impossible. That's where we come in.
      </p>
      <p class="text-gray-400">
        We understand the pressure. I've seen countless marketers struggle with this exact challenge. That's why I'm so excited to introduce you to the solution that's going to change your workflow: the Benefit Copy Generator.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">The Problem</h2>
      <p class="text-gray-400 text-center max-w-3xl mx-auto">
        Let's be honest: writer's block is real. Spending hours crafting copy that doesn't convert is frustrating and costly. You're probably juggling multiple campaigns, and trying to make every word count. Focusing on features instead of benefits leaves your audience cold, leaving you with low conversion rates and a nagging feeling that you could be doing so much more.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">The Solution: Benefit Copy Generator</h2>
      <p class="text-gray-400 text-center max-w-3xl mx-auto">
        The Benefit Copy Generator isn't just another AI copywriting tool; it's your strategic partner in crafting high-converting marketing materials. This AI-powered platform takes your product feature lists – even just a quick 100-word description – and transforms them into compelling benefit-driven copy for landing pages, ads, and emails. It's like having a team of experienced copywriters working for you, 24/7.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">Key Benefits</h2>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">Skyrocket Conversions</h3>
          <p class="text-gray-400">Benefit-driven copy resonates with your audience, leading to significantly higher click-through and conversion rates. You'll see the impact in your analytics – more leads, more sales. This means more resources for your marketing efforts.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">Reclaim Your Precious Time</h3>
          <p class="text-gray-400">Stop wasting hours wrestling with writer's block. Generate multiple compelling benefit statements in seconds, freeing you to focus on strategy and other crucial tasks. Time is your most valuable asset; we help you manage it efficiently.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">Boost Marketing ROI</h3>
          <p class="text-gray-400">More effective copy means a better return on your marketing investment. You'll see a clear increase in engagement and conversions, justifying your marketing spend and demonstrating tangible results.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="font-bold text-xl mb-2 text-amber-400">Effortlessly Craft Compelling Narratives</h3>
          <p class="text-gray-400">Say goodbye to generic, feature-focused copy that fails to connect with your audience. The Benefit Copy Generator helps you tell a story that resonates, building trust and driving action.</p>
        </div>
      </div>
    </section>

    <section class="mb-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Core Features</h2>
        <ul class="list-disc list-inside max-w-md mx-auto text-gray-400 space-y-2">
            <li>AI-Powered Generation: Instantly transforms feature lists into compelling benefit-focused copy.</li>
            <li>Multiple Benefit Options: Provides various versions to choose from, ensuring optimal messaging.</li>
            <li>User-Friendly Interface: Simple and intuitive design with no complex settings to master.</li>
        </ul>
    </section>
    
    <section class="mb-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Why Benefit Copy Generator?</h2>
        <p class="text-gray-400 text-center max-w-3xl mx-auto">
            While other AI copywriting tools exist, the Benefit Copy Generator is specifically designed for marketers. It's not just about generating words; it's about understanding the nuances of marketing copy, focusing on the "why" behind your product, and crafting messages that drive results. We're not just creating content; we're building connections.
        </p>
    </section>

    <section id="get-access" class="py-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Ready to Experience the Power?</h2>
        <p class="text-center text-gray-400 mb-8">
          If you do not have a key, please email 
          <a href="mailto:hsg@hsgportfolio.com" class="text-amber-400 hover:underline font-medium">hsg@hsgportfolio.com</a> 
          to request access or a free demo.
        </p>
        <KeyEntryForm @verification-success="handleVerification" />
    </section>
  </div>
</template>