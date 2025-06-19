import { AUTOPLAY_ROW_ITEMS, ScreenOrientationEnum } from '../../config/App'
import { useAppStore } from '../../store/app'

export const useUpdateButtons = (buttons: any) => {
  const store = useAppStore()

  const isLandscape = () =>
    store.orientation === ScreenOrientationEnum.LANDSCAPE
  const getButtonsInARow = () => AUTOPLAY_ROW_ITEMS[store.orientation]
  const getMenuButtonX = (x: number) => (isLandscape() ? 155 : 90) + 200 * x
  const getMenuButtonY = (y: number) => 305 + 100 * y

  const updateButtons = () => {
    let x = 0,
      y = 0

    for (let i = 0; i < getButtonsInARow(); i++) {
      const button = buttons.value[i]
      button.setX(getMenuButtonX(x))
      button.setY(getMenuButtonY(y))

      if ((x += 1) % getButtonsInARow() === 0) {
        x = 0
        y += 1
      }
    }

    if (!isLandscape() || (buttons.value.length - 1) % 3 != 0) {
      buttons.value[buttons.value.length - 1].setX(getMenuButtonX(1))
    }
  }

  return {
    updateButtons
  }
}
