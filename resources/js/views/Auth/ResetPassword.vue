<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar flat class="white--text" color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-alert v-if="success" dense type="success">
              New password set successfully.
              <router-link class="u-hover white--text" :to="{ name: 'login' }">
                Click here to login
              </router-link>
            </v-alert>

            <v-form>
              <v-text-field
                dense
                outlined
                readonly
                :error-messages="formErrors.email"
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                v-model="email"
              />

              <v-text-field
                dense
                outlined
                :error-messages="formErrors.password"
                label="New Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                v-model="password"
              />

              <v-text-field
                dense
                outlined
                :error-messages="formErrors.password_confirmation"
                label="Confirm Password"
                name="password_confirmation"
                prepend-inner-icon="mdi-lock-check"
                type="password"
                v-model="confirm"
              />
            </v-form>

            <div class="d-flex align-center">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="success"
                :loading="loading"
                @click="reset"
              >
                Reset Password
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
import { resetPassword } from '@/api/auth';

@Component
export default class ResetPassword extends Vue {
  loading = false;
  success = false;

  token = '';
  email = '';
  password = '';
  confirm = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  created() {
    this.token = this.$route.query.token as string;
    this.email = this.$route.query.email as string;

    if (!this.token || !this.email) {
      this.$router.push({ name: 'login' });
    }
  }

  async reset() {
    this.loading = true;

    try {
      await resetPassword({
        token: this.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirm,
      });

      this.success = true;
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
