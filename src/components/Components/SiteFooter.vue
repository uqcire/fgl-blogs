<script lang="ts" setup>
'SiteFooter';

import { InstagramFilled, LinkedinFilled, TwitterOutlined, WechatFilled, YoutubeFilled } from '@vicons/antd';
import { NDivider, NIcon } from 'naive-ui';
import { reactive, ref } from 'vue';

const user = ref();

const footerLinks = reactive([
  {
    id: '1',
    link: '#',
    label: 'Contact FGL',
    title: 'Contact us',
  },

  {
    id: '2',
    link: '#',
    label: 'Connect',
    title: 'Connect',
  },
  {
    id: '3',
    link: '#',
    label: 'Term of use',
    title: 'Term of use',
  },
  {
    id: '4',
    link: '#',
    label: 'FGL.com Privacy Policy',
    title: 'Privacy',
  },
  {
    id: '5',
    link: '#',
    label: 'Cookie Policy',
    title: 'Cookie Policy',
  },
  {
    id: '6',
    link: '#',
    label: 'Sustainability',
    title: 'Sustainability',
  },
  {
    id: '7',
    link: '#',
    label: 'Sitemap',
    title: 'Sitemap',
  },
]);
</script>

<template>
  <footer>
    <div class="fgl-layout">
      <div class="fgl-layout--center">
        <div class="footer__content">
          <div class="footer__top-row">
            <div class="footer__heading">
              <router-link :to="{ name: 'Home' }">
                <div class="flex flex-row flex-nowrap">
                  <img class="h-4 mr-2" src="../../assets/logo--3-dark.svg" alt="logo" />
                  <span class="text-2xl font-krona text-white">
                    FGL
                    <span class="text-fgl-valencia">.</span>
                  </span>
                </div>
              </router-link>
            </div>
            <div class="footer__social">
              <ul class="social-links">
                <li class="social-links__item">
                  <a href="#" class="social-links__link" target="_blank">
                    <n-icon color="#ffffff" size="24">
                      <LinkedinFilled />
                    </n-icon>
                  </a>
                </li>
                <li class="social-links__item">
                  <a href="#" class="social-links__link" target="_blank">
                    <n-icon color="#ffffff" size="24">
                      <WechatFilled />
                    </n-icon>
                  </a>
                </li>
                <li class="social-links__item">
                  <a href="#" class="social-links__link" target="_blank">
                    <n-icon color="#ffffff" size="24">
                      <InstagramFilled />
                    </n-icon>
                  </a>
                </li>
                <li class="social-links__item">
                  <a href="#" class="social-links__link" target="_blank">
                    <n-icon color="#ffffff" size="24">
                      <YoutubeFilled />
                    </n-icon>
                  </a>
                </li>
                <li class="social-links__item">
                  <a href="#" class="social-links__link" target="_blank">
                    <n-icon color="#ffffff" size="24">
                      <TwitterOutlined />
                    </n-icon>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom-row">
            <div class="footer__links">
              <a v-for="item in footerLinks" :key="item.id" href="item.link" aria-label="item.label">
                {{ item.title }}
              </a>
              <span class="mr-3">|</span>
              <!-- <router-link :to="{ name: 'Home' }">Home</router-link>
              <router-link :to="{ name: 'Blogs' }">Blogs</router-link>
              <router-link v-if="user" :to="{ name: 'NewPosts' }">Create Post</router-link>
              <router-link v-if="!user" :to="{ name: 'Login' }">Login / Register</router-link> -->
            </div>
            <n-divider />
            <div class="footer__legal">
              <p>© 2015-2022 Fresh Gate Pty Ltd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  @apply mt-2 bg-fgl-primary sticky;
}

.footer {
  &__content {
    @apply flex flex-col text-white;
  }

  &__top-row {
    min-height: 8rem;
    @apply lg:flex lg:flex-row lg:justify-between
    xl:flex xl:flex-row xl:justify-between;
  }

  &__heading {
    @apply mt-4 mb-10 md:mb-2 sm:mb-2;
  }

  &__social {
    @apply mt-4 mb-10 md:mb-2 sm:mb-2;
  }

  &__links a {
    @apply inline-block md:block sm:block mr-3 text-lg;
  }

  &__legal {
    @apply text-xs;
  }
}

.social-links {
  @apply sm:pl-0 md:pl-0 sm:ml-0 md:ml-0;
  &__item {
    @apply inline-block mr-2 align-middle;
  }
}
</style>
