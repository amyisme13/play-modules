import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

const el = document.getElementById('app') as HTMLElement;

createApp(App).use(store).use(router).mount(el);
