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
    type: Number,
    default: 0,
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
  <div class="homepage-content-card">
    <n-card hoverable>
      <template #cover>
        <img class="homepage-content-card__image" :style="'max-height:' + props.height + 'px'" :src="props.img" />
      </template>
      <div class="homepage-content-card__content-container">
        <!-- CARD CONTENT -->

        <div class="homepage-content-card__content">
          <!-- TAG -->
          <n-tag :color="{ color: '#f2f7d5', textColor: '092147', borderColor: '#f2f7d5' }" class="homepage-content-card__tag">{{
            props.tag
          }}</n-tag>
          <!-- TITLE -->
          <h5>{{ props.title }}</h5>

          <!-- DESCRIPTION -->
          <p class="homepage-content-card__desc">
            {{ props.desc }}
          </p>
        </div>

        <!-- CARD FOOTER -->
        <div class="homepage-content-card__footer">
          <span>{{ props.type }}</span>
          <span>{{ props.date }}</span>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style lang="scss">
.homepage-content-card {
  @apply h-full;
  .n-card {
    @apply sm:flex-row md:flex-row h-full;

    &__content {
      @apply sm:pb-0 md:pb-0 pb-2;
    }
  }

  .n-card .n-card-cover {
    @media (min-width: 375px) and (max-width: 1023px) {
      width: 8rem;
    }
  }

  &__image {
    @apply object-cover sm:h-full md:h-full;
  }
  &__content-container {
    @apply mt-2 sm:mt-0 md:mt-0 h-full flex flex-col justify-between;

    & h5 {
      @apply mt-0 leading-5 sm:text-base md:text-base;
    }

    & p {
      @apply leading-5 sm:hidden md:hidden;
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
