<template>
  <TransitionRoot as="template" :show="loading">
    <div v-show="loading" class="inset-0 z-50 fixed overflow-y-auto">
      <div class="block min-h-screen text-center items-end justify-center">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bg-gray-900 bg-opacity-75 inset-0 transition-opacity fixed" />
        </TransitionChild>

        <span aria-hidden="true" class="h-screen inline-block align-middle"> &#8203; </span>

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="inline-block align-middle relative">
            <h2 class="sr-only">Loading</h2>
            <i-mdi-loading aria-hidden="true" class="h-16 text-white animate-spin w-16" />
          </div>
        </TransitionChild>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionChild, TransitionRoot } from '@headlessui/vue';
import { computed } from 'vue';

import { useAppStore } from '@/store';

const app = useAppStore();
const loading = computed(() => app.loading);
</script>
