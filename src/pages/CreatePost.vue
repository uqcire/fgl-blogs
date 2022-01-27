<script lang="ts" setup name="CreatePost">
import SiteLogo from '@/components/Components/SiteLogo.vue';
import SiteNavigationProfile from '@/components/Components/SiteNavigationProfile.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { NButton, NCard, NLayout, NLayoutContent, NLayoutHeader, NSpace } from 'naive-ui';

const quillEditor = ref();
const myContent = ref();

const options = reactive({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['image'],
    ],
  },
  theme: 'snow',
  placeholder: 'Tell your story...',
});

const addText = () => {
  console.log('object');
};

const addImg = () => {
  console.log('object');
};
</script>

<template>
  <n-layout>
    <n-layout-header>
      <div class="header-wrapper">
        <SiteLogo text-color="text-fgl-text-color-1" />
        <n-space>
          <n-button type="primary" size="small" @click="addText">Publish</n-button>
          <n-button type="primary" size="small" @click="addImg">Preview</n-button>
          <div class="ml-2">
            <SiteNavigationProfile />
          </div>
        </n-space>
      </div>
    </n-layout-header>
    <n-layout-content>
      <n-card :bordered="false">
        <QuillEditor ref="quillEditor" v-model:content="myContent" :options="options" />
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss">
.header-wrapper {
  padding-left: calc(50% - 34.434rem);
  padding-right: calc(50% - 34.434rem);
  @apply mt-2 flex justify-between;
}
.ql-toolbar.ql-snow {
  @apply border-0 border-b border-b-fgl-border-color mt-2 flex justify-center;
}

.ql-container.ql-snow {
  padding-left: calc(50% - 35.434rem);
  padding-right: calc(50% - 35.434rem);
  border: none;
  height: 85vh;
}

.ql-editor.ql-blank::before {
  padding-left: calc(50% - 35.434rem);
  padding-right: calc(50% - 35.434rem);
}
</style>
