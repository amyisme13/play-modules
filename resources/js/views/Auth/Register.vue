<template>
  <AuthCard>
    <template #header>
      <h2 class="font-extrabold text-center text-3xl text-gray-900">Create a new account</h2>

      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link
          :to="{ name: 'login' }"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          sign in with existing account
        </router-link>
      </p>
    </template>

    <form class="space-y-6" @submit.prevent="register">
      <TextInput v-model="name" required :errors="formErrors.name" label="Name" name="name">
        <template #leading="{ iconClass }">
          <i-heroicons-solid-user :class="iconClass" />
        </template>
      </TextInput>

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
        <Button block :disabled="loading" type="submit">Register</Button>
      </div>
    </form>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAuthStore } from '@/store/auth';
import { useErrorStore } from '@/store/error';

import AuthCard from './components/AuthCard.vue';

const loading = ref(false);
const plainPassword = ref(false);

const name = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const authStore = useAuthStore();
const router = useRouter();
const register = async () => {
  loading.value = true;

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirm.value,
    });

    router.push({ name: 'home' });
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
