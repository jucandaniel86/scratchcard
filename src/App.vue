<script setup lang="ts">
import { Application } from 'vue3-pixi';
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core';

import CursorSprite from './components/CursorSprite.vue';

const enabled = ref(true);
</script>

<template>
  <div style="margin-bottom: 10px">
    <button @click="enabled = !enabled">Toggle</button>
    <span style="margin-left: 10px"> Sprite visible: {{ enabled }} </span>
  </div>
  <Application :width="300" :height="300">
    <CursorSprite v-if="enabled" :x="300 / 2" :y="300 / 2" />
  </Application>
</template>

<style scoped></style>
