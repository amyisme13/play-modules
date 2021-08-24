<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block color="primary" v-bind="attrs" v-on="on">Create Role</v-btn>
    </template>

    <v-card>
      <v-card-title> Create Role </v-card-title>

      <v-card-text>
        <v-text-field
          dense
          outlined
          :error-messages="formErrors.name"
          label="Name"
          v-model="name"
        />
      </v-card-text>

      <v-card-actions class="mt-n4">
        <v-btn color="primary" @click="createRole" :loading="creating"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createRole } from '@/api/roles';
import { ErrorModule } from '@/store/error';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class CreateRole extends Vue {
  dialog = false;

  creating = false;
  name = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  async createRole() {
    this.creating = true;

    try {
      const { data: role } = await createRole(this.name);

      this.dialog = false;
      this.name = '';

      this.$emit('created', role);
      this.$snackbar('Role created.', 'success');
    } catch (err) {
      //
    }

    this.creating = false;
  }

  @Watch('dialog')
  dialogChanged(dialog: boolean) {
    if (!dialog) {
      ErrorModule.RESET();
    }
  }
}
</script>
