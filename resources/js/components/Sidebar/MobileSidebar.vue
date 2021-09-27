<template>
  <TransitionRoot as="template" :show="sidebarOpened">
    <Dialog
      as="div"
      static
      class="flex inset-0 z-40 fixed md:hidden"
      :open="sidebarOpened"
      @close="sidebarOpened = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="bg-gray-600 bg-opacity-75 inset-0 fixed" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="flex flex-col max-w-xs bg-primary-700 flex-1 w-full relative">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="-mr-12 pt-2 top-0 right-0 absolute">
              <button
                class="rounded-full flex h-10 ml-1 w-10 items-center justify-center focus:(outline-none ring-inset ring-white ring-2)"
                @click="sidebarOpened = false"
              >
                <span class="sr-only">Close sidebar</span>
                <i-heroicons-outline-x class="h-6 text-white w-6" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>

          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex flex-shrink-0 px-4 items-center">
              <i-heroicons-solid-puzzle class="h-8 text-primary-300 w-8" />
              <h2 class="font-bold text-xl text-white ml-2">play modules</h2>
            </div>

            <nav class="space-y-1 mt-5 px-2">
              <template v-for="item in menus">
                <AppLink
                  v-if="'routeName' in item"
                  :key="item.routeName"
                  :to="{ name: item.routeName }"
                  exact-active-class="bg-primary-800"
                  inactive-class="hover:(bg-primary-600 bg-opacity-75)"
                  class="flex items-center px-2 py-2 text-base font-medium rounded-md text-white"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 h-6 mr-4 text-primary-300 w-6"
                    aria-hidden="true"
                  />

                  {{ item.label }}
                </AppLink>
              </template>

              <button
                class="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:(bg-primary-600 bg-opacity-75) focus:(outline-none ring-2 ring-offset-2 ring-primary-500)"
                @click="$emit('logout')"
              >
                <i-heroicons-outline-logout
                  class="flex-shrink-0 h-6 mr-3 text-primary-300 w-6"
                  aria-hidden="true"
                />

                Logout
              </button>
            </nav>
          </div>

          <div v-if="user" class="border-t flex border-primary-800 flex-shrink-0 p-4">
            <AppLink :to="{ name: 'home' }" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div>
                  <img
                    alt="user profile picture"
                    :src="`https://ui-avatars.com/api/?background=random&name=${user.name}`"
                    class="rounded-full h-10 w-10 inline-block"
                  />
                </div>

                <div class="ml-3">
                  <p class="font-medium text-base text-white">{{ user.name }}</p>
                  <p class="font-medium text-sm text-primary-200 group-hover:text-white">
                    Manage account
                  </p>
                </div>
              </div>
            </AppLink>
          </div>
        </div>
      </TransitionChild>

      <div aria-hidden="true" class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { computed } from 'vue';

import AppLink from '@/components/AppLink.vue';
import { AppMenu, AppMenuHeader } from '@/types';
import { AuthUser } from '@/types/api';

const props = withDefaults(
  defineProps<{
    menus: (AppMenu | AppMenuHeader)[];
    user: AuthUser | null;
    modelValue?: boolean;
  }>(),
  {
    user: () => null,
    modelValue: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'logout'): void;
}>();

const sidebarOpened = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  },
});
</script>
