<script lang="ts" setup>
'HomepageCard';

import { NCard, NTag } from 'naive-ui';

const props = defineProps({
  tag: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },

  height: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <n-card hoverable style="height: 96%">
    <template #cover>
      <img class="object-cover" :style="'max-height:' + props.height + 'px'" :src="props.img" />
    </template>

    <div class="homepage-hero-card__content-container">
      <!-- CARD CONTENT -->

      <div class="homepage-hero-card__content">
        <!-- TAG -->
        <n-tag :color="{ color: '#f2f7d5', textColor: '092147', borderColor: '#f2f7d5' }" class="homepage-hero-card__tag">{{
          props.tag
        }}</n-tag>
        <!-- TITLE -->
        <h3>{{ props.title }}</h3>

        <!-- DESCRIPTION -->
        <p class="homepage-hero-card__desc">
          {{ props.desc }}
        </p>
      </div>

      <!-- CARD FOOTER -->
      <div class="homepage-hero-card__footer">
        <span>{{ props.type }}</span>
        <span>{{ props.date }}</span>
      </div>
    </div>
  </n-card>
</template>

<style lang="scss">
.homepage-hero-card {
  &__content-container {
    @apply mt-2 h-full flex flex-col justify-between;

    & h3 {
      @apply mt-0;
    }

    & p {
      @apply text-xl;
    }
  }

  &__tag {
    @apply font-semibold mb-2;
  }

  &__footer {
    @apply text-sm font-semibold text-fgl-text-color-2 flex justify-between;
  }
}
</style>
