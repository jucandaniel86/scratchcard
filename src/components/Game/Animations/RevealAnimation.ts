import { ref } from 'vue'
import { useDataEntry } from '../../../composables/useDataEntry'
import { useSpine } from '../../../composables/useSpine'

import { Text } from 'pixi.js'
import {
  attachToAnimation,
  getAnimationSlotSizes
} from '../../../core/core.Utils'

interface RevealAnimationI {
  spineData: any
}

export const useRevealAnimation = ({ spineData }: RevealAnimationI) => {
  const animationData = useDataEntry(spineData)

  const animation = useSpine(animationData)
  const textStyles = useDataEntry('main_text_styles')
  const prizeTextField = ref<Text>(new Text('', { ...textStyles.Prize_bitmap }))

  const getResetLabel = () => ['symbol1_lose']

  const textSlot = getAnimationSlotSizes(animation, 'number_textarea')

  attachToAnimation(animation, 'number_text').addChild(prizeTextField.value)
  prizeTextField.value.y = -1
  prizeTextField.value.anchor.set(0.5)

  const updateWithRegularStyle = (label: Text, styles: any) => {
    console.log('styles', styles)
    label.style.fontFamily = styles.font.name
  }

  // updateWithRegularStyle(prizeTextField!.value, textStyles.Prize_bitmap)

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

  const play = async (
    symbolID: string | number,
    win: boolean,
    loop: boolean = false
  ): Promise<void> => {
    const animationName = getAnimationName(symbolID, win)

    animation.setVisible(true)
    if (win) {
      return animation.triggerAnimation(animationName, loop)
    }

    return animation.triggerAnimation(animationName)
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

  const playMultiplier = (symbolID: string | number, multiplier: number) => {
    const animationName = getAnimationName(symbolID, true)

    setPrize(multiplier)
    return animation.triggerAnimation(animationName)
  }

  const playWin = (symbolID: string | number, loop: boolean) => {
    animation.triggerAnimation(['house_symbol' + symbolID + '_win'], loop)
  }

  const loop = (symbolID: string | number, win: boolean) => {
    play(symbolID, win, true)
  }

  const setPrize = (_prize: number) => {
    prizeTextField.value.text = `$${String(_prize)}`
  }

  return {
    animation: animation.animation,
    getAnimationName,
    getResetLabel,
    playWinAllExit,
    play,
    playWin,
    stop,
    playMultiplier,
    reset,
    loop,
    setPrize
  }
}
