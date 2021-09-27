<template>
  <div>
    <i-heroicons-solid-puzzle class="mx-auto h-16 mb-6 text-primary-600 w-16" />
    <slot name="header"></slot>
  </div>

  <div v-bind="$attrs" class="mt-8">
    <div class="bg-white shadow py-8 px-4 sm:(rounded-lg px-10)">
      <slot></slot>
    </div>
  </div>
</template>
