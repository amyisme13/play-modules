<template>
  <v-container fluid>
    <h1 class="mb-4 text-h4">Account Settings</h1>

    <v-row>
      <v-col cols="12" md="6">
        <update-profile />
      </v-col>

      <v-col cols="12" md="6">
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

import TwoFactorAuth from './components/TwoFactorAuth.vue';
import UpdatePassword from './components/UpdatePassword.vue';
import UpdateProfile from './components/UpdateProfile.vue';

@Component({
  components: { TwoFactorAuth, UpdatePassword, UpdateProfile },
})
export default class Account extends Vue {}
</script>
