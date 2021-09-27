<template>
  <div class="bg-primary-700 hidden md:(flex flex-shrink-0)">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 h-0">
        <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div class="flex flex-shrink-0 px-4 items-center">
            <i-heroicons-solid-puzzle class="h-8 text-primary-300 w-8" />
            <h2 class="font-bold text-xl text-white ml-2">play modules</h2>
          </div>

          <nav class="space-y-1 flex-1 mt-5 px-2">
            <template v-for="item in menus">
              <AppLink
                v-if="'routeName' in item"
                :key="item.routeName"
                :to="{ name: item.routeName }"
                exact-active-class="bg-primary-800"
                inactive-class="hover:(bg-primary-600 bg-opacity-75)"
                class="rounded-md flex font-medium text-sm text-white py-2 px-2 items-center"
              >
                <component
                  :is="item.icon"
                  class="flex-shrink-0 h-6 mr-3 text-primary-300 w-6"
                  aria-hidden="true"
                />

                {{ item.label }}
              </AppLink>
            </template>

            <button
              class="rounded-md flex font-medium text-sm text-white w-full py-2 px-2 items-center hover:(bg-primary-600 bg-opacity-75) focus:(outline-none ring-2 ring-offset-2 ring-primary-500)"
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
                  class="rounded-full h-9 w-9 inline-block"
                />
              </div>

              <div class="ml-3">
                <p class="font-medium text-sm text-white">{{ user.name }}</p>
                <p class="font-medium text-xs text-primary-200 group-hover:text-white">
                  Manage account
                </p>
              </div>
            </div>
          </AppLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLink from '@/components/AppLink.vue';
import { AppMenu, AppMenuHeader } from '@/types';
import { AuthUser } from '@/types/api';

withDefaults(
  defineProps<{
    menus: (AppMenu | AppMenuHeader)[];
    user: AuthUser | null;
  }>(),
  {
    user: () => null,
  }
);

defineEmits<{ (e: 'logout'): void }>();
</script>
