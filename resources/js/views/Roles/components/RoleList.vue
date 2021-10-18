<template>
  <nav class="space-y-1">
    <button
      v-for="item in roles"
      :key="item.name"
      :aria-current="isRoleSelected(item) ? 'page' : undefined"
      class="rounded-md flex font-medium text-sm w-full py-2 px-3 items-center"
      :class="[
        isRoleSelected(item)
          ? 'bg-primary-50 text-primary-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      ]"
      @click="selectRole(item)"
    >
      <span class="truncate"> {{ item.name }} </span>

      <i-heroicons-outline-chevron-right v-show="isRoleSelected(item)" class="ml-auto h-4 w-4" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Role } from '@/types/api';

const props = defineProps<{
  roles: Role[];
  selected?: Role;
}>();

const isRoleSelected = (role: Role) => props.selected?.id === role.id;

const emit = defineEmits<{ (e: 'select', role: Role): void }>();
const selectRole = (role: Role) => emit('select', role);
</script>
