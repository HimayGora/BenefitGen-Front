<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'BenefitGen Privacy Policy',
  meta: [
    { name: 'description', content: 'Privacy Policy for BenefitGen by HSGCraft.' }
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12 text-gray-200 bg-gray-900 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
    <h1 class="text-3xl font-bold mb-6 text-amber-400">BenefitGen Privacy Policy</h1>
    <p class="mb-6">Effective Date: 07-21-2025</p>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">How should BenefitGen be used?</h2>
      <p class="text-gray-300">BenefitGen is designed for safe, non-sensitive use cases like translating technical product docs into business language for clearer stakeholder communication. It is not intended for PII, code, legal documents, or anything confidential. For more sensitive use cases, contact us to discuss custom terms or private deployments.</p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><strong>Account Information:</strong> Email address and other registration data you provide.</li>
        <li><strong>Input Data:</strong> Technical documentation and text you submit for processing.</li>
        <li><strong>Usage Data:</strong> Logs about your interactions with the service, including IP address and device info.</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>To provide and maintain the service.</li>
        <li>To detect and prevent violations of our Terms, including PII checks.</li>
        <li>To improve and develop new features.</li>
        <li>To communicate important updates, billing, and support.</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">3. Data Security</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>We implement reasonable technical and organizational measures to protect your data.</li>
        <li>No system is completely secure; we cannot guarantee absolute security.</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>We do not sell your personal data to third parties.</li>
        <li>We may share data with trusted service providers under confidentiality agreements.</li>
        <li>We may disclose data to comply with legal obligations or protect rights.</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">5. User Responsibilities</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>You agree not to submit personal or sensitive information (PII) through the service.</li>
        <li>You are responsible for auditing any output you generate.</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">6. Retention</h2>
      <p>We retain your account and input data as long as your account is active or as needed to provide the service.</p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">7. Your Rights</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>You may access, correct, or delete your account information by contacting support.</li>
        <li>You may cancel your subscription at any time (see Terms of Service for billing terms).</li>
      </ul>
    </section>

    <section id="section-8" class="my-8">
      <h2 class="text-xl font-semibold mb-2">8. Community Plan Data Collection (Upcoming)</h2>
      <p class="text-gray-300">
        When the Community Plan launches, we may collect and retain anonymized I/O pairs and user feedback submitted by participants.
        This data will not include personal identifiers and will be used solely to improve our services.
        The Community Plan will be restricted to U.S. users (excluding California) and governed by additional terms.
        You will be notified before activation.
      </p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">9. Children’s Privacy</h2>
      <p>BenefitGen is intended for users aged 18 and over. We do not knowingly collect data from children under 18.</p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">10. Changes to this Policy</h2>
      <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or on our site. Continued use indicates acceptance.</p>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">11. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact: <a href="mailto:support@hsgcraft.com" class="text-amber-400 underline">support@hsgcraft.com</a></p>
    </section>
  </div>
</template>

<style scoped>
/* Optional scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #f59e0b; /* amber-400 */
  border-radius: 4px;
}
</style>
