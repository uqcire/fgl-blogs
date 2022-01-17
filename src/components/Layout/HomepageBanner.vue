<script lang="ts" setup>
'HomepageBanner';

import { NButton } from 'naive-ui';
</script>

<template>
  <div class="homepage-banner__container">
    <!-- TEXT -->
    <div class="homepage-banner__text-container">
      <h3>Technology Report</h3>
      <p class="text-xl sm:text-base md:text-base">
        Technology has become the primary force of disruption across all sectors, and it's going to unleash unprecedented innovation and
        growth in the decade ahead.
      </p>
      <n-button type="error" class="homepage-banner__cta">explore the report</n-button>
    </div>

    <!-- IMAGE -->
    <div class="homepage-banner__image">
      <img class="object-cover h-full" src="https://picsum.photos/700/400/?random=88" alt="homepage-banner__image" />
    </div>
  </div>
</template>

<style lang="scss">
.homepage-banner__container {
  @apply border border-fgl-border-color grid grid-cols-2;
}
.homepage-banner__text-container {
  @apply p-4 m-4 sm:col-span-2 md:col-span-2 sm:p-1 sm:m-1 md:p-1 md:m-1;

  & h3 {
    @apply mt-0 sm:text-2xl md:text-2xl;
  }
}

.homepage-banner__cta {
  @apply uppercase;
}

.homepage-banner__image {
  @apply h-full sm:col-span-2 md:col-span-2 sm:row-start-1 md:row-start-1;
}
</style>
