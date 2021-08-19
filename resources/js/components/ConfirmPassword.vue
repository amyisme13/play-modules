<template>
  <v-dialog max-width="500" v-model="dialog">
    <v-card>
      <v-card-title>Confirm Password</v-card-title>

      <v-card-text>
        <p class="text-body-1">Please confirm your password to continue.</p>

        <v-text-field
          dense
          outlined
          :error-messages="formErrors.password"
          label="Password"
          name="password"
          type="password"
          v-model="password"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="confirm">Confirm</v-btn>
        <v-btn outlined class="mr-2" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { confirmPassword, isPasswordConfirmed } from '@/api/auth';
import { ErrorModule } from '@/store/error';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmPassword extends Vue {
  dialog = false;
  confirming = true;

  password = '';

  resolve: ((value: boolean) => void) | null = null;

  get formErrors() {
    return ErrorModule.formErrors;
  }

  async open() {
    const res = await isPasswordConfirmed();
    if (res.data.confirmed) {
      return true;
    }

    this.password = '';
    this.dialog = true;

    return new Promise<boolean>((resolve) => (this.resolve = resolve));
  }

  reset(resolved: boolean) {
    if (this.resolve) {
      this.resolve(resolved);
    }

    this.resolve = null;
    this.password = '';
    this.confirming = false;
    this.dialog = false;
  }

  cancel() {
    this.reset(false);
  }

  async confirm() {
    this.confirming = true;

    try {
      await confirmPassword(this.password);

      this.reset(true);
    } catch (err) {
      //
    }
  }
}
</script>
