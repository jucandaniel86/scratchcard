import { Polygon, Texture } from 'pixi.js'
import { Graphics } from 'pixi.js'

export const getAnimationSlotSizes = (animation: any, label: string) => {
  const slot = animation.animation.skeleton.findSlot(label)

  const graphics = new Graphics()
  const parts: any[] = []
  slot.attachment.vertices.forEach((item: any, index: number) => {
    const size = index % 2 ? item : -item
    parts.push(size)
  })
  const polygon = new Polygon(parts)

  graphics.beginFill(0)
  graphics.drawPolygon(polygon)
  graphics.endFill()

  return {
    width: graphics.width || 0,
    height: graphics.height || 0
  }
}

export const attachToAnimation = (animation: any, label: string) => {
  const slot = animation.animation.skeleton.findSlot(label)

  if (slot && slot.currentSprite) {
    return (slot.currentSprite.texture = Texture.EMPTY), slot.currentSprite
  }
  console.error(
    'Resource error. '.concat(label, " doesn't have slot in attachment")
  )
}
