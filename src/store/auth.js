// src/store/auth.js
import { ref } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api/endpoints.js';
import { useRouter } from 'vue-router';

// Reactive state variables
const isAuthenticated = ref(false);
const email = ref('');
const isAdmin = ref(false);
const plan = ref('free'); // ## NEW: Add state for the user's plan ##

// A central place to manage authentication logic
export function useAuth() {
  const router = useRouter();

  // This function is useful for manual state setting, like after registration
  const setAuthenticated = (userEmail, userPlan = 'free') => {
    isAuthenticated.value = true;
    email.value = userEmail;
    plan.value = userPlan;
    isAdmin.value = userPlan === 'admin'; // Derive admin status from plan
  };

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.status());
      
      // Check for a successful response and email (primary indicators)
      if (response.data.status === 'ok' && response.data.email) {
        isAuthenticated.value = true;
        email.value = response.data.email;
        plan.value = response.data.plan || 'free'; // Store the user's plan

        // ## CORRECTED LOGIC ##
        // Set isAdmin based on whether the user's plan is 'admin'
        isAdmin.value = response.data.plan === 'admin';

      } else {
        // Reset all state if auth check fails
        isAuthenticated.value = false;
        email.value = '';
        plan.value = 'free';
        isAdmin.value = false;
      }
    } catch (error) {
      // Reset all state on error
      isAuthenticated.value = false;
      email.value = '';
      plan.value = 'free';
      isAdmin.value = false;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.logout());
    } finally {
      // Reset all state on logout
      isAuthenticated.value = false;
      email.value = '';
      plan.value = 'free';
      isAdmin.value = false;
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    email,
    isAdmin,
    plan, // ## NEW: Export 'plan' ##
    setAuthenticated,
    checkAuthStatus,
    handleLogout,
  };
}