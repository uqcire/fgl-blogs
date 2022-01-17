<script lang="ts" setup>
'ForgotPassword';

import { getFirebaseErrorMessage } from '@/firebase/errorMessagesUtils';
import { firebaseApp } from '@/firebase/firebaseinit';
import { validateEmailFormat } from '@/utils/validationUtils';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const auth = getAuth(firebaseApp);

const form = reactive({ user: { email: '' } });

const errorMsg = ref('');

const rules = reactive({
  user: {
    email: {
      validator: validateEmailFormat,
      required: true,
      trigger: 'input',
    },
  },
});

const resetPassword = () => {
  sendPasswordResetEmail(auth, form.user.email)
    .then(() => {
      router.push({ name: 'RecoveryEmailed' });
    })
    .catch((err) => {
      errorMsg.value = getFirebaseErrorMessage(err.code);
    });
};
</script>

<template>
  <div class="forgot-password">
    <h6 class="text-fgl-text-color-2">Reset Password</h6>
    <p class="text-fgl-text-color-2">Forgot your password? Enter your username or email to reset it.</p>

    <!-- FORM -->
    <n-form :model="form" :rules="rules" :label-width="80">
      <n-form-item label="Email or Username" path="user.email">
        <n-input v-model:value="form.user.email" placeholder="Please enter your email address" />
      </n-form-item>
      <div class="auth-content__button">
        <n-button type="error" @click="resetPassword">Reset via Email</n-button>
      </div>
    </n-form>

    <!-- ERROR MESSAGE -->
    <div class="auth-error-message">
      <span class="text-sm text-fgl-error">{{ errorMsg }}</span>
    </div>

    <!-- ERROR FOOTER -->
    <div class="auth-footer">
      <router-link class="text-sm text-fgl-text-color-2" :to="{ name: 'SignIn' }">Back to sign in</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.auth-footer {
  @apply mt-1;
}

.auth-error-message {
  @apply my-1;
}
</style>
