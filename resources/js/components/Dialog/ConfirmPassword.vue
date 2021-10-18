<template>
  <BaseDialog v-model="dialog">
    <form @submit.prevent="confirm">
      <div class="sm:(flex items-start)">
        <div
          class="rounded-full flex mx-auto bg-info-100 flex-shrink-0 h-12 w-12 items-center justify-center sm:(h-10 mx-0 w-10)"
        >
          <i-heroicons-outline-information-circle
            aria-hidden="true"
            class="h-6 text-info-600 w-6"
          />
        </div>

        <div class="mt-3 text-center w-full sm:(mt-0 text-left ml-4)">
          <DialogTitle as="h3" class="font-medium text-lg text-gray-900 leading-6">
            Confirm Password
          </DialogTitle>

          <div class="space-y-4">
            <p class="text-sm text-gray-500">Please confirm your password to continue.</p>

            <TextInput
              v-model="password"
              required
              :errors="formErrors.password"
              name="password"
              placeholder="Password"
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
          </div>
        </div>
      </div>

      <div class="mt-6 sm:(flex mt-8 ml-10 pl-4)">
        <Button :disabled="confirming" type="submit" class="w-full justify-center sm:w-auto">
          Confirm
        </Button>

        <Button
          color="none"
          type="button"
          class="mt-2 w-full justify-center sm:(mt-0 ml-2 w-auto)"
          @click="dialog = false"
        >
          Cancel
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>

<script lang="ts">
import { DialogTitle } from '@headlessui/vue';
import { ref, computed, defineComponent, watch } from 'vue';

import { confirmPassword, isPasswordConfirmed } from '@/api/auth';
import { useErrorStore } from '@/store/error';

import BaseDialog from './BaseDialog.vue';
import Button from '../Form/Button.vue';
import TextInput from '../Form/TextInput.vue';

export default defineComponent({
  components: {
    DialogTitle,
    BaseDialog,
    Button,
    TextInput,
  },
  setup() {
    const errorStore = useErrorStore();
    const formErrors = computed(() => errorStore.formErrors);

    const dialog = ref(false);
    const confirming = ref(false);

    const plainPassword = ref(false);
    const password = ref('');

    const resolve = ref<((value: boolean) => void) | null>();

    const open = async () => {
      const res = await isPasswordConfirmed();
      if (res.data.confirmed) {
        return true;
      }

      password.value = '';
      dialog.value = true;

      return new Promise<boolean>((pResolve) => (resolve.value = pResolve));
    };

    const reset = (resolved: boolean) => {
      if (resolve.value) {
        resolve.value(resolved);
      }

      resolve.value = null;
      password.value = '';
      confirming.value = false;
      dialog.value = false;
    };

    watch(dialog, (val) => {
      if (!val) {
        reset(false);
      }
    });

    const confirm = async () => {
      confirming.value = true;

      try {
        await confirmPassword(password.value);

        reset(true);
      } catch (err) {
        //
      }

      confirming.value = false;
    };

    return {
      formErrors,
      dialog,
      confirming,
      password,
      plainPassword,
      confirm,

      // exposed
      open,
    };
  },
});
</script>
