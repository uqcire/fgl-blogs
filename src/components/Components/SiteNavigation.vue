<script lang="ts" setup>
'SiteNavigation';

import { firebaseApp } from '@/firebase/firebaseinit';
import { useUserStore } from '@/store/useUserStore';
import { LoginOutlined, UsergroupAddOutlined, UserOutlined } from '@vicons/antd';
import { Bars } from '@vicons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NAvatar, NDrawer, NDrawerContent, NDropdown, NIcon, NText } from 'naive-ui';
import { h, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const mobile: boolean | any = ref(null);
const mobileNav: boolean | any = ref(null);
const windowWidth: number | any = ref(null);
const userStore = useUserStore();
const router = useRouter();
const auth = getAuth(firebaseApp);

const isVisible: boolean | any = ref(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
});

function customHeader() {
  return h('div', { style: 'display: flex; align-items: center; padding: 12px 12px; min-width: 240px' }, [
    h(NAvatar, {
      round: true,
      style: 'margin-right: 1rem;',
      src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG',
    }),
    h('div', null, [
      h('div', null, [h(NText, { depth: 2 }, { default: () => `${userStore.profileFirstName} ${userStore.profileLastName}` })]),
      h('div', { style: 'font-size: 0.75rem;' }, [h(NText, { depth: 3 }, { default: () => `@${userStore.profileUserName}` })]),
      h('div', { style: 'font-size: 0.75rem;' }, [h(NText, { depth: 3 }, { default: () => userStore.profileEmail })]),
    ]),
  ]);
}

const options = reactive([
  {
    key: 'header',
    type: 'render',
    render: customHeader,
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: 'Profile',
    key: 'UserProfile',
  },
  {
    label: 'Settings',
    key: 'Settings',
  },
  {
    label: 'Sign out',
    key: 'signOut',
  },
]);

const handleSelect = (key: any) => {
  if (key === 'signOut') {
    userStore.logout().then(() => {
      router.go(1);
      router.push({ name: 'Home' });
    });
  } else {
    router.push({ name: key });
  }
};

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
                    <router-link class="primary-nav__nav-link" to="/">Create Posts</router-link>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- LOGIN -->
            <div class="primary-nav__login text-white">
              <!-- REGISTER -->
              <router-link class="primary-nav__nav-link" :to="{ name: 'Register' }">
                <n-icon color="#ffffff">
                  <UsergroupAddOutlined />
                </n-icon>
              </router-link>

              <!-- SIGN IN -->
              <router-link v-if="!isVisible" class="primary-nav__nav-link" :to="{ name: 'SignIn' }">
                <n-icon color="#ffffff">
                  <LoginOutlined />
                </n-icon>
              </router-link>

              <!-- PROFILE -->
              <n-dropdown v-if="isVisible" trigger="click" :options="options" @select="handleSelect">
                <n-icon class="ml-2" color="#ffffff">
                  <UserOutlined />
                </n-icon>
              </n-dropdown>
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
}
</style>
