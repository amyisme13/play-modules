<template>
  <header class="relative py-10">
    <div class="max-w-7xl mx-auto flex items-center">
      <AppLink v-if="back" :to="back">
        <i-heroicons-solid-arrow-left class="h-8 w-8 text-white mr-2" />
      </AppLink>

      <h1 class="text-3xl font-bold text-white">
        <slot></slot>
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import AppLink from './AppLink.vue';

defineProps<{ back?: RouteLocationRaw }>();
</script>
