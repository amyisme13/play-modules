<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog
      static
      as="div"
      :open="modelValue"
      class="inset-0 z-10 fixed overflow-y-auto"
      @close="close"
    >
      <div
        class="flex min-h-screen text-center px-4 pt-4 pb-20 items-end justify-center sm:(p-0 block)"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="bg-gray-500 bg-opacity-75 inset-0 transition-opacity fixed" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:(h-screen inline-block align-middle)">
          &#8203;
        </span>

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:(translate-y-0 scale-95)"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:(translate-y-0 scale-95)"
        >
          <div
            class="bg-white rounded-lg shadow-xl text-left px-4 transform pt-5 pb-4 transition-all inline-block align-bottom overflow-hidden sm:(max-w-lg my-8 w-full p-6 align-middle)"
          >
            <slot>
              <button>Empty Dialog</button>
            </slot>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue';

defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const close = () => emit('update:modelValue', false);
</script>
