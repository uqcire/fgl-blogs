<script lang="ts" setup>
'ForgotPassword';

import { NButton } from 'naive-ui';
</script>

<template>
  <div class="recovery-emailed">
    <h6 class="text-fgl-text-color-2">Email sent!</h6>
    <p class="text-fgl-text-color-2">Email has been sent with instructions on resetting your password.</p>
    <div class="auth-content__button">
      <router-link :to="{ name: 'SignIn' }">
        <n-button type="error">Back to sign in</n-button>
      </router-link>
    </div>
  </div>
</template>
