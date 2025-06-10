<script setup lang="ts">
import { computed, ref } from 'vue';
import { Circle, Graphics } from 'pixi.js';
import {
  TransitionPresets,
  useElementHover,
  useTransition,
} from '@vueuse/core';

const hitArea = new Circle(0, 0, 32);

const el = ref();

const hovering = useElementHover(el);

const scale = computed(() => (hovering.value ? 1.25 : 1));
const blur = computed(() => (hovering.value ? 0 : 1));

const scaleAnimated = useTransition(scale, {
  duration: 150,
  transition: TransitionPresets.easeOutQuad,
});
const blurAnimated = useTransition(blur, {
  duration: 300,
  transition: TransitionPresets.easeOutQuad,
});

function drawOutline(g: Graphics) {
  g.clear();

  g.lineStyle(2, 0xe3ff45, (scaleAnimated.value - 1) * 4);
  g.drawCircle(0, 0, 32 * scaleAnimated.value);
}
</script>

<template>
  <container>
    <sprite
      ref="el"
      texture="../assets/bunny.png"
      :hit-area="hitArea"
      :scale="scaleAnimated"
      :anchor="0.5"
      event-mode="static"
      tint="orange"
    >
      <blur-filter :quality="10" :blur="blurAnimated" />
    </sprite>
    <graphics @render="drawOutline" />
  </container>
</template>
