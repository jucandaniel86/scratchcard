import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { isCustomElement, compilerOptions, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        transformAssetUrls,
        compilerOptions: {
          ...compilerOptions,
          isCustomElement: (tag) => {
            return (
              ['v-spine', 'v-particles'].indexOf(tag) !== -1 ||
              isCustomElement(tag)
            )
          }
        }
      }
    })
  ]
})
