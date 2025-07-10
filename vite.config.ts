import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { isCustomElement, compilerOptions, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  base: '/work/scratchcard',
  plugins: [
    Vue({
      template: {
        transformAssetUrls,
        compilerOptions: {
          ...compilerOptions,
          isCustomElement: (tag) => {
            return (
              [
                'v-spine',
                'v-particles',
                'v-spine-button',
                'particle-container'
              ].indexOf(tag) !== -1 || isCustomElement(tag)
            )
          }
        }
      }
    })
  ]
})
