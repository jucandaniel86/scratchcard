<script setup lang="ts">
import { ref } from 'vue'

//props
type SymbolType = {
  index: number
}
const props = defineProps<SymbolType>()

//models
const isActive = ref<boolean>(true)
const isRevealed = ref<boolean>(false)

//emitters
const emitters = defineEmits(['onRevealStart', 'onRevealComplete'])
</script>
<template></template>
