<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from './store/auth';
import TheHeader from './components/TheHeader.vue';

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
    <TheHeader />
    <RouterView />
  </div>
</template>