<script setup lang="ts">
import { Container, Graphics, Text, TextStyle } from 'pixi.js'
import { useAppStore } from '../../store/app'
import {
  ConfigResolutions,
  GAME_NAME,
  NUM_OF_AUTOPLAY_GAMES,
  ScreenOrientationEnum
} from '../../config/App'
import ButtonNumber from './Button.vue'
import { onMounted, ref } from 'vue'
import { useUpdateButtons } from './useUpdateButtons'
import { Easing, Tween } from '@tweenjs/tween.js'
import { onTick } from 'vue3-pixi'

//textures
// const close

//models
const buttons = ref<any[]>([])
const AutoplayAreaContainer = ref<any>('AutoplayAreaContainer')

const appStore = useAppStore()
const { width, height } = ConfigResolutions[appStore.orientation]

//composables
const { updateButtons } = useUpdateButtons(buttons)

//methods
const createBlackBackground = (graphics: Graphics) => {
  graphics.beginFill(0, 0.9)
  graphics.drawRect(0, 0, width, height)
  graphics.endFill()
  graphics.width = width
  graphics.height = height
}

const getContainerWidth = () => {
  return appStore.orientation === ScreenOrientationEnum.LANDSCAPE
    ? 0.75 * width
    : width - 74
}

const createLine = (graphics: Graphics) => {
  graphics.beginFill(16777215)
  graphics.drawRect(0, 165, getContainerWidth(), 2.3)
  graphics.endFill()
  graphics.x = 37
  graphics.width = getContainerWidth()
}

const createText = (_text: Text) => {
  _text.x = getContainerWidth() / 2 - _text.width / 2 + 37
}

const createSubtitle = (_text: Text) => {
  createText(_text)
  _text.y = 220 + _text.height / 2
}

const createTitle = (_text: Text) => {
  createText(_text)
  _text.y = 60 + _text.height / 2
}

const containerRender = (container: Container) => {
  container.x = -container.width
}

const tween = new Tween({ x: -AutoplayAreaContainer.value.width }) // Create a new tween that modifies 'coords'.
  .to({ x: 0 }, 1000) // Move to (300, 200) in 1 second.
  .easing(Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
  .onUpdate(() => {
    console.log('on update')
    // Called after tween.js updates 'coords'.
    // Move 'box' to the position described by 'coords' with a CSS translation.
    // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
  })

const openPanel = () => {
  console.log('openPanel')
  tween.start()
}

defineExpose({
  openPanel
})

onMounted(() => {
  updateButtons()
})

onTick((time: number | undefined) => {
  // console.log('delta', time)
  tween.update(time)
})
</script>
<template>
  <container
    :z-index="10"
    @render="containerRender"
    ref="AutoplayAreaContainer"
  >
    <Graphics @render="createBlackBackground" />
    <Graphics @render="createLine" />
    <Text
      :style="{
        fontSize: 48,
        fontWeight: 'bold',
        fill: 0xffffff
      }"
      :y="15"
      @render="createText"
      >{{ GAME_NAME }}</Text
    >
    <Text :style="{ fill: 0xffffff, fontSize: 45 }" @render="createTitle"
      >Autoplay</Text
    >
    <Text :style="{ fill: 0xffffff, fontSize: 25 }" @render="createSubtitle"
      >Numbers of plays
    </Text>
    <container>
      <ButtonNumber
        v-for="(item, i) in NUM_OF_AUTOPLAY_GAMES"
        :key="`AutoplayButton${i}`"
        :label="'X'.concat(item.toString())"
        :style="{
          fill: 16777215,
          fontWeight: 'bold',
          fontSize: 23,
          align: 'center'
        }"
        ref="buttons"
      />
    </container>
  </container>
</template>
