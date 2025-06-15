<script setup lang="ts">
import { TextStyle } from 'pixi.js'
import { computed, StyleValue } from 'vue'

type ToolbarTextItemType = {
  title: string
  value: string
  styles: StyleValue
  x: number
  y: number
  separator?: string
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<ToolbarTextItemType>(), {
  orientation: 'horizontal',
  separator: ':'
})

const label = computed(() => {
  return props.orientation === 'horizontal'
    ? ''.concat(props.title, `${props.separator} `).concat(props.value)
    : ''.concat(props.title, '\n').concat(props.value)
})

const renderText = () => {}
</script>
<template>
  <container :x="x" :y="y">
    <text @render="renderText" :anchor="0.5" :style="props.styles">{{
      label
    }}</text>
  </container>
</template>
