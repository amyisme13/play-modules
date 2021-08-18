<template>
  <v-card height="100%">
    <v-card-title>Profile</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          dense
          outlined
          :error-messages="formErrors.name"
          label="Name"
          name="name"
          prepend-inner-icon="mdi-account"
          v-model="name"
        />

        <v-text-field
          dense
          outlined
          :error-messages="formErrors.email"
          label="Email"
          name="email"
          prepend-inner-icon="mdi-email"
          v-model="email"
        />
      </v-form>

      <v-btn color="primary" :loading="loading" @click="submit">Submit</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { AuthModule } from '@/store/auth';
import { updateProfile } from '@/api/auth';
import { ErrorModule } from '@/store/error';

@Component
export default class UpdateProfile extends Vue {
  loading = false;

  name = '';
  email = '';

  get formErrors() {
    return ErrorModule.formErrors;
  }

  created() {
    const user = AuthModule.user;
    if (user) {
      this.name = user.name;
      this.email = user.email;
    }
  }

  async submit() {
    this.loading = true;

    try {
      await updateProfile({
        name: this.name,
        email: this.email,
      });

      await AuthModule.loadUser();

      this.$snackbar('Profile updated.', 'success');
    } catch (err) {
      //
    }

    this.loading = false;
  }
}
</script>
