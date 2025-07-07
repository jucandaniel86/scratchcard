<script setup lang="ts">
import { ref } from 'vue'
import YourSymbol from './Game/YourSymbols/YourSymbol.vue'
import { useDataEntry } from '../composables/useDataEntry'
import { ScreenOrientationEnum } from '../config/App'
import { useAppStore } from '../store/app'
import { useYourSymbolsActions } from './Game/YourSymbols/Actions'
import { SymbolType, useGameStore } from '../store/game'
import HouseSymbol from './Game/HouseSymbols/HouseSymbol.vue'
import { useGameArea } from './Game/Composables/useGameArea'

const store = useAppStore()
const gameStore = useGameStore()

const symbols = ref<any>('symbols')
const housesymbols = ref<any>('housesymbols')
const layout = useDataEntry('main_screen_layout', 'gameArea')
const orientation = ref<ScreenOrientationEnum>(store.orientation)
const actions = useYourSymbolsActions(symbols)
const spin = ref<any>()
const {
  setSymbolsData,
  setYourSymbolRevealed,
  setAllRevealed,
  yourSymbols,
  houseSymbols
} = useGameArea()

//methods
const reveal = async (symbolIndex: number): Promise<void> => {
  return symbols.value[symbolIndex].reveal(yourSymbols.value[symbolIndex])
}

//@todo : add to utils
const hasItemsInArray = (array: any[]) => array.length > 0

const handleMatches = async (
  yourMatches: any[],
  houseMatches: any[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (hasItemsInArray(yourMatches)) {
      if (hasItemsInArray(houseMatches)) {
        houseMatches.forEach((_symbol: any) => {
          //_playSymbolWinningSound
        })
      }
      //playWinAnimation
      //playWinAnimation
    }
    return resolve()
  })
}

const handleMultiplier = () => {}

const onSymbolReveal = (symbolIndex: number) => {
  //play sounds
  const { state, data } = setYourSymbolRevealed(symbolIndex)
  const YourMatches = data.value.yourMatchesData
  const HouseMatches = data.value.houseMatchesData
  const YourToRevealData = data.value.yourToRevealData

  reveal(symbolIndex)
    .then(async () => {
      console.log('handle matches', YourMatches, HouseMatches)
      await handleMatches(YourMatches, HouseMatches)
    })
    .then(() => {
      console.log('handle multiplier')
      handleMultiplier()
    })
    .then(() => {
      console.log('on reveal complete')
    })
}

const revealMultiple = async (
  _symbols: SymbolType[],
  isHouse: boolean = false
): Promise<any> => {
  if (isHouse) {
    const promises = _symbols.map((_symbol) => {
      housesymbols.value[_symbol.index].reveal(_symbol)
    })
    return Promise.all(promises)
  }

  const promises = _symbols.map((_symbol) => {
    symbols.value[_symbol.index].reveal(_symbol)
  })
  return Promise.all(promises)
}

const revealRemainingSequence = async (
  yourToRevealData: any,
  houseToRevealData: any
): Promise<void> => {
  return new Promise((resolve) => {
    if (houseToRevealData && houseToRevealData.length) {
      //play sound
      revealMultiple(houseToRevealData, true).then(() => {
        if (yourToRevealData && yourToRevealData.length) {
          //play sound
          revealMultiple(yourToRevealData).then(resolve)
        }
      })
    }
  })
}

const revealAll = () => {
  //onComplete??
  const { state, data } = setAllRevealed()

  const yourToRevealData = data.yourToRevealData
  const houseToRevealData = data.houseToRevealData

  //todo
  console.log('HOUSE TO REVEAL DATA', houseToRevealData)
  revealRemainingSequence(yourToRevealData, houseToRevealData).then(() => {
    // console.log('reveal all completed')
  })

  // console.log('REVEAL ALL', state, data)
}

store.$subscribe(() => {
  orientation.value = store.orientation
})

gameStore.$subscribe(() => {
  spin.value = gameStore.spin
  setSymbolsData(spin.value)
  // if (gameStore.spin && gameStore.spin.yourSymbols) {
  //   console.log('simbols', gameStore.spin)
  //   actions.playWinAnimation([{ index: 0 }, { index: 3 }])
  // }
})

defineExpose({
  revealAll
})
</script>
<template>
  <YourSymbol
    v-for="n in 10"
    :symbolID="'Symbol'"
    :index="n"
    ref="symbols"
    :x="layout.yourSymbols[orientation][n - 1].x"
    :y="layout.yourSymbols[orientation][n - 1].y"
    :scale="layout.yourSymbols[orientation][n - 1].scale || 1"
    v-model="yourSymbols[n - 1]"
    @onRevealStart="onSymbolReveal(n - 1)"
  />
  <HouseSymbol
    v-for="n in 2"
    :index="n"
    :key="`HouseSymbol${n}`"
    :x="layout.houseSymbols[orientation][n - 1].x"
    :y="layout.houseSymbols[orientation][n - 1].y"
    :scale="layout.houseSymbols[orientation][n - 1].scale || 1"
    ref="housesymbols"
  />
</template>
