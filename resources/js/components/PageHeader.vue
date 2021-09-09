<template>
  <h1 class="mb-4 text-h4">
    <v-btn v-if="back" exact icon class="mb-1" :to="back">
      <v-icon size="28">mdi-arrow-left</v-icon>
    </v-btn>

    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component
export default class PageHeader extends Vue {
  @Prop({ default: null })
  back!: RouteConfig | null;
}
</script>
