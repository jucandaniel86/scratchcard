<script setup lang="ts">
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import { Container, Texture } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { __PIXI_APP } from '../../../main'
import { type ParticleContainerInst } from 'vue3-pixi'
import * as particles from 'pixi-particles'

type ParticleEmitter = {
  images: Texture[]
  config: any
}
//props
const props = defineProps<ParticleEmitter>()

//settings
const settings = ref<any>({
  autoupdate: true,
  emit: false
})

//models
const EmitterContainer = ref<any>()
const visible = ref<boolean>(true)
const isLoop = ref<boolean>(false)
const containerRef = ref<ParticleContainerInst>()
const container: any = new Container()

const renderParticleContainer = () => {
  EmitterContainer.value = new Emitter(container, {
    ...props.config,
    ...settings.value
  })
  // EmitterContainer.value.emit = true
}

const play = (): Promise<void> => {
  visible.value = true

  if (EmitterContainer.value) {
    EmitterContainer.value.autoUpdate = true
    return new Promise((resolve) => {
      EmitterContainer.value?.playOnce(() => {
        reset()
        resolve()
      })
    })
  }
  return Promise.resolve()
}

const loop = () => {
  isLoop.value = true
  visible.value = true

  if (EmitterContainer.value) {
    EmitterContainer.value.playOnce(() => {
      isLoop.value && loop()
    })
  }
}

const reset = () => {
  if (EmitterContainer.value) {
    EmitterContainer.value.emit = false
    EmitterContainer.value.autoUpdate = false
    visible.value = false
    isLoop.value = false
  }
}

defineExpose({
  play,
  reset,
  loop
})

var elapsed = Date.now()

// update frame
var update = function () {
  // Update the next frame
  requestAnimationFrame(update)

  var now = Date.now()
  if (EmitterContainer.value) {
    // The emitter requires the elapsed seconds
    EmitterContainer.value.update((now - elapsed) * 0.001)
    elapsed = now
  }
}

onMounted(() => {
  renderParticleContainer()
  __PIXI_APP.stage.addChild(container)
  // update()
})
</script>
<template></template>
