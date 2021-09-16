<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useAuthStore } from '@/store/auth';
import { useFeaturesStore } from '@/store/features';

export default defineComponent({
  setup() {
    const el = document.getElementById('app') as HTMLElement;
    const initData = el.dataset.init || '{}';
    const init = JSON.parse(initData);

    const auth = useAuthStore();
    const features = useFeaturesStore();

    auth.$patch({
      authenticated: init.authenticated || false,
      user: init.user || null,
    });

    features.active = init.features || [];

    return {};
  },
});
</script>
