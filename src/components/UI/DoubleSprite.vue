<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useAppStore } from '../../store/app'
import { ScreenOrientationEnum } from '../../config/App'
import { Texture } from 'pixi.js'

type DoubleSpriteType = {
  portrait: Texture
  landscape: Texture
  layout?: any
  anchor?: number
}
const props = withDefaults(defineProps<DoubleSpriteType>(), {
  anchor: 0
})

const store = useAppStore()
const orientation = ref<ScreenOrientationEnum>(store.orientation)
const background = reactive<any>({
  portrait: props.portrait,
  landscape: props.landscape
})
const x = ref<number>(0)
const y = ref<number>(0)

const setPositions = (orientation: ScreenOrientationEnum) => {
  if (
    typeof props.layout !== 'undefined' &&
    typeof props.layout[orientation] !== 'undefined'
  ) {
    x.value = props.layout[orientation].x
    y.value = props.layout[orientation].y
  }
}

store.$subscribe(() => {
  orientation.value = store.orientation
  setPositions(store.orientation)
})

onMounted(() => {
  setPositions(store.orientation)
})
</script>
<template>
  <sprite :texture="background[orientation]" :x="x" :y="y" :anchor="anchor" />
</template>
