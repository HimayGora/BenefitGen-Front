import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';

// Adjust the import paths based on your file structure
import LandingPage from '../views/LandingPage.vue';
import Generator from '../views/Generator.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CaseStudy from '../views/CaseStudy.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/generator',
    name: 'Generator',
    component: Generator,
    meta: { requiresAuth: true } // Mark this route as requiring authentication
  },
  {path: '/case-study', name: 'CaseStudy', component: CaseStudy }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    try {
      // Set withCredentials for this check, in case the user reloads the page
      axios.defaults.withCredentials = true;
      // Call the /api/status endpoint to verify the user's session
      await axios.get(API_ENDPOINTS.status());
      // If the request succeeds (doesn't throw an error), the user is authenticated.
      next();
    } catch (error) {
      // If the request fails (e.g., returns a 401), the user is not authenticated.
      // Redirect them to the login page.
      console.log('Authentication required. Redirecting to login.');
      next({ name: 'Login' });
    }
  } else {
    // If the route doesn't require auth, allow the user to proceed
    next();
  }
});

export default router;