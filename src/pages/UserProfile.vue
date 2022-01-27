<script lang="ts" setup>
'UserProfile';

import { getFirebaseErrorMessage } from '@/firebase/errorMessagesUtils';
import { useUserStore } from '@/store/useUserStore';
import { NAvatar, NButton, NDivider, NForm, NFormItem, NInput, useMessage } from 'naive-ui';

const userStore = useUserStore();
const form: any = ref(null);
const errorMsg: any = ref(null);
const message = useMessage();

const rules = reactive({
  user: {
    firstName: {
      message: 'Please enter your first name.',
      trigger: 'input',
    },
  },
});

const userInfo = ref({
  uid: userStore.profileUID,
  email: userStore.profileEmail,
  userName: userStore.profileUserName as any,
  firstName: userStore.profileFirstName as any,
  lastName: userStore.profileLastName as any,
  photoURL: '',
});

const updateUser = (e: any) => {
  e.preventDefault();
  form.value.validate(async () => {
    await userStore
      .updateUser(userInfo.value.firstName, userInfo.value.lastName, userInfo.value.userName, userInfo.value.photoURL)
      .then(() => {
        message.success('update successful!');
      })
      .catch((err) => {
        errorMsg.value = getFirebaseErrorMessage(err.code);
      });
  });
};
</script>

<template>
  <div class="fgl-layout bg-neutral-100">
    <div class="fgl-layout--center">
      <div class="profile">
        <div class="profile__setting-view">
          <div class="profile__sidebar">
            <h5 class="mb-4">Settings</h5>
            <ul class="profile__sidebar-list">
              <li class="profile__sidebar-list-item">
                <router-link class="text-lg opacity-60" to="#about-you">About you </router-link>
              </li>
              <li class="profile__sidebar-list-item">
                <router-link class="text-lg opacity-60" to="#account">Account </router-link>
              </li>
            </ul>
          </div>
          <div class="profile__view-box">
            <div class="view-box__container">
              <!-- LEFT SECTION -->
              <div id="about-you" class="col-span-7">
                <div class="view-box__title">
                  <h4>About you</h4>
                  <n-divider></n-divider>
                </div>
                <n-form ref="form" :rules="rules" :modle="userInfo">
                  <div class="view-box__list-item">
                    <div class="grid grid-cols-3 items-center">
                      <!-- UID -->
                      <div class="col-span-1">UID</div>
                      <n-form-item class="col-span-2">
                        <n-input v-model:value="userInfo.uid" disabled :placeholder="userStore.profileUID" />
                      </n-form-item>

                      <!-- EMAIL -->
                      <div class="col-span-1">Email</div>
                      <n-form-item class="col-span-2">
                        <n-input v-model:value="userInfo.email" disabled :placeholder:any="userStore.profileEmail" />
                      </n-form-item>

                      <!-- USER NAME -->
                      <div class="col-span-1">User name</div>
                      <n-form-item class="col-span-2">
                        <n-input v-model:value="userInfo.userName" :placeholder:any="userStore.profileUserName" />
                      </n-form-item>

                      <!-- FIRST NAME -->
                      <div class="col-span-1">First name</div>
                      <n-form-item class="col-span-2">
                        <n-input v-model:value="userInfo.firstName" :placeholder:any="userStore.profileFirstName" />
                      </n-form-item>

                      <!-- LAST NAME -->
                      <div class="col-span-1">Last name</div>
                      <n-form-item class="col-span-2">
                        <n-input v-model:value="userInfo.lastName" :placeholder:any="userStore.profileLastName" />
                      </n-form-item>
                    </div>
                  </div>
                </n-form>

                <div class="auth-error-message">
                  <span class="text-sm text-fgl-error">{{ errorMsg }}</span>
                </div>

                <div class="flex justify-end mt-4">
                  <n-button type="primary" @click="updateUser">Save changes</n-button>
                </div>
              </div>

              <!-- RIGHT SECTION -->
              <div class="col-span-5">
                <div class="mt-4 flex flex-col">
                  <n-avatar
                    round
                    :size="128"
                    src="https://p9-passport.byteacctimg.com/img/user-avatar/b5fbc8b4ddd3b7bc1c46914ad1045f94~300x300.image"
                  />

                  <p class="mt-4">Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  @apply w-full max-w-7xl relative mx-auto;

  &__setting-view {
    @apply grid grid-cols-12 gap-4 mt-4 mb-2;
  }

  &__sidebar {
    @apply col-span-3;

    ul {
      @apply ml-0;
    }

    li {
      @apply mb-3;
    }

    // .router-link-exact-active {
    //   @apply bg-fgl-coconut;
    // }
  }

  &__view-box {
    @apply col-span-9;
  }
}

.view-box {
  &__container {
    @apply grid grid-cols-12 gap-8;
  }

  &__list-item {
    @apply border-b;

    h6 {
      @apply mb-0;
    }
  }
}
</style>
