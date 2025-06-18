import { ref } from 'vue'
import { useDataEntry } from '../../../composables/useDataEntry'
import { useSpine } from '../../../composables/useSpine'

interface RevealAnimationI {
  spineData: any
  _key?: string | number
}

export const useRevealAnimation = ({ spineData, _key }: RevealAnimationI) => {
  const animationData = useDataEntry(spineData)

  const animation = useSpine(animationData)
  const textStyles = useDataEntry('main_text_styles')

  const getResetLabel = () => ['symbol1_lose']

  const getAnimationName = (
    symbolID: string | number,
    win: boolean,
    idle: boolean = false
  ): string => {
    const winLabel = win ? 'win' : 'lose'
    const idleLabel = idle ? '_idle' : ''

    return ''
      .concat('symbol')
      .concat(String(symbolID), '_')
      .concat(winLabel)
      .concat(idleLabel)
  }

  const play = (
    symbolID: string | number,
    win: boolean,
    loop: boolean = false
  ) => {
    const animationName = getAnimationName(symbolID, win, loop)

    animation.setVisible(true)
    if (win) {
      //todo
    }

    animation.triggerAnimation(animationName, loop)
    return Promise.resolve()
  }

  const stop = () => {
    animation.stopAnimation()
  }

  const reset = () => {
    //todo
    animation.triggerAnimation(getResetLabel() as any)
    animation.setVisible(false)
  }

  const playWinAllExit = () => {
    animation.triggerAnimation('symbol_20_win2')
  }

  const playMultiplier = (symbolID: string | number, win: boolean) => {
    const animationName = getAnimationName(symbolID, win)

    //todo

    animation.triggerAnimation(animationName)
  }

  const loop = (symbolID: string | number, win: boolean) => {
    play(symbolID, win, true)
  }

  return {
    animation: animation.animation,
    getAnimationName,
    getResetLabel,
    playWinAllExit,
    play,
    stop,
    playMultiplier,
    reset,
    loop
  }
}
