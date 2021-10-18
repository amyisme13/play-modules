<template>
  <form class="divide-y divide-gray-200" @submit.prevent="submit">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="font-medium text-lg text-gray-900 leading-6">Profile</h2>
        <p class="mt-1 text-sm text-gray-500">
          Update your account's profile information and email address.
        </p>
      </div>

      <div class="flex flex-col mt-6 lg:flex-row">
        <!-- TODO: Photo -->
        <div class="flex-grow mb-6 lg:(mb-0 mr-6 flex-grow-0 flex-shrink-0)">
          <p aria-hidden="true" class="font-medium text-sm text-gray-700">Photo</p>
          <div class="mt-1 lg:hidden">
            <div class="flex items-center">
              <div
                aria-hidden="true"
                class="rounded-full flex-shrink-0 h-12 w-12 inline-block overflow-hidden"
              >
                <img alt="user profile photo" :src="avatar" class="rounded-full h-full w-full" />
              </div>

              <div class="rounded-md shadow-sm ml-5">
                <div
                  class="border rounded-md flex border-gray-300 py-2 px-3 group relative items-center justify-center hover:bg-gray-50 focus-within:(ring-2 ring-offset-2 ring-primary-500)"
                >
                  <label
                    for="user-photo"
                    class="font-medium text-sm text-gray-700 leading-4 relative pointer-events-none"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                  </label>

                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    class="rounded-md cursor-pointer h-full border-gray-300 w-full opacity-0 absolute"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-full hidden relative overflow-hidden lg:block">
            <img alt="user profile photo" :src="avatar" class="rounded-full h-40 w-40 relative" />
            <label
              for="user-photo"
              class="bg-black flex font-medium h-full bg-opacity-75 text-sm text-white w-full opacity-0 inset-0 absolute items-center justify-center hover:opacity-100 focus-within:opacity-100"
            >
              <span>Change</span>
              <span class="sr-only">user photo</span>
              <input
                id="user-photo"
                name="user-photo"
                type="file"
                class="rounded-md cursor-pointer h-full border-gray-300 w-full opacity-0 inset-0 absolute"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6 md:max-w-[50%]">
          <TextInput v-model="name" required :errors="formErrors.name" label="Name" name="name" />

          <TextInput
            v-model="email"
            required
            :errors="formErrors.email"
            label="Email"
            name="email"
            type="email"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-2 py-4 px-4 justify-end sm:(px-6 flex-row space-y-0)">
      <Button color="none" class="w-full justify-center sm:w-auto" @click="loadForm">
        Cancel
      </Button>

      <Button :disabled="loading" type="submit" class="w-full justify-center sm:(w-auto ml-5)">
        Save
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { updateProfile } from '@/api/auth';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAppStore } from '@/store';
import { useAuthStore } from '@/store/auth';
import { useErrorStore } from '@/store/error';

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const loading = ref(false);

const name = ref('');
const email = ref('');
const avatar = ref('');

const auth = useAuthStore();
const loadForm = () => {
  if (auth.user) {
    name.value = auth.user.name;
    email.value = auth.user.email;
    avatar.value = auth.user.avatar;
  }
};
loadForm();

const app = useAppStore();
const submit = async () => {
  loading.value = true;

  try {
    await updateProfile({
      name: name.value,
      email: email.value,
    });

    await auth.loadUser();

    app.notify({
      style: 'success',
      text: 'Profile updated.',
    });
  } catch (err) {
    //
  }

  loading.value = false;
};
</script>
