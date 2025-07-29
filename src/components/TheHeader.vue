<script setup>
import { useAuth } from '../store/auth';
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';


const { isAuthenticated, email, isAdmin, handleLogout } = useAuth();

// State to control the mobile menu's visibility
const isMobileMenuOpen = ref(false);

const displayName = computed(() => {
  if (!email.value) {
    return '';
  }
  const namePart = email.value.split('@')[0];
  const dotIndex = namePart.indexOf('.');
  const maxLength = 5; // Increased length for better display
  let finalName = '';
  if (dotIndex !== -1 && dotIndex < maxLength) {
    finalName = namePart.substring(0, dotIndex);
  } else {
    finalName = namePart.substring(0, maxLength);
  }
  if (finalName.length > 0) {
    return finalName.charAt(0).toUpperCase() + finalName.slice(1);
  }
  return '';
});
// Function to close the mobile menu, useful for navigation
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="w-full bg-gray-800/50 backdrop-blur-sm p-4 shadow-lg mb-8 relative">
    <div class="max-w-7xl mx-auto">
      <nav class="flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" @click="closeMobileMenu" class="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors z-30">
          <img src="/LLT.png" alt="BenefitGen Logo" class="h-8 inline-block mr-2">
          BenefitGen
        </RouterLink>

        <!-- Desktop Menu (Visible on Medium screens and up) -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Admin Links -->
          <template v-if="isAuthenticated && isAdmin">
            <span class="text-gray-300">Welcome, {{ displayName }} (Admin)</span>
            <a href="/blog/" class="font-medium text-white hover:text-amber-400 transition-colors">Blog</a>
            <RouterLink to="/admin" class="font-medium text-white hover:text-amber-400 transition-colors">Admin Panel</RouterLink>
            <RouterLink to="/generator" class="font-medium text-white hover:text-amber-400 transition-colors">Go to App</RouterLink>
            <button @click="handleLogout" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg text-sm">Logout</button>
          </template>
          <!-- Regular User Links -->
          <template v-else-if="isAuthenticated && !isAdmin">
            <span class="text-gray-300">Welcome, {{ displayName }}</span>
            <a href="/blog/" class="font-medium text-white hover:text-amber-400 transition-colors">Blog</a>
            <RouterLink to="/pricing" class="font-medium text-white hover:text-amber-400 transition-colors">Pricing</RouterLink>
            <RouterLink to="/generator" class="font-medium text-white hover:text-amber-400 transition-colors">Go to App</RouterLink>
            <button @click="handleLogout" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">Logout</button>
          </template>
          <!-- Guest Links -->
          <template v-else>
            <a href="/blog/" class="font-medium text-white hover:text-amber-400 transition-colors">Blog</a>
            <RouterLink to="/pricing" class="font-medium text-white hover:text-amber-400 transition-colors">Pricing</RouterLink>
            <RouterLink to="/login" class="font-medium text-white hover:text-amber-400 transition-colors">Login</RouterLink>
            <RouterLink to="/register" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg">Register</RouterLink>
          </template>
        </div>

        <!-- Hamburger Button (Visible on Mobile) -->
        <div class="md:hidden z-30">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-start space-y-8 px-4 overflow-y-auto pt-12 pb-12"
    >
      <!-- Admin Links -->
      <template v-if="isAuthenticated && isAdmin">
        <span class="text-2xl text-gray-300 text-center">Welcome, {{ displayName }}</span>
        <a href="/blog/" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Blog</a>
        <RouterLink to="/admin" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Admin Panel</RouterLink>
        <RouterLink to="/generator" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Go to App</RouterLink>
        <button @click="() => { handleLogout(); closeMobileMenu(); }" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-lg text-lg">Logout</button>
      </template>

      <!-- Regular User Links -->
      <template v-else-if="isAuthenticated && !isAdmin">
        <span class="text-2xl text-gray-300 text-center">Welcome, {{ displayName }}</span>
        <a href="/blog/" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Blog</a>
        <RouterLink to="/pricing" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Pricing</RouterLink>
        <RouterLink to="/generator" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Go to App</RouterLink>
        <button @click="() => { handleLogout(); closeMobileMenu(); }" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg">Logout</button>
      </template>

      <!-- Guest Links -->
      <template v-else>
        <a href="/blog/" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Blog</a>
        <RouterLink to="/pricing" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Pricing</RouterLink>
        <RouterLink to="/login" @click="closeMobileMenu" class="text-2xl font-medium text-white hover:text-amber-400">Login</RouterLink>
        <RouterLink to="/register" @click="closeMobileMenu" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-lg text-lg">Register</RouterLink>
      </template>
    </div>

  </header>
</template>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>