<template>
  <div class="divide-y bg-white rounded-lg divide-gray-200 shadow">
    <slot name="header"></slot>

    <!-- The table -->
    <div class="relative overflow-x-auto">
      <div
        v-show="loading"
        class="absolute flex bg-primary-300 h-1 m-0 w-full before:(h-1 w-full m-0 bg-primary-600 animate-indeterminate content-open-quote)"
      ></div>

      <table class="divide-y min-w-full divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header.value"
              scope="col"
              class="font-medium text-left text-xs tracking-wider py-3 px-6 text-gray-500 uppercase whitespace-nowrap"
              :class="{ relative: header.invisible }"
            >
              <span :class="{ 'sr-only': header.invisible }">{{ header.text }}</span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y bg-white divide-gray-200">
          <slot></slot>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination v-if="pagination" v-model="pageProxy" :pagination="pagination" />
  </div>
</template>

<script lang="ts">
export interface TableHeader {
  text: string;
  value: string;
  sortable?: boolean;
  invisible?: boolean;
}

export interface TablePagination {
  from: number;
  to: number;
  total: number;
  lastPage: number;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import Pagination, { PaginationInfo } from './Pagination.vue';

const props = withDefaults(
  defineProps<{
    headers: TableHeader[];
    loading?: boolean;
    pagination?: PaginationInfo;
    page?: number;
  }>(),
  {
    loading: false,
    pagination: undefined,
    page: 1,
  }
);

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const pageProxy = computed({
  get() {
    return props.page;
  },
  set(page: number) {
    emit('update:page', page);
  },
});
</script>
