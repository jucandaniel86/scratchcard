<script setup lang="ts">
import { Container } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { ScreenOrientationEnum } from '../../../config/App'
import { useAppStore } from '../../../store/app'
import { useScratchAnimation } from '../Symbol/ScratchAnimation'
import { useRevealAnimation } from '../Symbol/RevealAnimation'

type HouseSymbolType = {
  x: number
  y: number
  scale: number
  index: number
}

const props = defineProps<HouseSymbolType>()

const store = useAppStore()
const orientation = ref<ScreenOrientationEnum>(store.orientation)

//animations
const scratchAnimation: any = useScratchAnimation({
  spineData: 'house_reveal_json',
  revealAnimation: 'house_reveal'
})
const revealAnimation: any = useRevealAnimation({
  spineData: 'symbols_json'
})

//methods
const playCTA = () => {
  scratchAnimation.playCTA()
}

const stopCTA = () => {
  scratchAnimation.stopCTA()
}

const reset = () => {
  scratchAnimation.reset()
  revealAnimation.reset()
}

const reveal = async (symbolID: number | string) => {
  //disable()
  revealAnimation.play(symbolID)
  scratchAnimation.playReveal(symbolID)
}

const playWinAnimation = (symbolID: number | string) => {
  return revealAnimation.playWin(symbolID, true)
}

const onRender = (container: Container) => {
  container.addChild(revealAnimation.animation)
  container.addChild(scratchAnimation.animation)
}

store.$subscribe(() => {
  orientation.value = store.orientation
})

onMounted(() => {
  reset()
})

defineExpose({
  reset,
  reveal,
  playCTA,
  stopCTA,
  playWinAnimation
})
</script>
<template>
  <container
    :x="props.x"
    :y="props.y"
    :scale="props.scale || 1"
    @render="onRender"
    @click="reveal(2)"
  ></container>
</template>
