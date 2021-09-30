<template>
  <div v-bind="$attrs" class="relative min-h-screen bg-gray-100">
    <AppNavbar />

    <main class="-mt-52 pb-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:(max-w-7xl px-8)">
        <router-view></router-view>
      </div>
    </main>
  </div>

  <AppNotification />
</template>

<script setup lang="ts">
import AppNotification from '@/components/AppNotification.vue';

import AppNavbar from './components/AppNavbar.vue';
</script>
