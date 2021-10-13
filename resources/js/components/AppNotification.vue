<template>
  <div
    aria-live="assertive"
    class="flex py-6 px-4 inset-0 fixed items-end pointer-events-none sm:(p-6 items-start)"
  >
    <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
      <transition-group
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200 transition absolute"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transform transition duration-1000"
      >
        <div
          v-for="(item, i) in notifications"
          :key="item.id"
          class="bg-white rounded-lg max-w-sm shadow-lg ring-black w-full ring-1 ring-opacity-5 pointer-events-auto overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div v-if="item.style !== 'none'" class="flex-shrink-0">
                <i-heroicons-outline-check-circle
                  v-if="item.style === 'success'"
                  aria-hidden="true"
                  class="h-6 text-success-400 w-6"
                />

                <i-heroicons-outline-x-circle
                  v-if="item.style === 'error'"
                  aria-hidden="true"
                  class="h-6 text-error-400 w-6"
                />

                <i-heroicons-outline-information-circle
                  v-if="item.style === 'info'"
                  aria-hidden="true"
                  class="h-6 text-info-400 w-6"
                />
              </div>

              <div class="flex-1 ml-3 pt-0.5 w-0">
                <p class="font-medium text-sm text-gray-900">{{ item.text }}</p>
              </div>

              <div class="flex flex-shrink-0 ml-4">
                <button
                  class="bg-white rounded-md text-gray-400 inline-flex hover:text-gray-500 focus:(outline-none ring-2 ring-offset-2 ring-primary-500)"
                  @click="closeNotification(i)"
                >
                  <span class="sr-only">Close</span>
                  <i-heroicons-solid-x class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue';

import { useAppStore } from '@/store';

const app = useAppStore();
const notifications = computed(() => app.notifications);

const timeout = 2000;
const intervalId = ref(-1);
const setInterval = () => {
  if (intervalId.value === -1) {
    intervalId.value = window.setInterval(() => {
      notifications.value.pop();
    }, timeout);
  }
};

const clearInterval = () => {
  if (intervalId.value !== -1) {
    window.clearInterval(intervalId.value);
    intervalId.value = -1;
  }
};

watch(
  notifications,
  (after) => {
    if (after.length === 0) {
      clearInterval();
    }

    if (after.length > 0) {
      setInterval();
    }
  },
  { deep: true, immediate: true }
);

onBeforeUnmount(() => {
  clearInterval();
});

const closeNotification = (i: number) => {
  notifications.value.splice(i, 1);
};
</script>
