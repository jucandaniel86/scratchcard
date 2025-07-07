<script setup lang="ts">
import { onMounted } from 'vue'
import { __LOADED_RESOURCES } from '../../../config/Resources'
import { Container, Graphics, Texture } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { useScratchAnimation } from '../Animations/ScratchAnimation'
import { useRevealAnimation } from '../Animations/RevealAnimation'
import { useFrameAnimation } from '../Animations/FrameAnimation'
import { SymbolType } from '../../../store/game'

//props
type SymbolTypeI = {
  index: number
  symbolID: string | number
  x: number
  y: number
  scale: number
}
// enum AnimationNames {
//   idle = 'idle',
//   start = 'start',
//   switchAnim = 'switch',
//   end = 'end'
// }

const props = defineProps<SymbolTypeI>()

//animations
const scratchAnimation: any = useScratchAnimation({
  spineData: 'house_reveal_json',
  revealAnimation: 'house_reveal'
})
const revealAnimation: any = useRevealAnimation({
  spineData: 'symbols_json'
})
const frameAnimation = useFrameAnimation({ spineData: 'general_win_json' })

//emitters
const emitters = defineEmits([
  'onRevealStart',
  'onRevealComplete',
  'onMouseOver',
  'onMouseOut'
])

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
  container.addChild(revealAnimation.animation)
  // container.addChild(frameAnimation.animation)
  createHitArea(scratchAnimation.animation)
  container.addChild(scratchAnimation.animation)
}

const reset = () => {
  frameAnimation.reset()
  scratchAnimation.reset()
  revealAnimation.reset()
}

const setPlayAnimation = (
  SymbolID: string | number,
  IsMultiplier: boolean,
  IsWinAll: boolean
) => {
  return IsMultiplier ? 19 : IsWinAll ? 20 : SymbolID
}

const reveal = (symbol: SymbolType) => {
  //disable()
  const { symbolID, isMultiplier, isWinAll, prizeAmount } = symbol

  revealAnimation.play(setPlayAnimation(symbolID, isMultiplier, isWinAll))
  // revealAnimation.setPrize(prizeAmount)
  scratchAnimation.playReveal()
}

defineExpose({
  reveal,
  reset
})

onMounted(() => {
  reset()
})
</script>
<template>
  <container
    @render="renderSymbolContainer"
    @click="emitters('onRevealStart')"
    @mouseout="emitters('onMouseOut')"
    @mouseover="emitters('onMouseOver')"
    :event-mode="'static'"
    :button-mode="true"
    :cursor="'pointer'"
    :x="props.x"
    :y="props.y"
    :scale="props.scale"
  >
  </container>
</template>
