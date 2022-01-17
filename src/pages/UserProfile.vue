<script lang="ts" setup>
'UserProfile';

import { useUserStore } from '@/store/useUserStore';

const userStore = useUserStore();
</script>

<template>
  <h1>User Profile</h1>
  <p>{{ userStore.profileId }}</p>
  <p>{{ userStore.profileUID }}</p>
  <p>{{ userStore.profileFirstName }}</p>
  <p>{{ userStore.profileLastName }}</p>
  <p>{{ userStore.profileUserName }}</p>
  <p>{{ userStore.profileEmail }}</p>
</template>
