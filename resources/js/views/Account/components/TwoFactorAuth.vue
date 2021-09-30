<template>
  <!-- <v-card>
    <v-card-title>Two Factor Auth</v-card-title>

    <v-card-text v-if="user && user.two_factor_enabled">
      <p class="text--darken-3 grey--text">You have enabled two factor authentication.</p>
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

        <v-sheet class="font-mono black--text pa-4" color="grey lighten-3">
          <div v-for="code in recoveryCodes" :key="code">
            {{ code }}
          </div>
        </v-sheet>
      </div>
    </v-card-text>

    <v-card-text v-else>
      <p class="text--darken-3 grey--text">You have not enabled two factor authentication.</p>
      <p>
        When two factor authentication is enabled, you will be prompted for a secure, random token
        during authentication. You may retrieve this token from your phone's Google Authenticator
        application.
      </p>
    </v-card-text>

    <v-card-actions>
      <v-sheet
        v-if="user && user.two_factor_enabled"
        class="flex-column flex-md-row d-flex align-center"
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
  </v-card> -->

  <div v-bind="$attrs" class="divide-y divide-gray-200">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="font-medium text-lg text-gray-900 leading-6">Two Factor Auth</h2>
        <p class="mt-1 text-sm text-gray-500">
          Add additional security to your account using two factor authentication.
        </p>
      </div>

      <div class="mt-6 grid gap-6 grid-cols-12">
        <div class="col-span-12">
          <p v-if="twoFactorEnabled" class="font-medium text-sm text-gray-700">
            You have enabled two factor authentication.
          </p>

          <p v-else class="font-medium text-sm text-gray-700">
            You have not enabled two factor authentication.
          </p>

          <p class="mt-1 text-sm text-gray-500">
            When two factor authentication is enabled, you will be prompted for a secure, random
            token during authentication. You may retrieve this token from your phone's Google
            Authenticator application.
          </p>
        </div>

        <template v-if="twoFactorEnabled">
          <template v-if="qrCode">
            <div class="space-y-4 col-span-12">
              <p class="font-medium text-sm text-gray-700">
                Two factor authentication is now enabled. Scan the following QR code using your
                phone's authenticator application.
              </p>

              <div class="bg-white w-56" v-html="qrCode"></div>
            </div>
          </template>

          <template v-if="recoveryCodes.length > 0">
            <div class="space-y-4 col-span-12">
              <p class="text-sm text-gray-700 font-medium">
                Store these recovery codes in a secure password manager. They can be used to recover
                access to your account if your two factor authentication device is lost.
              </p>

              <div class="rounded-lg font-mono w-56 bg-gray-100 text-sm grid p-4 gap-1">
                <div v-for="code in recoveryCodes" :key="code">
                  {{ code }}
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="divide-y divide-gray-200">
      <div class="flex py-4 px-4 justify-end sm:px-6">
        <template v-if="twoFactorEnabled">
          <Button
            v-if="recoveryCodes.length === 0"
            color="none"
            :disabled="loadingCodes"
            @click="showRecoveryCodes"
          >
            Show Recovery Codes
          </Button>

          <Button v-else color="none" :disabled="loadingCodes" @click="regenerateRecoveryCodes">
            Regenerate Recovery Codes
          </Button>

          <Button color="error" :disabled="loading" class="ml-5" @click="disable2FA">
            Disable
          </Button>
        </template>

        <Button v-else :disabled="loading" class="ml-5" @click="enable2FA"> Enable </Button>
      </div>
    </div>
  </div>

  <ConfirmPassword ref="confirm" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import {
  disable2FA as apiDisable2FA,
  enable2FA as apiEnable2FA,
  get2FAQrCode,
  get2FARecoveryCodes,
  regenerate2FARecoveryCodes,
} from '@/api/auth';
import ConfirmPassword from '@/components/ConfirmPassword.vue';
import Button from '@/components/Form/Button.vue';
import { useAppStore } from '@/store';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const twoFactorEnabled = computed(() => user.value?.two_factor_enabled);

const loading = ref(false);
const loadingCodes = ref(false);

const qrCode = ref('');
const recoveryCodes = ref<string[]>([]);

const confirm = ref<InstanceType<typeof ConfirmPassword>>();
const confirmPassword = async () => {
  if (!confirm.value) {
    return false;
  }

  const confirmation = await confirm.value.open();
  if (confirmation === true) {
    return true;
  }

  return await confirmation;
};

const showRecoveryCodes = async () => {
  loadingCodes.value = true;

  try {
    const confirmed = await confirmPassword();
    if (confirmed) {
      const { data: codes } = await get2FARecoveryCodes();
      recoveryCodes.value = codes;
    }
  } catch (err) {
    //
  }

  loadingCodes.value = false;
};

const regenerateRecoveryCodes = async () => {
  loadingCodes.value = true;

  try {
    const confirmed = await confirmPassword();
    if (confirmed) {
      await regenerate2FARecoveryCodes();
      showRecoveryCodes();

      app.notify({ style: 'success', text: 'Recovery codes regenerated.' });
    }
  } catch (err) {
    //
  }

  loadingCodes.value = false;
};

const app = useAppStore();
const enable2FA = async () => {
  loading.value = true;

  try {
    const confirmed = await confirmPassword();
    if (confirmed) {
      await apiEnable2FA();
      await authStore.loadUser();

      const { data } = await get2FAQrCode();
      qrCode.value = data.svg;

      showRecoveryCodes();

      app.notify({ style: 'success', text: '2FA Enabled.' });
    }
  } catch (err) {
    //
  }

  loading.value = false;
};

const disable2FA = async () => {
  loading.value = true;

  try {
    const confirmed = await confirmPassword();
    if (confirmed) {
      await apiDisable2FA();
      await authStore.loadUser();

      app.notify({ style: 'success', text: '2FA Disabled.' });
    }
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
