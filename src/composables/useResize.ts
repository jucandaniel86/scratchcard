import { useScreenOrientation, useWindowSize } from '@vueuse/core'
import { ConfigResolutions, ScreenOrientationEnum } from '../config/App'
import { onMounted, onUnmounted, ref } from 'vue'
import { __PIXI_APP } from '../main'

export const useResize = () => {
  const { orientation } = useScreenOrientation()
  const resolutions: any = ConfigResolutions
  const clientOrientation = ref<ScreenOrientationEnum>(
    ['landscape-primary', 'landscape-secondary'].indexOf(
      orientation.value as any
    ) !== -1
      ? ScreenOrientationEnum.LANDSCAPE
      : ScreenOrientationEnum.PORTRAIT
  )

  const { width, height } = resolutions[clientOrientation.value]

  const resize = () => {
    const wSize = useWindowSize()
    const ratio = width / height
    let w,
      h = 0

    if (wSize.width.value / wSize.height.value >= ratio) {
      w = wSize.height.value * ratio
      h = wSize.height.value
    } else {
      w = wSize.width.value
      h = wSize.width.value / ratio
    }
    __PIXI_APP.view.width = width * window.devicePixelRatio
    __PIXI_APP.view.height = h * window.devicePixelRatio

    __PIXI_APP.renderer.view.style.width = '100%'
    __PIXI_APP.renderer.view.style.height = '100%'

    return { w, h }
  }

  return {
    width,
    height,
    clientOrientation,
    resize
  }
}
