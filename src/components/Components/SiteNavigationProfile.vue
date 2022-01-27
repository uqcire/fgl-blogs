<script setup lang="ts">
'SiteNavigationProfile';

import { useUserStore } from '@/store/useUserStore';
import { NAvatar, NDropdown, NText } from 'naive-ui';

const userStore = useUserStore();
const router = useRouter();

function customHeader() {
  return h('div', { style: 'display: flex; align-items: center; padding: 12px 12px; min-width: 240px' }, [
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
      router.push({ name: 'Home' });
    });
  } else if (key === 'UserProfile') {
    router.push({ name: key, params: { id: `@${userStore.profileUserName}` } });
  } else {
    router.push({ name: key });
  }
};
</script>

<template>
  <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <n-avatar round size="small" src="https://p9-passport.byteacctimg.com/img/user-avatar/b5fbc8b4ddd3b7bc1c46914ad1045f94~300x300.image" />
  </n-dropdown>
</template>
