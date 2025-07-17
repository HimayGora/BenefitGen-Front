<script setup>
import { useAuth } from '../store/auth';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const { isAuthenticated, email, isAdmin, handleLogout } = useAuth();

// Replace your old computed property with this new logic
const displayName = computed(() => {
  if (!email.value) {
    return '';
  }

  const namePart = email.value.split('@')[0];
  const dotIndex = namePart.indexOf('.');
  const maxLength = 5;

  let finalName = '';

  // If a '.' exists and its position is before the maxLength
  if (dotIndex !== -1 && dotIndex < maxLength) {
    finalName = namePart.substring(0, dotIndex);
  } else {
    // Otherwise, just take the first 5 characters
    finalName = namePart.substring(0, maxLength);
  }

  // Capitalize the first letter for a clean display
  if (finalName.length > 0) {
    return finalName.charAt(0).toUpperCase() + finalName.slice(1);
  }
  
  return '';
});
</script>

<template>
  <header class="w-full bg-gray-800/50 backdrop-blur-sm p-4 shadow-lg mb-8">
    <div class="max-w-7xl mx-auto">
      <nav class="flex justify-between items-center">
        <RouterLink to="/" class="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
          BenefitGen
        </RouterLink>

        <div>
          <div v-if="isAuthenticated && isAdmin" class="flex items-center space-x-4">
            <span class="text-gray-300">Welcome, {{ displayName }} (Admin)</span>
            <RouterLink to="/admin" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg">
              Admin Panel
            </RouterLink>

            <RouterLink to="/login" class="font-medium text-white hover:text-amber-400 transition-colors">
              Login
            </RouterLink>

            <RouterLink to="/register" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
              Register
            </RouterLink>
          </div>

          <div v-else-if="isAuthenticated && !isAdmin" class="flex items-center space-x-4">
            <span class="text-gray-300">Welcome, {{ displayName }}</span>
            <RouterLink to="/pricing" class="font-medium text-white hover:text-amber-400 transition-colors">
              Pricing
            </RouterLink>
            <RouterLink to="/generator" class="font-medium text-white hover:text-amber-400 transition-colors">
              Go to App
            </RouterLink>
            <button @click="handleLogout" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
              Logout
            </button>
          </div>

          <div v-else class="flex items-center space-x-4">
            <RouterLink to="/pricing" class="font-medium text-white hover:text-amber-400 transition-colors">
              Pricing
            </RouterLink>
            <RouterLink to="/login" class="font-medium text-white hover:text-amber-400 transition-colors">
              Login
            </RouterLink>
            <RouterLink to="/register" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg">
              Register
            </RouterLink>
          </div>

        </div>
      </nav>
      <p class="text-xs text-white">Auth: {{ isAuthenticated }} | Admin: {{ isAdmin }} | Email: {{ email }}</p>
    </div>
  </header>
</template>