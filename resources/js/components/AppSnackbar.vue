<template>
  <v-snackbar :color="color" :vertical="isSmAndDown" v-model="snackbar">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn v-if="queueNotEmpty" text @click="snackbar = false" v-bind="attrs">
        Next ({{ queue.length }} more)
      </v-btn>

      <v-btn v-else text @click="snackbar = false" v-bind="attrs"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { eventHub } from '@/plugins/vuetify';
import { Vue, Component, Watch } from 'vue-property-decorator';

interface Message {
  color: string;
  message: string;
}

@Component
export default class AppSnackbar extends Vue {
  snackbar = false;

  color = '';
  message = '';

  queue: Message[] = [];

  get isSmAndDown() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get queueNotEmpty() {
    return this.queue.length > 0;
  }

  created() {
    eventHub.$on('add', this.addMessage);
  }

  processQueue() {
    const message = this.queue.shift();
    if (message) {
      this.message = message.message;
      this.color = message.color;

      this.$nextTick(() => (this.snackbar = true));
    }
  }

  addMessage(message: string, color = 'primary') {
    this.queue.push({ message, color });
    if (!this.snackbar) {
      this.processQueue();
    }
  }

  @Watch('snackbar', { immediate: true })
  snackbarChanged() {
    if (!this.snackbar && this.queueNotEmpty) {
      this.processQueue();
    }
  }
}
</script>
