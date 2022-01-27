<script lang="ts" setup>
'SiteNavigation';

import { firebaseApp } from '@/firebase/firebaseinit';
import { LoginOutlined, UsergroupAddOutlined } from '@vicons/antd';
import { Bars } from '@vicons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NDrawer, NDrawerContent, NIcon } from 'naive-ui';
import SiteLogo from './SiteLogo.vue';
import SiteNavigationProfile from './SiteNavigationProfile.vue';

const mobile: boolean | any = ref(null);
const mobileNav: boolean | any = ref(null);
const windowWidth: number | any = ref(null);
const auth = getAuth(firebaseApp);

const isVisible: boolean | any = ref(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
});

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 1023) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

window.addEventListener('resize', checkScreen);
</script>

<template>
  <header>
    <div class="fgl-layout">
      <div class="fgl-layout--center">
        <div class="primary-nav">
          <!-- LOGO -->
          <div class="primary-nav__logo">
            <SiteLogo text-color="text-white" />
          </div>

          <!-- NAV LINKS -->
          <div class="primary-nav__right-wrap">
            <div class="primary-nav__nav">
              <nav>
                <ul v-if="!mobile" class="primary-nav__level-one">
                  <li>
                    <router-link class="primary-nav__nav-link" to="/">Home</router-link>
                  </li>
                  <li>
                    <router-link class="primary-nav__nav-link" to="/">Blogs</router-link>
                  </li>
                  <li>
                    <router-link class="primary-nav__nav-link" :to="{ name: 'CreatePost' }">Create Posts</router-link>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- LOGIN -->
            <div class="primary-nav__login text-white">
              <!-- REGISTER -->
              <div class="primary-nav__nav-link">
                <router-link :to="{ name: 'Register' }">
                  <n-icon color="#ffffff">
                    <UsergroupAddOutlined />
                  </n-icon>
                </router-link>
              </div>

              <!-- SIGN IN -->
              <div v-if="!isVisible" class="primary-nav__nav-link">
                <router-link :to="{ name: 'SignIn' }">
                  <n-icon color="#ffffff">
                    <LoginOutlined />
                  </n-icon>
                </router-link>
              </div>

              <!-- PROFILE -->
              <div v-if="isVisible" class="primary-nav__nav-link">
                <SiteNavigationProfile />
              </div>
            </div>
          </div>

          <!-- MOBILE  -->
          <div class="primary-nav__off-canvas-menu">
            <n-icon v-if="mobile" color="#ffffff" @click="toggleMobileNav">
              <Bars />
            </n-icon>
            <n-drawer v-model:show="mobileNav" :width="200" placement="left">
              <n-drawer-content>
                <ul>
                  <li>Home</li>
                  <li>Blogs</li>
                </ul>
              </n-drawer-content>
            </n-drawer>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply shadow-sm shadow-fgl-primary bg-fgl-primary py-3;
}
.primary-nav {
  flex: 1 1 100%;
  @apply flex justify-start md:justify-between pt-0 pb-0 flex-row items-center;

  &__right-wrap {
    @apply flex grow justify-around items-center;
  }

  &__level-one {
    @apply flex flex-row grow text-white my-auto;
  }

  &__nav-link {
    @apply px-2 py-3;
  }

  &__login {
    @apply flex;
  }
}
</style>
