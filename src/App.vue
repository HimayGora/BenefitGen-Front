<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from './store/auth';
import TheHeader from './components/TheHeader.vue';
import AppSkeleton from './components/AppSkeleton.vue'; 
import ConsentBanner from './components/ConsentBanner.vue'; 

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
  <div class="flex flex-col min-h-screen">

    <!-- Loading skeleton -->
    <div v-if="!isReady" class="flex-grow flex flex-col items-center justify-center pt-8">
      <AppSkeleton />
    <!-- Main app content -->
    </div >
    
      <Transition name="fade">
        <div v-if="isReady" class="flex-grow flex flex-col items-center pt-8">
          <TheHeader />
          <main class="flex-grow w-full max-w-6xl px-4">
            <RouterView />
          </main>
        </div>
      </Transition>

    <!-- Footer always visible -->
    <ConsentBanner /> 
    <footer class="py-4 text-center text-gray-400 text-sm border-t border-gray-700 mt-auto">
      <a href="/tos" class="mx-3 hover:text-amber-400">Terms of Service</a>
      <a href="/privacy" class="mx-3 hover:text-amber-400">Privacy Policy</a>
      <a href="mailto:support@hsgcraft.com" class="mx-3 hover:text-amber-400">Contact</a>
      <a href="/about.html" class="mx-3 hover:text-amber-400">About</a>
      <p class="mt-2">&copy; 2025 BenefitGen&trade; by HSGCraft&trade;<sup>&trade;</sup></p>
    </footer>

  </div>
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