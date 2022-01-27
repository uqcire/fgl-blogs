<script lang="ts" setup>
'Homepage';

import { useSampleBlogsStore } from '@/store/sampleBlogs';
import HomepageBanner from '@c/Layout/HomepageBanner.vue';
import HomepageContentCard from '@c/Layout/HomepageContentCard.vue';
import HomepageHeroCard from '@c/Layout/HomepageHeroCard.vue';
import { NDivider, NTag } from 'naive-ui';

const blogs = useSampleBlogsStore();

const insightsList = reactive([
  {
    id: 1,
    tag: 'Pikapika',
    title: 'A New Year’s Resolution For 2022: Deploying Your Skills To Lead Through Change',
    type: 'Forbes.com',
  },
  {
    id: 2,
    tag: 'Retail',
    title: 'Happy Holidays Are In-Store for Retailers',
    type: 'Retail Holiday Newsletter',
  },
  {
    id: 3,
    tag: 'Diversity, Equity & Inclusion',
    title: 'What Works in DEI? Four Efforts Worth Measuring',
    type: 'Article',
  },
  {
    id: 4,
    tag: 'Energy & Natural Resources',
    title: 'Beyond COP26: An Action Plan for CEOs',
    type: 'Brief',
  },
  {
    id: 5,
    tag: 'Software',
    title: 'How Your Engineering Team Can Help Solve the Chip Shortage',
    type: 'Brief',
  },
]);
</script>

<template>
  <!-- HEADER -->
  <div class="fgl-layout">
    <div class="fgl-layout--center">
      <section class="title-group">
        <h1 class="col-span-4 sm:col-span-8 md:col-span-8">Insights</h1>

        <div class="title-group__overview">
          <p class="text-xl my-auto">
            Proprietary data, expert analysis and bold thinking for leaders who want to achieve the extraordinary.
          </p>
        </div>
      </section>
    </div>
  </div>
  <n-divider />

  <!-- FEED -->
  <div class="fgl-layout">
    <div class="fgl-layout--center">
      <div class="feed">
        <div class="feed__results-container">
          <div>
            <!-- FEED HERO -->

            <section class="feed__hero">
              <!-- LEFT SECTION -->
              <div class="feed__hero-container--left">
                <HomepageHeroCard
                  tag="Aloha Pikapika"
                  img="https://picsum.photos/500/?random=1"
                  height="480"
                  title="Master Your Supplier Universe with Digital Procurement"
                  desc="Digital procurement solutions boost transparency, improve efficiency, and reduce supplier risk. Leading companies are rapidly rethinking workforce strategies and boosting investment in automation."
                  type="Article"
                  date="Jan 04, 2022"
                />
              </div>

              <!-- RIGHT SECTION -->
              <div class="feed__hero-container--right">
                <div class="insights-list">
                  <h3 class="insights-list__heading">Recommended</h3>
                  <ol class="insights-list__list insights-list__list--large-number">
                    <li v-for="item in insightsList" :key="item.id">
                      <div class="insights-list__text-container">
                        <n-tag
                          :color="{
                            color: '#f2f7d5',
                            textColor: '092147',
                            borderColor: '#f2f7d5',
                          }"
                          class="insights-list__tag"
                          >{{ item.tag }}</n-tag
                        >
                        <h6 class="mt-0 mb-1">{{ item.title }}</h6>
                        <p class="insights-list__content-type">{{ item.type }}</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <!-- FEED BANNER -->

            <section class="feed__banner">
              <HomepageBanner />
            </section>

            <!-- FEED CONTENT -->

            <section class="feed__content">
              <div
                v-for="item in blogs"
                :key="item.id"
                :class="'homepage-card__grid-row--' + item.cards + 'homepage-card__grid-row--feature-' + item.feature"
                class="homepage-card__grid-row"
              >
                <div v-for="val in item.row" :key="val.id" class="sm:col-span-12 md:col-span-12" :class="val.span">
                  <HomepageContentCard
                    :key="val.id"
                    :tag="val.tag"
                    :img="val.img"
                    :height="val.height"
                    :title="val.title"
                    :desc="val.desc"
                    :type="val.type"
                    :date="val.date"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-group {
  @apply grid grid-cols-8;

  &__overview {
    @apply col-span-4 place-self-center sm:col-span-8 md:col-span-8;
  }
}
.insights-list {
  &__heading {
    @apply text-fgl-valencia my-0;
  }

  &__tag {
    @apply mt-2 mb-1;
  }

  &__list {
    & ol {
      @apply my-0 py-0;
    }
    & li {
      @apply border-b border-fgl-border-color;
    }

    & li:last-child {
      @apply mb-0 pb-0 border-b-0;
    }

    & h6 {
      @apply leading-6;
    }
  }

  &__list--large-number li {
    counter-increment: interator;
    @apply table font-semibold;

    &:before {
      content: counter(interator);
      @apply text-3xl font-semibold pr-6 pt-7 align-top table-cell w-2 -ml-8;
    }
  }

  &__content-type {
    @apply text-sm font-semibold text-fgl-text-color-2 mb-1;
  }
}

.feed {
  @apply mt-6;

  &__hero {
    @apply grid grid-cols-12 gap-x-2 gap-y-4;

    &-container--left {
      @apply col-span-8 sm:col-span-12 md:col-span-12;
    }

    &-container--right {
      @apply col-span-4 border-t-2 border-fgl-valencia sm:col-span-12 md:col-span-12;
    }
  }

  &__content {
    @apply grid gap-y-4;
  }
}

.homepage-card__grid-row {
  @apply grid grid-cols-12 gap-x-2 gap-y-4;

  &:first-child {
    @apply mt-6;
  }
}
</style>
