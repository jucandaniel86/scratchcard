<script setup lang="ts">
import { Screens } from './config/Screens'
import { ref, onMounted } from 'vue'

//import screens
import Main from './layout/Main.vue'
import Loader from './screens/Loader.vue'
import Background from './layout/Background.vue'
import { __LOADED_RESOURCES } from './config/Resources'
import { useResize } from './composables/useResize'
import { useAppStore } from './store/app'
import Game from './screens/Game.vue'

const screen = ref<Screens>(Screens.LOADING)
// const screen = useScreen();

const changeScreen = (_evnt: any) => {
  screen.value = Screens.GAME
}

const onResize = () => {
  const { resize, width, height, clientOrientation } = useResize()
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
  <Loader @loader:resolved="changeScreen" />

  <template v-if="screen === Screens.GAME">
    <Background
      :bg-horizontal="__LOADED_RESOURCES.mainHorizontal"
      :bg-vertical="__LOADED_RESOURCES.mainVertical"
    />
    <Game />
  </template>
</template>

<style scoped></style>
