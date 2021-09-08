<template>
  <v-card>
    <v-card-title>Change Password</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          dense
          outlined
          :append-icon="plainPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :error-messages="formErrors.current_password"
          label="Current Password"
          name="current_password"
          prepend-inner-icon="mdi-lock-clock"
          :type="plainPassword ? 'text' : 'password'"
          v-model="current"
          @click:append="plainPassword = !plainPassword"
        />

        <v-text-field
          dense
          outlined
          :append-icon="plainPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :error-messages="formErrors.password"
          label="New Password"
          name="password"
          prepend-inner-icon="mdi-lock"
          :type="plainPassword ? 'text' : 'password'"
          v-model="password"
          @click:append="plainPassword = !plainPassword"
        />

        <v-text-field
          dense
          outlined
          :error-messages="formErrors.password_confirmation"
          label="Confirm Password"
          name="password_confirmation"
          prepend-inner-icon="mdi-lock-check"
          :type="plainPassword ? 'text' : 'password'"
          v-model="confirm"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" :loading="loading" @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { updatePassword } from '@/api/auth';
import { ErrorModule } from '@/store/error';

@Component
export default class UpdatePassword extends Vue {
  loading = false;
  plainPassword = false;

  current = '';
  password = '';
  confirm = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  async submit() {
    this.loading = true;

    try {
      await updatePassword({
        current_password: this.current,
        password: this.password,
        password_confirmation: this.confirm,
      });

      this.$snackbar('Password updated.', 'success');

      this.current = '';
      this.password = '';
      this.confirm = '';
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
