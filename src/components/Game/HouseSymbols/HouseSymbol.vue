<script setup lang="ts">
import { Container } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { ScreenOrientationEnum } from '../../../config/App'
import { useAppStore } from '../../../store/app'
import { SymbolType } from '../../../composables/useGenerateSpin'
import { useScratchAnimation } from '../Animations/ScratchAnimation'
import { useRevealAnimation } from '../Animations/RevealAnimation'

type HouseSymbolType = {
  x: number
  y: number
  scale: number
  index: number
  symbol?: SymbolType
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

const reveal = async (symbol: SymbolType): Promise<any> => {
  return (
    await revealAnimation.play(symbol.symbolID), scratchAnimation.playReveal()
  )
}

const enable = () => {}
const disable = () => {}

const onRender = (container: Container) => {
  container.addChild(revealAnimation.animation)
  container.addChild(scratchAnimation.animation)
}

const onReveal = () => {
  if (props.symbol) {
    reveal(props.symbol)
  }
}

const playWinAnimation = (_symbol: SymbolType) => {
  return revealAnimation.playWin(_symbol.symbolID, true)
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
  enable,
  disable,
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
    @click="onReveal"
  ></container>
</template>
