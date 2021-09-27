<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div v-bind="$attrs" class="flex h-screen bg-gray-100 overflow-hidden">
    <Sidebar v-model="sidebarOpened" />

    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <div class="pt-1 pl-1 sm:(pt-3 pl-3) md:hidden">
        <button
          class="rounded-md h-12 -mt-0.5 -ml-0.5 text-gray-500 w-12 inline-flex items-center justify-center hover:text-gray-900 focus:(outline-none ring-inset ring-2 ring-primary-500)"
          @click="sidebarOpened = true"
        >
          <span class="sr-only">Open sidebar</span>
          <i-heroicons-outline-menu class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <main class="flex-1 z-0 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="mx-auto mb-4 max-w-7xl px-4 sm:px-6 md:px-8">
            <router-view></router-view>
          </div>
        </div>
      </main>
    </div>
  </div>

  <AppNotification />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AppNotification from '@/components/AppNotification.vue';
import Sidebar from '@/components/Sidebar/Index.vue';

const sidebarOpened = ref(false);
</script>
