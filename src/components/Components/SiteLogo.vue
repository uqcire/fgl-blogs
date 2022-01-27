<script lang="ts" setup name="SiteLogo">
import { defineProps } from 'vue';

const props = defineProps({
  textColor: {
    type: String,
    required: true,
    defalut: '',
  },
});

const textColor = ref(props.textColor);

const getImage = (name: string): string => new URL(`../../assets/logo--3-${name}.svg`, import.meta.url).href;
const logoColor = computed(() => {
  if (textColor.value === 'text-white') {
    return getImage('dark');
  }
  return getImage('light');
});
</script>

<template>
  <router-link :to="{ name: 'Home' }">
    <div class="flex flex-row flex-nowrap">
      <img class="h-4 mr-2" :src="logoColor" alt="logo" />
      <span class="text-2xl font-krona" :class="textColor">
        FGL
        <span class="text-fgl-valencia">.</span>
      </span>
    </div>
  </router-link>
</template>
