<template>
  <v-container>
    <h1 class="mb-4 text-h4">User Management</h1>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <v-text-field
              dense
              hide-details
              outlined
              label="Type keyword here..."
              v-model="search"
              @keydown.enter="load"
            >
              <template v-slot:append-outer>
                <v-btn class="mt-n1.5" color="info" :loading="loading" @click="load">
                  Search
                </v-btn>
              </template>
            </v-text-field>
          </v-col>

          <v-col class="text-right">
            <v-btn :block="$vuetify.breakpoint.xsOnly" color="primary" :to="{ name: 'user-form' }">
              Create User
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-data-table
        :footer-props="{ 'disable-items-per-page': true }"
        :headers="headers"
        :items="users"
        :loading="loading"
        :options.sync="options"
        :server-items-length="total"
        @update:options="load"
      >
        <template v-slot:[`item.created_at`]="{ item }">
          <span>{{ new Date(item.created_at).toDateString() }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="text-center">
            <v-btn small color="info" :to="{ name: 'user-form', params: { id: item.id } }">
              Edit
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';

import { list } from '@user/api/users';
import { User } from '@user/types';

@Component
export default class Management extends Vue {
  loading = false;

  headers: DataTableHeader[] = [
    { text: 'ID', value: 'id' },
    { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Created Date', value: 'created_at' },
    { text: '', value: 'actions', sortable: false },
  ];

  search = '';
  options = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ['id'],
    sortDesc: [false],
    mustSort: true,
  };

  users: User[] = [];
  total = 0;

  created() {
    this.load();
  }

  async load() {
    this.loading = true;

    const { data } = await list({
      search: this.search,
      page: this.options.page,
      order_by: this.options.sortBy[0],
      order_desc: this.options.sortDesc[0],
    });

    this.users = data.data;
    this.total = data.meta.total;
    this.options.itemsPerPage = data.meta.per_page;

    this.loading = false;
  }
}
</script>
