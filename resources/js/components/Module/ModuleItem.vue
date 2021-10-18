<template>
  <div
    class="bg-white rounded-md shadow p-4 group relative overflow-hidden focus-within:(ring-inset ring-2 ring-primary-500)"
  >
    <div class="flex space-x-4 items-center">
      <div class="rounded flex bg-primary-200 flex-shrink-0 h-12 w-12 justify-center items-center">
        <component :is="menu.icon" class="h-6 text-primary-600 w-6" />
      </div>

      <div class="flex-grow">
        <p class="text-sm text-gray-500 leading-4">{{ module }}</p>
        <h3 class="font-medium text-gray-900">
          <AppLink :to="{ name: menu.routeName }" class="focus:outline-none">
            <!-- Extend touch target to entire panel -->
            <span class="inset-0 absolute" aria-hidden="true"></span>
            {{ menu.label }}
          </AppLink>
        </h3>
      </div>

      <div class="flex flex-shrink-0 justify-center items-center">
        <i-heroicons-outline-chevron-right
          class="h-8 text-gray-400 w-8 group-hover:text-gray-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLink from '@/components/AppLink.vue';
import { AppMenu } from '@/types';

defineProps<{
  menu: AppMenu;
  module: string;
}>();
</script>
