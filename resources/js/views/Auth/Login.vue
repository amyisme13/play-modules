<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar flat class="white--text" color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-alert v-if="formErrors.code" dense type="error">
              {{ formErrors.code[0] }}
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

              <v-text-field
                dense
                outlined
                required
                :error-messages="formErrors.password"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                v-model="password"
              />

              <v-checkbox hide-details class="mt-0 pt-0" label="Remember Me" v-model="remember" />
            </v-form>

            <div class="d-flex align-center"></div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="white--text" color="primary" @click="login" :loading="loading">
              Login
            </v-btn>

            <v-btn text class="mr-2" :to="{ name: 'register' }"> Register </v-btn>

            <router-link
              class="ml-2 flex-grow-1 text-caption u-hover"
              :to="{ name: 'forgot-password' }"
            >
              Forgot your password?
            </router-link>
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
export default class Login extends Vue {
  loading = false;

  email = '';
  password = '';
  remember = false;

  get formErrors() {
    return ErrorModule.formErrors;
  }

  async login() {
    this.loading = true;

    try {
      const result = await AuthModule.login({
        email: this.email,
        password: this.password,
        remember: this.remember,
      });

      if (result) {
        this.$router.push({ name: 'home' });
      } else {
        this.$router.push({ name: '2fa-challenge' });
      }
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
