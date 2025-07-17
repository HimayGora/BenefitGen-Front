<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';
import { useHead } from '@vueuse/head';
import { reactive } from 'vue';

useHead({
  title: 'Admin Panel | BenefitGen',
});

const users = ref([]);
const isLoading = ref(true);
const isLoadingStats = ref(true);
const errorMessage = ref('');
const successMessage = ref('');

// Site Stats
const totalUsers = ref(0);
const proUsers = ref(0);
const monthlyActiveUsers = ref(0);


const testInput = ref('');
const testPromptName = ref('lp'); // default prompt name for testing
const testResult = reactive({
  success: null,
  data: null,
  error: null,
  loading: false,
});

const runJsonTest = async () => {
  testResult.loading = true;
  testResult.error = null;
  testResult.data = null;

  try {
    const res = await axios.post(
      `/api/generate/${testPromptName.value}`,
      { contents: testInput.value },
      { withCredentials: true }
    );
    testResult.success = true;
    testResult.data = res.data;
  } catch (e) {
    testResult.success = false;
    testResult.error = e.response?.data || e.message;
  } finally {
    testResult.loading = false;
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.adminGetAllUsers(), { withCredentials: true });
    users.value = response.data.users;
  } catch (error) {
    errorMessage.value = 'Failed to fetch users.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const fetchSiteStats = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.adminGetSiteStats(), { withCredentials: true });
    totalUsers.value = response.data.total_users;
    proUsers.value = response.data.pro_users;
    monthlyActiveUsers.value = response.data.monthly_active_users;
  } catch (error) {
    errorMessage.value = 'Failed to fetch site stats.';
    console.error(error);
  } finally {
    isLoadingStats.value = false;
  }
}

const saveUser = async (user) => {
  try {
    const payload = {
      plan: user.plan,
      daily_generation_limit: parseInt(user.daily_generation_limit, 10),
      monthly_generation_limit: parseInt(user.monthly_generation_limit, 10),
    };
    await axios.put(API_ENDPOINTS.adminUpdateUser(user.id), payload, { withCredentials: true });
    successMessage.value = `User ${user.email} updated successfully.`;
    setTimeout(() => successMessage.value = '', 3000);
  } catch (error) {
    errorMessage.value = `Failed to update user ${user.email}.`;
    console.error(error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchSiteStats();
});
</script>

<template>
  <div class=" max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-amber-400 mb-6">Admin Panel</h1>

    <!-- Site Stats Section -->
    <div class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">Site Growth</h2>
        <div v-if="isLoadingStats" class="text-center text-gray-300">Loading stats...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-medium text-gray-400">Total Users</h3>
                <p class="text-3xl font-bold text-white">{{ totalUsers }}</p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-medium text-gray-400">Pro Users</h3>
                <p class="text-3xl font-bold text-white">{{ proUsers }}</p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 class="text-lg font-medium text-gray-400">Monthly Active Users</h3>
                <p class="text-3xl font-bold text-white">{{ monthlyActiveUsers }}</p>
            </div>
        </div>
    </div>


    <div v-if="isLoading" class="text-center">
      <p class="text-lg text-gray-300">Loading users...</p>
    </div>

    <div v-if="errorMessage" class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6">
      {{ successMessage }}
    </div>

    <div v-if="!isLoading && users.length" class="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <h2 class="text-2xl font-bold text-white mb-4 px-6 pt-6">User Management</h2>
      <table class="min- text-sm text-left text-gray-300">
        <thead class="text-xs text-amber-400 uppercase bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Plan</th>
            <th scope="col" class="px-6 py-3">Daily Limit</th>
            <th scope="col" class="px-6 py-3">Monthly Limit</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
            <td class="px-6 py-4 font-medium text-white">{{ user.email }}</td>
            <td class="px-6 py-4">
              <select v-model="user.plan" class="bg-gray-700 border-gray-600 rounded-md px-2 py-1 focus:ring-amber-500 focus:border-amber-500">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <input type="number" v-model="user.daily_generation_limit" class="bg-gray-700 border-gray-600 rounded-md w-24 px-2 py-1 focus:ring-amber-500 focus:border-amber-500" />
            </td>
            <td class="px-6 py-4">
              <input type="number" v-model="user.monthly_generation_limit" class="bg-gray-700 border-gray-600 rounded-md w-24 px-2 py-1 focus:ring-amber-500 focus:border-amber-500" />
            </td>
            <td class="px-6 py-4">
              <button @click="saveUser(user)" class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-2 px-4 rounded-lg text-xs transition-colors duration-300">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>
