<template>
  <v-container>
    <page-header>Role Management</page-header>

    <v-row>
      <v-col cols="12" md="4">
        <role-list class="mb-4" :loading="loading" :roles="roles" @select="selectRole" />

        <create-role @created="roleCreated" />
      </v-col>

      <v-col cols="12" md="8">
        <role-settings
          v-if="role"
          :permissions="permissions"
          :role="role"
          @deleted="roleDeleted"
          @updated="roleUpdated"
        />

        <v-card v-else>
          <v-card-title>Role Settings</v-card-title>

          <v-card-text>
            <p>Please select a role first.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { createRole, listPermissions, listRoles } from '@/api/roles';
import { Permission, Role } from '@/types/api';

import PageHeader from '@/components/PageHeader.vue';
import CreateRole from './components/CreateRole.vue';
import RoleList from './components/RoleList.vue';
import RoleSettings from './components/RoleSettings.vue';

@Component({
  components: { PageHeader, CreateRole, RoleList, RoleSettings },
})
export default class Roles extends Vue {
  loading = false;

  permissions: Permission[] = [];
  roles: Role[] = [];

  role: Role | null = null;

  created() {
    this.load();
  }

  async load() {
    this.loading = true;

    const { data: permissions } = await listPermissions();
    const { data: roles } = await listRoles();

    this.permissions = permissions;
    this.roles = roles;

    this.loading = false;
  }

  selectRole(role: Role) {
    this.role = { ...role };
  }

  roleCreated(role: Role) {
    this.roles.push(role);
    this.selectRole(role);
  }

  roleUpdated(updated: Role) {
    const role = this.roles.find((r) => r.id === updated.id);
    if (role) {
      role.name = updated.name;
      role.permissions = updated.permissions;
    }
  }

  roleDeleted(deleted: Role) {
    this.roles = this.roles.filter((r) => r.id !== deleted.id);
    this.role = null;
  }
}
</script>
