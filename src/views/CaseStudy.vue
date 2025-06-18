<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Case Study: AI Benefit Copy Generator',
  meta: [
    {
      name: 'description',
      content: 'A deep dive into the process of building a full-stack AI application with Vue.js and Python, from concept and development to SEO and launch strategy.',
    },
    // Open Graph Tags for sharing the case study
    {
      property: 'og:title',
      content: 'Case Study: AI Benefit Copy Generator',
    },
    {
      property: 'og:description',
      content: 'How a simple idea to solve a common marketing problem became a full-stack portfolio piece. Read the full development lifecycle here.',
    },
    {
      property: 'og:url',
      content: 'https://generator.hsgportfolio.com/case-study',
    },
    {
      property: 'og:image',
      content: 'https://generator.hsgportfolio.com/BFG.png',
    },
  ],
})
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-16">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-amber-400">
        Case Study: The Benefit Copy Generator
      </h1>
      <p class="text-lg text-gray-400">
        A Portfolio Project Demonstrating the Full Product Development Lifecycle
      </p>
    </div>

    <!-- Main Content -->
    <div class="prose prose-invert max-w-none">
      <!-- Project Overview -->
      <h2>Project Overview</h2>
      <p>
        The Benefit Copy Generator is a full-stack web application designed to solve a common and persistent problem for marketers, founders, and creators: translating a list of product features into compelling, benefit-driven marketing copy. This tool takes a user's description of a product's features and uses a generative AI backend to produce persuasive copy ready for use on landing pages, ads, and emails. This project showcases skills in frontend development, backend API integration, and strategic product launch planning.
      </p>
      <p>
        <strong>Live Tool:</strong> <a href="https://generator.hsgportfolio.com" target="_blank" rel="noopener noreferrer">Benefit Copy Generator</a><br>
        <strong>Technologies Used:</strong> Vue.js, Python, Axios, Google Generative AI
      </p>

      <!-- The Problem -->
      <h2>The Problem</h2>
      <p>
        In today's competitive market, simply listing what a product does is not enough to drive conversions. Customers are motivated by what a product does for them. However, many creators and marketers struggle with writer's block or find it difficult to shift their perspective from technical features to user-centric benefits. This often results in flat, uninspired copy that fails to connect with the audience, leading to low engagement and poor sales performance. The goal of this project was to create a specialized tool that automates this creative leap.
      </p>

      <!-- The Development Process -->
      <h2>The Development Process & Tech Stack</h2>
      <p>
        The application was built with a modern, decoupled architecture to ensure a responsive user experience and a scalable backend.
      </p>
      <h3>Frontend</h3>
      <p>
        The user interface was built as a Single Page Application (SPA) using Vue.js. Key features include:
      </p>
      <ul>
        <li>A dynamic landing page (<code>LandingPage.vue</code>) to educate and attract users.</li>
        <li>A secure key verification form (<code>KeyEntryForm.vue</code>) to manage beta access.</li>
        <li>The core application logic (<code>Generator.vue</code>) with a clean user interface.</li>
        <li>The <code>@vueuse/head</code> library was used to manage page-specific meta tags for SEO.</li>
      </ul>
      <h3>Backend</h3>
      <p>
        A lightweight API was developed in Python to handle the AI logic.
      </p>
      <ul>
        <li>It receives feature descriptions from the Vue.js frontend.</li>
        <li>It uses the Google Generative AI library to process the input and generate high-quality benefit statements.</li>
        <li>The API is hosted on a cloud platform, configured to handle user requests efficiently.</li>
      </ul>
      <h3>Development Challenges</h3>
      <p>
        A significant challenge during the project was overcoming platform-specific environment issues within Windows. Diagnosing and resolving system PATH conflicts, and ensuring the correct Python version was utilized by both the terminal and VS Code, was a critical learning experience in robust environment setup and debugging.
      </p>
      
      <!-- The Solution -->
      <h2>The Solution</h2>
      <p>
        The final product is a streamlined and intuitive tool that requires no technical expertise to use. A user inputs their product features (up to 100 words), and the AI backend returns several compelling benefit statements. This allows users to A/B test different copy, overcome writer's block, and ultimately produce higher-quality marketing materials in a fraction of the time.
      </p>
      <p>
        The application is currently in a managed beta, requiring users to request a key for access. This controlled rollout allows for gathering feedback and ensuring a stable, high-quality user experience.
      </p>

      <!-- Marketing & Launch Strategy -->
      <h2>Marketing & Launch Strategy</h2>
      <p>
        To prepare the tool for indexing and discovery, a multi-step strategy was implemented:
      </p>
      <ol>
        <li><strong>On-Page SEO:</strong> The landing page was optimized with targeted keywords, a compelling headline, and a clear description of the product's value proposition. Essential meta tags (<code>&lt;title&gt;</code>, <code>&lt;meta name="description"&gt;</code>, Open Graph tags) were implemented to control the site's appearance in search results and on social media.</li>
        <li><strong>Google Search Console:</strong> The site was successfully verified with Google Search Console using the HTML file method. A <code>sitemap.xml</code> was created and submitted to ensure Google could efficiently discover and crawl the site.</li>
        <li><strong>Indexing Request:</strong> The "Request Indexing" feature in Google Search Console was used to place the site in a priority crawl queue.</li>
      </ol>
      <p>
        The next phase of the strategy will focus on content marketing by promoting this case study on professional networks like LinkedIn to attract targeted traffic and build site authority.
      </p>

      <!-- Conclusion & Future Steps -->
      <h2>Conclusion & Future Steps</h2>
      <p>
        The Benefit Copy Generator successfully moved from a conceptual idea to a fully functional, live application. This project demonstrates a comprehensive understanding of the product lifecycle, from identifying a user pain point to developing a full-stack solution and executing a foundational marketing strategy.
      </p>
      <p>
        Future steps could include building out user account features, offering different tones of voice for the generated copy, and potentially moving to a public, tiered access model.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling for the prose class to make long-form text more readable */
.prose {
  color: #d1d5db; /* Tailwind's gray-300 */
  line-height: 1.75;
}

.prose h2 {
  color: #ffffff;
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  margin-top: 2.5em;
  margin-bottom: 1.25em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #374151; /* gray-700 */
}

.prose h3 {
  color: #ffffff;
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 1em;
}

.prose a {
  color: #f59e0b; /* amber-500 */
  text-decoration: none;
  font-weight: 500;
}

.prose a:hover {
  text-decoration: underline;
}

.prose ul, .prose ol {
  padding-left: 1.5rem;
}

.prose li {
  margin-top: 0.5rem;
}

.prose strong {
  color: #e5e7eb; /* gray-200 */
}

.prose code {
  background-color: #374151; /* gray-700 */
  color: #f3f4f6; /* gray-100 */
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}
</style>
