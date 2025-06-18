<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCreateFromSpriteSheet } from '../../composables/useCreateFromSpriteSheet'
import { Graphics } from 'pixi.js'

enum SpriteButtonStates {
  UP = 'UP',
  DOWN = 'DOWN',
  OVER = 'OVER',
  DISABLED = 'DISABLED'
}

type SpriteButtonType = {
  visible?: boolean
  texture: any
  x: number
  y: number
}

//props
const props = withDefaults(defineProps<SpriteButtonType>(), {
  visible: true
})

//textures
const textures = ref(useCreateFromSpriteSheet(props.texture))

//models
const state = ref<SpriteButtonStates>(SpriteButtonStates.OVER)
const isInteractive = ref<boolean>(true)
const isDownState = ref<boolean>(false)

//emitters
const emitters = defineEmits(['onClick'])

//methods
const createHitArea = (graphics: Graphics) =>
  graphics.drawEllipse(
    props.texture.width / 2,
    props.texture.height / 2,
    props.texture.width / 2,
    props.texture.height / 2
  )

const disable = () => {
  isInteractive.value = false
  state.value = SpriteButtonStates.DISABLED
}

defineExpose({
  disable
})

//computed
const currentTexture = computed(() => {
  switch (state.value) {
    case SpriteButtonStates.UP:
      return textures.value.up
    case SpriteButtonStates.DOWN:
      return textures.value.pressed
    case SpriteButtonStates.OVER:
      return textures.value.over
    case SpriteButtonStates.DISABLED:
      return textures.value.disabled
    default:
      textures.value.up
  }
})

//listeners
const onClick = () => {
  if (!isInteractive.value) return

  emitters('onClick', true)

  isDownState.value = false
  state.value = SpriteButtonStates.OVER
}
const onMouseDown = () => (state.value = SpriteButtonStates.DOWN)
const onMouseUpOutside = () => (state.value = SpriteButtonStates.UP)
const onMouseOut = () => (state.value = SpriteButtonStates.UP)
const onMouseOver = () => (state.value = SpriteButtonStates.DOWN)
</script>
<template>
  <container
    :event-mode="isInteractive ? 'static' : 'none'"
    :cursor="'pointer'"
    :button-mode="isInteractive"
    :x="props.x"
    :y="props.y"
    :visible="props.visible"
    @touchend="onClick"
    @touchstart="onMouseDown"
    @touchendoutside="onMouseUpOutside"
    @click="onClick"
    @mousedown="onMouseDown"
    @onMouseUpOutside="onMouseUpOutside"
    @mouseout="onMouseOut"
    @mouseover="onMouseOver"
  >
    <text :style="{ alignContent: 'center', fill: 'white' }"></text>
    <Graphics @render="createHitArea" />
    <Sprite :texture="currentTexture as any" />
  </container>
</template>
