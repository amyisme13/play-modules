<template>
  <Menu as="div" class="text-left relative inline-block">
    <div>
      <label for="searchBar" class="sr-only">Search</label>
      <div class="text-primary-100 relative focus-within:text-gray-400">
        <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center">
          <i-heroicons-solid-search class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        </div>

        <input
          id="searchBar"
          ref="searchBar"
          v-model="search"
          name="searchBar"
          class="bg-white border border-transparent rounded-md bg-opacity-20 w-full py-2 pr-3 pl-10 placeholder-primary-100 leading-5 block sm:text-sm focus:(bg-white border-white outline-none ring-white placeholder-gray-500 text-gray-900)"
          placeholder="Search modules..."
          type="text"
          @blur="onSearchBlur"
          @input="filterMenus"
          @keydown="onSearchKeydown"
        />
      </div>
    </div>

    <p
      v-show="filteredMenus.length === 0 && search.length"
      class="bg-white rounded-md shadow-lg mt-2 text-sm w-full py-2 px-4 origin-top-right right-0 text-gray-500 z-10 absolute"
    >
      No menus found
    </p>

    <MenuItems
      v-show="search.length && filteredMenus.length > 0"
      static
      class="bg-white rounded-md shadow-lg ring-black mt-2 w-full py-2 origin-top-right right-0 ring-1 ring-opacity-5 z-10 absolute focus:outline-none"
      @keydown="onMenuKeydown"
    >
      <div v-for="menuHead in filteredMenus" :key="menuHead.label">
        <p class="font-medium text-sm px-4 text-gray-500">{{ menuHead.label }}</p>

        <MenuItem v-for="menu in menuHead.menus" :key="menu.routeName" v-slot="{ active }">
          <AppLink
            :to="{ name: menu.routeName }"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'group flex items-center px-4 py-2 text-sm rounded-md',
            ]"
          >
            <component
              :is="menu.icon"
              class="h-5 mr-3 text-gray-400 w-5 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {{ menu.label }}
          </AppLink>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuItems, MenuItem } from '@headlessui/vue';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AppLink from '@/components/AppLink.vue';
import { useFeaturesStore } from '@/store/features';
import { AppMenuHeader } from '@/types';

const search = ref('');

const filteredMenus = ref<AppMenuHeader[]>([]);

const featuresStore = useFeaturesStore();
const filterMenus = useDebounceFn(() => {
  if (search.value.length === 0) {
    filteredMenus.value = [];
    return;
  }

  filteredMenus.value = featuresStore.menus.reduce((menus, menuHead) => {
    const filtered = menuHead.menus.filter((menu) =>
      menu.label.toLowerCase().includes(search.value.toLowerCase())
    );

    if (filtered.length > 0) {
      menus.push({ ...menuHead, menus: filtered });
    }

    return menus;
  }, [] as AppMenuHeader[]);
}, 300);

const searchBar = ref<HTMLInputElement>();
const onMenuKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    searchBar.value?.focus();
  }
};

const onSearchKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    const target = e.target as HTMLInputElement;
    target.blur();
    search.value = '';
  }
};

const onSearchBlur = () => {
  if (filteredMenus.value.length === 0) {
    search.value = '';
  }
};

const router = useRouter();
router.afterEach(() => {
  search.value = '';
});
</script>
