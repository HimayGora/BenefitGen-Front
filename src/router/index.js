import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';
import { useAuth } from '../store/auth'; // Add this import

// Adjust the import paths based on your file structure
import LandingPage from '../views/LandingPage.vue';
import Generator from '../views/Generator.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Pricing from '../views/Pricing.vue';
import PaymentSuccess from '../views/PaymentSuccess.vue';
import PaymentCancel from '../views/PaymentCancel.vue';
import Admin from '../views/Admin.vue';
import TOS from '../views/TOS.vue';
import Privacy from '../views/Privacy.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/generator',
    name: 'Generator',
    component: Generator,
    meta: { requiresAuth: true }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
    
  },
  {
    path: '/success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
    meta: { requiresAuth: true }
  },
  {
    path: '/cancel',
    name: 'PaymentCancel',
    component: PaymentCancel,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/tos',
    name: 'TOS',
    component: TOS,
  },
  {
    path: '/privacy',
    name: 'Privacy',  
    component: Privacy,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // Refresh auth state for specific route transitions
  const shouldRefreshAuth = 
    from.name === 'Login' || // Coming from login
    (from.name === 'Generator' && to.name === 'Landing'); // Going from generator to landing

  if (shouldRefreshAuth) {
    try {
      const { checkAuthStatus } = useAuth();
      await checkAuthStatus();
    } catch (error) {
      console.log('Auth refresh failed:', error);
    }
  }

  if (requiresAuth) {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(API_ENDPOINTS.status());
      
      if (requiresAdmin && response.data.plan !== 'admin') {
        // If route requires admin and user is not admin, redirect
        next({ name: 'Landing' });
      } else {
        // User is authenticated
        next();
      }
    } catch (error) {
      // User is not authenticated, redirect to login
      console.log('Authentication required. Redirecting to login.');
      next({ name: 'Login' });
    }
  } else {
    // Route doesn't require auth
    next();
  }
});

export default router;