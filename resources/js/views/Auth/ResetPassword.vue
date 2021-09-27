<template>
  <AuthCard>
    <template #header>
      <h2 class="font-extrabold text-center text-3xl text-gray-900">Reset password</h2>
    </template>

    <div v-if="success" class="rounded-md bg-success-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <i-heroicons-solid-check-circle class="h-5 w-5 text-success-400" />
        </div>

        <div class="ml-3">
          <p class="text-sm font-medium text-success-800">
            New password set successfully.
            <br />
            <router-link class="text-primary-600 hover:underline" :to="{ name: 'login' }">
              Click here to login.
            </router-link>
          </p>
        </div>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="reset">
      <TextInput
        v-model="email"
        readonly
        required
        tabindex="-1"
        :errors="formErrors.email"
        label="Email address"
        name="email"
        type="email"
      >
        <template #leading="{ iconClass }">
          <i-heroicons-solid-mail :class="iconClass" />
        </template>
      </TextInput>

      <TextInput
        v-model="password"
        required
        :errors="formErrors.password"
        label="Password"
        name="password"
        :type="plainPassword ? 'text' : 'password'"
      >
        <template #leading="{ iconClass }">
          <i-heroicons-solid-lock-closed :class="iconClass" />
        </template>

        <template #trailing="{ iconClass }">
          <button tabindex="-1" type="button" @click.prevent="plainPassword = !plainPassword">
            <i-heroicons-solid-eye-off v-if="plainPassword" :class="iconClass" />
            <i-heroicons-solid-eye v-else :class="iconClass" />
          </button>
        </template>
      </TextInput>

      <TextInput
        v-model="confirm"
        required
        label="Confirm Password"
        name="password_confirmation"
        :type="plainPassword ? 'text' : 'password'"
      >
        <template #leading="{ iconClass }">
          <i-heroicons-outline-lock-closed :class="iconClass" />
        </template>
      </TextInput>

      <div>
        <Button block :disabled="loading" type="submit">Reset Password</Button>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { resetPassword } from '@/api/auth';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useErrorStore } from '@/store/error';

import AuthCard from './components/AuthCard.vue';

const loading = ref(false);
const success = ref(false);
const plainPassword = ref(false);

const route = useRoute();
const token = ref(route.query.token as string);
const email = ref(route.query.email as string);

const router = useRouter();
if (!token.value || !email.value) {
  router.push({ name: 'login' });
}

const password = ref('');
const confirm = ref('');

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const reset = async () => {
  loading.value = true;

  try {
    await resetPassword({
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirm.value,
    });

    success.value = true;
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
