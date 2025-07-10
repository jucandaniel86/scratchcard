<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  ALIGMENT_MODES,
  POPUP_DEFAULT_CONFIG,
  PopupConfigType
} from '../../config/Popup'
import { Container, Graphics } from 'pixi.js'
import { Rectangle } from 'pixi.js'

//props
const props = withDefaults(defineProps<PopupConfigType>(), {
  hasButton: POPUP_DEFAULT_CONFIG.hasButton,
  darkBackground: POPUP_DEFAULT_CONFIG.darkBackground,
  darkBackgroundColor: POPUP_DEFAULT_CONFIG.darkBackgroundColor,
  darkBackgroundAlpha: POPUP_DEFAULT_CONFIG.darkBackgroundAlpha,
  hideOnDarkBackground: POPUP_DEFAULT_CONFIG.hideOnDarkBackground,
  alignmentMode: POPUP_DEFAULT_CONFIG.alignmentMode,
  stubBgColor: POPUP_DEFAULT_CONFIG.stubBgColor,
  stubWidth: POPUP_DEFAULT_CONFIG.stubWidth,
  stubHeight: POPUP_DEFAULT_CONFIG.stubHeight
})

//models
const PopupContainer = ref<Container>()
const PopupContentContainer = ref<Container | any>()
const PopupContent = ref<Container | any>()
const isOpen = ref<boolean>(false)
const worldBounds = ref()

//component callbacks
const emitters = defineEmits(['onOpen'])

//methods
const getHorizontalWorldBounds = () => new Rectangle(0, 0, 1280, 720)
const getVerticalWorldBounds = () => new Rectangle(0, 0, 720, 1280)
const defineDefaultWorldBounds = () => getHorizontalWorldBounds()

worldBounds.value = defineDefaultWorldBounds()

const createBackground = (graphics: Graphics) => {
  const { x, y, width, height } = worldBounds.value

  graphics.beginFill(props.darkBackgroundColor, props.darkBackgroundAlpha)
  graphics.drawRect(x, y, width, height)
  graphics.endFill()
}
const createContent = (graphics: Graphics) => {
  graphics.beginFill(props.stubBgColor, 1)
  graphics.drawRect(0, 0, props.stubWidth, props.stubHeight)
  graphics.endFill()
}

const align = () => {
  if (
    props.alignmentMode === ALIGMENT_MODES.NONE &&
    (!PopupContainer.value || !PopupContent.value)
  ) {
    return false
  }

  switch (props.alignmentMode) {
    case ALIGMENT_MODES.MIDDLE:
      {
        PopupContentContainer.value.x = worldBounds.value.width / 2
        PopupContentContainer.value.y = worldBounds.value.height / 2
        PopupContentContainer.value?.pivot.set(
          PopupContentContainer.value.width / 2,
          PopupContentContainer.value.height / 2
        )
      }
      break
    case ALIGMENT_MODES.LEFT_TOP:
      {
        PopupContentContainer.value.x = 0
        PopupContentContainer.value.y = 0
      }
      break
    case ALIGMENT_MODES.RIGHT_TOP: {
      PopupContentContainer.value.x = worldBounds.value.width
      PopupContentContainer.value.y = 0
      PopupContentContainer.value.pivot.set(
        PopupContentContainer.value.width,
        0
      )
    }
  }
}

onMounted(() => {
  align()
})
</script>
<template>
  <Container ref="PopupContainer">
    <Graphics @render="createBackground" v-if="props.darkBackground" />
    <Container ref="PopupContentContainer">
      <Container ref="PopupContent">
        <Graphics @render="createContent">
          <Text :anchor="0.5">{{ '' }}</Text>
        </Graphics>
      </Container>
    </Container>
  </Container>
</template>
