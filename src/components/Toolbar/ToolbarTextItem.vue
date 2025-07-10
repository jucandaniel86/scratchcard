<script setup lang="ts">
import { computed, StyleValue } from 'vue'

type ToolbarTextItemType = {
  title: string
  value: string | number
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
    ? ''.concat(props.title, `${props.separator} `).concat(String(props.value))
    : ''.concat(props.title, '\n').concat(String(props.value))
})
</script>
<template>
  <container :x="x" :y="y">
    <text :anchor="0.5" :style="props.styles">{{ label }}</text>
  </container>
</template>
