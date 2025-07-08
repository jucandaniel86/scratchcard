import { Container, Graphics, Sprite, Texture, Rectangle, Text } from 'pixi.js'
import { computed, ref, watch } from 'vue'

type UseButtonActionsType = {
  texture: Texture
  onClick: (v: any) => void
}

export enum ButtonState {
  DOWN = 'down',
  UP = 'up',
  DISABLED = 'disabled',
  OVER = 'over'
}

const fontFamily = 'Roboto Condensed, Arial'

export const useButtonActions = ({
  texture,
  onClick
}: UseButtonActionsType) => {
  //models
  const buttonState = ref<ButtonState>(ButtonState.UP)
  const isDownState = ref<boolean>(false)
  const interactive = ref<boolean>(true)
  const container = ref<any>()
  //states
  const upState = ref<Sprite>()
  const downState = ref<Sprite>()
  const overState = ref<Sprite>()
  const disabledState = ref<Sprite>()

  const onCreate = () => {
    isDownState.value = false
  }

  //methods
  const centerObject = (
    object1: Sprite | Container | Graphics,
    object2: Sprite | Container | Graphics
  ) => {
    object2.position.set(
      object1.width / 2 - object2.width / 2,
      object1.height / 2 - object2.height / 2
    )
  }

  const labelRender = (_text: Text, _style?: any) => {
    _text.style = { ..._style, fontFamily }
  }

  const createDisabledState = (sprite: Sprite) => {
    const rectangle = new Rectangle(
      texture.frame.x + texture.orig.width / 2,
      texture.frame.y + texture.orig.height / 2,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    sprite.texture = new Texture(texture.baseTexture, rectangle)
    disabledState.value = sprite
  }

  const createOverState = (sprite: Sprite) => {
    const rectangle = new Rectangle(
      texture.frame.x + texture.orig.width / 2,
      texture.frame.y,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    sprite.texture = new Texture(texture.baseTexture, rectangle)
    overState.value = sprite
  }

  const createDownState = (sprite: Sprite) => {
    const rectangle = new Rectangle(
      texture.frame.x,
      texture.frame.y + texture.orig.height / 2,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    sprite.texture = new Texture(texture.baseTexture, rectangle)
    downState.value = sprite
  }

  const createUpState = (sprite: Sprite) => {
    const rectangle = new Rectangle(
      texture.frame.x,
      texture.frame.y,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    sprite.texture = new Texture(texture.baseTexture, rectangle)
    upState.value = sprite
  }

  const onMouseDown = () => {
    isDownState.value = true
    buttonState.value = ButtonState.DOWN
  }

  const onMouseOver = () => {
    isDownState.value = false
    buttonState.value = ButtonState.OVER
  }

  const onMouseUpOutside = () => {
    isDownState.value = false
    buttonState.value = ButtonState.OVER
  }

  const onMouseOut = () => {
    isDownState.value = false
    buttonState.value = ButtonState.UP
  }

  const enable = () => (interactive.value = true)

  const disable = () => (interactive.value = false)

  const isEnabled = () => interactive.value

  const isDisabled = computed(() => buttonState.value === ButtonState.DISABLED)

  const isUp = computed(() => buttonState.value === ButtonState.UP)

  const isOver = computed(() => buttonState.value === ButtonState.OVER)

  const isDown = computed(() => buttonState.value === ButtonState.DOWN)

  const makeInteractive = (container: Container) => {
    enable()
    container.buttonMode = true
    container.interactive = interactive.value
    container.cursor = 'pointer'
  }

  const setupListeners = (container: Container) => {
    if ('ontouchstart' in window) {
      container.on('tap', onClick)
      container.on('touchstart', onMouseDown)
      container.on('touchendoutside', onMouseUpOutside)
      return
    }

    container.on('click', onClick)
    container.on('mousedown', onMouseDown)
    container.on('mouseupoutside', onMouseUpOutside)
    container.on('mouseout', onMouseOut)
    container.on('mouseover', onMouseOver)
  }

  const updateLayout = () => {
    if (
      upState.value &&
      overState.value &&
      downState.value &&
      disabledState.value
    ) {
      centerObject(upState.value, overState.value)
      centerObject(upState.value, downState.value)
      centerObject(upState.value, disabledState.value)
    }
  }

  const init = (container: Container) => {
    makeInteractive(container)
    setupListeners(container)
    updateLayout()
  }

  watch(buttonState, () => {
    console.log('BUTTON STATE', buttonState.value)
  })

  return {
    container,
    buttonState,
    isDownState,
    isDisabled,
    isUp,
    isOver,
    isDown,
    init,
    enable,
    disable,
    isEnabled,
    makeInteractive,
    setupListeners,
    onCreate,
    centerObject,
    labelRender,
    createDisabledState,
    createOverState,
    createDownState,
    createUpState,
    onClick,
    onMouseDown,
    onMouseOver,
    onMouseUpOutside
  }
}
