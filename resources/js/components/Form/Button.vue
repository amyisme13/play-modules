<template>
  <button :type="type" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import cn from 'classnames';
import { computed, ButtonHTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: ButtonHTMLAttributes['type'];
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'success' | 'error' | 'none';
    block?: boolean;
  }>(),
  {
    type: 'button',
    size: 'md',
    color: 'primary',
  }
);

const buttonClass = computed(() =>
  cn(
    'border font-medium shadow-sm inline-flex items-center focus:(outline-none ring-2 ring-offset-2) disabled:opacity-25',

    props.size === 'xs' ? 'rounded' : 'rounded-md',
    { 'text-xs py-1.5 px-2.5': props.size === 'xs' },
    { 'text-sm py-2 px-3 leading-4': props.size === 'sm' },
    { 'text-sm py-2 px-4': props.size === 'md' },
    { 'text-base py-2 px-4': props.size === 'lg' },
    { 'text-base py-3 px-6': props.size === 'xl' },

    props.color === 'none' ? 'text-gray-900 border-gray-300' : 'text-white border-transparent',
    { 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500': props.color === 'primary' },
    { 'bg-success-600 hover:bg-success-700 focus:ring-success-500': props.color === 'success' },
    { 'bg-error-600 hover:bg-error-700 focus:ring-error-500': props.color === 'error' },
    { 'bg-white hover:bg-gray-100 focus:ring-gray-300': props.color === 'none' },

    { 'w-full justify-center': props.block }
  )
);
</script>
