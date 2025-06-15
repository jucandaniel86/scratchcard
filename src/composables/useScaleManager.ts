import { ref } from 'vue'
import { ConfigResolutions } from '../config/App'

type ScaleManagerGameSizeType = {
  width: number
  height: number
}

type ScaleManagerGameAreaType = ScaleManagerGameSizeType & {
  x: number
  y: number
}

const isDualOrientation = true

export const useScaleManager = () => {
  const lastResizeData = ref<any>()

  const toPixels = (val: number): string => `${val}px`

  const clamp = (e: any, t: any, n: any) => (e < t ? t : e > n ? n : e)

  const calculateMargins = (
    e: any,
    t: any,
    n: any
  ): { left: number; top: number } => {
    const i = t.width,
      r = e.width,
      o = t.height,
      a = e.height
    return {
      left: Math.floor(Math.max(0, (i - r * n) / 2)),
      top: Math.floor(Math.max(0, (o - a * n) / 2))
    }
  }

  const calculateScale = (
    canvasSize: any,
    contentRect: DOMRectReadOnly
  ): number =>
    Math.min(
      contentRect.width / canvasSize.width,
      contentRect.height / canvasSize.height
    )

  const calculateCanvasSize = (
    contentRect: DOMRectReadOnly,
    gameSize: ScaleManagerGameSizeType
  ) => ({ width: gameSize.width, height: gameSize.height })

  const calculateGameAreaRect = (
    canvasSize: ScaleManagerGameSizeType,
    gameSize: ScaleManagerGameSizeType
  ): ScaleManagerGameAreaType => {
    return {
      x: (canvasSize.width - gameSize.width) / 2,
      y: (canvasSize.height - gameSize.height) / 2,
      width: gameSize.width,
      height: gameSize.height
    }
  }

  const getGameSize = (
    contentRect: DOMRectReadOnly
  ): ScaleManagerGameSizeType => {
    const config = ConfigResolutions

    const gameWidth = config.landscape.width,
      gameHeight = config.landscape.height

    return isDualOrientation
      ? 'landscape' === getCurrentOrientation(contentRect)
        ? { width: gameWidth, height: gameHeight }
        : { width: gameHeight, height: gameWidth }
      : { width: gameWidth, height: gameHeight }
  }

  const getCurrentOrientation = (e: any): 'landscape' | 'portrait' =>
    e.width >= e.height ? 'landscape' : 'portrait'

  const prepareResizeData = (
    e: any,
    gameSize: ScaleManagerGameSizeType,
    canvasSize: ScaleManagerGameSizeType
  ) => {
    const gameAreaRect = calculateGameAreaRect(canvasSize, gameSize)
    return {
      gameWidth: gameSize.width,
      gameHeight: gameSize.height,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
      gameAreaRect,
      orientation: 'landscape',
      orientationChanged: null === e
    }
  }

  const _onResize = (htmlEl: HTMLDivElement, contentRect: DOMRectReadOnly) => {
    const gameSize = getGameSize(contentRect)

    let canvasSize = calculateCanvasSize(contentRect, gameSize)
    const scale = calculateScale(canvasSize, contentRect)
    const margins = calculateMargins(canvasSize, contentRect, scale)

    return (
      (htmlEl.style.width = toPixels(canvasSize.width)),
      (htmlEl.style.height = toPixels(canvasSize.height)),
      (htmlEl.style.marginLeft = toPixels(margins.left)),
      (htmlEl.style.marginTop = toPixels(margins.top)),
      (htmlEl.style.transform = `scale(${scale} , ${scale})`),
      prepareResizeData(lastResizeData.value, gameSize, canvasSize)
    )
  }

  const observe = (htmlEl: HTMLDivElement, parentHTMLEl: HTMLDivElement) => {
    new ResizeObserver((t) => {
      for (const i of t) lastResizeData.value = _onResize(htmlEl, i.contentRect)
    }).observe(parentHTMLEl)
  }

  return {
    observe
  }
}
