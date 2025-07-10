<script setup lang="ts">
import Toolbar from '../components/Toolbar/Toolbar.vue'
import MainMenu from '../components/Menu/MainMenu.vue'
import { useDataEntry } from '../composables/useDataEntry'
import { computed, ref, watch } from 'vue'
import SpriteButton from '../components/UI/SpriteButton.vue'
import {
  ConfigResolutions,
  DEFAULT_TICKET_PRIZE,
  ScreenOrientationEnum
} from '../config/App'
import { useAppStore } from '../store/app'
import { useGenerateSpin } from '../composables/useGenerateSpin'
import { useGameStore } from '../store/game'
import GameArea from '../components/GameArea.vue'
import AutoplayModal from '../components/Autoplay/Main.vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { GameEvents } from '../types/Events'
import { useEventsStore } from '../store/events'
import { useUtils } from '../composables/useUtils'
import GeneralWin from '../components/Game/Animations/GeneralWin.vue'
import { __LOADED_RESOURCES } from '../config/Resources'
import TextFieldCounter from '../components/Core/TextFieldCounter.vue'
import { useToolbarStore } from '../store/toolbar'

//store
const store = useAppStore()
const gameStore = useGameStore()
const { addToBalance, setBalance, setWin, decreaseBalance } = useToolbarStore()
const { on } = useEventsStore()

//utils
const { wait } = useUtils()

//toolbar textures
const toolbar_textures = useDataEntry('toolbar_json', 'textures')
const menu_textures = useDataEntry('menu_buttons_json', 'textures')

//layout
const layout = useDataEntry('toolbar_layout')
const autoplay_layout = useDataEntry('autoplay_layout')
const menu_layout = useDataEntry('menu_layout')

//models
const orietation = ref<ScreenOrientationEnum>(store.orientation)
const isAutoplayOpen = ref<any>(false)
const gameStart = ref<boolean>(false)
const gameArea = ref<any>('gameArea')
const generalWinLeft = ref()
const generalWinRight = ref()

//computed
const autoplayX = computed(() =>
  isAutoplayOpen.value ? 0 : -ConfigResolutions[orietation.value].width
)

//animations
const autoplayModalAnimation = useTransition(autoplayX, {
  duration: 300,
  transition: TransitionPresets.linear
})

//buttons
const startButton = ref<any>('startButton')
const autoPlayButton = ref<any>('autoPlayButton')
const menuButton = ref<any>('menuButton')
const revealButton = ref<any>('revealButton')

watch(store, () => {
  orietation.value = store.orientation
})

const { generate } = useGenerateSpin()
const generateSpin = () => {
  const response: any = generate()
  gameStore.setSpin(response)
  // console.info('SPIN RESPONSE', response)
  gameStart.value = true
  decreaseBalance(DEFAULT_TICKET_PRIZE)
  setWin(0)
}

const revealAll = () => gameArea.value.revealAll()

//methods
const openAutoplayModal = () => (isAutoplayOpen.value = true)
const closeAutoplayModal = () => (isAutoplayOpen.value = false)

const playGeneralWin = (totalWin: number, isBigWin: boolean) => {
  console.log('play General Win')
  generalWinRight.value.play()
  generalWinLeft.value.play()
}

const handleTotalWinUpdate = () => {
  const gamePrize = gameStore.spin?.gamePrize as number
  const isBigWin = gameStore.spin?.isBigWin as boolean

  // playGeneralWin(gamePrize, isBigWin)
  setWin(gamePrize)
}

const onAllSymbolsRevealed = () => {
  wait(500).then(() => {
    //1.handle big win
    //2. handleTotalWinUpdate
    handleTotalWinUpdate()
  })
}

//emits
on(GameEvents.REVEAL_COMPLETE, (payload: any) => {
  if (payload.isAllCompleted) {
    if (payload.isWinAll) {
      onAllSymbolsRevealed()
      //onWinAllRevealed
      return
    }
    // return onAllSymbolsRevealed
  }
})

const GeneralWinConfig = useDataEntry('general_win_particles_config')
const GeneralWinImages = Array.from(Array(4)).map(
  (e, i) => __LOADED_RESOURCES[`general_win_particles_texture${i + 1}`]
)
</script>
<template>
  <container>
    <Toolbar :layout="useDataEntry('main_screen_layout')" />

    <GameArea ref="gameArea" @onRevealComplete="gameStart = false" />
    <AutoplayModal :x="autoplayModalAnimation" @onClose="closeAutoplayModal" />

    <MainMenu />
    <SpriteButton
      ref="startButton"
      :texture="toolbar_textures.Play_Btn"
      :x="layout.startButton[orietation].x"
      :y="layout.startButton[orietation].y"
      @onClick="generateSpin()"
      :visible="isAutoplayOpen ? false : true"
      v-if="!gameStart"
    />

    <SpriteButton
      ref="revealButton"
      :texture="toolbar_textures.RevealAll_Btn"
      :x="layout.startButton[orietation].x"
      :y="layout.startButton[orietation].y"
      @onClick="revealAll()"
      :visible="isAutoplayOpen ? false : true"
      v-if="gameStart"
    />

    <SpriteButton
      ref="autoPlayButton"
      :texture="toolbar_textures.AutoPlay"
      :y="autoplay_layout.openButton[orietation].y"
      :x="autoplay_layout.openButton[orietation].x"
      @onClick="openAutoplayModal"
      :visible="isAutoplayOpen ? false : true"
    />

    <SpriteButton
      ref="menuButton"
      :texture="menu_textures['Menu_Btn.png']"
      :x="menu_layout.menu_button[orietation].x"
      :y="menu_layout.menu_button[orietation].y"
      :disabled="isAutoplayOpen"
    />

    <GeneralWin
      ref="generalWinLeft"
      :config="GeneralWinConfig"
      :images="GeneralWinImages"
    />
    <GeneralWin
      ref="generalWinRight"
      :config="GeneralWinConfig"
      :images="GeneralWinImages"
    />
  </container>
</template>
