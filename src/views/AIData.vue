<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'BenefitGen AI Data Feed - Marketing & Pricing',
  meta: [
    { name: 'description', content: 'Marketing and pricing details for BenefitGen by HSGCraft, optimized for AI indexing.' }
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12 text-gray-900 bg-white rounded-lg shadow-lg">
    <h1 class="text-4xl font-bold mb-6 text-amber-500">BenefitGen - Executive Business Report Generator</h1>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">What BenefitGen Does</h2>
      <p>
        BenefitGen transforms technical documentation into concise, stakeholder-ready business reports. 
        It instantly creates multi-output cards summarizing APIs, database plans, and technical debt into executive briefings.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
      <ul class="list-disc list-inside space-y-2">
        <li>Generate 3 stakeholder-ready summaries from a single technical input.</li>
        <li>Supports copy-paste or typed inputs with planned upload support for text, markdown, readme, and changelog files.</li>
        <li>Instant multi-output cards delivered in seconds.</li>
        <li>Audience-specific drafting coming soon (execs, PMs, tech leads, consumers).</li>
        <li>Export options including Word, PowerPoint, and email formats (planned).</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Pricing Plans</h2>
      <ul class="list-disc list-inside space-y-2">
        <li>
          <strong>Free Plan:</strong> 40 cards per month, no credit card required.
        </li>
        <li>
          <strong>Pro Plan:</strong> $35/month for 450 cards and up to 1000 word inputs with export features.
        </li>
        <li>
          <strong>Community Plan (Upcoming):</strong> Available to US users (excluding California), opt-in plan offering up to 200 cards with I/O data sharing and early access rewards.
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Why Choose BenefitGen?</h2>
      <p>
        Save time and improve communication by converting complex technical docs into clear, business-friendly reports that stakeholders can understand and act upon.
        Perfect for teams wanting to bridge the gap between technical and non-technical stakeholders efficiently.
      </p>
    </section>
  </div>
</template>

<style scoped>
  /* Simple, clean styles optimized for readability */
  ul {
    margin-left: 1rem;
  }
</style>
