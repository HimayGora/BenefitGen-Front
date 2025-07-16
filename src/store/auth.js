// src/store/auth.js
import { ref, computed } from 'vue'; // NEW: Import 'computed'
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api/endpoints.js'; // Using your endpoints.js file
import { useRouter } from 'vue-router';

// --- Reactive state variables ---
const isAuthenticated = ref(false);
const email = ref('');
const userPlan = ref(''); // NEW: To store the user's plan ('free', 'pro', 'admin')

// --- A central place to manage authentication logic ---
export function useAuth() {
  const router = useRouter();

  // NEW: A computed property that returns true if the user's plan is 'admin'.
  // You can use this in any component to easily show/hide admin-only elements.
  const isAdmin = computed(() => userPlan.value === 'admin');

  // This function is called after a successful login.
  // The user's plan will be fetched by checkAuthStatus shortly after.
  const setAuthenticated = (userEmail) => {
    isAuthenticated.value = true;
    email.value = userEmail;
  };

  // This function checks the session with the backend.
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.status());
      if (response.data.status === 'ok') {
        isAuthenticated.value = true;
        email.value = response.data.email;
        userPlan.value = response.data.plan; // NEW: Store the user's plan from the API response.
      } else {
        // If status is not 'ok', reset all auth state.
        isAuthenticated.value = false;
        email.value = '';
        userPlan.value = ''; // NEW: Reset plan.
      }
    } catch (error) {
      // If the API call fails (e.g., 401 Unauthorized), reset all auth state.
      isAuthenticated.value = false;
      email.value = '';
      userPlan.value = ''; // NEW: Reset plan.
    }
  };

  // This function logs the user out.
  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.logout());
    } finally {
      // Reset all auth state regardless of whether the API call succeeded.
      isAuthenticated.value = false;
      email.value = '';
      userPlan.value = ''; // NEW: Reset plan on logout.
      router.push('/login');
    }
  };

  // --- Return all state and functions to be used in components ---
  return {
    isAuthenticated,
    email,
    userPlan, // NEW: Export the plan if you need it directly.
    isAdmin,  // NEW: Export the computed admin check.
    setAuthenticated,
    checkAuthStatus,
    handleLogout,
  };
}
