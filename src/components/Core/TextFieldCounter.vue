<script setup lang="ts">
import { ref } from 'vue'

type TextFieldCounterType = {
  id?: string | number
  text: string
}
const props = withDefaults(defineProps<TextFieldCounterType>(), {
  id: `Counter${new Date().getTime()}`
})

//methods
</script>
<template></template>
