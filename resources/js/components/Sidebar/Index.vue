<template>
  <MobileSidebar
    v-model="sidebarOpened"
    v-bind="$attrs"
    :menus="menus"
    :user="user"
    @logout="logout"
  />

  <DesktopSidebar :menus="menus" :user="user" @logout="logout" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/store/auth';
import { useFeaturesStore } from '@/store/features';

import MobileSidebar from './MobileSidebar.vue';
import DesktopSidebar from './DesktopSidebar.vue';

const props = withDefaults(defineProps<{ modelValue?: boolean }>(), { modelValue: false });
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const sidebarOpened = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  },
});

const featuresStore = useFeaturesStore();
const menus = computed(() => featuresStore.menus);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const router = useRouter();
const logout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>
