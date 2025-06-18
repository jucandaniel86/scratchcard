<script setup lang="ts">
import { onMounted, ref } from 'vue'

enum ItemStates {
  IDLE = 'idle',
  REVEALING = 'revealing',
  REVEALED = 'revealed',
  OVER = 'over',
  DISABLED = 'disabled'
}

interface SymbolI {
  data: any
  itemState: ItemStates
  isWin: boolean
  scratchAnimation: any
  itemValueAnimation: any
  itemWinAnimation: any
  text: string | null
  revealStartedHandler?: () => {}
  revealFinishedHandler?: () => {}
  winFinishedHandler?: () => {}
  animationLabels: any
  animationsNames: any
}

const TF_ID = 'RevelGameItemText'

const modelData = ref<SymbolI>({
  data: {},
  itemState: ItemStates.IDLE,
  isWin: false,
  scratchAnimation: null,
  itemValueAnimation: null,
  itemWinAnimation: null,
  text: null,
  animationLabels: {
    disable: 'disable',
    reveal: 'reveal',
    winAnimationFrom: 'winAnimationFrom',
    winAnimationTo: 'winAnimationTo',
    valueLabelFrom: 'valueLabelFrom',
    valueLabelTo: 'valueLabelTo'
  },
  animationsNames: {
    scratchAnimation: 'scratch',
    winAnimation: 'win',
    prizeAmount_mc: 'prizeAmount_mc'
  }
})

//methods
const isIdle = () => modelData.value.itemState === ItemStates.IDLE
const isRevealed = () => modelData.value.itemState === ItemStates.REVEALING
const isDisabled = () => modelData.value.itemState === ItemStates.DISABLED
const setIsWin = (_isWin: boolean) => (modelData.value.isWin = _isWin)
const resetScratchAnimation = () => {}
const resetWinAnimation = () => {}
const resetItemValueAnimation = () => {}

const reset = () => {
  modelData.value.itemState = isDisabled()
    ? ItemStates.DISABLED
    : ItemStates.IDLE
  modelData.value.data = {}
  setIsWin(false)
  resetScratchAnimation()
  resetWinAnimation()
  resetItemValueAnimation()
}

const playWinAnimation = () => {
  if (isRevealed()) {
  }
}

onMounted(() => {
  reset()
})
</script>
<template></template>
