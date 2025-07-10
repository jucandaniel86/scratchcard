export enum ALIGMENT_MODES {
  NONE = 0,
  MIDDLE = 1,
  LEFT_TOP = 2,
  RIGHT_TOP = 3
}

export type PopupConfigType = {
  hasButton: boolean
  darkBackground: boolean
  darkBackgroundColor: number
  darkBackgroundAlpha: number
  hideOnDarkBackground: boolean
  alignmentMode: ALIGMENT_MODES
  stubBgColor: number
  stubWidth: number
  stubHeight: number
}

export const POPUP_DEFAULT_CONFIG = {
  hasButton: false,
  darkBackground: false,
  darkBackgroundColor: 0,
  darkBackgroundAlpha: 0.5,
  hideOnDarkBackground: false,
  alignmentMode: ALIGMENT_MODES.MIDDLE,
  stubBgColor: 7129189,
  stubWidth: 600,
  stubHeight: 400
}
