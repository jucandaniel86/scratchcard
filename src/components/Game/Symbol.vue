<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSpine } from '../../composables/useSpine'
import { __LOADED_RESOURCES } from '../../config/Resources'
import { Container, Graphics, Texture } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { useSymbolAnimations } from './Symbol/Animations'

//props
type SymbolType = {
  index: number
  symbolID: string | number
  x: number
  y: number
  scale: number
}
enum AnimationNames {
  idle = 'idle',
  start = 'start',
  switchAnim = 'switch',
  end = 'end'
}

const props = defineProps<SymbolType>()
const isActive = ref<boolean>(true)
const isRevealed = ref<boolean>(false)

//animations
const scratchAnimation = useSpine(__LOADED_RESOURCES.your_reveal_json)
const revealAnimation = useSpine(__LOADED_RESOURCES.symbols_json)

//emitters
const emitters = defineEmits(['onRevealStart', 'onRevealComplete'])

const animations = useSymbolAnimations({
  symbolID: 10,
  prizeAmount: 2,
  isMultiplier: true,
  isWinAll: false
})

const findCurrentSprite = (animation: any, _key: string) => {
  var slot = animation.skeleton.findSlot(_key)

  if (slot && slot.currentSprite) {
    return slot.currentSprite
  }

  if (!slot && !slot.currentSprite) {
    slot.currentSprite.texture = Texture.EMPTY
    return slot.currentSprite
  }

  return console.error(
    'Resource error. '.concat(_key, " doesn't have slot in attachment")
  )
}

const createHitArea = (_resource: any): any => {
  const animation = _resource
  const hit_area = animation.skeleton.findSlot('hit_area')
  let poligonSetup: any = []

  hit_area.attachment.vertices.forEach((t: number, e: number) => {
    var n = e % 2 ? t : -t
    poligonSetup.push(n)
  })
  const poligon = new Polygon(poligonSetup)

  const sprite = findCurrentSprite(animation, 'hit_area_attach')
  const graphics = new Graphics()

  graphics.hitArea = poligon
  graphics.buttonMode = true
  sprite.addChild(graphics)

  return sprite
}

const renderSymbolContainer = (container: Container) => {
  const scratchAnimationContainer = new Container()

  container.addChild(animations.container)
  container.addChild(scratchAnimationContainer)

  container.addChild(createHitArea(scratchAnimation.animation))
}

const reset = () => {
  scratchAnimation.triggerAnimation('idle')
}

defineExpose({
  playCTA: animations.playCTA,
  playWinAnimation: animations.playFrameAnimation
})

onMounted(() => {
  reset()
})
</script>
<template>
  <container
    @render="renderSymbolContainer"
    @click="animations.reveal"
    :button-mode="true"
    :cursor="'pointer'"
    :x="props.x"
    :y="props.y"
    :scale="props.scale"
  >
  </container>
</template>
