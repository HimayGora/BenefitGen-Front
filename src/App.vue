<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from './store/auth';

const { checkAuthStatus } = useAuth();
const isReady = ref(false);

onMounted(async () => {
  await checkAuthStatus();
  isReady.value = true;
});
</script>

<template>
  <div v-if="!isReady">
    <p class="text-white">Loading...</p>
  </div>
  <div v-else>
    <AppHeader />
    <RouterView />
  </div>
</template>