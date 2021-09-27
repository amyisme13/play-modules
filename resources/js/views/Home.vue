<template>
  <div class="container mx-auto">
    <PageHeader>Home</PageHeader>
    <button class="px-4 py-2 bg-white border rounded-sm" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import PageHeader from '@/components/PageHeader.vue';
import { useAppStore } from '@/store';
import { useAuthStore } from '@/store/auth';

const store = useAuthStore();
const router = useRouter();

const logout = async () => {
  await store.logout();
  router.push({ name: 'login' });
};
</script>
