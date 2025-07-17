// src/store/auth.js
import { ref } from 'vue';
import axios from 'axios';
// Using your endpoints.js file
import { API_ENDPOINTS } from '../utils/api/endpoints.js';
import { useRouter } from 'vue-router';

// Reactive state variables
const isAuthenticated = ref(false);
const email = ref('');
const isAdmin = ref(false); // ## NEW: Add state for admin status ##

// A central place to manage authentication logic
export function useAuth() {
  const router = useRouter();

  // ## UPDATED: Function to be called after a successful login ##
  const setAuthenticated = (userEmail, userIsAdmin = false) => {
    isAuthenticated.value = true;
    email.value = userEmail;
    isAdmin.value = userIsAdmin; // ## NEW: Set admin status ##
  };

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.status());
      if (response.data.status === 'ok') {
        isAuthenticated.value = true;
        email.value = response.data.email;
        // ## NEW: Set admin status from the API response ##
        // Your API must return `isAdmin: true` for admin users.
        isAdmin.value = response.data.isAdmin || false;
      } else {
        isAuthenticated.value = false;
        email.value = '';
        isAdmin.value = false; // ## NEW: Reset admin status ##
      }
    } catch (error) {
      isAuthenticated.value = false;
      email.value = '';
      isAdmin.value = false; // ## NEW: Reset admin status ##
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.logout());
    } finally {
      isAuthenticated.value = false;
      email.value = '';
      isAdmin.value = false; // ## NEW: Reset admin status on logout ##
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    email,
    isAdmin, // ## NEW: Export 'isAdmin' ##
    setAuthenticated,
    checkAuthStatus,
    handleLogout,
  };
}