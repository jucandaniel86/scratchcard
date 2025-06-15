import { Rectangle } from 'pixi.js'
import { ConfigResolutions } from '../config/App'

export enum ALIGMENT_MODES {
  NONE = 'NONE',
  MIDDLE = 'MIDDLE',
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP'
}

export type UIPopupType = {
  alignmentMode?: ALIGMENT_MODES
  hasButton?: boolean
}

export const usePopup = () => {
  const getHorizontalWorldBounds = (): Rectangle =>
    new Rectangle(
      0,
      0,
      ConfigResolutions.landscape.width,
      ConfigResolutions.landscape.height
    )
  const getVerticalWorldBounds = (): Rectangle =>
    new Rectangle(
      0,
      0,
      ConfigResolutions.portrait.width,
      ConfigResolutions.portrait.height
    )

  const defineDefaultWorldBounds = (): Rectangle => getHorizontalWorldBounds()

  const playHideAnimation = (): Promise<void> => Promise.resolve()

  const playShowAnimation = (): Promise<void> => Promise.resolve()

  return {
    playHideAnimation,
    playShowAnimation,
    getHorizontalWorldBounds,
    getVerticalWorldBounds,
    defineDefaultWorldBounds
  }
}
