<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-text>
            <div v-if="recovery">
              <p>
                Please confirm access to your account by entering one of your emergency recovery
                codes.
              </p>

              <v-text-field
                dense
                outlined
                :error-messages="formErrors.code"
                label="Recovery Code"
                name="recovery_code"
                prepend-inner-icon="mdi-history"
                type="text"
                v-model="recoveryCode"
              />
            </div>

            <div v-else>
              <p>
                Please confirm access to your account by entering the authentication code provided
                by your authenticator application.
              </p>

              <v-text-field
                dense
                outlined
                :error-messages="formErrors.code"
                label="Code"
                name="code"
                prepend-inner-icon="mdi-lock"
                type="text"
                v-model="code"
              />
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="white--text ml-2" color="primary" @click="login" :loading="loading">
              Login
            </v-btn>

            <v-btn v-if="recovery" text @click="toggleRecovery"> Use 2FA Code </v-btn>

            <v-btn v-else text @click="toggleRecovery"> Use Recovery Code </v-btn>
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
export default class TwoFactorChallenge extends Vue {
  loading = false;
  recovery = false;

  code = '';
  recoveryCode = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  toggleRecovery() {
    this.recovery = !this.recovery;
    if (this.recovery) {
      this.code = '';
    } else {
      this.recoveryCode = '';
    }
  }

  async login() {
    this.loading = true;

    try {
      await AuthModule.login2FA({
        code: this.recovery ? '' : this.code,
        recovery_code: this.recovery ? this.recoveryCode : '',
      });

      this.$router.push({ name: 'home' });
    } catch (err) {
      ErrorModule.SET_DONT_RESET(true);
      this.$router.push({ name: 'login' });
      this.$nextTick(() => ErrorModule.SET_DONT_RESET(false));
    }

    this.loading = false;
  }
}
</script>
