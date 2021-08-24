<template>
  <v-card>
    <v-card-title>Roles</v-card-title>

    <v-skeleton-loader v-if="loading" type="list-item@2" />

    <v-list v-else>
      <v-list-item v-for="role in roles" :key="role.id" @click="$emit('select', role)">
        <v-list-item-title>{{ role.name }}</v-list-item-title>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Role } from '@/types/api';

@Component
export default class RoleList extends Vue {
  @Prop({ required: true })
  roles!: Role[];

  @Prop({ default: false })
  loading!: boolean;
}
</script>
