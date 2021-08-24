<template>
  <v-card>
    <v-card-title>Two Factor Auth</v-card-title>

    <v-card-text v-if="user && user.two_factor_enabled">
      <p class="grey--text text--darken-3">You have enabled two factor authentication.</p>
      <p>
        When two factor authentication is enabled, you will be prompted for a secure, random token
        during authentication. You may retrieve this token from your phone's Google Authenticator
        application.
      </p>

      <div v-if="qrCode">
        <p>
          Two factor authentication is now enabled. Scan the following QR code using your phone's
          authenticator application.
        </p>

        <v-sheet height="250" class="text-center" v-html="qrCode"></v-sheet>
      </div>

      <div v-if="recoveryCodes.length > 0" class="mb-4">
        <p>
          Store these recovery codes in a secure password manager. They can be used to recover
          access to your account if your two factor authentication device is lost.
        </p>

        <v-sheet class="pa-4 black--text font-mono" color="grey lighten-3">
          <div v-for="code in recoveryCodes" :key="code">
            {{ code }}
          </div>
        </v-sheet>
      </div>
    </v-card-text>

    <v-card-text v-else>
      <p class="grey--text text--darken-3">You have not enabled two factor authentication.</p>
      <p>
        When two factor authentication is enabled, you will be prompted for a secure, random token
        during authentication. You may retrieve this token from your phone's Google Authenticator
        application.
      </p>
    </v-card-text>

    <v-card-actions>
      <v-sheet
        v-if="user && user.two_factor_enabled"
        class="d-flex align-center flex-column flex-md-row"
        :width="isMobile ? '100%' : undefined"
      >
        <v-btn
          v-if="recoveryCodes.length === 0"
          outlined
          :block="isMobile"
          :loading="loadingCodes"
          @click="showRecoveryCodes"
        >
          Show Recovery Codes
        </v-btn>

        <v-btn
          v-else
          outlined
          :block="isMobile"
          :loading="loadingCodes"
          @click="regenerateRecoveryCodes"
        >
          Regenerate Recovery Codes
        </v-btn>

        <v-btn
          :block="isMobile"
          class="mt-2 mt-md-0 ml-md-4"
          color="secondary"
          :loading="loading"
          @click="disable2FA"
        >
          Disable 2FA
        </v-btn>
      </v-sheet>

      <v-btn v-else color="primary" :loading="loading" @click="enable2FA">Enable 2FA</v-btn>
    </v-card-actions>

    <confirm-password ref="confirm" />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ConfirmPassword from '@/components/ConfirmPassword.vue';
import { AuthModule } from '@/store/auth';
import {
  disable2FA,
  enable2FA,
  get2FAQrCode,
  get2FARecoveryCodes,
  regenerate2FARecoveryCodes,
} from '@/api/auth';
import { ErrorModule } from '@/store/error';

@Component({
  components: {
    ConfirmPassword,
  },
})
export default class TwoFactorAuth extends Vue {
  loading = false;
  loadingCodes = false;

  qrCode = '';
  recoveryCodes: string[] = [];

  get formErrors() {
    return ErrorModule.formErrors;
  }

  get user() {
    return AuthModule.user;
  }

  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  async confirmPassword() {
    const confirmation = await (this.$refs.confirm as any).open();
    if (confirmation === true) {
      return true;
    }

    return await confirmation;
  }

  async showRecoveryCodes() {
    this.loadingCodes = true;

    try {
      const confirmed = await this.confirmPassword();
      if (confirmed) {
        const { data: codes } = await get2FARecoveryCodes();
        this.recoveryCodes = codes;
      }
    } catch (err) {
      //
    }

    this.loadingCodes = false;
  }

  async regenerateRecoveryCodes() {
    this.loadingCodes = true;

    try {
      const confirmed = await this.confirmPassword();
      if (confirmed) {
        await regenerate2FARecoveryCodes();
        this.showRecoveryCodes();
      }
    } catch (err) {
      //
    }

    this.loadingCodes = false;
  }

  async enable2FA() {
    this.loading = true;

    try {
      const confirmed = await this.confirmPassword();
      if (confirmed) {
        await enable2FA();
        await AuthModule.loadUser();

        const { data: qrCode } = await get2FAQrCode();
        this.qrCode = qrCode.svg;

        this.showRecoveryCodes();

        this.$snackbar('2FA Enabled.', 'success');
      }
    } catch (err) {
      //
    }

    this.loading = false;
  }

  async disable2FA() {
    this.loading = true;

    try {
      const confirmed = await this.confirmPassword();
      if (confirmed) {
        await disable2FA();
        await AuthModule.loadUser();

        this.$snackbar('2FA Disabled.', 'success');
      }
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
