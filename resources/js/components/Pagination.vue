<template>
  <nav aria-label="Pagination" class="flex py-4 px-4 items-center justify-between sm:px-6">
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ pagination.from }}</span>
        to
        <span class="font-medium">{{ pagination.to }}</span>
        of
        <span class="font-medium">{{ pagination.total }}</span>
        results
      </p>
    </div>

    <div class="flex flex-1 justify-between sm:justify-end">
      <Button :disabled="page === 1" @click="page -= 1"> Previous </Button>

      <Button :disabled="page === pagination.lastPage" class="ml-3" @click="page += 1">
        Next
      </Button>
    </div>
  </nav>
</template>

<script lang="ts">
export interface PaginationInfo {
  from: number;
  to: number;
  total: number;
  lastPage: number;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import Button from '@/components/Form/Button.vue';

const props = withDefaults(
  defineProps<{
    pagination: PaginationInfo;
    modelValue?: number;
  }>(),
  {
    modelValue: 1,
  }
);

const emit = defineEmits<{ (e: 'update:modelValue', page: number): void }>();

const page = computed({
  get() {
    return props.modelValue;
  },
  set(page: number) {
    emit('update:modelValue', page);
  },
});
</script>
