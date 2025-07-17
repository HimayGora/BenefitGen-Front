<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from './store/auth';
import TheHeader from './components/TheHeader.vue';
import AppSkeleton from './components/AppSkeleton.vue'; // Import the new skeleton

const { checkAuthStatus } = useAuth();
const isReady = ref(false);

onMounted(async () => {
  // A slight delay can make the skeleton more visible and feel smoother
  // You can remove this line if you don't want a minimum load time
  await new Promise(resolve => setTimeout(resolve, 200));

  await checkAuthStatus();
  isReady.value = true;
});
</script>

<template>
  <div v-if="!isReady" class="flex flex-col items-center min-h-screen pt-8">
    <AppSkeleton />
  </div>

  <Transition name="fade">
    <div v-if="isReady" class="flex flex-col items-center min-h-screen pt-8">
      <TheHeader />
      <main class="">
        <RouterView />
      </main>
    </div>
  </Transition>
</template>

<style>
/* Transition styles for the fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>