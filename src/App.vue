<script lang="ts" setup>
'App';

import { firebaseApp } from '@/firebase/firebaseinit';
import { useUserStore } from '@/store/useUserStore';
import SiteFooter from '@c/Components/SiteFooter.vue';
import SiteNavigation from '@c/Components/SiteNavigation.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GlobalThemeOverrides, NConfigProvider, NMessageProvider } from 'naive-ui';
import theme from './utils/naive-ui-theme-overrides.json';

const themeOverrides: GlobalThemeOverrides = theme;
const navigation: boolean | any = ref(false);
const userStore = useUserStore();
const route = useRoute();
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, () => {
  userStore.getCurrentUser();
});

const checkRoutes = () => {
  if (
    route.name === 'SignIn' ||
    route.name === 'Register' ||
    route.name === 'ForgotPassword' ||
    route.name === 'RecoveryEmailed' ||
    route.name === 'CreatePost'
  ) {
    navigation.value = true;
  } else {
    navigation.value = false;
  }
};
watchEffect(() => checkRoutes());
</script>

<template>
  <n-message-provider>
    <n-config-provider :theme-overrides="themeOverrides">
      <SiteNavigation v-if="!navigation" />
      <main>
        <router-view></router-view>
      </main>
      <SiteFooter v-if="!navigation" />
    </n-config-provider>
  </n-message-provider>
</template>
