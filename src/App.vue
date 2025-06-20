<script setup>
import { onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import { useAuth } from './store/auth';

const { checkAuthStatus } = useAuth();

// When the app is first loaded, check if the user has a valid session cookie
onMounted(() => {
  checkAuthStatus();
});
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 w-full">
    <TheHeader />

    <main class="w-full flex items-center justify-center">
       <router-view />
    </main>
  </div>
</template>