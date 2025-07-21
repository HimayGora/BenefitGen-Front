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
  <div class="max-w-6xl mx-auto px-4">
    
    <!-- Hero Section -->
    <section class="text-center py-16">
      <div class="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-xl px-6 py-3 rounded-full inline-block mb-8">
        FREE • 5 Conversions • No Credit Card Required
      </div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Paste Your <span class="text-amber-400">Technical Docs</span><br>
        Get Executive-Ready <span class="text-amber-400">Business Reports</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        API documentation → Business impact summary. Database migration plan → Stakeholder report. Technical debt → Executive briefing. <strong>Transform any technical document into the language your stakeholders actually understand.</strong>
      </p>
      
      <!-- Value Props -->
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">⚡</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">30-Second Transformation</h3>
          <p class="text-gray-400">Paste technical docs → Get executive summary</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">4 Audience Types</h3>
          <p class="text-gray-400">Executives, PMs, consumers, tech leads</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
          <div class="text-3xl mb-3">📄</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Export Ready</h3>
          <p class="text-gray-400">Word, PowerPoint, email formats</p>
        </div>
      </div>
      
      <!-- Main CTA -->
      <div class="mb-12">
        <RouterLink
          v-if="!isAuthenticated"
          to="/register"
          class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
        >
          Start Converting for Free
        </RouterLink>
        <RouterLink
          v-else
          to="/generator"
          class="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-12 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 inline-block"
        >
          Go to Generator
        </RouterLink>
        <p class="text-gray-400 mt-4" v-if="!isAuthenticated">No credit card required • 5 free conversions</p>
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
          You spend hours rewriting technical updates for business stakeholders. BenefitGen does it in seconds.
        </p>
      </div>
    </section>

    <!-- Use Cases Grid -->
    <section class="mb-16">
      <h2 class="text-4xl font-bold text-center mb-12 text-white">Perfect For Every Technical Document</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">📊</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">API Documentation</h3>
          <p class="text-gray-400 text-sm">Turn endpoint specs into business capability summaries</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">🗄️</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Database Migrations</h3>
          <p class="text-gray-400 text-sm">Convert schema changes into downtime & risk assessments</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">🏗️</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Architecture Changes</h3>
          <p class="text-gray-400 text-sm">Translate technical debt into business investment cases</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">🔧</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Feature Specifications</h3>
          <p class="text-gray-400 text-sm">Transform code requirements into user benefit statements</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Deployment Plans</h3>
          <p class="text-gray-400 text-sm">Convert technical rollouts into business impact timelines</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="text-3xl mb-3">⚠️</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Security Updates</h3>
          <p class="text-gray-400 text-sm">Turn vulnerability reports into risk mitigation summaries</p>
        </div>
      </div>
    </section>

    <!-- Before/After Examples -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">See the Transformation</h2>
      <div class="space-y-8">
        <div class="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 class="text-xl font-semibold mb-4 text-amber-400">Database Migration Example</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2 text-red-400">❌ Technical Input</h4>
              <div class="bg-gray-900 p-4 rounded text-sm text-gray-300 font-mono">
                "Migrating from MySQL 5.7 to PostgreSQL 14. Schema normalization, data type conversions, stored procedure refactoring. Estimated 4-hour maintenance window..."
              </div>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-green-400">✅ Executive Summary</h4>
              <div class="bg-gray-900 p-4 rounded text-sm text-gray-300">
                "<strong>Business Impact:</strong> 4-hour planned downtime on [date] to upgrade database for 3x faster queries and $2K/month cost savings. Risk: Low. Backup plan: Immediate rollback capability."
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 class="text-xl font-semibold mb-4 text-amber-400">API Rate Limiting Example</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2 text-red-400">❌ Technical Input</h4>
              <div class="bg-gray-900 p-4 rounded text-sm text-gray-300 font-mono">
                "Implementing token bucket algorithm for API rate limiting. 1000 requests/hour per user, exponential backoff, Redis-backed counters..."
              </div>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-green-400">✅ Stakeholder Report</h4>
              <div class="bg-gray-900 p-4 rounded text-sm text-gray-300">
                "<strong>Prevents system overload and ensures 99.9% uptime for all users.</strong> Fair usage limits protect against abuse while maintaining excellent experience for legitimate users. No user impact expected."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why It Works -->
    <section class="mb-16">
      <div class="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
        <h2 class="text-3xl font-bold mb-6 text-white">Not Just Word Replacement - Strategic Reframing</h2>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
          BenefitGen is trained on thousands of technical specifications, executive briefings, and stakeholder updates. It doesn't just translate jargon—it understands the business context your audience cares about.
        </p>
        <div class="grid md:grid-cols-3 gap-6 mt-8">
          <div>
            <div class="text-3xl mb-3">🎯</div>
            <h3 class="font-semibold mb-2 text-amber-400">Audience-Aware</h3>
            <p class="text-gray-400 text-sm">Different stakeholders need different information. We tailor the output accordingly.</p>
          </div>
          <div>
            <div class="text-3xl mb-3">💼</div>
            <h3 class="font-semibold mb-2 text-amber-400">Business-Focused</h3>
            <p class="text-gray-400 text-sm">Always leads with ROI, risk mitigation, and competitive advantage.</p>
          </div>
          <div>
            <div class="text-3xl mb-3">⚡</div>
            <h3 class="font-semibold mb-2 text-amber-400">Instant Results</h3>
            <p class="text-gray-400 text-sm">No more spending hours crafting the perfect executive summary.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Export Formats -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-white">Export Ready-to-Share Formats</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div class="text-4xl mb-3">📄</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Word Documents</h3>
          <p class="text-gray-400 text-sm">Professional reports ready for executive meetings</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div class="text-4xl mb-3">📊</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">PowerPoint Slides</h3>
          <p class="text-gray-400 text-sm">Instant stakeholder presentation decks</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="font-bold text-lg mb-2 text-amber-400">Email Templates</h3>
          <p class="text-gray-400 text-sm">Copy-paste ready stakeholder updates</p>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="mb-16 text-center">
      <h2 class="text-2xl font-bold mb-6 text-white">Join 500+ Technical Teams Already Converting Their Docs</h2>
      <div class="flex justify-center items-center space-x-8 text-gray-400">
        <div class="text-sm">🏢 Startups to Fortune 500</div>
        <div class="text-sm">👥 Dev Teams</div>
        <div class="text-sm">📊 Product Managers</div>
        <div class="text-sm">🎯 CTOs</div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 text-center">
      <div class="bg-gray-800 rounded-2xl p-12 border border-gray-700 shadow-2xl shadow-amber-500/10">
        <h2 class="text-4xl font-bold mb-4 text-white">
          Stop Struggling to Explain Technical Work
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
              Start Converting for Free
            </RouterLink>
            <p class="text-gray-400">5 free conversions • No credit card required</p>
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
            <p>Upgrade anytime: Unlimited conversions • All export formats • Priority support - $19/month</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <p class="text-blue-300 text-lg">
            💡 You're ready to go. Let's build your next pitch.
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

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-500 text-sm">
      <p>BenefitGen - Bridge the gap between technical excellence and business understanding</p>
    </footer>
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