import { Texture, Rectangle } from 'pixi.js'

interface CreateFromSpriteSheetReturn {
  up: Texture
  pressed: Texture
  over: Texture
  disabled: Texture
}
const ROWS = 2
const COLS = 2

export const useCreateFromSpriteSheet = (
  texture: Texture
): CreateFromSpriteSheetReturn => {
  let positions = []

  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      const rectanble = new Rectangle()
      rectanble.width = Math.floor(texture.width / 2)
      rectanble.height = Math.floor(texture.height / 2)
      rectanble.x = Math.floor(k * rectanble.width + texture.frame.x)
      rectanble.y = Math.floor(i * rectanble.height + texture.frame.y)

      positions.push(new Texture(texture.baseTexture, rectanble))
    }
  }

  return {
    up: positions[0],
    pressed: positions[1],
    over: positions[2],
    disabled: positions[3]
  }
}
