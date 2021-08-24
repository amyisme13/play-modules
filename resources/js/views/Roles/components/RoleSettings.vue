<template>
  <div>
    <v-card>
      <v-card-title>Role Settings</v-card-title>

      <v-card-text v-if="role.name === 'Super Admin'">
        <p>Super Admin role cannot be modified.</p>
      </v-card-text>

      <template v-else>
        <v-card-text>
          <v-text-field
            dense
            outlined
            :error-messages="formErrors.name"
            label="Name"
            v-model="role.name"
          />

          <h3 class="text-subtitle black--text mb-4">Permissions</h3>
          <v-autocomplete
            dense
            outlined
            label="Add Permission"
            :items="available"
            @input="addPermission"
            v-model="holder"
          />

          <v-chip-group column>
            <v-chip
              v-for="permission in role.permissions"
              :key="permission"
              close
              @click:close="removePermission(permission)"
            >
              {{ permission }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" :loading="updating" @click="updateRole"> Save </v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <v-card v-if="role.name !== 'Super Admin'" class="mt-4">
      <v-card-title>Danger Zone</v-card-title>

      <v-card-text>
        <p class="mb-2">
          By deleting this role you will also remove it from every user. This action is
          irreversible.
        </p>

        <v-btn color="error" :loading="deleting" @click="deleteRole">Delete Role</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { ErrorModule } from '@/store/error';
import { Permission, Role } from '@/types/api';
import { deleteRole, updateRole } from '@/api/roles';

@Component
export default class RoleSettings extends Vue {
  @Prop({ required: true })
  role!: Role;

  @Prop({ default: () => [] })
  permissions!: Permission[];

  updating = false;
  deleting = false;

  available: string[] = [];
  holder: string | null = null;

  get formErrors() {
    return ErrorModule.formErrors;
  }

  @Watch('role', { immediate: true })
  roleChanged() {
    ErrorModule.RESET();

    this.available = this.permissions
      .map((p) => p.name)
      .filter((p) => !this.role.permissions.includes(p));
  }

  addPermission(permission: string) {
    this.available = this.available.filter((p) => p !== permission);
    this.role.permissions.push(permission);
  }

  removePermission(permission: string) {
    this.available.push(permission);
    this.role.permissions = this.role.permissions.filter((p) => p !== permission);
    this.holder = null;
  }

  async updateRole() {
    this.updating = true;

    try {
      const { data: updated } = await updateRole(this.role);

      this.$emit('updated', updated);
      this.$snackbar('Role saved.', 'success');
    } catch (err) {
      //
    }

    this.updating = false;
  }

  async deleteRole() {
    const confirmed = confirm(`Are you sure you want to delete ${this.role.name}?`);
    if (!confirmed) {
      return;
    }

    this.deleting = true;

    try {
      await deleteRole(this.role.id);

      this.$emit('deleted', this.role);
      this.$snackbar('Role deleted', 'success');
    } catch (err) {
      //
    }

    this.deleting = false;
  }
}
</script>
