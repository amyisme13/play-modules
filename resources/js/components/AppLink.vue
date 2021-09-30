<template>
  <a v-if="typeof to === 'string' && to.startsWith('http')" :href="to" target="_blank">
    <slot></slot>
  </a>

  <a
    v-else
    v-bind="$attrs"
    :aria-current="isExactActive"
    :href="href"
    :class="classes"
    @click="navigate"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw, useLink } from 'vue-router';

interface Props {
  to: RouteLocationRaw;
  replace?: boolean;
  custom?: boolean;
  activeClass?: string;
  exactActiveClass?: string;
  ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  inactiveClass?: string;
}

const props = defineProps<Props>();
const { navigate, href, isActive, isExactActive } = useLink(props);

const classes = computed(() => {
  if (props.exactActiveClass) {
    return isExactActive.value ? props.exactActiveClass : props.inactiveClass;
  } else {
    return isActive.value ? props.activeClass : props.inactiveClass;
  }
});
</script>
