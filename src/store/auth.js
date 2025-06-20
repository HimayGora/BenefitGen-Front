// src/store/auth.js
import { ref } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';
import { useRouter } from 'vue-router';

// Reactive state variables
const isAuthenticated = ref(false);
const username = ref('');

// A central place to manage authentication logic
export function useAuth() {
  const router = useRouter();

  // Checks the backend to see if a session is still valid
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.status());
      if (response.data.status === 'ok') {
        isAuthenticated.value = true;
        username.value = response.data.username;
      } else {
        isAuthenticated.value = false;
        username.value = '';
      }
    } catch (error) {
      isAuthenticated.value = false;
      username.value = '';
    }
  };

  // Handles the logout process
  const handleLogout = async () => {
    try {
      await axios.post(API_ENDPOINTS.logout());
    } finally {
      isAuthenticated.value = false;
      username.value = '';
      // Redirect to the login page after logout
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    username,
    checkAuthStatus,
    handleLogout,
  };
}