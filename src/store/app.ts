import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ConfigResolutions, ScreenOrientationEnum } from '../config/App'

export const useAppStore = defineStore('app', () => {
  let width = ref<number>(0)
  let height = ref<number>(0)
  let orientation = ref<ScreenOrientationEnum>(ScreenOrientationEnum.LANDSCAPE)

  let currentResolution = computed(() => ConfigResolutions[orientation.value])

  const setWidth = (_width: number) => (width.value = _width)
  const setHeight = (_height: number) => (height.value = _height)
  const setOrientation = (_orientation: ScreenOrientationEnum) =>
    (orientation.value = _orientation)

  return {
    width,
    height,
    orientation,
    currentResolution,
    setWidth,
    setHeight,
    setOrientation
  }
})
