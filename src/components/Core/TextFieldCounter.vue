<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTextCounter } from '../../composables/useTextCounter'

type TextFieldCounterType = {
  id?: string | number
  text: string
}
const props = withDefaults(defineProps<TextFieldCounterType>(), {
  id: `Counter${new Date().getTime()}`
})

//composables
const { currentValue, setMaxTime, setCurrentValue, startFromCurrent } =
  useTextCounter()

//methods
const initTextCounter = () => {
  setMaxTime(3000)
  setCurrentValue(0)
  startFromCurrent(1000, 0.3)
}

initTextCounter()

const center = computed(() => ({
  x: window.innerWidth / 2 - 100,
  y: window.innerHeight / 2
}))
</script>
<template>
  <Text :style="{ fill: 0xfff, fontSize: 60 }" :x="center.x" :y="center.y">{{
    currentValue
  }}</Text>
</template>
