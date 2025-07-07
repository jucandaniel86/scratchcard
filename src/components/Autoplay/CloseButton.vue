<script setup lang="ts">
import { Container, Rectangle } from 'pixi.js'
import { Graphics, Sprite, Texture } from 'pixi.js'
import {
  ButtonState,
  useButtonActions
} from '../../composables/useButtonActions'

type CloseButtonType = {
  label?: string
  x: number
  y: number
  texture: Texture
}
//props
const props = withDefaults(defineProps<CloseButtonType>(), {
  label: '',
  x: 0,
  y: 0
})

const emitteres = defineEmits(['onClick'])

const onClick = () => {
  emitteres('onClick')
}
const {
  isUp,
  isDisabled,
  isOver,
  isDown,
  createOverState,
  createUpState,
  createDisabledState,
  createDownState,
  init
} = useButtonActions({
  texture: props.texture,
  onClick
})
</script>
<template>
  <Container :x="props.x" :y="props.y" @render="init" :event-mode="'static'">
    <Sprite @render="createDisabledState" :visible="isDisabled" />
    <Sprite @render="createUpState" :visible="isUp" />
    <Sprite @render="createOverState" :visible="isOver" />
    <Sprite @render="createDownState" :visible="isDown" />
  </Container>
</template>
