import { ref } from 'vue'
import { useDataEntry } from '../../../composables/useDataEntry'
import { useSpine } from '../../../composables/useSpine'
import { useUtils } from '../../../composables/useUtils'

interface FrameAnimationI {
  spineData: any
}

export const useFrameAnimation = ({ spineData }: FrameAnimationI) => {
  const animationData = useDataEntry(spineData)

  const frameAnimation = useSpine(animationData)
  const animation = ref<any>(frameAnimation)
  const visible = ref<boolean>(true)
  const { wait } = useUtils()

  const reset = () => {
    visible.value = false
    animation.value.stopAnimation()
  }

  const play = () => {
    visible.value = true
    animation.value.triggerAnimation('scratch', true)

    wait(739).then(() => {
      visible.value = false
      animation.value.stopAnimation()
    })
  }

  return {
    animation,
    reset,
    play
  }
}
