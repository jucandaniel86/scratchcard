<script setup lang="ts">
import { Texture } from 'pixi.js'
import { ref } from 'vue'

import { __LOADED_RESOURCES } from '../config/Resources'
import { ScreenOrientationEnum } from '../config/App'
import { useAppStore } from '../store/app'
import { useDataEntry } from '../composables/useDataEntry'

const store = useAppStore()

const props = defineProps<{
  blur?: boolean
  bgHorizontal: Texture
  bgVertical: Texture
}>()
let bg = ref<any>(
  store.orientation === ScreenOrientationEnum.LANDSCAPE
    ? props.bgHorizontal
    : props.bgVertical
)
let width = ref<number>(store.width)
let height = ref<number>(store.height)

store.$subscribe(() => {
  bg.value =
    store.orientation === ScreenOrientationEnum.LANDSCAPE
      ? props.bgHorizontal
      : props.bgVertical
  width.value = store.width
  height.value = store.height
})

//winAllAnimation
const layout = useDataEntry('main_screen_layout')
</script>
<template>
  <sprite
    :texture="bg"
    :x="layout.background[store.orientation].x"
    :y="layout.background[store.orientation].y"
  >
  </sprite>
  <container>
    <v-spine
      :resource="__LOADED_RESOURCES.all_time_bg_json"
      :settings="{ animation: 'all_time_bg' }"
      :x="layout.allTimeSmoke[store.orientation].x"
      :y="layout.allTimeSmoke[store.orientation].y"
      :scale="layout.allTimeSmoke[store.orientation].scale || 1"
    />
    <v-spine
      :resource="__LOADED_RESOURCES.all_time_json"
      :settings="{ animation: 'animation' }"
      :x="layout.allTimeCandle[store.orientation].x"
      :y="layout.allTimeCandle[store.orientation].y"
      :scale="layout.allTimeCandle[store.orientation].scale || 1"
    />
  </container>
</template>
