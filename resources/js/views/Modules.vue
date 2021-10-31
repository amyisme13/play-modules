<template>
  <div>
    <PageHeader>Modules</PageHeader>

    <div class="space-y-8">
      <section v-for="item in menus" :key="item.label">
        <h2 class="text-xl font-medium text-gray-900 mb-2">{{ item.label }}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleItem
            v-for="menu in item.menus"
            :key="menu.label"
            :menu="menu"
            :module="item.label"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import PageHeader from '@/components/PageHeader.vue';
import { useModulesStore } from '@/store/modules';
import ModuleItem from '@/components/Module/ModuleItem.vue';

const modulesStore = useModulesStore();
const menus = computed(() => modulesStore.menus);
</script>
