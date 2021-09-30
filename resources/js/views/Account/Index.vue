<template>
  <div>
    <PageHeader>Account Settings</PageHeader>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="divide-y divide-gray-200 lg:(grid grid-cols-12 divide-y-0 divide-x)">
        <TabGroup vertical as="template">
          <aside class="py-6 lg:col-span-3">
            <TabList as="nav" class="space-y-1">
              <Tab v-for="item in menus" :key="item.label" v-slot="{ selected }" as="template">
                <button
                  :aria-current="selected ? 'page' : undefined"
                  :class="[
                    selected
                      ? 'bg-primary-50 border-primary-500 text-primary-700 hover:(bg-primary-50 text-primary-700)'
                      : 'border-transparent text-gray-900 hover:(bg-gray-50 text-gray-900)',
                    'group border-l-4 px-3 py-2 flex w-full items-center text-sm font-medium',
                  ]"
                >
                  <component
                    :is="item.icon"
                    aria-hidden="true"
                    :class="[
                      selected
                        ? 'text-primary-500 group-hover:text-primary-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                    ]"
                  />

                  <span class="truncate"> {{ item.label }} </span>
                </button>
              </Tab>
            </TabList>
          </aside>

          <TabPanels as="template">
            <TabPanel class="lg:col-span-9">
              <UpdateProfile />
            </TabPanel>
            <TabPanel class="lg:col-span-9">
              <UpdatePassword />
            </TabPanel>
            <TabPanel class="lg:col-span-9">
              <TwoFactorAuth />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';

import KeyIcon from '~icons/heroicons-outline/key';
import LockCLosedIcon from '~icons/heroicons-outline/lock-closed';
import UserCircleIcon from '~icons/heroicons-outline/user-circle';

import Button from '@/components/Form/Button.vue';
import PageHeader from '@/components/PageHeader.vue';

import TwoFactorAuth from './components/TwoFactorAuth.vue';
import UpdatePassword from './components/UpdatePassword.vue';
import UpdateProfile from './components/UpdateProfile.vue';

const menus = [
  { label: 'Profile', icon: UserCircleIcon },
  { label: 'Password', icon: KeyIcon },
  { label: 'Two Factor', icon: LockCLosedIcon },
];
</script>
