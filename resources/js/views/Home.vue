<template>
  <div>
    <PageHeader>Home</PageHeader>

    <div class="grid gap-4 grid-cols-1 items-start lg:(grid-cols-3 gap-8)">
      <!-- Left column -->
      <div class="grid gap-4 grid-cols-1 lg:col-span-2">
        <!-- Welcome panel -->
        <section v-if="user" aria-labelledby="profile-overview-title">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
            <div class="p-6">
              <div class="sm:(flex items-center justify-between)">
                <div class="sm:(flex space-x-5)">
                  <div class="flex-shrink-0">
                    <img alt="" :src="user.avatar" class="rounded-full mx-auto h-20 w-20" />
                  </div>

                  <div class="mt-4 text-center sm:(mt-0 pt-1 text-left)">
                    <p class="font-medium text-sm text-gray-600">Welcome back,</p>
                    <p class="font-bold text-xl text-gray-900 sm:text-2xl">{{ user.name }}</p>
                    <p class="font-medium text-sm text-gray-600">{{ user.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TODO: Shortcuts Panel -->
        <section aria-labelledby="quick-links-title">
          <h2 id="quick-links-title" class="font-medium text-base text-gray-900 mb-2 lg:mt-4">
            Shortcuts
          </h2>

          <div class="grid grid-cols-1 gap-4 sm:(grid grid-cols-2 gap-4)">
            <div
              class="border border-dashed rounded-md border-2 border-gray-300 p-4 group relative overflow-hidden focus-within:(border-primary-500 border-solid)"
            >
              <div class="flex space-x-4 items-center">
                <div
                  class="rounded flex bg-primary-200 flex-shrink-0 h-12 w-12 justify-center items-center"
                >
                  <i-heroicons-solid-cursor-click class="h-6 text-primary-600 w-6" />
                </div>

                <div class="flex-grow">
                  <h3 class="font-medium text-gray-900">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="inset-0 absolute" aria-hidden="true"></span>
                      Add Shortcut
                    </a>
                  </h3>
                </div>

                <div class="flex flex-shrink-0 justify-center items-center">
                  <i-heroicons-outline-plus
                    class="h-8 text-gray-400 w-8 group-hover:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right column -->
      <div class="grid gap-4 grid-cols-1">
        <!-- TODO: News -->
        <section aria-labelledby="announcements-title">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6">
              <h2 id="announcements-title" class="font-medium text-base text-gray-900">News</h2>

              <div class="mt-6 flow-root">
                <ul class="divide-y divide-gray-200 -my-5">
                  <li class="py-5">
                    <div class="relative focus-within:(ring-2 ring-primary-500)">
                      <h3 class="font-semibold text-sm text-gray-800">
                        <AppLink to="news" class="hover:underline focus:outline-none">
                          <!-- Extend touch target to entire panel -->
                          <span class="inset-0 absolute" aria-hidden="true"></span>
                          New App v2.0
                        </AppLink>
                      </h3>

                      <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus aperiam
                        at voluptatem dolorum mollitia, ex eum amet enim natus ipsum!
                      </p>
                    </div>
                  </li>

                  <li class="py-5">
                    <div class="relative focus-within:(ring-2 ring-primary-500)">
                      <h3 class="font-semibold text-sm text-gray-800">
                        <AppLink to="news" class="hover:underline focus:outline-none">
                          <!-- Extend touch target to entire panel -->
                          <span class="inset-0 absolute" aria-hidden="true"></span>
                          New Password Policy
                        </AppLink>
                      </h3>

                      <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus aperiam
                        at voluptatem dolorum mollitia, ex eum amet enim natus ipsum!
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mt-6">
                <Button block color="none" to="news"> View All </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppLink from '@/components/AppLink.vue';
import Button from '@/components/Form/Button.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
