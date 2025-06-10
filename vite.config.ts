import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue';
import { compilerOptions, transformAssetUrls } from 'vue3-pixi';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ template: { compilerOptions, transformAssetUrls } })],
	  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
