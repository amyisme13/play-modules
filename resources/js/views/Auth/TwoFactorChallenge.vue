<template>
  <AuthCard>
    <template #header>
      <h2 class="font-extrabold text-center text-3xl text-gray-900">Forgot password</h2>
    </template>

    <p v-if="usingRecovery" class="text-gray-700 text-sm mb-4">
      Please confirm access to your account by entering one of your emergency recovery codes.
    </p>

    <p v-else class="text-gray-700 text-sm mb-4">
      Please confirm access to your account by entering the authentication code provided by your
      authenticator application.
    </p>

    <form class="space-y-6" @submit.prevent="login">
      <TextInput
        v-if="usingRecovery"
        v-model="recoveryCode"
        required
        label="Recovery Code"
        name="recovery_code"
      >
        <template #leading="{ iconClass }">
          <i-heroicons-solid-clipboard-list :class="iconClass" />
        </template>
      </TextInput>

      <TextInput v-else v-model="code" required label="Code" name="code">
        <template #leading="{ iconClass }">
          <i-heroicons-solid-lock-closed :class="iconClass" />
        </template>
      </TextInput>

      <div class="space-x-2">
        <Button :disabled="loading" type="submit">Login</Button>

        <Button v-if="usingRecovery" color="none" type="button" @click="toggleRecovery">
          Use 2FA Code
        </Button>

        <Button v-else color="none" type="button" @click="toggleRecovery">
          Use Recovery Code
        </Button>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAuthStore } from '@/store/auth';
import { useErrorStore } from '@/store/error';

import AuthCard from './components/AuthCard.vue';

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const usingRecovery = ref(false);

const code = ref('');
const recoveryCode = ref('');

const toggleRecovery = () => {
  usingRecovery.value = !usingRecovery.value;
  if (usingRecovery.value) {
    code.value = '';
  } else {
    recoveryCode.value = '';
  }
};

const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  loading.value = true;

  try {
    await authStore.login2FA({
      code: usingRecovery.value ? '' : code.value,
      recovery_code: usingRecovery.value ? recoveryCode.value : '',
    });

    router.push({ name: 'home' });
  } catch (err) {
    errorStore.shouldReset = false;
    router.push({ name: 'login' }).then(() => (errorStore.shouldReset = true));
  }

  loading.value = false;
};
</script>
