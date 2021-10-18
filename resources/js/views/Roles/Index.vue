<template>
  <div>
    <PageHeader>Role Management</PageHeader>

    <div class="grid gap-4 grid-cols-1 lg:(grid-cols-4)">
      <!-- Left Column -->
      <div class="space-y-4">
        <aside class="bg-white rounded-lg shadow p-4 overflow-hidden lg:col-span-1">
          <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Roles
          </h3>

          <RoleList :roles="roles" :selected="selected" @select="selectRole" />
        </aside>

        <Button block @click="createDialog = true">Create Role</Button>
      </div>

      <!-- Right Column -->
      <RoleSettings
        v-if="selected"
        :permissions="permissions"
        :role="selected"
        class="lg:(col-span-3)"
        @deleted="roleDeleted"
        @updated="roleUpdated"
      />

      <div v-else class="lg:(col-span-3)">
        <div class="bg-white rounded-lg shadow overflow-hidden py-6 px-4 sm:p-6 lg:pb-8">
          <h2 class="font-medium text-lg text-gray-900 leading-6">Role Settings</h2>
          <p class="mt-2 text-sm text-gray-500">Please select a role first.</p>
        </div>
      </div>
    </div>

    <CreateRole v-model="createDialog" @created="roleCreated" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { listPermissions, listRoles } from '@/api/roles';
import Button from '@/components/Form/Button.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useAppStore } from '@/store';
import { Permission, Role } from '@/types/api';
import CreateRole from './components/CreateRole.vue';
import RoleList from './components/RoleList.vue';
import RoleSettings from './components/RoleSettings.vue';

const permissions = ref<Permission[]>([]);
const roles = ref<Role[]>([]);

const app = useAppStore();
const load = async () => {
  app.$patch({ loading: true });

  permissions.value = (await listPermissions()).data;
  roles.value = (await listRoles()).data;

  app.$patch({ loading: false });
};
load();

const selected = ref<Role>();
const selectRole = (role: Role) => (selected.value = role);

const createDialog = ref(false);
const roleCreated = (role: Role) => {
  roles.value.push(role);
  selected.value = role;
};

const roleUpdated = (updated: Role) => {
  const role = roles.value.find((r) => r.id === updated.id);
  if (role) {
    role.name = updated.name;
    role.permissions = updated.permissions;
  }
};

const roleDeleted = (deleted: Role) => {
  roles.value = roles.value.filter((r) => r.id !== deleted.id);
  selected.value = undefined;
};
</script>
