<script setup lang="ts">
import { Screens } from './config/Screens'
import { ref, onMounted } from 'vue'

import { __LOADED_RESOURCES } from './config/Resources'
import { useResize } from './composables/useResize'
import { useAppStore } from './store/app'

//import components
import Background from './layout/Background.vue'

//import screens
import Loader from './screens/Loader.vue'
import Game from './screens/Game.vue'
import Overview from './screens/Overview.vue'
//@ts-ignore
import WebFont from 'webfontloader'
import AlphaTransition from './components/Core/AlphaTransition.vue'
import { useSystemStore } from './store/system'

const screen = ref<Screens>(Screens.LOADING)
const sysStore = useSystemStore()

const BASE_URL = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}/assets/`
  : '/assets/'

WebFont.load({
  custom: {
    families: ['Bebas Neue Bold'],
    urls: [BASE_URL + 'fonts/BebasNeue-Bold.ttf']
  }
})

const changeScreen = (_screen: Screens) => {
  screen.value = _screen
}

const onLoadingEnded = () => {
  if (sysStore.omitSplashScreen) {
    return changeScreen(Screens.GAME)
  }
  return changeScreen(Screens.OVERVIEW)
}

const onResize = () => {
  const { resize, clientOrientation } = useResize()
  const { setWidth, setOrientation, setHeight } = useAppStore()
  const resizeW = resize()

  setOrientation(clientOrientation.value)
  setWidth(resizeW.w)
  setHeight(resizeW.h)
}

//mounted
onMounted(() => {
  onResize()
  window.addEventListener('resize', () => onResize())
})
</script>

<template>
  <Loader @loader:resolved="onLoadingEnded" />

  <Overview
    v-if="screen === Screens.OVERVIEW"
    @change-screen="changeScreen(Screens.GAME)"
  />

  <alpha-transition>
    <container v-if="screen === Screens.GAME">
      <Background
        :bg-horizontal="__LOADED_RESOURCES.mainHorizontal"
        :bg-vertical="__LOADED_RESOURCES.mainVertical"
      />
      <Game />
    </container>
  </alpha-transition>
</template>

<style scoped></style>
