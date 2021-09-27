<template>
  <div class="flex items-center">
    <input
      :id="name"
      v-model="proxyChecked"
      :name="name"
      type="checkbox"
      class="rounded border-gray-300 h-4 text-primary-600 w-4 focus:ring-primary-500"
    />
    <label v-if="label" :for="name" class="text-sm ml-2 text-gray-900 block"> {{ label }} </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    checked?: boolean;
  }>(),
  {
    label: '',
    checked: false,
  }
);

const emit = defineEmits<{ (e: 'update:checked', value: boolean): void }>();

const proxyChecked = computed({
  get() {
    return props.checked;
  },
  set(value: boolean) {
    emit('update:checked', value);
  },
});
</script>
