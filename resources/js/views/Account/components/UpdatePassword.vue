<template>
  <form class="divide-y divide-gray-200" @submit.prevent="submit">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">Change Password</h2>
        <p class="mt-1 text-sm text-gray-500">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-7">
          <TextInput
            v-model="current"
            required
            :errors="formErrors.current_password"
            label="Current Password"
            name="current_password"
            :type="plainPassword ? 'text' : 'password'"
          >
            <template #trailing="{ iconClass }">
              <button tabindex="-1" type="button" @click.prevent="plainPassword = !plainPassword">
                <i-heroicons-solid-eye-off v-if="plainPassword" :class="iconClass" />
                <i-heroicons-solid-eye v-else :class="iconClass" />
              </button>
            </template>
          </TextInput>
        </div>

        <div class="col-span-12 sm:col-span-7">
          <TextInput
            v-model="password"
            required
            :errors="formErrors.password"
            label="Password"
            name="password"
            :type="plainPassword ? 'text' : 'password'"
          >
            <template #trailing="{ iconClass }">
              <button tabindex="-1" type="button" @click.prevent="plainPassword = !plainPassword">
                <i-heroicons-solid-eye-off v-if="plainPassword" :class="iconClass" />
                <i-heroicons-solid-eye v-else :class="iconClass" />
              </button>
            </template>
          </TextInput>
        </div>

        <div class="col-span-12 sm:col-span-7">
          <TextInput
            v-model="confirm"
            required
            label="Confirm Password"
            name="password_confirmation"
            :type="plainPassword ? 'text' : 'password'"
          />
        </div>
      </div>
    </div>

    <div class="divide-y divide-gray-200">
      <div class="py-4 px-4 flex justify-end sm:px-6">
        <Button color="none" @click="cancel"> Cancel </Button>

        <Button :disabled="loading" type="submit" class="ml-5"> Save </Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { updatePassword } from '@/api/auth';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAppStore } from '@/store';
import { useErrorStore } from '@/store/error';

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const loading = ref(false);
const plainPassword = ref(false);

const current = ref('');
const password = ref('');
const confirm = ref('');

const cancel = () => {
  current.value = '';
  password.value = '';
  confirm.value = '';
};

const app = useAppStore();
const submit = async () => {
  loading.value = true;

  try {
    await updatePassword({
      current_password: current.value,
      password: password.value,
      password_confirmation: confirm.value,
    });

    app.notify({
      style: 'success',
      text: 'Password updated.',
    });

    cancel();
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
