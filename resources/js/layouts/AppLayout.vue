<template>
  <div v-bind="$attrs" class="relative min-h-screen bg-gray-100">
    <AppNavbar :class="navbarPadding" />

    <main class="pb-24" :class="mainMargin">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:(max-w-7xl px-8)">
        <router-view></router-view>
      </div>
    </main>
  </div>

  <AppNotification />
  <AppLoader />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppNotification from '@/components/AppNotification.vue';

import AppLoader from '@/components/AppLoader.vue';
import AppNavbar from './components/AppNavbar.vue';

const navbarPadding = ref('pb-52');
const mainMargin = ref('-mt-52');

const route = useRoute();
watch(
  () => route.meta.noOverlapHeader,
  (value) => {
    if (value) {
      navbarPadding.value = 'pb-24';
      mainMargin.value = '-mt-24';
    } else {
      navbarPadding.value = 'pb-52';
      mainMargin.value = '-mt-52';
    }
  },
  { immediate: true }
);
</script>
