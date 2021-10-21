<template>
  <Popover v-slot="{ open }" as="header" class="bg-gradient-to-r from-primary-800 to-primary-600">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div
        class="flex h-16 relative items-center justify-between lg:(border-b border-white border-opacity-20)"
      >
        <div class="flex px-2 items-center lg:px-0">
          <div class="flex-shrink-0">
            <i-heroicons-solid-puzzle class="h-8 w-auto text-primary-200 block" />
          </div>

          <div class="space-x-2 hidden lg:(ml-6 block)">
            <AppLink
              v-for="item in navbarMenus"
              :key="item.label"
              :to="item.to"
              exact-active-class="bg-black bg-opacity-25"
              inactive-class="hover:bg-primary-800"
              class="rounded-md font-medium text-sm text-white py-2 px-3"
            >
              {{ item.label }}
            </AppLink>
          </div>
        </div>

        <div class="flex flex-1 px-2 justify-center lg:(ml-6 justify-end)">
          <SearchBar class="max-w-lg w-full lg:max-w-xs" />
        </div>

        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <PopoverButton
            class="rounded-md p-2 text-primary-200 inline-flex items-center justify-center hover:(bg-primary-800 text-white) focus:(outline-none ring-inset ring-white ring-2)"
          >
            <span class="sr-only">Open main menu</span>
            <i-heroicons-outline-menu
              v-if="!open"
              aria-hidden="true"
              class="flex-shrink-0 h-6 w-6 block"
            />
            <i-heroicons-outline-x v-else aria-hidden="true" class="flex-shrink-0 h-6 w-6 block" />
          </PopoverButton>
        </div>

        <div class="hidden lg:ml-4 lg:block">
          <div class="flex items-center">
            <button
              class="rounded-full flex-shrink-0 p-1 text-primary-200 hover:(bg-primary-800 text-white) focus:(outline-none bg-primary-900 ring-white ring-2 ring-offset-2 ring-offset-primary-900)"
            >
              <span class="sr-only">View notifications</span>
              <i-heroicons-outline-bell class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu v-if="user" as="div" class="flex-shrink-0 ml-4 relative">
              <div>
                <MenuButton
                  class="rounded-full flex text-sm text-white focus:(outline-none bg-primary-900 ring-white ring-2 ring-offset-2 ring-offset-primary-900)"
                >
                  <span class="sr-only">Open user menu</span>
                  <img alt="" :src="user.avatar" class="rounded-full h-8 w-8" />
                </MenuButton>
              </div>

              <transition
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="bg-white rounded-md shadow-lg ring-black mt-2 py-1 origin-top-right -right-2 ring-1 ring-opacity-5 w-48 z-40 absolute focus:outline-none"
                >
                  <MenuItem v-for="item in userMenus" :key="item.label" v-slot="{ active }">
                    <AppLink
                      :to="item.to"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ item.label }}
                    </AppLink>
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block w-full text-left px-4 py-2 text-sm text-gray-700',
                      ]"
                      @click="logout"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="open">
      <div class="lg:hidden">
        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <PopoverOverlay static class="bg-black bg-opacity-25 inset-0 z-20 fixed" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <PopoverPanel
            v-slot="{ close }"
            focus
            static
            class="mx-auto w-full max-w-3xl p-2 transform origin-top inset-x-0 transition top-0 z-30 absolute"
          >
            <div
              class="divide-y bg-white rounded-lg divide-gray-200 shadow-lg ring-black ring-1 ring-opacity-5"
            >
              <div class="pt-3 pb-2">
                <div class="flex px-4 items-center justify-between">
                  <div>
                    <i-heroicons-solid-puzzle class="h-8 w-auto text-primary-600" />
                  </div>

                  <div class="-mr-2">
                    <PopoverButton
                      class="bg-white rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:(bg-gray-100 text-gray-500) focus:(outline-none ring-inset ring-2 ring-primary-500)"
                    >
                      <span class="sr-only">Close menu</span>
                      <i-heroicons-outline-x class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>

                <div class="space-y-1 mt-3 px-2">
                  <AppLink
                    v-for="item in navbarMenus"
                    :key="item.label"
                    :to="item.to"
                    class="rounded-md font-medium text-base py-2 px-3 text-gray-900 block hover:(bg-gray-100 text-gray-800)"
                    @click="close"
                  >
                    {{ item.label }}
                  </AppLink>
                </div>
              </div>

              <div v-if="user" class="pt-4 pb-2">
                <div class="flex px-5 items-center">
                  <div class="flex-shrink-0">
                    <img alt="" :src="user.avatar" class="rounded-full h-10 w-10" />
                  </div>

                  <div class="flex-1 ml-3 min-w-0">
                    <div class="font-medium text-base text-gray-800 truncate">
                      {{ user.name }}
                    </div>
                    <div class="font-medium text-sm text-gray-500 truncate">{{ user.email }}</div>
                  </div>

                  <!-- TODO: Notification list -->
                  <button
                    class="bg-white rounded-full ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500 focus:(outline-none ring-2 ring-offset-2 ring-primary-500)"
                  >
                    <span class="sr-only">View notifications</span>
                    <i-heroicons-outline-bell class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="space-y-1 mt-3 px-2">
                  <AppLink
                    v-for="item in userMenus"
                    :key="item.label"
                    :to="item.to"
                    class="rounded-md font-medium text-base py-2 px-3 text-gray-900 block hover:(bg-gray-100 text-gray-800)"
                    @click="close"
                  >
                    {{ item.label }}
                  </AppLink>

                  <button
                    class="rounded-md font-medium text-base text-left w-full py-2 px-3 text-gray-900 block hover:(bg-gray-100 text-gray-800)"
                    @click="logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </Popover>
</template>

<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import AppLink from '@/components/AppLink.vue';
import { useAuthStore } from '@/store/auth';
import SearchBar from './SearchBar.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const router = useRouter();
const logout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};

const navbarMenus = [
  { label: 'Home', to: { name: 'home' } },
  { label: 'Modules', to: { name: 'modules' } },
];

const userMenus = [{ label: 'Manage Account', to: { name: 'account-settings' } }];
</script>
