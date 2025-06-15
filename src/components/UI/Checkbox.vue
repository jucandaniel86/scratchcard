<script setup lang="ts">
import { computed, ref } from 'vue'
import { Sprite, Text, TextStyle, Texture } from 'pixi.js'

interface CheckboxType {
  selected: Texture
  unselected: Texture
  labels: any
  x: number
  y: number
  checked?: boolean
  style?: TextStyle
}
//props
const props = withDefaults(defineProps<CheckboxType>(), {
  labels: {
    checked: 'Checked',
    unchecked: 'Unchecked'
  },
  checked: false,
  x: 0,
  y: 0
})

//emitters
const emitters = defineEmits(['onChecked'])

//states
const isChecked = ref<boolean>(props.checked)
const spriteSizes = ref<any>({ width: 0, height: 0 })

//methods
const onChecked = () => {
  isChecked.value = !isChecked.value
  emitters('onChecked', { state: isChecked.value })
}

const spriteRender = (_payload: Sprite) => {
  spriteSizes.value = {
    width: _payload.width,
    height: _payload.height
  }
}

const textRender = (_payload: Text) =>
  (_payload.x = spriteSizes.value.width / 2 + 10)

//computed
const texture = computed(() => {
  if (isChecked.value) return props.selected
  return props.unselected
})
const label = computed(() => {
  if (isChecked.value) return props.labels.checked
  return props.labels.unchecked ? props.labels.unchecked : props.labels.checked
})
</script>
<template>
  <Container
    :x="props.x"
    :y="props.y"
    :cursor="'pointer'"
    :event-mode="'static'"
    @pointer-up="onChecked"
  >
    <sprite :texture="texture" :anchor="0.5" @render="spriteRender" />
    <Text :style="props.style" :anchor-y="0.5" @render="textRender">{{
      label
    }}</Text>
  </Container>
</template>
