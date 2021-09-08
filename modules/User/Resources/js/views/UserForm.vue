<template>
  <v-container>
    <h1 class="mb-4 text-h4">{{ title }}</h1>

    <v-card>
      <v-card-text>
        <v-text-field
          dense
          outlined
          :error-messages="formErrors.name"
          label="Name"
          name="name"
          v-model="user.name"
        />

        <v-text-field
          dense
          outlined
          :error-messages="formErrors.email"
          label="Email"
          name="email"
          type="email"
          v-model="user.email"
        />

        <v-checkbox
          v-if="'id' in user"
          class="mt-0"
          label="Change Password"
          v-model="showPassword"
        />

        <template v-if="showPassword">
          <v-text-field
            dense
            outlined
            :error-messages="formErrors.password"
            label="Password"
            name="password"
            type="password"
            v-model="user.password"
          />

          <v-text-field
            dense
            outlined
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            v-model="user.password_confirmation"
          />
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :loading="submitting" @click="submit">Submit</v-btn>
      </v-card-actions>

      <v-overlay absolute :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { show, create, update } from '@user/api/users';
import { CreateUserDTO, UpdateUserDTO, User } from '@user/types';
import { ErrorModule } from '@/store/error';

@Component
export default class UserForm extends Vue {
  loading = false;
  submitting = false;

  showPassword = true;

  editedUser: User | null = null;
  user: CreateUserDTO | UpdateUserDTO = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  get formErrors() {
    return ErrorModule.formErrors;
  }

  get title() {
    if (this.loading) {
      return 'User Form';
    }

    if (this.editedUser) {
      return `Edit ${this.editedUser.name}`;
    }

    return 'Create User';
  }

  created() {
    if (this.$route.params.id) {
      this.load();
    }
  }

  async load() {
    this.loading = true;

    try {
      const id = parseInt(this.$route.params.id);
      const { data } = await show(id);

      this.editedUser = data;
      this.user = {
        ...data,
        password: '',
        password_confirmation: '',
      };

      this.showPassword = false;
    } catch (err) {
      this.$router.replace({ name: 'not-found' });
    }

    this.loading = false;
  }

  async submit() {
    this.submitting = true;

    if (this.showPassword === false) {
      this.user.password = '';
      this.user.password_confirmation = '';
    }

    try {
      if ('id' in this.user) {
        const { data } = await update(this.user);
        this.$snackbar(`${data.name} updated.`, 'success');
      } else {
        const { data } = await create(this.user);
        this.$snackbar(`${data.name} created.`, 'success');
      }

      this.$router.push({ name: 'user-management' });
    } catch (err) {
      //
    }

    this.submitting = false;
  }
}
</script>
