<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row align="center">
          <v-col>
            <h1 class="text-h2">Page Not Found</h1>

            <br />
            <v-btn color="primary" :to="{ name: 'home' }">Back to Home</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
