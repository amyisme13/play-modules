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
                :error-messages="formErrors.name"
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
                required
                :append-icon="plainPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :error-messages="formErrors.password"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                :type="plainPassword ? 'text' : 'password'"
                v-model="password"
                @click:append="plainPassword = !plainPassword"
              />

              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.password_confirmation"
                label="Confirm Password"
                name="password_confirmation"
                prepend-inner-icon="mdi-lock-check"
                :type="plainPassword ? 'text' : 'password'"
                v-model="confirm"
              />

              <v-checkbox hide-details class="mt-0 pt-0" label="I agree to TOS & PP" />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn class="white--text" color="primary" @click="register" :loading="loading">
              Register
            </v-btn>

            <v-btn text class="mr-2" :to="{ name: 'login' }">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { AuthModule } from '@/store/auth';
import { ErrorModule } from '@/store/error';

@Component
export default class Register extends Vue {
  loading = false;
  plainPassword = false;

  name = '';
  email = '';
  password = '';
  confirm = '';

  get formErrors() {
    return ErrorModule.formErrors;
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

      this.$router.push({ name: 'home' });
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
