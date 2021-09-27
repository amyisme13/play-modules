<template>
  <AuthCard>
    <template #header>
      <h2 class="font-extrabold text-center text-3xl text-gray-900">Forgot password</h2>
    </template>

    <div v-if="success" class="rounded-md bg-success-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <i-heroicons-solid-check-circle class="h-5 w-5 text-success-400" />
        </div>

        <div class="ml-3">
          <p class="text-sm font-medium text-success-800">
            Reset password link sent successfully. Please check your email.
          </p>
        </div>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="sendRequest">
      <TextInput
        v-model="email"
        required
        :errors="formErrors.email"
        label="Email address"
        name="email"
        type="email"
      >
        <template #leading="{ iconClass }">
          <i-heroicons-solid-mail :class="iconClass" />
        </template>
      </TextInput>

      <div>
        <Button block :disabled="loading" type="submit">Request Reset Password</Button>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { requestReset } from '@/api/auth';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useErrorStore } from '@/store/error';

import AuthCard from './components/AuthCard.vue';

const loading = ref(false);
const success = ref(false);

const email = ref('');

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const sendRequest = async () => {
  loading.value = true;

  try {
    await requestReset(email.value);
    success.value = true;
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
