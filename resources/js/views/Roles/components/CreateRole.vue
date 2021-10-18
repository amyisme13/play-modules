<template>
  <BaseDialog v-model="modelProxy">
    <form @submit.prevent="submitRole">
      <div class="text-center w-full space-y-4 sm:text-left">
        <DialogTitle as="h3" class="font-medium text-lg text-gray-900 leading-6">
          Create Role
        </DialogTitle>

        <TextInput
          v-model="newRole"
          required
          :errors="formErrors.name"
          label="Role name"
          name="name"
        />
      </div>

      <div class="mt-6 sm:(flex mt-8)">
        <Button :disabled="creating" type="submit" class="w-full justify-center sm:w-auto">
          Create
        </Button>

        <Button
          color="none"
          type="button"
          class="mt-2 w-full justify-center sm:(mt-0 ml-2 w-auto)"
          @click="modelProxy = false"
        >
          Cancel
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue';
import { ref, computed } from 'vue';

import { createRole } from '@/api/roles';
import BaseDialog from '@/components/Dialog/BaseDialog.vue';
import Button from '@/components/Form/Button.vue';
import TextInput from '@/components/Form/TextInput.vue';
import { useAppStore } from '@/store';
import { useErrorStore } from '@/store/error';
import { Role } from '@/types/api';

const app = useAppStore();
const errorStore = useErrorStore();
const formErrors = computed(() => errorStore.formErrors);

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
  (e: 'created', role: Role): void;
}>();

const newRole = ref('');

const modelProxy = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val);

    if (!val) {
      newRole.value = '';
      errorStore.$reset();
    }
  },
});

const creating = ref(false);
const submitRole = async () => {
  creating.value = true;

  try {
    const { data } = await createRole(newRole.value);
    emit('created', data);
    app.notify({ style: 'success', text: 'Role created.' });

    modelProxy.value = false;
    newRole.value = '';
  } catch (err) {
    //
  }

  creating.value = false;
};
</script>
