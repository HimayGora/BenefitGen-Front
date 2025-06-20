<script setup>
import { useAuth } from '../store/auth';
import { RouterLink } from 'vue-router';

const { isAuthenticated, email, handleLogout } = useAuth();
</script>

<template>
  <header class="bg-gray-800/50 backdrop-blur-sm w-full max-w-5xl p-4 rounded-lg shadow-lg mb-8">
    <nav class="flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
        BenefitGen
      </RouterLink>

      <div>
        <div v-if="!isAuthenticated" class="space-x-4">
          <RouterLink to="/login" class="font-medium text-white hover:text-amber-400 transition-colors">
            Login
          </RouterLink>
          <RouterLink to="/register" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
            Register
          </RouterLink>
        </div>

        <div v-else class="flex items-center space-x-4">
          <span class="text-gray-300">Welcome, {{ email }}</span>
          <RouterLink to="/generator" class="font-medium text-white hover:text-amber-400 transition-colors">
            Go to App
          </RouterLink>
          <button @click="handleLogout" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>