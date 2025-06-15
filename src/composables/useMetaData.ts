import { GAME_NAME } from '../config/App'

export const useMetaData = () => {
  const setGameTitle = () => {
    document.title = GAME_NAME
    document.querySelector('#info-toolbar__game-name')!.innerHTML = GAME_NAME
  }

  const init = () => {
    setGameTitle()
  }

  return {
    init,
    setGameTitle
  }
}
