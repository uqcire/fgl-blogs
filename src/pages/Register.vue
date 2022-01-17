<script lang="ts" setup>
'Register';

import { getFirebaseErrorMessage } from '@/firebase/errorMessagesUtils';
import { useUserStore } from '@/store/useUserStore';
import { validateEmailFormat, validatePasswordFormat } from '@/utils/validationUtils';
import { NButton, NCard, NDivider, NForm, NFormItem, NInput } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMsg = ref('');
const formRef = ref();
const userStore = useUserStore();

// SIGNUP FORM
const form = reactive({
  user: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  },
});

// FROM VALIDATION RULES
const rules = reactive({
  user: {
    firstName: {
      required: true,
      message: 'Please enter your first name',
      trigger: 'input',
    },
    lastName: {
      required: true,
      message: 'Please enter your last name',
      trigger: 'input',
    },
    userName: {
      required: true,
      message: 'Please enter your username',
      trigger: 'input',
    },
    email: {
      required: true,
      validator: validateEmailFormat,
      // message: 'Please enter your email address',
      trigger: 'blur',
    },
    password: {
      required: true,
      validator: validatePasswordFormat,
      // message: 'Please enter your password',
      trigger: ['input'],
    },
  },
});

// SIGN UP ACTION
const register = (e: any) => {
  e.preventDefault();
  formRef.value.validate(async () => {
    await userStore.signup(form.user.email, form.user.password).then(() => {
      userStore
        .createUserData(
          form.user.firstName,
          form.user.lastName,
          form.user.userName,
          form.user.email,
          // eslint-disable-next-line comma-dangle
          form.user.password
        )
        .catch((err) => {
          errorMsg.value = getFirebaseErrorMessage(err.code);
        });
      router.push({ name: 'Home' });
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
          <div class="sign-in">
            <h6 class="text-fgl-text-color-2">Create your account</h6>

            <!-- FORM -->
            <n-form ref="formRef" :model="form" :rules="rules" :label-width="80">
              <n-form-item label="First Name" path="user.firstName">
                <n-input v-model:value="form.user.firstName" placeholder="Please enter your first name" />
              </n-form-item>
              <n-form-item label="Last Name" path="user.lastName">
                <n-input v-model:value="form.user.lastName" placeholder="Please enter your last name" />
              </n-form-item>
              <n-form-item label="Username" path="user.userName">
                <n-input v-model:value="form.user.userName" placeholder="Please enter your username" />
              </n-form-item>
              <n-form-item label="Email address" path="user.email">
                <n-input v-model:value="form.user.email" placeholder="Please enter your email address" />
              </n-form-item>
              <n-form-item label="Password" path="user.password">
                <n-input v-model:value="form.user.password" type="password" placeholder="Please enter your password" />
              </n-form-item>
              <div class="auth-content__button">
                <n-button type="error" @click="register">Sign up</n-button>
              </div>
            </n-form>

            <!-- ERROR MESSAGE -->
            <div class="auth-error-message">
              <span class="text-sm text-fgl-error">{{ errorMsg }}</span>
            </div>

            <!-- FOOTER -->
            <div class="auth-footer">
              <span class="text-sm text-fgl-text-color-2"> Already have an account? </span>
              <router-link class="fgl-text-link text-sm text-fgl-text-color-2" :to="{ name: 'SignIn' }">login</router-link>
              <br />
              <router-link class="text-sm text-fgl-text-color-2" :to="{ name: 'Home' }">Back to FGL.com</router-link>
            </div>
          </div>
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
