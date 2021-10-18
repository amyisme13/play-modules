<template>
  <div>
    <PageHeader>Account Settings</PageHeader>

    <div class="grid gap-4 grid-cols-1 lg:(grid-cols-4)">
      <TabGroup vertical as="template">
        <!-- Left Column -->
        <div>
          <aside class="bg-white rounded-lg shadow p-4 overflow-hidden lg:col-span-1">
            <h3 class="font-semibold text-xs mb-2 tracking-wider px-3 text-gray-500 uppercase">
              Menu
            </h3>

            <TabList as="nav" class="space-y-1">
              <Tab v-for="item in menus" :key="item.label" v-slot="{ selected }" as="template">
                <button
                  :aria-current="selected ? 'page' : undefined"
                  class="rounded-md flex font-medium text-sm w-full py-2 px-3 group items-center"
                  :class="[
                    selected
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:(bg-gray-50 text-gray-900)',
                  ]"
                >
                  <component
                    :is="item.icon"
                    aria-hidden="true"
                    class="flex-shrink-0 h-6 mr-3 -ml-1 w-6"
                    :class="[
                      selected ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500',
                    ]"
                  />

                  <span class="truncate"> {{ item.label }} </span>
                </button>
              </Tab>
            </TabList>
          </aside>
        </div>

        <!-- Right Column -->
        <div class="lg:(col-span-3)">
          <TabPanels as="div" class="bg-white rounded-lg shadow overflow-hidden">
            <TabPanel>
              <UpdateProfile />
            </TabPanel>
            <TabPanel>
              <UpdatePassword />
            </TabPanel>
            <TabPanel>
              <TwoFactorAuth />
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
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
