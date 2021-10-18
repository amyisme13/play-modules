<template>
  <div v-if="role.name === 'Super Admin'">
    <div class="bg-white rounded-lg shadow py-6 px-4 overflow-hidden sm:p-6 lg:pb-8">
      <h2 class="font-medium text-lg text-gray-900 leading-6">Role Settings</h2>
      <p class="mt-2 text-sm text-gray-500">Super Admin role cannot be modified.</p>
    </div>
  </div>

  <div v-else class="space-y-8">
    <form
      class="divide-y bg-white rounded-lg divide-gray-200 shadow overflow-hidden"
      @submit.prevent="submit"
    >
      <div class="space-y-4 py-6 px-4 sm:p-6 lg:pb-8">
        <h2 class="font-medium text-lg text-gray-900 leading-6">Role Settings</h2>

        <div class="w-full lg:w-2/3">
          <TextInput v-model="name" required :errors="formErrors.name" label="Name" name="name" />
        </div>

        <fieldset>
          <legend class="font-medium text-sm mb-2 text-gray-700">Permissions:</legend>

          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="permission in permissions"
              :key="permission.name"
              class="flex relative items-start"
            >
              <div class="flex h-5 items-center">
                <input
                  :id="`permission-${permission.name}`"
                  v-model="selected"
                  name="permissions"
                  type="checkbox"
                  :value="permission.name"
                  class="rounded border-gray-300 h-4 text-primary-600 w-4 focus:ring-primary-500"
                />
              </div>

              <div class="text-sm ml-3">
                <label :for="`permission-${permission.name}`" class="font-medium text-gray-700">
                  {{ permission.name }}
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="flex flex-col space-y-2 py-4 px-4 justify-end sm:(px-6 flex-row space-y-0)">
        <Button color="none" class="w-full justify-center sm:w-auto" @click="fillForm">
          Cancel
        </Button>

        <Button :disabled="saving" type="submit" class="w-full justify-center sm:(w-auto ml-5)">
          Save
        </Button>
      </div>
    </form>

    <form
      class="divide-y bg-white rounded-lg divide-gray-200 shadow overflow-hidden"
      @submit.prevent="submitDelete"
    >
      <div class="space-y-4 py-6 px-4 sm:p-6 lg:pb-8">
        <h3 class="font-medium text-lg text-gray-900 leading-6">Danger Zone</h3>
        <p class="max-w-xl mt-2 text-sm text-gray-500">
          By deleting this role you will also remove it from every user. This action is
          irreversible.
        </p>
      </div>

      <div class="flex flex-col space-y-2 py-4 px-4 justify-end sm:(px-6 flex-row space-y-0)">
        <Button
          color="error"
          :disabled="deleting"
          type="submit"
          class="w-full justify-center sm:(w-auto ml-5)"
        >
          Delete Role
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { deleteRole, updateRole } from '@/api/roles';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAppStore } from '@/store';
import { useErrorStore } from '@/store/error';
import { Permission, Role } from '@/types/api';

const app = useAppStore();
const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const props = defineProps<{ role: Role; permissions: Permission[] }>();
const emit = defineEmits<{ (e: 'updated', role: Role): void; (e: 'deleted', role: Role): void }>();

const name = ref('');
const selected = ref<string[]>([]);

const fillForm = () => {
  name.value = props.role.name;
  selected.value = props.role.permissions;
  errorStore.$reset();
};

watch(() => props.role, fillForm, { immediate: true });

const saving = ref(false);
const submit = async () => {
  saving.value = true;

  try {
    const { data } = await updateRole({
      id: props.role.id,
      name: name.value,
      permissions: selected.value,
    });

    emit('updated', data);
    app.notify({ style: 'success', text: 'Role saved.' });
  } catch (err) {
    //
  }

  saving.value = false;
};

const deleting = ref(false);
const submitDelete = async () => {
  const confirmed = confirm(`Are you sure you want to delete ${props.role.name}?`);
  if (!confirmed) {
    return;
  }

  deleting.value = true;

  try {
    await deleteRole(props.role.id);

    emit('deleted', props.role);
    app.notify({ style: 'success', text: 'Role deleted.' });
  } catch (err) {
    //
  }

  deleting.value = false;
};
</script>
