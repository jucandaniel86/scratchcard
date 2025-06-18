<script setup lang="ts">
import { Container, Graphics } from 'pixi.js'
import {
  ALIGMENT_MODES,
  UIPopupType,
  usePopup
} from '../../composables/usePopup'
import { ref } from 'vue'

//config
const config = {
  darkBackgroundColor: 0x000000,
  darkBackgroundAlpha: 1,
  stubWidth: 600,
  stubHeight: 400,
  stubBgColor: 7129189
}

//composables
const { defineDefaultWorldBounds, playHideAnimation } = usePopup()

//props
const props = withDefaults(defineProps<UIPopupType>(), {
  alignmentMode: ALIGMENT_MODES.MIDDLE,
  hasButton: true
})

//models
const worldBounds = defineDefaultWorldBounds()
const isOpen = ref<boolean>(false)

//emitters
const emitters = defineEmits(['onOpen', 'onStartClose', 'onClose'])

//methods
const createBackground = (graphics: Graphics) => {
  const { x, y, width, height } = worldBounds
  graphics.beginFill(config.darkBackgroundColor, config.darkBackgroundAlpha)
  graphics.drawRect(x, y, width, height), graphics.endFill()
}

const alignContentContainer = (container: Container) => {
  if (props.alignmentMode === ALIGMENT_MODES.NONE) return
  switch (props.alignmentMode) {
    case ALIGMENT_MODES.MIDDLE:
      container.x = worldBounds.width / 2
      container.y = worldBounds.height / 2
      container.pivot.set(container.width / 2, container.height / 2)
      break
    case ALIGMENT_MODES.LEFT_TOP:
      container.x = 0
      container.y = 0
      container.pivot.set(0, 0)
      break
    case ALIGMENT_MODES.RIGHT_TOP:
      container.x = worldBounds.width
      container.y = 0
      container.pivot.set(container.width, 0)
      break
  }
}

const createStubRender = (graphics: Graphics) => {
  graphics.beginFill(config.stubBgColor, 1)
  graphics.drawRect(0, 0, config.stubWidth, config.stubHeight)
  graphics.endFill()
}

//@ts-ignore
const hide = () => {
  if (!isOpen.value) return

  emitters('onStartClose', { state: isOpen.value })

  playHideAnimation().then(() => {
    isOpen.value = false
    emitters('onClose', { state: isOpen.value })
  })
}
//@ts-ignore
const show = () => {
  if (isOpen.value) return

  isOpen.value = true
}
</script>
<template>
  <container :visible="isOpen">
    <graphics @render="createBackground" />
    <container @render="alignContentContainer">
      <container>
        <graphics @render="createStubRender" />
        <slot />
      </container>
    </container>
  </container>
</template>
