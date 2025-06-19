<script setup lang="ts">
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js'
import { Text, Texture } from 'pixi.js'
import { onMounted, ref, watch } from 'vue'
import { __RESOURCES } from '../../config/Resources'

//enum
enum ButtonState {
  DOWN = 'down',
  UP = 'up',
  DISABLED = 'disabled',
  OVER = 'over'
}

//Props
type ButtonType = {
  label: string
  maxWidth?: number
  maxHeight?: number
  style?: any
  texture?: Texture
  hasArrows?: boolean
}
//props
const props = withDefaults(defineProps<ButtonType>(), {
  maxHeight: 50,
  maxWidth: 50,
  hasArrows: true
})

//models
const fontFamily = 'Roboto Condensed, Arial'
const upStateColor = 2500135
const downStateColor = 16777215
const disabledStateColor = 13421772
const width = ref<number>(140)
const x = ref<number>(0)
const y = ref<number>(0)
const isDownState = ref<boolean>(false)
const isInteractive = ref<boolean>(true)
//states
const label = ref<any>('label')
const upState = ref<any>('upState')
const downState = ref<any>('downState')
const overState = ref<any>('overState')
const disabledState = ref<any>('disabledState')
const buttonState = ref<ButtonState>(ButtonState.UP)
//emitters
const emitters = defineEmits(['onClick'])

//methods
const setX = (_x: number) => (x.value = _x)
const setY = (_y: number) => (y.value = _y)
const createUpState = (graphics: Graphics) => {
  graphics.beginFill(upStateColor)
  graphics.drawRoundedRect(0, 0, width.value, 62, 10)
  graphics.endFill()
}

const createDownState = (graphics: Graphics) => {
  graphics.beginFill(downStateColor)
  graphics.drawRoundedRect(0, 0, width.value, 62, 10)
  graphics.endFill()
}

const createOverState = (graphics: Graphics) => {
  graphics.beginFill(downStateColor)
  graphics.drawRoundedRect(0, 0, width.value, 62, 10)
  graphics.endFill()
}

const createDisabledState = (graphics: Graphics) => {
  graphics.beginFill(disabledStateColor)
  graphics.drawRoundedRect(0, 0, width.value, 62, 10)
  graphics.endFill()
}

const centerObject = (object1: any, object2: any) => {
  object2.position.set(
    object1.width / 2 - object2.width / 2,
    object1.height / 2 - object2.height / 2
  )
}

const updateLayout = () => {
  label.value.position.set(upState.value.width / 2, upState.value.height / 2)

  centerObject(upState.value, overState.value)
  centerObject(upState.value, downState.value)
  centerObject(upState.value, disabledState.value)
  label.value.x = 117 - label.value.width - 25
  label.value.y = 31 - label.value.height / 2
}

const setUpStateTexture = (_texture: Texture) =>
  (upState.value.texture = _texture)
const setDownStateTexture = (_texture: Texture) =>
  (downState.value.texture = _texture)
const setOverStateTexture = (_texture: Texture) =>
  (overState.value.texture = _texture)
const setDisabledStateTexture = (_texture: Texture) =>
  (disabledState.value.texture = _texture)

//pointer events
const onClick = () => {
  emitters('onClick')
}

const onMouseDown = () => {
  isDownState.value = true
  switchToDownState()
}

const onMouseOver = () => {
  isDownState.value = false
  switchToOverState()
}

const onMouseOut = () => {
  switchToUpState()
}

//pointer callbacks
const switchToDownState = () => {
  buttonState.value = ButtonState.DOWN
  label.value.scale.set(0.98)
  label.value.style.fill = upStateColor
}

const switchToOverState = () => {
  buttonState.value = ButtonState.OVER
  label.value.scale.set(1.01)
  label.value.style.fill = upStateColor
}

const switchToUpState = () => {
  buttonState.value = ButtonState.UP
  label.value.scale.set(1)
  label.value.style.fill = downStateColor
}

const onMouseUpOutside = () => {
  isDownState.value = false
  switchToUpState()
}

const labelRender = (_text: Text) => {
  _text.style = { ...props.style, fontFamily }
}

watch(props, () => {
  if (props.texture) {
    setUpStateTexture(props.texture)
    setDownStateTexture(props.texture)
    setOverStateTexture(props.texture)
    setDisabledStateTexture(props.texture)
  }
})

defineExpose({
  setX,
  setY,
  setUpStateTexture,
  setDownStateTexture,
  setOverStateTexture,
  setDisabledStateTexture
})

onMounted(() => {
  updateLayout()
})
</script>
<template>
  <Container
    :x="x"
    :y="y"
    :width="width"
    :height="60"
    @click="onClick"
    @touchstart="onMouseDown"
    @touchendoutside="onMouseUpOutside"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @onMouseUpOutside="onMouseUpOutside"
    :event-mode="isInteractive ? 'static' : 'none'"
    :cursor="'pointer'"
    :button-mode="isInteractive"
  >
    <Graphics
      @render="createDisabledState"
      ref="disabledState"
      :visible="buttonState === ButtonState.DISABLED"
    />
    <Graphics
      @render="createDownState"
      ref="downState"
      :visible="buttonState === ButtonState.DOWN"
    />
    <Graphics
      @render="createOverState"
      ref="overState"
      :visible="buttonState === ButtonState.OVER"
    />
    <Graphics
      @render="createUpState"
      ref="upState"
      :visible="buttonState === ButtonState.UP"
    />
    <Text :anchor="0.5" @render="labelRender" ref="label">{{
      props.label
    }}</Text>
    <Sprite
      v-if="props.hasArrows"
      :texture="__RESOURCES.arrowBlack"
      :y="18.5"
      :x="104"
      :visible="
        [ButtonState.DOWN, ButtonState.OVER].indexOf(buttonState) !== -1
      "
    />
    <Sprite
      v-if="props.hasArrows"
      :texture="__RESOURCES.arrowWhite"
      :y="18.5"
      :x="104"
      :visible="[ButtonState.UP].indexOf(buttonState) !== -1"
    />
  </Container>
</template>
