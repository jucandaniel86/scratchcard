export enum ScreenOrientationEnum {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

export const ConfigResolutions = {
  portrait: {
    height: 1280,
    width: 720
  },
  landscape: {
    height: 720,
    width: 1280
  }
}

export const GAME_NAME = "Sorcerer's Luck"

export const NUM_OF_AUTOPLAY_GAMES = [10, 25, 50, 100]
export const AUTOPLAY_ROW_ITEMS = { portrait: 3, landscape: 4 }
