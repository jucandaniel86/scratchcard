<script setup lang="ts">
import { Emitter } from 'pixi-particles'
import { Container, Texture } from 'pixi.js'
import { ref } from 'vue'

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
const EmitterContainer = ref<Emitter>()
const visible = ref<boolean>(true)
const isLoop = ref<boolean>(false)

const renderParticleContainer = (container: Container) => {
  EmitterContainer.value = new Emitter(container, props.images, {
    ...props.config,
    ...settings.value
  })
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
</script>
<template>
  <Container @render="renderParticleContainer" :visible="visible"></Container>
</template>
