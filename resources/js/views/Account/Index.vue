<template>
  <v-container>
    <page-header>Account Settings</page-header>

    <v-row>
      <v-col cols="12" md="6">
        <update-profile />

        <div class="mt-6"></div>

        <update-password />
      </v-col>

      <v-col cols="12" md="6">
        <two-factor-auth />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PageHeader from '@/components/PageHeader.vue';
import TwoFactorAuth from './components/TwoFactorAuth.vue';
import UpdatePassword from './components/UpdatePassword.vue';
import UpdateProfile from './components/UpdateProfile.vue';

@Component({
  components: { PageHeader, TwoFactorAuth, UpdatePassword, UpdateProfile },
})
export default class Account extends Vue {}
</script>
