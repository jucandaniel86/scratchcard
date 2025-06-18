import { Container } from 'pixi.js'
import { __LOADED_RESOURCES } from '../../../config/Resources'
import { useFrameAnimation } from './FrameAnimation'
import { useRevealAnimation } from './RevealAnimation'
import { useScratchAnimation } from './ScratchAnimation'

interface SymbolAnimationI {
  symbolID: string | number
  prizeAmount: number
  isMultiplier: boolean
  isWinAll: boolean
}

export const useSymbolAnimations = (payload: SymbolAnimationI) => {
  //animations
  const scratchAnimation: any = useScratchAnimation({
    spineData: 'your_reveal_json'
  })
  const revealAnimation: any = useRevealAnimation({
    spineData: 'symbols_json'
  })
  const frameAnimation: any = useFrameAnimation({
    spineData: 'general_win_json'
  })

  const container = new Container()
  // container.addChild(scratchAnimation.animation.animation)
  // container.addChild(revealAnimation.animation.animation)
  // container.addChild(frameAnimation.animation.animation)

  //methods
  const playFrameAnimation = () => {
    frameAnimation.play()
  }
  const playCTA = () => {
    scratchAnimation.playCTA()
  }

  const stopCTA = () => {
    scratchAnimation.reset()
  }

  const reveal = async () => {
    const { symbolID, prizeAmount, isMultiplier, isWinAll } = payload
    //todo

    await revealAnimation.play(10, isWinAll)
    await scratchAnimation.playReveal()
  }

  return {
    container,
    scratchAnimation,
    revealAnimation,
    frameAnimation,
    playFrameAnimation,
    playCTA,
    stopCTA,
    reveal
  }
}
