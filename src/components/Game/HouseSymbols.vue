<script setup lang="ts">
import { ref } from 'vue'
import { useDataEntry } from '../../composables/useDataEntry'
import { ScreenOrientationEnum } from '../../config/App'
import { useAppStore } from '../../store/app'

const { houseSymbols } = useDataEntry('main_screen_layout', 'gameArea')
const store = useAppStore()
const orientation = ref<ScreenOrientationEnum>(store.orientation)

store.$subscribe(() => {
  orientation.value = store.orientation
})

// console.log('HOUSE SYMBOLS', houseSymbols[orientation.value])
</script>
<template></template>
