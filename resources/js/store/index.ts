import { createPinia, defineStore } from 'pinia';

export const store = createPinia();

interface Notification {
  text: string;
  style: 'success' | 'info' | 'error' | 'none';
}

interface StoredNotification extends Notification {
  id: number;
}

interface State {
  notifications: StoredNotification[];
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    notifications: [],
  }),

  actions: {
    notify(message: Notification) {
      this.notifications.unshift({
        ...message,
        id: Math.round(Math.random() * 1000),
      });
    },
  },
});
