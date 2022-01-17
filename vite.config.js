import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components/'),
      '@p': path.resolve(__dirname, './src/pages/'),
    },
  },
});
