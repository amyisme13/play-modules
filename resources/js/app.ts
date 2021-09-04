import Vue from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import { AuthModule } from './store/auth';
import { FeaturesModule } from './store/features';

const initDiv = document.querySelector('#app') as HTMLDivElement;
if (initDiv) {
  const initData = initDiv.dataset.init || '{}';
  const init = JSON.parse(initData);

  AuthModule.SET_AUTHENTICATED(init.authenticated || false);
  AuthModule.SET_USER(init.user || null);
  FeaturesModule.SET_ACTIVE(init.features || []);
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
