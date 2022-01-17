<script lang="ts" setup>
'Login';

import { getFirebaseErrorMessage } from '@/firebase/errorMessagesUtils';
import { useUserStore } from '@/store/useUserStore';
import { validateEmailFormat } from '@/utils/validationUtils';
import { NButton, NCard, NDivider, NForm, NFormItem, NInput } from 'naive-ui';
import { reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const errorMsg = ref('');

// ROUTER CHECK
const signInRouteCheck: boolean | any = ref(null);
const route = useRoute();
const routeCheck = () => {
  if (route.name === 'ForgotPassword' || route.name === 'RecoveryEmailed') {
    signInRouteCheck.value = true;
  } else {
    signInRouteCheck.value = false;
  }
};
watchEffect(() => routeCheck());

// SIGN IN FORM
const form = reactive({
  user: {
    email: '',
    password: '',
  },
});
const signInFormRef = ref();
const rules = reactive({
  user: {
    email: {
      validator: validateEmailFormat,
      required: true,
      trigger: 'blur',
    },
    password: {
      required: true,
      message: 'Please enter your password',
      trigger: ['input'],
    },
  },
});

// SIGN IN ACTION

const signIn = (e: any) => {
  e.preventDefault();
  signInFormRef.value.validate(async () => {
    await userStore
      .login(form.user.email, form.user.password)
      .then(() => {
        router.push({ name: 'Home' });
      })
      .catch((err) => {
        errorMsg.value = getFirebaseErrorMessage(err.code);
      });
  });
};
</script>

<template>
  <div class="login-bg-image"></div>

  <div class="login-container">
    <n-card class="mx-auto" style="max-width: 360px">
      <div class="auth-header">
        <div class="flex flex-row justify-center">
          <img class="h-4 mr-2" src="../assets/logo--3-light.svg" alt="logo" />
          <span class="text-2xl font-krona text-fgl-primary">
            FGL
            <span class="text-fgl-valencia">.</span>
          </span>
        </div>
      </div>
      <n-divider />
      <div class="auth-content">
        <div class="auth-content-inner">
          <div v-if="!signInRouteCheck" class="sign-in">
            <h6 class="text-fgl-text-color-2">Sign in</h6>

            <!-- FORM -->
            <n-form ref="signInFormRef" :model="form" :rules="rules" :label-width="80">
              <n-form-item label="Email address" path="user.email">
                <n-input v-model:value="form.user.email" placeholder="Please enter your email address" />
              </n-form-item>
              <n-form-item label="Password" path="user.password">
                <n-input v-model:value="form.user.password" type="password" placeholder="Please enter your password" />
              </n-form-item>
              <div class="auth-content__button">
                <n-button type="error" @click="signIn">Sign in</n-button>
              </div>
            </n-form>

            <!-- ERROR MESSAGE -->
            <div class="auth-error-message">
              <span class="text-sm text-fgl-error">{{ errorMsg }}</span>
            </div>

            <!-- FOOTER -->
            <div class="auth-footer">
              <router-link class="text-sm text-fgl-text-color-2" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>
              <br />
              <router-link class="text-sm text-fgl-text-color-2" :to="{ name: 'Home' }">Back to FGL.com</router-link>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style lang="scss">
.login-bg-image {
  z-index: -1;
  @apply top-0 left-0 right-0 bottom-0 fixed bg-cover bg-no-repeat bg-blue-50;
}

.login-container {
  @apply flex w-screen h-screen items-center justify-center;
}
.auth-header {
  @apply mt-2;
}

.auth-error-message {
  @apply my-1;
}

.auth-footer {
  @apply mt-1;
}
</style>
