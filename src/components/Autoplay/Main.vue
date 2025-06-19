<script setup lang="ts">
import { Container, Graphics, Text } from 'pixi.js'
import { useAppStore } from '../../store/app'
import {
  ConfigResolutions,
  GAME_NAME,
  NUM_OF_AUTOPLAY_GAMES,
  ScreenOrientationEnum
} from '../../config/App'
import ButtonNumber from './Button.vue'
import CloseButton from './CloseButton.vue'
import { onMounted, ref, watch } from 'vue'
import { useUpdateButtons } from './useUpdateButtons'
import { __LOADED_RESOURCES } from '../../config/Resources'
import { useDataEntry } from '../../composables/useDataEntry'

//store
const store = useAppStore()

//layout
const layout = useDataEntry('autoplay_layout')

//models
const buttons = ref<any[]>([])
const AutoplayAreaContainer = ref<any>('AutoplayAreaContainer')
const orientation = ref<any>(store.orientation)

const appStore = useAppStore()
const { width, height } = ConfigResolutions[appStore.orientation]

//composables
const { updateButtons } = useUpdateButtons(buttons)

//emitters
const emitteres = defineEmits(['onClose'])

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

const onClose = () => emitteres('onClose')

watch(store, () => {
  orientation.value = store.orientation
})

onMounted(() => {
  updateButtons()
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
        fontFamily: 'Roboto Condensed, Arial',
        fill: 0xffffff
      }"
      :y="15"
      @render="createText"
      >{{ GAME_NAME }}</Text
    >
    <Text
      :style="{
        fill: 0xffffff,
        fontSize: 45,
        fontFamily: 'Roboto Condensed, Arial'
      }"
      @render="createTitle"
      >Autoplay</Text
    >
    <Text
      :style="{
        fill: 0xffffff,
        fontSize: 25,
        fontFamily: 'Roboto Condensed, Arial'
      }"
      @render="createSubtitle"
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
          align: 'center',
          fontFamily: 'Roboto Condensed, Arial'
        }"
        ref="buttons"
      />
    </container>
    <CloseButton
      @onClick="onClose"
      :x="layout.closeButton[orientation].x"
      :y="layout.closeButton[orientation].y"
      :texture="__LOADED_RESOURCES.closeButton"
    />
  </container>
</template>
