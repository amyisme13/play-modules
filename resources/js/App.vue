<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useAuthStore } from '@/store/auth';
import { useModulesStore } from '@/store/modules';

export default defineComponent({
  setup() {
    const el = document.getElementById('app') as HTMLElement;
    const initData = el.dataset.init || '{}';
    const init = JSON.parse(initData);

    const auth = useAuthStore();
    const modules = useModulesStore();

    auth.$patch({
      authenticated: init.authenticated || false,
      user: init.user || null,
    });

    modules.active = init.modules || [];

    return {};
  },
});
</script>
