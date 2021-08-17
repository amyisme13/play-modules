<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar flat class="white--text" color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.name || []"
                label="Name"
                name="name"
                prepend-inner-icon="mdi-account"
                type="text"
                v-model="name"
              />

              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.email || []"
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                v-model="email"
              />

              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.password || []"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                v-model="password"
              />

              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.password_confirmation || []"
                label="Confirm Password"
                name="password_confirmation"
                prepend-inner-icon="mdi-lock-check"
                type="password"
                v-model="confirm"
              />

              <v-checkbox class="mt-0 pt-0" label="I agree to TOS & PP" />
            </v-form>

            <div class="d-flex align-center">
              <v-btn class="white--text" color="primary" @click="register" :loading="loading">
                Register
              </v-btn>

              <router-link class="ml-4 u-hover" :to="{ name: 'login', query: { redirectTo } }">
                or Login
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { AuthModule } from '@/store/auth';
import { LaravelError } from '@/types/api';

@Component
export default class Register extends Vue {
  loading = false;

  name = '';
  email = '';
  password = '';
  confirm = '';

  error: LaravelError | null = null;

  get formErrors() {
    if (this.error && this.error.errors) {
      return this.error.errors;
    }

    return {};
  }

  get redirectTo() {
    return this.$route.query.redirectTo as string | null;
  }

  redirectUser() {
    if (this.redirectTo) {
      this.$router.push(this.redirectTo);
    } else {
      this.$router.push({ name: 'home' });
    }
  }

  async register() {
    this.loading = true;

    try {
      await AuthModule.register({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirm,
      });

      this.redirectUser();
    } catch (err) {
      if (err && err.response) {
        this.error = err.response.data;
      }
    }

    this.loading = false;
  }
}
</script>
