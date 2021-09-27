<template>
  <div>
    <label v-if="label" :for="name" class="font-medium text-sm text-gray-700 block">
      {{ label }}
    </label>

    <div class="rounded-md shadow-sm mt-1 relative">
      <div v-if="$slots.leading" class="flex pl-3 inset-y-0 left-0 absolute items-center">
        <slot name="leading" :icon-class="iconClass"></slot>
      </div>

      <input
        :id="name"
        v-model="value"
        :autocomplete="name"
        :name="name"
        :type="type"
        v-bind="$attrs"
        :class="inputClass"
      />

      <div v-if="$slots.trailing" class="flex pr-3 inset-y-0 right-0 absolute items-center">
        <slot name="trailing" :icon-class="iconClass"></slot>
      </div>
    </div>

    <p v-if="errorMessage" class="mt-2 text-sm text-error-600">{{ errorMessage }}</p>
    <p v-else-if="hint" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
import cn from 'classnames';
import { useSlots, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue?: string;
    label?: string;
    hint?: string;
    type?: string;
    errors?: string[];
  }>(),
  {
    modelValue: '',
    label: '',
    hint: '',
    type: 'text',
    errors: () => [],
  }
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const errorMessage = computed(() => (props.errors.length > 0 ? props.errors[0] : undefined));

const iconClass = computed(() =>
  cn('h-5 w-5', { 'text-gray-400': !errorMessage.value }, { 'text-error-400': errorMessage.value })
);

const slots = useSlots();
const inputClass = computed(() =>
  cn(
    'rounded-md w-full block sm:text-sm read-only:focus:(ring-transparent border-gray-300)',
    { 'pl-10': slots.leading },
    { 'pr-10': slots.trailing },
    errorMessage.value
      ? 'border-error-300 text-error-900 placeholder-error-300 focus:(border-error-500 ring-error-500)'
      : 'border-gray-300 focus:(border-primary-500 ring-primary-500)'
  )
);
</script>
