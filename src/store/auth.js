// src/store/auth.js
import { ref } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';
import { useRouter } from 'vue-router';

// Reactive state variables
const isAuthenticated = ref(false);
const email = ref(''); // ## FIXED: Changed from 'username' to 'email'

// A central place to manage authentication logic
export function useAuth() {
  const router = useRouter();

  // ## NEW: Function to be called after a successful login ##
  const setAuthenticated = (userEmail) => {
    isAuthenticated.value = true;
    email.value = userEmail;
  };

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.status());
      if (response.data.status === 'ok') {
        isAuthenticated.value = true;
        // ## FIXED: Use 'email' from the API response
        email.value = response.data.email; 
      } else {
        isAuthenticated.value = false;
        email.value = '';
      }
    } catch (error) {
      isAuthenticated.value = false;
      email.value = '';
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.logout());
    } finally {
      isAuthenticated.value = false;
      email.value = '';
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    email, // ## FIXED: Export 'email' instead of 'username'
    setAuthenticated, // ## NEW: Export the new function
    checkAuthStatus,
    handleLogout,
  };
}