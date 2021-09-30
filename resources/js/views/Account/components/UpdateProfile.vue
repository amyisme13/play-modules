<template>
  <form class="divide-y divide-gray-200" @submit.prevent="submit">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">Profile</h2>
        <p class="mt-1 text-sm text-gray-500">
          Update your account's profile information and email address.
        </p>
      </div>

      <div class="mt-6 flex flex-col lg:flex-row">
        <!-- TODO: Photo -->
        <div class="mb-6 flex-grow lg:(mb-0 mr-6 flex-grow-0 flex-shrink-0)">
          <p aria-hidden="true" class="text-sm font-medium text-gray-700">Photo</p>
          <div class="mt-1 lg:hidden">
            <div class="flex items-center">
              <div
                aria-hidden="true"
                class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
              >
                <img
                  class="rounded-full h-full w-full"
                  src="https://ui-avatars.com/api/?background=random&name=XD"
                  alt=""
                />
              </div>

              <div class="ml-5 rounded-md shadow-sm">
                <div
                  class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:(ring-2 ring-offset-2 ring-primary-500)"
                >
                  <label
                    for="user-photo"
                    class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                  </label>

                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="hidden relative rounded-full overflow-hidden lg:block">
            <img
              class="relative rounded-full w-40 h-40"
              src="https://ui-avatars.com/api/?background=random&name=XD"
              alt=""
            />
            <label
              for="user-photo"
              class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
            >
              <span>Change</span>
              <span class="sr-only">user photo</span>
              <input
                id="user-photo"
                name="user-photo"
                type="file"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow max-w-[50%] space-y-6">
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

    <div class="divide-y divide-gray-200">
      <div class="py-4 px-4 flex justify-end sm:px-6">
        <Button color="none" @click="loadForm"> Cancel </Button>

        <Button :disabled="loading" type="submit" class="ml-5"> Save </Button>
      </div>
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

const auth = useAuthStore();
const loadForm = () => {
  if (auth.user) {
    name.value = auth.user.name;
    email.value = auth.user.email;
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
