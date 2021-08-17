<template>
  <v-app>
    <v-app-bar app clipped-left dark color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Laravel Starter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="user" text v-bind="attrs" v-on="on">{{ user.name }}</v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="menu in menus" :key="menu.routeName" :to="{ name: menu.routeName }">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { AuthModule } from '@/store/auth';
import { FeaturesModule } from '@/store/features';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppLayout extends Vue {
  drawer = true;
  loggingOut = false;

  get menus() {
    return FeaturesModule.menus;
  }

  get user() {
    return AuthModule.user;
  }

  async logout() {
    this.loggingOut = true;

    await AuthModule.logout();
    this.$router.push({ name: 'login' });

    this.loggingOut = false;
  }
}
</script>
