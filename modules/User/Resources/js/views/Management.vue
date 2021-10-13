<template>
  <div>
    <PageHeader>User Management</PageHeader>

    <div class="min-w-full overflow-hidden">
      <TableContainer
        v-model:page="page"
        :headers="headers"
        :loading="loading"
        :pagination="pagination"
      >
        <template #header>
          <div
            class="flex flex-col space-y-2 py-5 px-4 items-center justify-between sm:(px-6 flex-row space-y-0)"
          >
            <Button :to="{ name: 'user-form' }" class="w-full justify-center sm:w-auto">
              Create User
            </Button>

            <form class="rounded-md flex shadow-sm" @submit.prevent="load">
              <div class="flex flex-grow relative items-stretch focus-within:z-10">
                <div class="flex pl-3 inset-y-0 left-0 absolute items-center pointer-events-none">
                  <i-heroicons-solid-search aria-hidden="true" class="h-5 text-gray-400 w-5" />
                </div>

                <input
                  v-model="search"
                  name="search"
                  placeholder="Type here..."
                  type="text"
                  class="rounded-none rounded-l-md border-gray-300 w-full pl-10 block sm:text-sm focus:(border-primary-500 ring-primary-500)"
                />
              </div>

              <button
                type="submit"
                class="border rounded-r-md font-medium -ml-px space-x-2 bg-gray-50 border-gray-300 text-sm py-2 px-4 text-gray-700 relative inline-flex items-center hover:bg-gray-100 focus:(outline-none border-primary-500 ring-1 ring-primary-500)"
              >
                Search
              </button>
            </form>
          </div>
        </template>

        <tr v-for="user in users" :key="user.id" class="text-sm text-gray-900">
          <td class="py-4 px-6 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img alt="user profile photo" :src="user.avatar" class="rounded-full h-10 w-10" />
              </div>

              <div class="ml-4">{{ user.name }}</div>
            </div>
          </td>

          <td class="py-4 px-6 whitespace-nowrap">{{ user.email }}</td>
          <td class="py-4 px-6 whitespace-nowrap">{{ user.created_at.substring(0, 10) }}</td>

          <td class="font-medium text-right text-sm py-4 px-6 whitespace-nowrap">
            <AppLink
              :to="{ name: 'user-form', params: { id: user.id } }"
              class="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </AppLink>
          </td>
        </tr>

        <tr v-if="users.length === 0">
          <td :colspan="headers.length" class="py-4 px-6 whitespace-nowrap text-gray-700">
            No records found.
          </td>
        </tr>
      </TableContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

import AppLink from '@/components/AppLink.vue';
import Button from '@/components/Form/Button.vue';
import PageHeader from '@/components/PageHeader.vue';
import TableContainer, { TableHeader, TablePagination } from '@/components/TableContainer.vue';
import { list } from '@user/api/users';
import { User } from '@user/types';

const loading = ref(false);

const headers: TableHeader[] = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Created Date', value: 'created_at' },
  { text: 'Actions', value: 'actions', invisible: true },
];

const page = ref(1);
const pagination: TablePagination = reactive({
  from: 1,
  to: 1,
  total: 0,
  lastPage: 1,
});

const search = ref('');
const users = ref<User[]>([]);

const load = async () => {
  loading.value = true;

  const { data } = await list({
    search: search.value,
    page: page.value,
  });

  users.value = data.data;
  pagination.from = data.meta.from;
  pagination.to = data.meta.to;
  pagination.total = data.meta.total;
  pagination.lastPage = data.meta.last_page;

  loading.value = false;
};
load();

watch(page, () => load());
</script>
