<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Symbol from './Game/Symbol.vue'
import { useDataEntry } from '../composables/useDataEntry'
import { ScreenOrientationEnum } from '../config/App'
import { useAppStore } from '../store/app'
import { useYourSymbolsActions } from './Game/YourSymbols/Actions'
import { useGameStore } from '../store/game'
import HouseSymbol from './Game/HouseSymbols/HouseSymbol.vue'

const store = useAppStore()
const gameStore = useGameStore()

const symbols = ref<any>('symbols')
const { yourSymbols, houseSymbols } = useDataEntry(
  'main_screen_layout',
  'gameArea'
)
const orientation = ref<ScreenOrientationEnum>(store.orientation)
const actions = useYourSymbolsActions(symbols)
const spin = ref<any>()

store.$subscribe(() => {
  orientation.value = store.orientation
})

gameStore.$subscribe(() => {
  spin.value = gameStore.spin
  // if (gameStore.spin && gameStore.spin.yourSymbols) {
  //   console.log('simbols', gameStore.spin)
  //   actions.playWinAnimation([{ index: 0 }, { index: 3 }])
  // }
})
console.log(houseSymbols[orientation.value])
</script>
<template>
  <Symbol
    v-for="n in 10"
    :symbolID="'Symbol'"
    :index="n"
    ref="symbols"
    :x="yourSymbols[orientation][n - 1].x"
    :y="yourSymbols[orientation][n - 1].y"
    :scale="yourSymbols[orientation][n - 1].scale || 1"
  />
  <HouseSymbol
    v-for="n in 2"
    :index="n"
    :key="`HouseSymbol${n}`"
    :x="houseSymbols[orientation][n - 1].x"
    :y="houseSymbols[orientation][n - 1].y"
    :scale="houseSymbols[orientation][n - 1].scale || 1"
    :symbol="spin?.houseSymbols[n - 1]"
  />
</template>
