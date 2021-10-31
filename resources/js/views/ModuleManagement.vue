<template>
  <div>
    <PageHeader>Module Management</PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SwitchGroup
        v-for="item in modules"
        :key="item.name"
        as="div"
        class="bg-white rounded-md shadow p-4 group relative overflow-hidden"
      >
        <div class="flex space-x-4 items-center">
          <div
            class="rounded flex bg-primary-200 flex-shrink-0 h-12 w-12 justify-center items-center"
          >
            <component :is="item.icon" class="h-6 text-primary-600 w-6" />
          </div>

          <div class="flex-grow">
            <SwitchLabel passive as="h3" class="font-medium text-gray-900">
              {{ item.name }}
            </SwitchLabel>
          </div>

          <div class="flex flex-shrink-0 justify-center items-center">
            <Switch
              v-model="item.enabled"
              :class="[
                item.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              ]"
              @update:model-value="save"
            >
              <span
                aria-hidden="true"
                :class="[
                  item.enabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]"
              ></span>
            </Switch>
          </div>
        </div>
      </SwitchGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Remove routes from disabled module after saving.

import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

import { listEnabled, saveModules } from '@/api/modules';
import PageHeader from '@/components/PageHeader.vue';
import { useAppStore } from '@/store';
import { useModulesStore } from '@/store/modules';
import { AppModule } from '@/types';

interface AppModuleWithEnabled {
  name: string;
  icon: AppModule['icon'];
  enabled: boolean;
}

const active = ref<string[]>([]);
const modules = ref<AppModuleWithEnabled[]>([]);

const modulesStore = useModulesStore();
const reloadModules = () => {
  modules.value = modulesStore.allModules.map(({ name, icon }) => ({
    name,
    icon,
    enabled: active.value.includes(name),
  }));
};

const app = useAppStore();
const load = async () => {
  app.$patch({ loading: true });

  const { data } = await listEnabled();

  active.value = data;
  reloadModules();

  app.$patch({ loading: false });
};
load();

const save = useDebounceFn(async () => {
  try {
    const { data } = await saveModules({ modules: modules.value });
    active.value = data;

    modulesStore.$patch({ active: data, loaded: false });

    app.notify({ style: 'success', text: 'Modules saved.' });
  } catch (err) {
    app.notify({ style: 'error', text: 'Error while saving modules. Please try again.' });
    reloadModules();
  }
}, 3000);
</script>
