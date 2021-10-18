<template>
  <div v-bind="$attrs" class="divide-y divide-gray-200">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="font-medium text-lg text-gray-900 leading-6">Two Factor Auth</h2>
        <p class="mt-1 text-sm text-gray-500">
          Add additional security to your account using two factor authentication.
        </p>
      </div>

      <div class="mt-6 grid gap-6 grid-cols-1">
        <div>
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
            <div class="space-y-4">
              <p class="font-medium text-sm text-gray-700">
                Two factor authentication is now enabled. Scan the following QR code using your
                phone's authenticator application.
              </p>

              <div class="bg-white w-56" v-html="qrCode"></div>
            </div>
          </template>

          <template v-if="recoveryCodes.length > 0">
            <div class="space-y-4">
              <p class="font-medium text-sm text-gray-700">
                Store these recovery codes in a secure password manager. They can be used to recover
                access to your account if your two factor authentication device is lost.
              </p>

              <div class="rounded-lg font-mono bg-gray-100 text-sm grid p-4 w-56 gap-1">
                <div v-for="code in recoveryCodes" :key="code">
                  {{ code }}
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="flex flex-col space-y-2 py-4 px-4 justify-end sm:(px-6 flex-row space-y-0)">
      <template v-if="twoFactorEnabled">
        <Button
          v-if="recoveryCodes.length === 0"
          color="none"
          :disabled="loadingCodes"
          class="w-full justify-center sm:w-auto"
          @click="showRecoveryCodes"
        >
          Show Recovery Codes
        </Button>

        <Button
          v-else
          color="none"
          :disabled="loadingCodes"
          class="w-full justify-center sm:w-auto"
          @click="regenerateRecoveryCodes"
        >
          Regenerate Recovery Codes
        </Button>

        <Button
          color="error"
          :disabled="loading"
          class="w-full justify-center sm:(w-auto ml-5)"
          @click="disable2FA"
        >
          Disable
        </Button>
      </template>

      <Button
        v-else
        :disabled="loading"
        class="w-full justify-center sm:(w-auto ml-5)"
        @click="enable2FA"
      >
        Enable
      </Button>
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
import ConfirmPassword from '@/components/Dialog/ConfirmPassword.vue';
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
