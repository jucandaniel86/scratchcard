<script setup lang="ts">
import { Graphics, Text } from 'pixi.js'
import { useAppStore } from '../../store/app'
import {
  ConfigResolutions,
  GAME_NAME,
  ScreenOrientationEnum
} from '../../config/App'

//models
const numOfAutoplayGames = [10, 25, 50, 100]

const appStore = useAppStore()
const { width, height } = ConfigResolutions[appStore.orientation]

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
  _text.y = 120 - _text.height / 2
}
</script>
<template>
  <container :z-index="3">
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
    <Text :style="{ fill: 0xffffff, fontSize: 25 }" @render="createSubtitle"
      >Auto Play
    </Text>
    <container> </container>
  </container>
</template>
