<template>
  <v-container>
    <page-header>This is the home page</page-header>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PageHeader from '@/components/PageHeader.vue';

@Component({
  components: { PageHeader },
})
export default class Home extends Vue {}
</script>
