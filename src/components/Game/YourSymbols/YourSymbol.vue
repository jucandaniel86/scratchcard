<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { __LOADED_RESOURCES } from '../../../config/Resources'
import { Container, Graphics, Texture } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { useScratchAnimation } from '../Animations/ScratchAnimation'
import { useRevealAnimation } from '../Animations/RevealAnimation'
import { useFrameAnimation } from '../Animations/FrameAnimation'
import { SymbolType } from '../../../store/game'
import { useInteractiveObject } from '../../Core/VInteractiveObject'
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

//models
const hitArea = ref<any>()

//composables
const { disable, enable, init } = useInteractiveObject({
  clickHandler: () => emitters('onRevealStart'),
  hoverInHanlder: () => emitters('onMouseOver'),
  hoverOutHandler: () => emitters('onMouseOut')
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
  hitArea.value = animation.skeleton.findSlot('hit_area')
  let poligonSetup: any = []

  hitArea.value.attachment.vertices.forEach((t: number, e: number) => {
    var n = e % 2 ? t : -t
    poligonSetup.push(n)
  })
  const poligon = new Polygon(poligonSetup)

  const sprite = findCurrentSprite(animation, 'hit_area_attach')
  const graphics = new Graphics()

  graphics.hitArea = poligon

  sprite.addChild(graphics)
  init(graphics)

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

const reveal = async (symbol: SymbolType): Promise<void> => {
  disable()
  const { symbolID, isMultiplier, isWinAll } = symbol

  revealAnimation.play(setPlayAnimation(symbolID, isMultiplier, isWinAll))
  // revealAnimation.setPrize(prizeAmount)
  return await scratchAnimation.playReveal()
}

defineExpose({
  reveal,
  reset,
  enable,
  disable
})

onMounted(() => {
  reset()
})
</script>
<template>
  <container
    @mouseout="emitters('onMouseOut')"
    @mouseover="emitters('onMouseOver')"
    :x="props.x"
    :y="props.y"
    :scale="props.scale"
    @render="renderSymbolContainer"
  >
  </container>
</template>
