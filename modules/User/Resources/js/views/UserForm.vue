<template>
  <div>
    <PageHeader :back="{ name: 'user-management' }">{{ title }}</PageHeader>

    <form @submit.prevent="submit">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="bg-white space-y-6 py-6 px-4 sm:p-6">
          <div class="grid gap-6 grid-cols-3">
            <div class="col-span-3 sm:col-span-2">
              <TextInput v-model="user.name" required label="Name" name="name" />
            </div>

            <div class="col-span-3 sm:col-span-2">
              <TextInput v-model="user.email" required label="Email" name="email" type="email" />
            </div>

            <div v-if="editedUser" class="col-span-3">
              <Checkbox
                v-model:checked="changePassword"
                name="change_password"
                label="Change Password"
              />
            </div>

            <template v-if="changePassword">
              <div class="col-span-3 sm:col-span-2">
                <TextInput
                  v-model="user.password"
                  required
                  :errors="formErrors.password"
                  label="Password"
                  name="password"
                  :type="plainPassword ? 'text' : 'password'"
                >
                  <template #trailing="{ iconClass }">
                    <button
                      tabindex="-1"
                      type="button"
                      @click.prevent="plainPassword = !plainPassword"
                    >
                      <i-heroicons-solid-eye-off v-if="plainPassword" :class="iconClass" />
                      <i-heroicons-solid-eye v-else :class="iconClass" />
                    </button>
                  </template>
                </TextInput>
              </div>

              <div class="col-span-3 sm:col-span-2">
                <TextInput
                  v-model="user.password_confirmation"
                  required
                  label="Confirm Password"
                  name="password_confirmation"
                  :type="plainPassword ? 'text' : 'password'"
                />
              </div>
            </template>
          </div>
        </div>

        <div class="bg-gray-50 text-right py-3 px-4 sm:px-6">
          <Button :loading="submitting" type="submit">Save</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from '@/components/Form/Button.vue';
import Checkbox from '@/components/Form/Checkbox.vue';
import TextInput from '@/components/Form/TextInput.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useAppStore } from '@/store';
import { useErrorStore } from '@/store/error';
import { show, create, update } from '@user/api/users';
import { CreateUserDTO, UpdateUserDTO, User } from '@user/types';

const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const changePassword = ref(true);
const plainPassword = ref(false);

const app = useAppStore();
const loading = computed({
  get: () => app.loading,
  set: (loading: boolean) => app.$patch({ loading }),
});

const editedUser = ref<User>();
const user = ref<CreateUserDTO | UpdateUserDTO>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const title = computed(() => {
  if (loading.value) {
    return 'User Form';
  }

  if (editedUser.value) {
    return `Edit ${editedUser.value.name}`;
  }

  return 'Create User';
});

const route = useRoute();
const router = useRouter();
const load = async () => {
  loading.value = true;

  try {
    const id = parseInt(route.params.id as string);
    const { data } = await show(id);

    editedUser.value = data;
    user.value = {
      ...data,
      password: '',
      password_confirmation: '',
    };

    changePassword.value = false;
  } catch (err) {
    router.replace({ name: 'not-found' });
  }

  loading.value = false;
};

if (route.params.id) {
  load();
}

const submitting = ref(false);
const submit = async () => {
  submitting.value = true;

  if (changePassword.value === false) {
    user.value.password = '';
    user.value.password_confirmation = '';
  }

  try {
    if ('id' in user.value) {
      const { data } = await update(user.value);
      app.notify({ style: 'success', text: `${data.name} updated.` });
    } else {
      const { data } = await create(user.value);
      app.notify({ style: 'success', text: `${data.name} created.` });
    }

    router.push({ name: 'user-management' });
  } catch (err) {
    //
  }

  submitting.value = false;
};
</script>
