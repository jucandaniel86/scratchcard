<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  CHEAT_TOOL_AVAILABLE,
  SETTINGS_HOME_TAB,
  SETTINGS_MENU_ITEMS
} from '../../../config/App'

//models
const items = ref<string[]>([])

//methods
const setItemsList = () => {
  if (CHEAT_TOOL_AVAILABLE) {
    items.value?.push(SETTINGS_MENU_ITEMS.CHEAT)
  }
  if (SETTINGS_HOME_TAB) {
    items.value.push(SETTINGS_MENU_ITEMS.HOME)
  }
  items.value.push(SETTINGS_MENU_ITEMS.SETTINGS)
  items.value.push(SETTINGS_MENU_ITEMS.INFO)
  items.value.push(SETTINGS_MENU_ITEMS.SOUND)
}

onMounted(() => {
  setItemsList()
})
</script>
<template></template>
