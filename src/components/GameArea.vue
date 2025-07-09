<script setup lang="ts">
import { onMounted, ref } from 'vue'
import YourSymbol from './Game/YourSymbols/YourSymbol.vue'
import { useDataEntry } from '../composables/useDataEntry'
import { ScreenOrientationEnum } from '../config/App'
import { useAppStore } from '../store/app'
// import { useYourSymbolsActions } from './Game/YourSymbols/Actions'
import { SymbolType, useGameStore } from '../store/game'
import HouseSymbol from './Game/HouseSymbols/HouseSymbol.vue'
import { useGameArea } from './Game/Composables/useGameArea'

const store = useAppStore()
const gameStore = useGameStore()

const symbols = ref<any>('symbols')
const housesymbols = ref<any>('housesymbols')
const layout = useDataEntry('main_screen_layout', 'gameArea')
const orientation = ref<ScreenOrientationEnum>(store.orientation)
// const actions = useYourSymbolsActions(symbols)
const spin = ref<any>()
const { setSymbolsData, setYourSymbolRevealed, setAllRevealed, yourSymbols } =
  useGameArea()

var qe = {
  landscape: {
    width: 214,
    height: 21
  },
  portrait: {
    width: 304,
    height: 30
  }
}

//emitters
const emitters = defineEmits(['onRevealComplete'])

//methods
const reveal = async (symbolIndex: number): Promise<void> => {
  return symbols.value[symbolIndex].reveal(yourSymbols.value[symbolIndex])
}

//@todo : add to utils
const hasItemsInArray = (array: any[]) => array.length > 0

const textStyles = useDataEntry('main_text_styles')

const playWinAnimation = async (
  _symbols: SymbolType[],
  houseSymbols: boolean = false
) => {
  let promises = _symbols.map(function (t) {
    return (
      houseSymbols ? housesymbols.value[t.index] : symbols.value[t.index]
    ).playWinAnimation(t)
  })

  return Promise.all(promises)
}

const handleMatches = async (
  yourMatches: any[],
  houseMatches: any[]
): Promise<void> => {
  if (hasItemsInArray(yourMatches)) {
    if (hasItemsInArray(houseMatches)) {
      houseMatches.forEach((_symbol: any) => {
        //_playSymbolWinningSound
      })
    }

    return (
      playWinAnimation(houseMatches, true),
      playWinAnimation(yourMatches),
      Promise.resolve()
    )
  }
}

const handleMultiplier = () => {}

const handleWins = (
  yourMatchesData: SymbolType[],
  houseMatchesData: SymbolType[],
  yourToRevealData: SymbolType[]
) => {
  return Promise.all([handleMatches(yourMatchesData, houseMatchesData)])
}

const onSymbolReveal = (symbolIndex: number) => {
  //play sounds
  const { data } = setYourSymbolRevealed(symbolIndex)
  const YourMatches = data.value.yourMatchesData
  const HouseMatches = data.value.houseMatchesData
  // const YourToRevealData = data.value.yourToRevealData

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
  return new Promise(async (resolve) => {
    if (houseToRevealData && houseToRevealData.length) {
      //play sound

      revealMultiple(houseToRevealData, true).then(() => {
        if (yourToRevealData && yourToRevealData.length) {
          //play sound
          revealMultiple(yourToRevealData, false).then(resolve)
        }
      })
    }
  })
}

const revealAll = () => {
  //onComplete??
  const { data } = setAllRevealed()

  const yourToRevealData = data.yourToRevealData
  const houseToRevealData = data.houseToRevealData
  const houseMatchesData = data.houseMatchesData
  const yourMatchesData = data.yourMatchesData

  //todo
  revealRemainingSequence(yourToRevealData, houseToRevealData)
    .then(() => {
      handleWins(yourMatchesData, houseMatchesData, [])
    })
    .then(() => {
      emitters('onRevealComplete')
    })

  // console.log('REVEAL ALL', state, data)
}

const reset = () => {
  housesymbols.value.map((symbol: any) => symbol.reset())
  symbols.value.map((symbol: any) => symbol.reset())
}

const enable = () => {
  housesymbols.value.map((symbol: any) => symbol.enable())
  symbols.value.map((symbol: any) => symbol.enable())
}

const disable = () => {
  housesymbols.value.map((symbol: any) => symbol.disable())
  symbols.value.map((symbol: any) => symbol.disable())
}

store.$subscribe(() => {
  orientation.value = store.orientation
})

gameStore.$subscribe(() => {
  spin.value = gameStore.spin
  reset()
  enable()
  setSymbolsData(spin.value)
})

onMounted(() => {
  disable()
})

defineExpose({
  revealAll
})
</script>
<template>
  <Text
    :x="layout.yourSymbolsTitle[orientation].x"
    :y="layout.yourSymbolsTitle[orientation].y"
    :anchor="0.5"
    :style="textStyles.Title"
    >{{ 'Your Symbols' }}</Text
  >
  <Text
    :x="layout.houseSymbolsTitle[orientation].x"
    :y="layout.houseSymbolsTitle[orientation].y"
    :anchor="0.5"
    :style="textStyles.Title"
    >{{ 'Winning Symbols' }}</Text
  >
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
