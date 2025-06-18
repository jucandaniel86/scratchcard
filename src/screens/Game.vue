<script setup lang="ts">
import Toolbar from '../components/Toolbar/Toolbar.vue'
import MainMenu from '../components/Menu/MainMenu.vue'
import { useDataEntry } from '../composables/useDataEntry'
import { ref, watch } from 'vue'
import SpriteButton from '../components/UI/SpriteButton.vue'
import { ScreenOrientationEnum } from '../config/App'
import { useAppStore } from '../store/app'
import { useGenerateSpin } from '../composables/useGenerateSpin'
import { useGameStore } from '../store/game'
import GameArea from '../components/GameArea.vue'
import AutoplayModal from '../components/Autoplay/Main.vue'

//store
const store = useAppStore()
const gameStore = useGameStore()

//toolbar textures
const toolbar_textures = useDataEntry('toolbar_json', 'textures')
const menu_textures = useDataEntry('menu_buttons_json', 'textures')

//layout
const layout = useDataEntry('toolbar_layout')
const autoplay_layout = useDataEntry('autoplay_layout')
const menu_layout = useDataEntry('menu_layout')

//models
const orietation = ref<ScreenOrientationEnum>(store.orientation)

//buttons
const startButton = ref<any>('startButton')
const autoPlayButton = ref<any>('autoPlayButton')
const menuButton = ref<any>('menuButton')

watch(store, () => {
  orietation.value = store.orientation
})

const { generate } = useGenerateSpin()
const generateSpin = () => {
  const response: any = generate()
  gameStore.setSpin(response)
  console.info('SPIN RESPONSE', response)
}
</script>
<template>
  <container>
    <Toolbar :layout="useDataEntry('main_screen_layout')" />

    <!-- <AutoplayModal /> -->
    <GameArea />

    <MainMenu />
    <SpriteButton
      ref="startButton"
      :texture="toolbar_textures.Play_Btn"
      :x="layout.startButton[orietation].x"
      :y="layout.startButton[orietation].y"
      @onClick="generateSpin()"
    />

    <SpriteButton
      ref="autoPlayButton"
      :texture="toolbar_textures.AutoPlay"
      :y="autoplay_layout.openButton[orietation].y"
      :x="autoplay_layout.openButton[orietation].x"
    />

    <SpriteButton
      ref="menuButton"
      :texture="menu_textures['Menu_Btn.png']"
      :x="menu_layout.menu_button[orietation].x"
      :y="menu_layout.menu_button[orietation].y"
    />
  </container>
</template>
