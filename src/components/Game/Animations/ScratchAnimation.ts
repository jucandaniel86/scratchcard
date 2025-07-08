import { useDataEntry } from '../../../composables/useDataEntry'
import { useSpine } from '../../../composables/useSpine'

interface ScratchAnimationI {
  spineData: any
  revealAnimation: string
}

export const useScratchAnimation = ({
  spineData,
  revealAnimation
}: ScratchAnimationI) => {
  const animationData = useDataEntry(spineData)

  const animation = useSpine(animationData)
  // const createAN

  const reset = () => {
    animation.triggerAnimation('idle')
  }

  const playCTA = () => {
    animation.triggerAnimation('callToAction', true)
  }

  const playReveal = async (): Promise<void> => {
    return animation.triggerAnimation(revealAnimation)
  }

  return {
    animation: animation.animation,
    reset,
    playCTA,
    playReveal
  }
}
