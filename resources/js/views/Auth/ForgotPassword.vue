<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar flat class="white--text" color="primary">
            <v-toolbar-title>Forgot Password</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-alert v-if="success" dense type="success">
              Reset password link sent successfully. Please check your email.
            </v-alert>

            <v-form>
              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.email"
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                v-model="email"
              />
            </v-form>

            <div class="d-flex align-center">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="success"
                :loading="loading"
                @click="requestReset"
              >
                Request Reset Password
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { ErrorModule } from '@/store/error';
import { requestReset } from '@/api/auth';

@Component
export default class ForgotPassword extends Vue {
  loading = false;
  success = false;

  email = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  async requestReset() {
    this.loading = true;

    try {
      await requestReset(this.email);
      this.success = true;
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
