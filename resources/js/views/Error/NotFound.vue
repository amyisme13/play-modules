<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white flex flex-col min-h-screen pt-16 pb-12">
    <main
      class="flex-grow flex flex-col mx-auto w-full max-w-7xl px-4 justify-center sm:px-6 lg:px-8"
    >
      <div class="flex flex-shrink-0 justify-center">
        <AppLink :to="{ name: 'home' }" class="inline-flex">
          <span class="sr-only">play modules</span>
          <i-heroicons-solid-puzzle class="h-12 w-auto text-primary-600" />
        </AppLink>
      </div>

      <div class="py-16">
        <div class="text-center">
          <p class="font-semibold text-sm tracking-wide text-primary-600 uppercase">404 error</p>
          <h1 class="font-extrabold mt-2 tracking-tight text-4xl text-gray-900 sm:text-5xl">
            Page not found.
          </h1>

          <p class="mt-2 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>

          <div class="mt-6">
            <AppLink
              :to="{ name: 'home' }"
              class="font-medium text-base text-primary-600 hover:text-primary-500"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </AppLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppLink from '@/components/AppLink.vue';
</script>
