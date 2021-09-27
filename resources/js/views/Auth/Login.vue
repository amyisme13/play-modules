<template>
  <AuthCard>
    <template #header>
      <h2 class="font-extrabold text-center text-3xl text-gray-900">Sign in to your account</h2>

      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link
          :to="{ name: 'register' }"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          create a new account
        </router-link>
      </p>
    </template>

    <div v-if="tfaError" class="rounded-md bg-error-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <i-heroicons-solid-x-circle class="h-5 w-5 text-error-400" />
        </div>

        <div class="ml-3">
          <p class="text-sm font-medium text-error-800">
            {{ tfaError }}
          </p>
        </div>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="login">
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

      <div class="flex items-center justify-between">
        <Checkbox v-model:checked="remember" label="Remember me" name="remember" />

        <div class="text-sm">
          <router-link
            :to="{ name: 'forgot-password' }"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Forgot your password?
          </router-link>
        </div>
      </div>

      <div>
        <Button block :disabled="loading" type="submit">Sign in</Button>
      </div>
    </form>

    <div class="mt-6">
      <div class="relative">
        <div class="flex inset-0 absolute items-center">
          <div class="border-t border-gray-300 w-full"></div>
        </div>

        <div class="flex text-sm relative justify-center">
          <span class="bg-white px-2 text-gray-500"> Or continue with </span>
        </div>
      </div>

      <div class="mt-6 grid gap-3 grid-cols-3">
        <div>
          <Button block color="none" @click="loginSocial">
            <span class="sr-only">Sign in with Facebook</span>
            <i-mdi-facebook class="h-5 w-5" />
          </Button>
        </div>

        <div>
          <Button block color="none" @click="loginSocial">
            <span class="sr-only">Sign in with Facebook</span>
            <i-mdi-twitter class="h-5 w-5" />
          </Button>
        </div>

        <div>
          <Button block color="none" @click="loginSocial">
            <span class="sr-only">Sign in with Facebook</span>
            <i-mdi-github class="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </AuthCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/components/Form/Button.vue';
import Checkbox from '@/components/Form/Checkbox.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAuthStore } from '@/store/auth';
import { useErrorStore } from '@/store/error';

import AuthCard from './components/AuthCard.vue';

const loginSocial = () => alert('Not implemented yet');

const loading = ref(false);
const plainPassword = ref(false);

const email = ref('');
const password = ref('');
const remember = ref(false);

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);
const tfaError = computed(() =>
  errorStore.formErrors.code ? errorStore.formErrors.code[0] : null
);

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  loading.value = true;

  try {
    const result = await authStore.login({
      email: email.value,
      password: password.value,
      remember: remember.value,
    });

    if (result) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: '2fa-challenge' });
    }
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
