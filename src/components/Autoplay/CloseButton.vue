<script setup lang="ts">
import { Container, Rectangle } from 'pixi.js'
import { Graphics, Sprite, Texture } from 'pixi.js'
import { useButtonActions } from '../../composables/useButtonActions'

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
  console.log('onClick sheet')
  emitteres('onClick')
}
const { container } = useButtonActions({ texture: props.texture, onClick })

const onRender = (_container: Container) => {
  _container.addChild(container.value)
}
</script>
<template>
  <Container :x="props.x" :y="props.y" @render="onRender"> </Container>
</template>
