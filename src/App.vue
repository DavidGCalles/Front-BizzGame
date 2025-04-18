<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { pingServer } from './api';
import Navbar from './components/SiteNavbar.vue';

const pingResult = ref('');

const handlePing = async () => {
  try {
    const result = await pingServer();
    pingResult.value = result.message || 'Ping successful!';
  } catch (error) {
    console.error('Error during server ping:', error);
    pingResult.value = 'Ping failed. Please try again.';
  }
};
</script>

<template>
  <header>
    <Navbar :pingResult="pingResult" @ping="handlePing" />
  </header>
  <br>
  <div class="container">
    <RouterView />
  </div>
</template>
